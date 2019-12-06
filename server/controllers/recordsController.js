import incidents from '../data/incidents';
import Validate from '../helpers/validator';
import RedFlag from '../helpers/recordsHelpers';
import IncidentsModel from '../db/models/incidents';

class Records {
  // get all incid
  static async getAllRedFrags(req, res) {
    const { id } = req.user;
    // const redflags = incidents.filter((incident) => incident.createdBy == id);
    const redflags = await IncidentsModel.getAllIncidentsByUser(id);
    if (!redflags.rows[0]) {
      // to ask lfa about using 404 or 204
      res.status(204).send({
        status: 204,
        error: 'no red-flag records.',
      });
    } else {
      res.status(200).send({
        status: 200,
        data: redflags.rows[0],
      });
    }
  }

  // get red-flag record by id
  static async getRedFlagById(req, res) {
    const { id } = req.params;
    // eslint-disable-next-line radix
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) { res.send('enter a valid id'); } else {
      const redFlag = await IncidentsModel.getOneIncident(id, req.user.id);

      if (!redFlag.rows[0]) {
        res.status(404).send({
          status: 404,
          error: 'a red-flag with the given ID was not found.',
        });
      } else {
        res.status(200).send({
          status: 200,
          data: redFlag.rows[0],

        });
      }
    }
  }
  // create a red flag record

  static async createRedFlag(req, res) {
    const { error } = Validate.createRedFlag(req.body);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }

    const {
      title, type, location, comment,
    } = req.body;
    const incident = await IncidentsModel.createIncident(title, req.user.id, type, location, comment);
    res.status(201).send({
      status: 201,
      data: [{
        id: incident.rows[0].id,
        message: 'Created red-flag record',

      }],
    });
  }

  // update red-flag location

  static async updateLocation(req, res) {
    const { id } = req.params;
    if (isNaN(id)) {
      res.send({
        status: 400,
        error: 'enter a valid id.',
      });
    } else {
      let redFlag = await IncidentsModel.getOneIncident(id, req.user.id);
      if (!redFlag.rows[0]) {
        res.status(404).send({
          status: 404,
          error: 'a red-flag with the given ID was not found.',
        });
      } else if (redFlag.rows[0].status !== 'draft') {
        res.status(403).send({
          status: 403,
          error: 'you can no longer edit the location of this red-flag.',
        });
      } else {
        const { error } = Validate.updateLocation(req.body);
        if (error) {
          res.status(400).send({
            status: 400,
            error: error.details[0].message.replace(/"/g, ''),
          });
        }
        redFlag = await IncidentsModel.updateIncidentLocation(id, req.user.id, req.body.location);
        res.status(200).send({
          status: 200,
          data: [
            {
              id: redFlag.rows[0].id,
              message: "Updated red-flag record's location",
            },
          ],

        });
      }
    }
  }

  // udate redflag comment


  static async updateComment(req, res) {
    const { id } = req.params;
    // eslint-disable-next-line radix
    if (isNaN(id)) {
      res.send({
        status: 400,
        error: 'enter a valid id.',
      });
    } else {
      let redFlag = await IncidentsModel.getOneIncident(id, req.user.id);
      if (!redFlag.rows[0]) {
        res.status(404).send({
          status: 404,
          error: 'a red-flag with the given ID was not found.',
        });
      } else {
        const { error } = Validate.updateComment(req.body);
        if (error) {
          res.status(400).send({
            status: 400,
            error: error.details[0].message.replace(/"/g, ''),
          });
        }
        redFlag = await IncidentsModel.updateIncidentComment(id, req.user.id, req.body.comment);
        res.status(200).send({
          status: 200,
          data: [
            {
              id: redFlag.rows[0].id,
              message: "Updated red-flag record's comment",
            },
          ],

        });
      }
    }
  }

  // delete redflag record
  static async deleteRedflag(req, res) {
    const { id } = req.params;
    // eslint-disable-next-line radix
    if (isNaN(id)) {
      res.send({
        status: 400,
        error: 'enter a valid id.',
      });
    } else {
      let redFlag = await IncidentsModel.getOneIncident(id, req.user.id);
      if (!redFlag.rows[0]) {
        res.status(404).send({
          status: 404,
          error: 'a red-flag with the given ID was not found.',
        });
      } else {
        redFlag = await IncidentsModel.deleteIncident(id, req.user.id);

        res.status(200).send({
          status: 200,
          data: [
            {
              id: redFlag.rows[0].id,
              message: 'red-flag record has been deleted',
            },
          ],

        });
      }
    }
  }

  static async changeStatus(req, res) {
    const { id } = req.params;
    // eslint-disable-next-line radix
    let redFlag = await IncidentsModel.adminFindOneRecord(id);
    if (!redFlag.rows[0]) {
      res.status(404).send({
        status: 404,
        error: 'a red-flag with the given ID was not found.',
      });
    } else {
      const { error } = Validate.changeStatus(req.body);
      if (error) {
        return res.status(400).send({
          status: 400,
          error: error.details[0].message.replace(/"/g, ''),
        });
      }
      redFlag = await IncidentsModel.adminChangeStatus(id, req.body.status);
      res.status(200).send({
        status: 200,
        data: [
          {
            id: redFlag.rows[0].id,
            message: "Changed red-flag record's status",
          },
        ],

      });
    }
  }

  // admin should get all red-flags
  static async AdminGetAllRedFrags(req, res) {
    const redflags = await IncidentsModel.adminGetAllIncidents();
    res.status(200).send(
      {
        status: 200,
        data: redflags.rows,
      },
    );
  }
}


export default Records;

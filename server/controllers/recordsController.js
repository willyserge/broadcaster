import incidents from '../data/incidents';
import Validate from '../helpers/validator';
import RedFlag from '../helpers/recordsHelpers';
import IncidentsModel from '../db/models/incidents';

class Records {

    // get all redfrag record
    static async getAllRedFrags(req, res) {
      const { id } = req.user;

      const redflags = await IncidentsModel.getAllIncidentsByUser(id);
      if (!redflags.rows) {
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
  if (isNaN(id)) {
     res.status(400).send({
      status: 400,
      error: 'enter a valid ID.',
  }); 
} else {
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
    const userId=req.user.id;
    const incident = await IncidentsModel.createIncident(title , userId , type, location, comment);
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
    // eslint-disable-next-line radix
    const redFlag = await RedFlag.findById(parseInt(id), req.user.id, incidents);
    if (!redFlag) {
      res.status(404).send({
        status: 404,
        error: 'a red-flag with the given ID was not found.',
      });
    }
    else if (redFlag.status !== 'draft') {
      res.status(405).send({
        status: 405,
        error: 'you can no longer edit the location of this red-flag.',
      });
    }
    else {
      const { error } = Validate.updateLocation(req.body);
      if (error) {return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, '')
      });}
      redFlag.location = req.body.location;
      res.status(200).send({
        status: 200,
        data: [
          {
            id: redFlag.id,
            message: "Updated red-flag record's location",
          },
        ],

      });
    }

  }

  // udate redflag comment

  static async updateComment(req, res) {
    const {id} = req.params;
    // eslint-disable-next-line radix
    const redFlag = await RedFlag.findById(parseInt(id), req.user.id, incidents);
    if (!redFlag) {
      res.status(404).send({
        status: 404,
        error: 'a red-flag with the given ID was not found.',
      });
    }
    else {

      const { error } = Validate.updateComment(req.body);
      if (error) {return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, '')
      });}
      redFlag.location = req.body.comment;
      res.status(200).send({
        status: 200,
        data: [
          {
            id: redFlag.id,
            message: "Updated red-flag record's comment",
          },
        ],

      });
    }

  }

  // delete redflag record
  static async deleteRedflag(req, res) {

    const { id } = req.params;
    // eslint-disable-next-line radix
    const redFlag = await RedFlag.findById(parseInt(id), req.user.id, incidents);
    if (!redFlag) {
      res.status(404).send({
        status: 404,
        error: 'a red-flag with the given ID was not found.',
      });
    }
    else {
      const index = incidents.indexOf(redFlag);
      incidents.splice(index, 1);

      res.status(200).send({
        status: 200,
        data: [
          {
            id: redFlag.id,
            message: 'red-flag record has been deleted',
          },
        ],

      });
    }

  }

  static async changeStatus(req, res) {
    const { id } = req.params;
    // eslint-disable-next-line radix
    const redFlag = incidents.find((incident) => incident.id === parseInt(id));
    if (!redFlag) {
      res.status(404).send({
        status: 404,
        error: 'a red-flag with the given ID was not found.',
      });
    }
    else {
      const { error } = Validate.changeStatus(req.body);
      if (error) {return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, '')
      });}
      redFlag.status = req.body.status;
      res.status(200).send({
        status: 200,
        data: [
          {
            id: redFlag.id,
            message: "Changed red-flag record's status",
          },
        ],

      });

    }

  }

  // admin should get all red-flags
  static async AdminGetAllRedFrags(req, res) {
    res.status(200).send(
      {
        status: 200,
        data: incidents,
      },
    );
  }
}



export default Records;

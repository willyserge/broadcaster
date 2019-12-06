import pool from '../index';

// Created this for testing purposes (waiting confirmation on structure)

class IncidentsModel {
  static getAllIncidentsByUser(id) {
    const query = `SELECT * FROM incidents
    WHERE createdby = $1`;
    const res = pool.query(query, [id]);
    return res;
  }

  static getOneIncident(id, userId) {
    const query = `SELECT *
    FROM incidents
    WHERE id = $1 AND createdBy = $2`;
    const res = pool.query(query, [id, userId]);
    return res;
  }

  static createIncident(title, createdBy, type, location, comment) {
    const query = 'INSERT INTO incidents (title, createdBy, type,location,comment) VALUES ($1, $2, $3, $4, $5)RETURNING id ';
    const res = pool.query(query, [title, createdBy, type, location, comment]);
    return res;
  }

  static updateIncidentLocation(id, userId, location) {
    const query = 'UPDATE incidents SET location = $1  WHERE createdBy = $2 AND id= $3 RETURNING id';
    const res = pool.query(query, [location, userId, id]);
    return res;
  }

  static updateIncidentComment(id, userId, comment) {
    const query = 'UPDATE incidents SET comment = $1  WHERE createdBy = $2 AND id= $3 RETURNING id';
    const res = pool.query(query, [comment, userId, id]);
    return res;
  }

  static deleteIncident(id, userId) {
    const query = 'DELETE FROM incidents WHERE id = $1 AND createdBy = $2 RETURNING id';
    const res = pool.query(query, [id, userId]);
    return res;
  }

  static adminFindOneRecord(id) {
    const query = `SELECT * FROM incidents
    WHERE id = $1`;
    const res = pool.query(query, [id]);
    return res;
  }

  static adminChangeStatus(id, newStatus) {
    const query = 'UPDATE incidents SET status = $1  WHERE id = $2  RETURNING id';
    const res = pool.query(query, [newStatus, id]);
    return res;
  }

  static adminGetAllIncidents() {
    const query = 'SELECT * FROM incidents';
    const res = pool.query(query);
    return res;
  }
}
export default IncidentsModel;

import pool from '../index';


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
}
export default IncidentsModel;

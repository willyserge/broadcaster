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
}
export default IncidentsModel;

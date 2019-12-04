import pool from '../index';

// Created this for testing purposes (waiting confirmation on structure)

class IncidentsModel {
  static getAllIncidents(tableName) {
    const query = `SELECT * FROM ${tableName} ORDER BY id ASC`;
    const res = pool.query(query);
    return res;
  }
}
export default IncidentsModel;

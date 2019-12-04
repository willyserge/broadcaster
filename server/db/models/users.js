import pool from '../index';

// Created this for testing purposes (waiting confirmation on structure)

class User {
  static findEmail(email) {
    const query = `SELECT * FROM users
    WHERE email = $1`;
    const res = pool.query(query, [email]);
    return res;
  }

  static createUser(firstname, lastname, username, phoneNumber, email, password) {
    const query = 'INSERT INTO users (firstname, lastname, username,phoneNumber, email, password) VALUES ($1, $2, $3, $4, $5 ,$6)RETURNING firstname,lastname,email';
    const res = pool.query(query, [firstname, lastname, username, phoneNumber, email, password]);
    return res;
  }
}
export default User;

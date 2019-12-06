import Validate from '../helpers/validator';
import Auth from '../helpers/authHelpers';
import User from '../db/models/users';

class UserController {
  // registering users
  static async signUp(req, res) {

    // validate inputs
    const { error } = Validate.register(req.body);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }

    // find if the user with the given email exist
    let user = await User.findEmail(req.body.email);
    if (user.rows[0]) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exist',
      });
    }

    user = await User.findUsername(req.body.username);
    if (user.rows[0]) {
      return res.status(409).send({
        status: 409,
        error: 'Username already exist',
      });
    }
    // hash user password
    const password = await Auth.hashPassword(req.body.password);
    const {
      firstname, lastname, username, phoneNumber, email,
    } = req.body;
    user = await User.createUser(firstname, lastname, username, phoneNumber, email, password);
    // generate token
    const { id, admin } = user.rows[0];
    const token = await Auth.generateToken(id, admin);
    return res.header('x-auth-token', token).status(201).send({
      status: 201,
      data: [{
        token,
        user: user.rows[0],
      }],
    });
  }
 

  static async signIn(req, res) {
    // validate inputs first
    const { error } = Validate.signIn(req.body);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/"/g, ''),
      });
    }
    // find if the user with the given email exist
    const user = await User.findEmail(req.body.email);
    if (!user.rows[0]) {
      return res.status(400).send({
        status: 401,
        error: 'invalid Email or Password',
      });
    }

    const validPassword = await Auth.comparePassword(req.body.password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).send({
        status: 401,
        error: 'invalid Email or Password',
      });
    }

    const { id, admin } = user.rows[0];
    const token = await Auth.generateToken(id, admin);
    res.header('x-auth-token', token).status(200).send({
      status: 200,
      message: 'User is successfuly logged in',
      data: [{
        token,
        user: user.rows[0].email,
      }],
    });
  }
}
export default UserController;

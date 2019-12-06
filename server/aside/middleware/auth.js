import jwt from 'jsonwebtoken';
import users from '../data/users';
import User from '../db/models/users';

class Auth {
  static async verifyToken (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: 'access denied',
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      const userObject = await User.findById(decoded.id)
      // eslint-disable-next-line prefer-destructuring
      req.user = userObject.rows[0];
      next();
    } catch (ex) {
      res.status(400).send({
        status: 400,
        error: 'invalid token',
      });
    }
  }
}
export default Auth;

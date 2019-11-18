import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
class Auth{
    static async generateToken(userInfo){
        const token= jwt.sign({userInfo},process.env.jwtPrivateKey);
        return token;
    }
    static async hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
      }

    static async  comparePassword( password,hashPassword) {
        return bcrypt.compareSync(password, hashPassword);
    }
}
export default Auth
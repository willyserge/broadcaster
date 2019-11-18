import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
class Auth{
    static async generateToken(id){
        const token= jwt.sign({id},process.env.jwtPrivateKey);
        return token;
    }
    static async hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
      }

}
export default Auth
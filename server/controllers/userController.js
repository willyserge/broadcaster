import "@babel/polyfill";
import _ from 'lodash';
import users from '../data/users'
import Validate from '../helpers/validator'
import Auth from '../helpers/authHelpers'
class User{

    //registering users
    static async signUp (req, res) {
        // validate inputs first
        const {error}= await Validate.register(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //find if the user with the given email exist
        let user= users.find((user) => user.email == req.body.email )
        if(user) return res.status(400).send('user with the given email already exists');
        //initialize and create  new user 
        user={
          id:users.length+1,
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          username:req.body.username,
          email:req.body.email,
          registered: new Date().toISOString(),
          password: req.body.password

        }
        
        const token=await Auth.generateToken(user.id);
        user.password= await Auth.hashPassword(user.password);
        users.push(user);
        //response spec
        res.header('x-auth-token',token).status(201).send({
            status: 201,
            data: [{
              token,
              user: _.pick(user,['firstname','lastname','username','email']),
            }],
          });
           
    }

}
export default User;
import express from 'express';
import User from '../controllers/userController'
import Records from '../controllers/recordsController'
import Auth from '../middleware/auth'
const router=express.Router();
router.get('/test',(req,res)=>{
    res.send('in the route');
})
//sign up route
router.post('/api/v1/auth/signup',User.signUp);
router.post('/api/v1/auth/signin',User.signIn);
router.get('/api/v1/red-flags',Auth.verifyToken,Records.getAllRedFrags);
router.get('/api/v1/red-flags/:id',Auth.verifyToken,Records.getRedFlagById);
router.post('/api/v1/red-flags',Auth.verifyToken,Records.createRedFlag);
router.patch('/api/v1/red-flags/:id/location',Auth.verifyToken,Records.updateLocation);



export default router;

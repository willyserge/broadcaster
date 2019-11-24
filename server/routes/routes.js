import express from 'express';
import User from '../controllers/userController'
import Records from '../controllers/recordsController'
import Auth from '../middleware/auth'
import Admin from '../middleware/admin'
const router=express.Router();

router.post('/auth/signup',User.signUp);
router.post('/auth/signin',User.signIn);
router.get('/red-flags',Auth.verifyToken,Records.getAllRedFrags);
router.get('/red-flags/:id',Auth.verifyToken,Records.getRedFlagById);
router.post('/red-flags',Auth.verifyToken,Records.createRedFlag);
router.patch('/red-flags/:id/location',Auth.verifyToken,Records.updateLocation);
router.patch('/red-flags/:id/comment',Auth.verifyToken,Records.updateComment);
router.delete('/red-flags/:id',Auth.verifyToken,Records.deleteRedflag);
router.patch('/red-flags/:id/status',Auth.verifyToken,Admin.authenticate,Records.changeStatus);
router.get('/incidents/admin',Auth.verifyToken,Admin.authenticate,Records.AdminGetAllRedFrags);




export default router;

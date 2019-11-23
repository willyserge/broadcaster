import express from 'express';
import User from '../controllers/userController'
import Records from '../controllers/recordsController'
import Auth from '../middleware/auth'
import Admin from '../middleware/admin'
const router=express.Router();

router.post('/api/v1/auth/signup',User.signUp);
router.post('/api/v1/auth/signin',User.signIn);
router.get('/api/v1/red-flags',Auth.verifyToken,Admin.authenticate,Records.getAllRedFrags);
router.get('/api/v1/red-flags/:id',Auth.verifyToken,Records.getRedFlagById);
router.post('/api/v1/red-flags',Auth.verifyToken,Records.createRedFlag);
router.patch('/api/v1/red-flags/:id/location',Auth.verifyToken,Records.updateLocation);
router.patch('/api/v1/red-flags/:id/comment',Auth.verifyToken,Records.updateComment);
router.delete('/api/v1/red-flags/:id',Auth.verifyToken,Records.deleteRedflag);
router.patch('/api/v1/red-flags/:id/status',Auth.verifyToken,Records.changeStatus);




export default router;

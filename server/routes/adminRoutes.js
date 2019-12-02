import express from 'express';
import Records from '../controllers/recordsController';
import Auth from '../middleware/auth';
import Admin from '../middleware/admin';

const AdminRouter = express.Router();


AdminRouter.patch('/red-flags/:id/status',Auth.verifyToken,Admin.authenticate, Records.changeStatus);
AdminRouter.get('/red-flags', Auth.verifyToken, Admin.authenticate, Records.AdminGetAllRedFrags);
export default AdminRouter;

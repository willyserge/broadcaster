import express from 'express';
import Auth from '../middleware/auth';
import Records from '../controllers/recordsController';

const recordsRouter = express.Router();


recordsRouter.get('/', Auth.verifyToken, Records.getAllRedFrags);
recordsRouter.get('/:id', Auth.verifyToken, Records.getRedFlagById);
recordsRouter.post('/', Auth.verifyToken, Records.createRedFlag);
recordsRouter.patch('/:id/location', Auth.verifyToken, Records.updateLocation);
recordsRouter.patch('/:id/comment', Auth.verifyToken, Records.updateComment);
recordsRouter.delete('/:id', Auth.verifyToken, Records.deleteRedflag);

export default recordsRouter;

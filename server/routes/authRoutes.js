import express from 'express';

import User from '../controllers/userController';

const router = express.Router();

router.post('/signup', User.signUp);
router.post('/signin', User.signIn);

export default router;

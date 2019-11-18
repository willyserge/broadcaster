import express from 'express';
import User from '../controllers/userController'
const router=express.Router();
router.get('/test',(req,res)=>{
    res.send('in the route');
})
//sign up route
router.post('/api/v1/auth/signup',User.signUp);
router.post('/api/v1/auth/signin',User.signIn);

export default router;

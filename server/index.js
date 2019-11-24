import "express-async-errors"
import "@babel/polyfill";
import express from "express";
import dotenv from 'dotenv';
import router from './routes/routes.js'
import Error from './middleware/error'

const app = express();
dotenv.config();

app.use(express.json())
app.use('/api/v1/',router);
app.get('/',(req,res)=>res.status(200).send({
    message:'you can view the documentation of the API on the link below',
    link:'https://documenter.getpostman.com/view/8773430/SW7dUR4j'

}))
app.use(Error.catchError)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export default app
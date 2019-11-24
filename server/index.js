import "@babel/polyfill";
import express from "express";
import dotenv from 'dotenv';
import router from './routes/routes.js'
const app = express();
dotenv.config();

app.use(express.json())
app.use('/api/v1/',router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export default app
import 'express-async-errors';
import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';


import router from './routes/authRoutes';
import recordsRouter from './routes/recordsRoutes';
import adminRouter from './routes/adminRoutes';
import Error from './middleware/error';
import IncidentsModel from './db/models/incidents';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/v2/auth/', router);
app.use('/api/v2/red-flags/', recordsRouter);
app.use('/api/v2/admin/', adminRouter);

// documentation route
app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Broadcaster. you can view the documentation of the API on the link below',
  link: 'https://documenter.getpostman.com/view/8773430/SW7gUQu5',

}));

// Created this for testing purposes (waiting confirmation on structure)

app.get('/data', async (req, res) => {
  const response = await IncidentsModel.getAllIncidents('incidents');
  res.status(200).json(response.rows);
});

app.use(Error.catchError);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

export default app;

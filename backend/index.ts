// TODO: create express server

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import enigmaRoutes from './routes/enigmaRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use('/users', userRoutes);
app.use('/enigmas', enigmaRoutes);

app.use(errorHandler);
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
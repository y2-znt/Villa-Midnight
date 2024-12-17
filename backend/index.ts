// TODO: create express server

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Express');
  });
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
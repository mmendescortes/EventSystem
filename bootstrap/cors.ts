/*
  Import the Express library
*/
import {Express} from 'express';

/*
  Import the CORS library
*/
import {cors} from 'cors';

export default ((app : Express) => {
  app.use(cors());
  app.options('/api/*', cors());
});
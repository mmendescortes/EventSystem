/*
  Import the Express library
*/
import {Express, Request} from 'express';

/*
  Import the CORS library
*/
import cors from 'cors';

export default ((app: Express) : void => {
  app.use(cors<Request>());
  app.options('/api/*', cors<Request>());
});
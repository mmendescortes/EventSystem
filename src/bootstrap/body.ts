/*
  Import the Body Parser library
*/
import * as body from 'body-parser';

/*
  Import the Express library
*/
import {Express} from 'express';

export default ((app : Express) => {
  app.use(body.json());
  app.use(body.urlencoded({extended: true}));
});

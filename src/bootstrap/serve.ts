/*
  Import the Express library
*/
import {Express} from 'express';

export default ((app : Express) : void => {
  app.listen(process.env.APP_PORT, function () {
    console.log('Application is listening at %s://%s:%s', process.env.APP_PROTOCOL, process.env.APP_HOST, process.env.APP_PORT);
  });
})
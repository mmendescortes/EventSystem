/*
  Import the Express library
*/
import express, {Express} from 'express';

export default (() : Express => {
  const app : Express = express();
  return app;
})
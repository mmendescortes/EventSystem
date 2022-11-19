/*
  Import the Express library
*/
import express, {Express} from 'express';

export default (() => {
  const app : Express = express();
  return app;
})()
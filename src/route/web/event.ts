/*
Import the event controller
*/
import {EventController} from '../../controller/event';

/*
    Import the Express library
*/
import express, {Request, Response, Router} from 'express';

/*
  Create a new router for Event
*/
const router : Router = express.Router();

/*
  Export the Event router
*/
module.exports = router;
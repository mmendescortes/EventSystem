/*
Import the ticket controller
*/
import {TicketController} from '../../controller/ticket';

/*
    Import the Express library
*/
import express, {Request, Response, Router} from 'express';

/*
  Create a new router for Ticket
*/
const router : Router = express.Router();

/*
  Export the Ticket router
*/
module.exports = router;
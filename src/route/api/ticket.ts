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
  Create Ticket
*/
router.post('/ticket', function(req : Request, res : Response) {
  let ticketInstance : TicketController = new TicketController(req.body);
  let result : Promise<unknown> = ticketInstance.create();
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/ticket', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'POST'
  });  
});

/*
  Return not allowed method
*/
router.delete('/ticket', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
    res.status(405);
    res.json({
      "status": 405,
      "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
    });  
});

/*
  Return not allowed method
*/
router.put('/ticket', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
  });       
});

/*
  Return not allowed method
*/
router.post('/:event/tickets', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'GET'
  });
});

/*
  List all Ticket
*/
router.get('/:event/tickets', function(req : Request, res : Response) {
  let ticketInstance : TicketController = new TicketController();
  let result : Promise<unknown> = ticketInstance.getAll(req.params.event);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.delete('/:event/tickets', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET');
    res.status(405);
    res.json({
      "status": 405,
      "message": 'Unsuported method used!',
        "allowedMethods": 'GET'
    });  
});

/*
  Return not allowed method
*/
router.put('/:event/tickets', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET');
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'GET'
  });       
});

/*
  Return not allowed method
*/
router.post('/ticket/:id', function(req : Request, res : Response) {
  res.setHeader('Allow', 'PUT, DELETE, GET');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, DELETE, GET'
  });
});

/*
  Get Ticket by id
*/
router.get('/ticket/:id', function(req : Request, res : Response) {
  let ticketInstance : TicketController = new TicketController();
  let result : Promise<unknown> = ticketInstance.getById(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Delete Ticket
*/
router.delete('/ticket/:id', function(req : Request, res : Response) {
  let ticketInstance : TicketController = new TicketController();
  let result : Promise<unknown> = ticketInstance.delete(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Update Ticket
*/
router.put('/ticket/:id', function(req : Request, res : Response) {
  let ticketInstance : TicketController = new TicketController();
  let result : Promise<unknown> = ticketInstance.update(req.params.id, req.body);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });    
});

/*
  Export the Ticket router
*/
module.exports = router;
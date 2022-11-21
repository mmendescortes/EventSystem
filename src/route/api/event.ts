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
  Create Event
*/
router.post('/event', function(req : Request, res : Response) {
  let eventInstance : EventController = new EventController(req.body);
  let result : Promise<unknown> = eventInstance.create();
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/event', function(req : Request, res : Response) {
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
router.delete('/event', function(req : Request, res : Response) {
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
router.put('/event', function(req : Request, res : Response) {
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
router.post('/events', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'GET'
  });
});

/*
  List all Event
*/
router.get('/events', function(req : Request, res : Response) {
  let eventInstance : EventController = new EventController();
  let result : Promise<unknown> = eventInstance.getAll();
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.delete('/events', function(req : Request, res : Response) {
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
router.put('/events', function(req : Request, res : Response) {
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
router.post('/event/:id', function(req : Request, res : Response) {
  res.setHeader('Allow', 'PUT, DELETE, GET');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, DELETE, GET'
  });
});

/*
  Get Event by id
*/
router.get('/event/:id', function(req : Request, res : Response) {
  let eventInstance : EventController = new EventController();
  let result : Promise<unknown> = eventInstance.getById(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Delete Event
*/
router.delete('/event/:id', function(req : Request, res : Response) {
  let eventInstance : EventController = new EventController();
  let result : Promise<unknown> = eventInstance.delete(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Update Event
*/
router.put('/event/:id', function(req : Request, res : Response) {
  let eventInstance : EventController = new EventController();
  let result : Promise<unknown> = eventInstance.update(req.params.id, req.body);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });    
});

/*
  Export the Event router
*/
module.exports = router;
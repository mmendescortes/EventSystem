/*
Import the user controller
*/
import {UserController} from '../../controller/user';

/*
    Import the Express library
*/
import express, {Express, Request, Response, Router} from 'express';

/*
  Create a new router for User
*/
const router : Router = express.Router();

/*
  Create User
*/
router.post('/signin', function(req, res) {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.signin()
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  });
});

/*
  Return not allowed method
*/
router.get('/signin', function(req, res) {
  res.setHeader('Allow', 'POST')
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
router.delete('/signin', function(req, res) {
  res.setHeader('Allow', 'POST')
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
router.put('/signin', function(req, res) {
  res.setHeader('Allow', 'POST')
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
  });       
});

/*
  Create User
*/
router.post('/user', function(req, res) {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.create()
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  });
});

/*
  Return not allowed method
*/
router.get('/user', function(req, res) {
  res.setHeader('Allow', 'POST')
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
router.delete('/user', function(req, res) {
  res.setHeader('Allow', 'POST')
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
router.put('/user', function(req, res) {
  res.setHeader('Allow', 'POST')
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
router.post('/user/:id', function(req, res) {
  res.setHeader('Allow', 'PUT, DELETE, GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, DELETE, GET'
  });
});

/*
  List User
*/
router.get('/user/:id', function(req, res) {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.getById(req.params.id)
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  });
});

/*
  Delete User
*/
router.delete('/user/:id', function(req, res) {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.delete(req.params.id)
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  });
});

/*
  Update User
*/
router.put('/user/:id', function(req, res) {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.update(req.params.id, req.body)
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  });    
});

/*
  Return not allowed method
*/
router.post('/user/confirm/email/:token', function(req, res) {
  res.setHeader('Allow', 'PUT, GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, GET'
  });
});

/*
  Return not allowed method
*/
router.get('/user/confirm/email/:token', function(req, res) {
  res.status(200);
  res.send("");
});

/*
  Return not allowed method
*/
router.delete('/user/confirm/email/:token', function(req, res) {
  res.setHeader('Allow', 'PUT, GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, GET'
  });
});

/*
  Confirm user's e-mail
*/
router.put('/user/confirm/email/:token', function(req, res) {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.confirmEmail(req.params.token)
  result.then((result : any)=>{
    res.status(result.status);
    res.send("");
  }); 
});

/*
  Export the User router
*/
module.exports = router;
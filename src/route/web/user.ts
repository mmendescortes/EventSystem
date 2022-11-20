/*
Import the user controller
*/
import {UserController} from '../../controller/user';

/*
  Import the View utility
*/
import {View} from '../../utils/view';

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
router.post('/signin', function(req : Request, res : Response) {
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
router.get('/signin', function(req : Request, res : Response) {
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
router.delete('/signin', function(req : Request, res : Response) {
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
router.put('/signin', function(req : Request, res : Response) {
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
router.post('/user', function(req : Request, res : Response) {
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
router.get('/user', function(req : Request, res : Response) {
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
router.delete('/user', function(req : Request, res : Response) {
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
router.put('/user', function(req : Request, res : Response) {
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
router.post('/user/:id', function(req : Request, res : Response) {
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
router.get('/user/:id', function(req : Request, res : Response) {
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
router.delete('/user/:id', function(req : Request, res : Response) {
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
router.put('/user/:id', function(req : Request, res : Response) {
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
router.post('/user/confirm/email/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
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
router.get('/user/confirm/email/:token', function(req : Request, res : Response) {
  let view : View = new View('web', 'confirmEmail');
  res.status(200);
  res.send(view.parse());
});

/*
  Return not allowed method
*/
router.delete('/user/confirm/email/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'GET'
  });
});

/*
  Confirm user's e-mail
*/
router.put('/user/confirm/email/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
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
router.post('/user/reset/password/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
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
router.get('/user/reset/password/:token', function(req : Request, res : Response) {
  res.status(200);
  res.send("");
});

/*
  Return not allowed method
*/
router.delete('/user/reset/password/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'GET'
  });
});

/*
  Reset user's password
*/
router.put('/user/reset/password/:token', function(req : Request, res : Response) {
  res.setHeader('Allow', 'GET')
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'GET'
  });
});

/*
  Send password reset link to user's e-mail
*/
router.post('/user/reset/password', function(req : Request, res : Response) {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.sendResetPasswordEmail(req.body.email);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/user/reset/password', function(req : Request, res : Response) {
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
router.delete('/user/reset/password', function(req : Request, res : Response) {
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
router.put('/user/reset/password', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'POST'
  });
});

/*
  Export the User router
*/
module.exports = router;
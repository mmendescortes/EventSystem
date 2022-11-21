/*
Import the user controller
*/
import {UserController} from '../../controller/user';

/*
    Import the Express library
*/
import express, {Request, Response, Router} from 'express';

/*
  Create a new router for User
*/
const router : Router = express.Router();

/*
  Create User
*/
router.post('/signin', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.signin();
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/signin', (req : Request, res : Response) => {
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
router.delete('/signin', (req : Request, res : Response) => {
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
router.put('/signin', (req : Request, res : Response) => {
  res.setHeader('Allow', 'POST');
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
router.post('/user', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.create();
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/user', (req : Request, res : Response) => {
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
router.delete('/user', (req : Request, res : Response) => {
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
router.put('/user', (req : Request, res : Response) => {
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
router.post('/user/:id', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT, DELETE, GET');
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
router.get('/user/:id', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.getById(req.params.id);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Delete User
*/
router.delete('/user/:id', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.delete(req.params.id);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Update User
*/
router.put('/user/:id', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.update(req.params.id, req.body);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });    
});

/*
  Return not allowed method
*/
router.post('/user/confirm/email/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
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
router.get('/user/confirm/email/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
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
router.delete('/user/confirm/email/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
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
router.put('/user/confirm/email/:token', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.confirmEmail(req.params.token);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  }); 
});

/*
  Return not allowed method
*/
router.post('/user/reset/password/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT'
  });
});

/*
  Return not allowed method
*/
router.get('/user/reset/password/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT'
  });
});

/*
  Return not allowed method
*/
router.delete('/user/reset/password/:token', (req : Request, res : Response) => {
  res.setHeader('Allow', 'PUT');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT'
  });
});

/*
  Reset user's password
*/
router.put('/user/reset/password/:token', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.resetPassword(req.params.token, req.body.password);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  }); 
});

/*
  Send password reset link to user's e-mail
*/
router.post('/user/reset/password', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController();
  let result : Promise<unknown> = userInstance.sendResetPasswordEmail(req.body.email);
  result.then((result : any) => {
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/user/reset/password', (req : Request, res : Response) => {
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
router.delete('/user/reset/password', (req : Request, res : Response) => {
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
router.put('/user/reset/password', (req : Request, res : Response) => {
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
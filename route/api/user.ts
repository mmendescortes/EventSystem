/*
Import the user controller
*/
import {UserController} from '../../controller/user';

/*
    Import the Express library
*/
const express = require('express');

/*
  Create a new router for User
*/
const router = express.Router();

/*
  Create User
*/
router.post('/signin', function(req, res) {
  userInstance = new UserController(req.body);
  result = userInstance.signin();
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/signin', function(req, res) {
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
router.delete('/signin', function(req, res) {
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
router.put('/signin', function(req, res) {
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
router.post('/user', function(req, res) {
  userInstance = new UserController(req.body);
  result = userInstance.create();
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/user', function(req, res) {
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
router.delete('/user', function(req, res) {
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
router.put('/user', function(req, res) {
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
router.post('/user/:id', function(req, res) {
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
router.get('/user/:id', function(req, res) {
  userInstance = new UserController();
  result = userInstance.getById(req.params.id);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Delete User
*/
router.delete('/user/:id', function(req, res) {
  userInstance = new UserController();
  result = userInstance.delete(req.params.id);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Update User
*/
router.put('/user/:id', function(req, res) {
  userInstance = new UserController();
  result = userInstance.update(req.params.id, req.body);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });    
});

/*
  Return not allowed method
*/
router.post('/user/confirm/email/:token', function(req, res) {
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
router.get('/user/confirm/email/:token', function(req, res) {
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
router.delete('/user/confirm/email/:token', function(req, res) {
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
router.put('/user/confirm/email/:token', function(req, res) {
  userInstance = new UserController();
  result = userInstance.confirmEmail(req.params.token);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  }); 
});

/*
  Return not allowed method
*/
router.post('/user/reset/password/:token', function(req, res) {
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
router.get('/user/reset/password/:token', function(req, res) {
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
router.delete('/user/reset/password/:token', function(req, res) {
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
router.put('/user/reset/password/:token', function(req, res) {
  userInstance = new UserController();
  result = userInstance.resetPassword(req.params.token, req.body.password);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  }); 
});

/*
  Send password reset link to user's e-mail
*/
router.post('/user/reset/password', function(req, res) {
  userInstance = new UserController();
  result = userInstance.sendResetPasswordEmail(req.body.email);
  result.then((result)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/user/reset/password', function(req, res) {
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
router.delete('/user/reset/password', function(req, res) {
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
router.put('/user/reset/password', function(req, res) {
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
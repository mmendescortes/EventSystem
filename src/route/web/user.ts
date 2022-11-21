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
  Import the JWT library
*/
import * as jwt from 'jsonwebtoken';

/*
  Create a new router for User
*/
const router : Router = express.Router();

/*
  Sign in to the application
*/
router.get('/signin', (req : Request, res : Response) => {
  let view : View = new View('web', 'signin');
  res.status(200);
  res.send(view.parse({
    status: 200,
    app: {
      email: process.env.APP_EMAIL
    }
  }));
});

/*
  Sign up to the application
*/
router.get('/signup', (req : Request, res : Response) => {
  let view : View = new View('web', 'signup');
  res.status(200);
  res.send(view.parse({
    status: 200,
    app: {
      email: process.env.APP_EMAIL
    }
  }));
});

/*
  Sign out of the application
*/
router.get('/signout', (req : Request, res : Response) => {
  req.session.destroy(() =>{
    res.redirect('/');
  });
});

/*
  Sign in to the application
*/
router.post('/signin', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.signin();
  result.then((result : any)=>{
    if(result.status === 200) {
      jwt.verify(result.response, process.env.USER_JWT_SECRET, (err : any, decoded : any) : void => {
        if (!err) {
          req.session.user=decoded;
        }
        res.status(302);
        res.redirect('/');
      });
    } else {
      let view : View = new View('web', 'signin');
      res.status(result.status);
      res.send(view.parse({
        status: result.status,
        app: {
          email: process.env.APP_EMAIL
        }
      }));
    }
  });
});

/*
  Sign up to the application
*/
router.post('/signup', (req : Request, res : Response) => {
  let userInstance : UserController = new UserController(req.body);
  let result : Promise<unknown> = userInstance.create();
  result.then((result : any)=>{
    let view : View = new View('web', 'accountCreated');
    res.status(result.status);
    res.send(view.parse({
      status: result.status,
      app: {
        email: process.env.APP_EMAIL
      }
    }));
  });
});

/*
  Confirm user email
*/
router.get('/user/confirm/email/:token', (req : Request, res : Response) => {
  let view : View = new View('web', 'confirmEmail');
  res.status(200);
  res.send(view.parse({
    app: {
      email: process.env.APP_EMAIL
    }
  }));
});

/*
  Export the User router
*/
module.exports = router;
/*
  Import the Express library
*/
import {Express} from 'express';

/*
  Import the Redis library
*/
let Redis = require('redis');

/*
  Import the Session library
*/
let Session = require("express-session")

/*
  Import the Store library
*/
let Store = require("connect-redis")(Session)

/*
  Import the Time utility
*/
import {Time} from '../utils/time';

export default ((app : Express) : void => {
    let client : any = Redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      legacyMode: true
    });
    client.on('error', (err : Error) : void => {
      console.error(
        `${Time.now()} - Redis connection error.`
      );
    });
    client.on('connect', (err : Error) : void => {
      console.info(
        `${Time.now()} - Redis connection success.`
      );
    });
    client.connect();
    app.use(Session({
      store: new Store({
        client: client
      }),
      secret: process.env.REDIS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
          secure: process.env.APP_PROTOCOL === 'https' ? true : false,
          httpOnly: true,
          maxAge: 86400000
      }
  }));
});
/*
  Import the Mongoose library
*/
import mongoose, {Mongoose, Connection} from 'mongoose';
    
/*
  Import the Time utility
*/
import {Time} from '../utils/time';

/*
  Export the Database utility
*/
export class Database {
  mongoose : Mongoose;
  connection : Connection;
  constructor() { 
    /*
      Assing the MongoDB connection string
    */
    // @ts-expect-error
    const connectionString : string = process.env.MONGODB_CONNECTION_STRING;
    
    /*
      Set the Mongoose connection
    */
    mongoose.connect(
      connectionString,
      {
        // @ts-expect-error
        useNewUrlParser: true
      }
    );
    
    /*
      Alias mongoose as this.mongoose
    */
    this.mongoose = mongoose;
    
    /*
      Alias mongoose.connection as this.connection
    */ 
    this.connection = mongoose.connection
    
    /*
      Log success on connection
    */
    this.connection.on(
      'connected',
      console.error.bind(
        console,
        `${Time.now()} - MongoDB connection success.`
      )
    );
    
    /*
      Log errors on connection
    */
    this.connection.on(
      'error',
      console.error.bind(
        console,
        `${Time.now()} - MongoDB connection error.`
      )
    );
    
    /*
      Log close calls on connection
    */
    this.connection.on(
      'close',
      console.error.bind(
        console,
        `${Time.now()} - MongoDB connection closed.`
      )
    );
  }
}
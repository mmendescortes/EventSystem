/*
  Import the Mongoose library
*/
const mongoose = require('mongoose');
    
/*
  Import the Time utility
*/
const Time = require('../utils/time');

/*
  Export the Database utility
*/
module.exports = class Database {
  constructor() { 
    /*
      Assing the MongoDB connection string
    */
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    
    /*
      Set the Mongoose connection
    */
    mongoose.connect(
      connectionString,
      {
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
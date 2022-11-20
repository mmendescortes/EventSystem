  /*
    Import the Express library
  */
  import {Express} from 'express';

  /*
    Init the Environment Variables module
  */
  import {default as Environment} from './environment';
  
  /*
    Init the Database module
  */
  import {default as Database} from './database';

  /*
    Init the Mail module
  */
  import {default as Mail} from './mail';
  
  /*
    Init the HTTP/HTTPS module
  */
  import {default as Library} from './library';
  
  /*
    Init the Body module
  */
  import {default as Body} from './body';
  
  /*
    Init the CORS module
  */
  import {default as CORS} from './cors';
  
  /*
    Init the Route module
  */
  import {default as Route} from './route';

export default (() : Express => {
  
  /*
    Init the HTTP/HTTPS module
  */
  const library : Express = Library();

  /*
    Init the Environment module
  */
  Environment();

  /*
    Init the Database module
  */
  Database();

  /*
    Init the Mail module
  */
  global.mail = Mail();
  
  /*
    Init the Body module
  */
  Body(library);
  
  /*
    Init the CORS module
  */
  CORS(library);
  
  /*
    Init the Route module
  */
  Route(library);

  return library;
});
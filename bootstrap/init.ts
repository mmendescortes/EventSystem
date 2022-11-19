  /*
    Init the Environment Variables module
  */
  import './environment';
  
  /*
    Init the Database module
  */
  import './database';

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

export default (() => {
  /*
    Init the Mail module
  */
  global.mail = Mail;
  
  /*
    Init the HTTP/HTTPS module
  */
  const library = Library;
  
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
})();
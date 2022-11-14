module.exports = (() => {
  
  /*
    Init the Environment Variables module
  */
  require('./environment');
  
  /*
    Init the Database module
  */
  require('./database');

  /*
    Init the Mail module
  */
  global.mail = require('./mail');
  
  /*
    Init the HTTP/HTTPS module
  */
  const library = require('./library');
  
  /*
    Init the Body module
  */
  require('./body')(library);
  
  /*
    Init the CORS module
  */
  require('./cors')(library);
  
  /*
    Init the Route module
  */
  require('./route')(library);

  return library;
})();
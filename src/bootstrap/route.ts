/*
  Import the File System utility
*/
import {FileSystem} from '../utils/filesystem';

/*
  Import the URL library
*/
import {parse as url} from 'url';

/*
  Import the Express library
*/
import {Express, Request, Response} from 'express';

/*
  Import the View utility
*/
import {View} from '../utils/view';

export default ((app : Express) : void => {
  /*
    Instantiate the FileSystem class to route/web
  */
  const web : FileSystem = new FileSystem('route/web');
  
  /*
    Instantiate the FileSystem class to route/api
  */
  const api : FileSystem = new FileSystem('route/api');
  
  /*
    Load default routes
  */
  app.get('/', (req : Request, res : Response) => {
    res.status(200);
    if(req.session.user) {
      let view : View = new View('web', 'dashboard');
      res.send(view.parse({
        user: req.session.user,
        app: {
          email: process.env.MAIL_TLS_CIPHERS
        }
      }));
    } else  {
      let view : View = new View('web', 'home');
      res.send(view.parse({
        app: {
          email: process.env.MAIL_TLS_CIPHERS
        }
      }));
    }
  })

  let api_routes = false
  let web_routes = false;

  /*
    Load route/web routes
  */
  web.dir((file : File) => {
    if(file.length){
      app.use(require(web.get() + '/' + file));
      web_routes = true;
    }
  });

  /*
    Load route/api routes
  */
  api.dir((file : File) => {
    if(file.length) {
      app.use(`/api/${process.env.API_VERSION}`, require(api.get() + '/' + file));
      api_routes = true;
    }
  });

  (function n() : void {
    if(api_routes && web_routes) {
      /*
        Handle 404 error on API
      */
      app.use((req : Request, res : Response) => {
        if(url(req.originalUrl).pathname?.includes(`/api/${process.env.API_VERSION}`)) {
          res.status(404);
          res.json({
            status: 404,
            message: 'Not Found'
          });
        } else {
          let view : View = new View('web', '404');
          res.status(404);
          res.send(view.parse({
            app: {
              email: process.env.MAIL_TLS_CIPHERS
            }
          }));
        }
      });
    } else {
      setTimeout(n, 1000);
    }
  })();
});
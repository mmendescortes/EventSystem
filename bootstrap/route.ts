/*
  Import the File System utility
*/
import {FileSystem} from '../utils/filesystem';

export default ((app) => {
  /*
    Instantiate the FileSystem class to route/web
  */
  const web = new FileSystem('../route/web');
  
  /*
    Instantiate the FileSystem class to route/api
  */
  const api = new FileSystem('../route/api');
  
  /*
    Load route/web routes
  */
  web.dir((file) => {
    if(file.length){
      app.use(require(web.get() + "/" + file));
    }
    
  });

  /*
    Load route/api routes
  */
  api.dir((file) => {
    if(file.length) {
      app.use(`/api/${process.env.API_VERSION}`, require(api.get() + "/" + file));
    }
  });
});

//
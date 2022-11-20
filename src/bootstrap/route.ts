/*
  Import the File System utility
*/
import {FileSystem} from '../utils/filesystem';

/*
  Import the Express library
*/
import {Express} from 'express';

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
    Load route/web routes
  */
  web.dir((file : File) => {
    if(file.length){
      app.use(require(web.get() + "/" + file));
    }
    
  });

  /*
    Load route/api routes
  */
  api.dir((file : File) => {
    if(file.length) {
      app.use(`/api/${process.env.API_VERSION}`, require(api.get() + "/" + file));
    }
  });
});

//
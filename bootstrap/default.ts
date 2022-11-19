/*
    Create the Framework defaults
*/

interface Default {
  modelDefault : string;
  routeDefault : string;
  serviceDefault : string;
  controllerDefault : string;
}

const sample : Default = {
    modelDefault: `/*
    Import the Mongoose library
*/
import mongoose, {Schema, Document} from 'mongoose';

/*
  Import the Time utility
*/
import {Time} from '../utils/time';

/*
  Import the History model
*/
import {History} from '../model/history';

/*
  Create the MODEL__NAME_CAPITALIZED schema
*/
const schema : Schema = new mongoose.Schema({
  // Your schema goes here
}, {
  versionKey: 'version_key',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});
  
/*
  Add the change to history after updating
*/
schema.post('findOneAndUpdate', function(model) {
  let modifiedFields : any = this.getUpdate().$set;
  delete modifiedFields.updated_at;
  Object.keys(modifiedFields).forEach((field) => {
    const history : Document = new History({
      collection_name: 'MODEL__NAME_CAPITALIZED',
      collection_field: field,
      old_value: model[field],
      new_value: modifiedFields[field],
      object_id: model["_id"]
    });
    history.save((err) => {
      if (err) {
        console.error(
          \`\${Time.now()} - History creation error: \`
          +
          err
        );
      }
    });
  })
});

/*
  Export the MODEL__NAME_CAPITALIZED model
*/
export default mongoose.model('MODEL__NAME_CAPITALIZED', schema);`,
    routeDefault: `/*
Import the MODEL_NAME controller
*/
import {MODEL__NAME_CAPITALIZEDController} from '../../controller/MODEL_NAME';

/*
    Import the Express library
*/
import express, {Request, Response, Router} from 'express';

/*
  Create a new router for MODEL__NAME_CAPITALIZED
*/
const router : Router = express.Router();

/*
  Create MODEL__NAME_CAPITALIZED
*/
router.post('/ENDPOINT_NAME', function(req : Request, res : Response) {
  let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDController = new MODEL__NAME_CAPITALIZEDController(req.body);
  let result : Promise<unknown> = MODEL_NAMEInstance.create();
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Return not allowed method
*/
router.get('/ENDPOINT_NAME', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'POST'
  });  
});

/*
  Return not allowed method
*/
router.delete('/ENDPOINT_NAME', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
    res.status(405);
    res.json({
      "status": 405,
      "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
    });  
});

/*
  Return not allowed method
*/
router.put('/ENDPOINT_NAME', function(req : Request, res : Response) {
  res.setHeader('Allow', 'POST');
    res.status(405);
    res.json({
        "status": 405,
        "message": 'Unsuported method used!',
        "allowedMethods": 'POST'
  });       
});

/*
  Return not allowed method
*/
router.post('/ENDPOINT_NAME/:id', function(req : Request, res : Response) {
  res.setHeader('Allow', 'PUT, DELETE, GET');
  res.status(405);
  res.json({
      "status": 405,
      "message": 'Unsuported method used!',
      "allowedMethods": 'PUT, DELETE, GET'
  });
});

/*
  List MODEL__NAME_CAPITALIZED
*/
router.get('/ENDPOINT_NAME/:id', function(req : Request, res : Response) {
  let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDController = new MODEL__NAME_CAPITALIZEDController();
  let result : Promise<unknown> = MODEL_NAMEInstance.getById(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Delete MODEL__NAME_CAPITALIZED
*/
router.delete('/ENDPOINT_NAME/:id', function(req : Request, res : Response) {
  let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDController = new MODEL__NAME_CAPITALIZEDController();
  let result : Promise<unknown> = MODEL_NAMEInstance.delete(req.params.id);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });
});

/*
  Update MODEL__NAME_CAPITALIZED
*/
router.put('/ENDPOINT_NAME/:id', function(req : Request, res : Response) {
  let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDController = new MODEL__NAME_CAPITALIZEDController();
  let result : Promise<unknown> = MODEL_NAMEInstance.update(req.params.id, req.body);
  result.then((result : any)=>{
    res.status(result.status);
    res.json(result.response);
  });    
});

/*
  Export the MODEL__NAME_CAPITALIZED router
*/
module.exports = router;`,
    serviceDefault: `/*
    Import the MODEL_NAME model
*/
import {default as MODEL__NAME_CAPITALIZED} from '../model/MODEL_NAME';

/*
  Import the Mongoose library
*/
import {Document} from 'mongoose';

/*
  Import the Time utility
*/
import {Time} from '../utils/time';

/*
  Import the ObjectId type from Mongoose library
*/
import {ObjectId} from 'bson';

/*
  Export the MODEL__NAME_CAPITALIZED class
*/
export class MODEL__NAME_CAPITALIZEDService {
  MODEL_NAME : any;
  constructor(MODEL_NAME : any = null) {
    /*
      Set the MODEL_NAME as this.MODEL_NAME
    */
    this.MODEL_NAME = MODEL_NAME;
  }

  /*
    Return an item from MODEL__NAME_CAPITALIZED by given id
  */
  getById(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      MODEL__NAME_CAPITALIZED.findOne(
        {
          '_id': new ObjectId(id)
        },
        (err : any, result : any) => {
          if (err) {
            console.error(
              \`\${Time.now()} - MODEL_NAME get error: \`
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'MODEL_NAME get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'MODEL_NAME get error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': result
          });
        }
      );
    });
  }

  /*
    Create an item from MODEL__NAME_CAPITALIZED by the MODEL_NAME passed on the constructor
  */
  create() : Promise<unknown> {
    let MODEL_NAME : Document = new MODEL__NAME_CAPITALIZED(this.MODEL_NAME);
    return new Promise((res : any) => {
      MODEL_NAME.save((err : any) => {
        if (err) {
          if (err.code === 11000) {
            res({
              'status': 409,
              'response': {
                'error': 'MODEL_NAME already exists.'
              }
            });
          }
          console.error(
            \`\${Time.now()} - MODEL_NAME creation error: \`
            +
            err
          );
          if(err instanceof TypeError) {
            res({
              'status': 400,
              'response': {
                'error': 'MODEL_NAME creation error.'
              }
            });
          } else {
            res({
              'status': 500,
              'response': {
                'error': 'MODEL_NAME creation error.'
              }
            });
          }
        }
        res({
          'status': 201,
          'response': {
            'message': 'MODEL_NAME creation completed.'
          }
        });
      });
    });
  }

  /*
    Update an item from MODEL_NAME by the MODEL_NAME passed on the constructor
  */
  update(id : string, fields : any) : Promise<unknown> {
    return new Promise((res : any) => {
      MODEL__NAME_CAPITALIZED.findOneAndUpdate(
        {
          '_id': new ObjectId(id)
        },
        fields,
        {},
        (err : any) => {
          if (err) {
            console.error(
              \`\${Time.now()} - MODEL_NAME update error: \`
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'MODEL_NAME update error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'MODEL_NAME update error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'MODEL_NAME update completed.'
            }
          });
        }
      );
    });
  }

  /*
    Delete an item from MODEL_NAME by the MODEL_NAME passed on the constructor
  */
  delete(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      MODEL__NAME_CAPITALIZED.findOneAndDelete(
        {
          '_id': new ObjectId(id)
        },
        {},
        (err : any) => {
          if (err) {
            console.error(
              \`\${Time.now()} - MODEL_NAME delete error: \`
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'MODEL_NAME delete error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'MODEL_NAME delete error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'MODEL_NAME delete completed.'
            }
          });
        }
      );
    });
  }
}`,
    controllerDefault: `/*
Import the MODEL_NAME service
*/
import {MODEL__NAME_CAPITALIZEDService} from '../service/MODEL_NAME';

/*
Import the Time utility
*/
import {Time} from '../utils/time';

/*
Export the MODEL__NAME_CAPITALIZEDController class
*/
export class MODEL__NAME_CAPITALIZEDController {
    MODEL_NAME : any;
    constructor(MODEL_NAME = null) {
      /*
      Set the MODEL_NAME as this.MODEL_NAME
      */
      this.MODEL_NAME = MODEL_NAME;
    }

    /*
    Return an item from MODEL_NAME by given id
    */
    getById(id : string) : Promise<unknown> {
        let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDService = new MODEL__NAME_CAPITALIZEDService();
        let result : Promise<unknown> = MODEL_NAMEInstance.getById(id);
        return result;
    }

    /*
    Create an item from MODEL_NAME by the MODEL_NAME passed on the constructor
    */
    create() : Promise<unknown> {
        let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDController = new MODEL__NAME_CAPITALIZEDService(this.MODEL_NAME);
        let result : Promise<unknown> = MODEL_NAMEInstance.create();
        return result;
    }

    /*
    Update an item from MODEL_NAME by the MODEL_NAME passed on the constructor
    */
    update(id : string, fields : object) : Promise<unknown> {
        let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDService = new MODEL__NAME_CAPITALIZEDService();
        let result : Promise<unknown> = MODEL_NAMEInstance.update(id, fields);
        return result;
    }

    /*
    Delete an item from MODEL_NAME by the MODEL_NAME passed on the constructor
    */
    delete(id : string) : Promise<unknown> {
        let MODEL_NAMEInstance : MODEL__NAME_CAPITALIZEDService = new MODEL__NAME_CAPITALIZEDService();
        let result : Promise<unknown> = MODEL_NAMEInstance.delete(id);
        return result;
    }
}`
}

export default sample;
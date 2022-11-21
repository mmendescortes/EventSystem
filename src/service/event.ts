/*
    Import the event model
*/
import {default as Event} from '../model/event';

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
  Export the Event class
*/
export class EventService {
  event : any;
  constructor(event : any = null) {
    /*
      Set the event as this.event
    */
    this.event = event;
  }

  /*
    Return an item from Event by given id
  */
  getById(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      Event.findOne(
        {
          '_id': new ObjectId(id)
        },
        (err : any, result : any) => {
          if (err) {
            console.error(
              `${Time.now()} - event get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'event get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'event get error.'
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
    Return all itens from Event
  */
  getAll() : Promise<unknown> {
    return new Promise((res : any) => {
      Event.find(
        {},
        (err : any, result : any) => {
          if (err) {
            console.error(
              `${Time.now()} - event get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'event get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'event get error.'
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
    Create an item from Event by the event passed on the constructor
  */
  create() : Promise<unknown> {
    let date : string = this.event.date.split("/");
    this.event.date = new Date(date[2] + '/' + date[1] + '/' + date[0]);
    let event : Document = new Event(this.event);
    return new Promise((res : any) => {
      event.save((err : any) => {
        if (err) {
          if (err.code === 11000) {
            res({
              'status': 409,
              'response': {
                'error': 'event already exists.'
              }
            });
          }
          console.error(
            `${Time.now()} - event creation error: `
            +
            err
          );
          if(err instanceof TypeError) {
            res({
              'status': 400,
              'response': {
                'error': 'event creation error.'
              }
            });
          } else {
            res({
              'status': 500,
              'response': {
                'error': 'event creation error.'
              }
            });
          }
        }
        res({
          'status': 201,
          'response': {
            'message': 'event creation completed.'
          }
        });
      });
    });
  }

  /*
    Update an item from event by the event passed on the constructor
  */
  update(id : string, fields : any) : Promise<unknown> {
    if(fields.date) {
      let date : string = fields.date.split("/");
      fields.date = new Date(date[2] + '/' + date[1] + '/' + date[0]);
    }
    return new Promise((res : any) => {
      Event.findOneAndUpdate(
        {
          '_id': new ObjectId(id)
        },
        fields,
        {},
        (err : any) => {
          if (err) {
            console.error(
              `${Time.now()} - event update error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'event update error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'event update error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'event update completed.'
            }
          });
        }
      );
    });
  }

  /*
    Delete an item from event by the event passed on the constructor
  */
  delete(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      Event.findOneAndDelete(
        {
          '_id': new ObjectId(id)
        },
        {},
        (err : any) => {
          if (err) {
            console.error(
              `${Time.now()} - event delete error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'event delete error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'event delete error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'event delete completed.'
            }
          });
        }
      );
    });
  }
}
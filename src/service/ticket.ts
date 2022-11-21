/*
    Import the ticket model
*/
import {default as Ticket} from '../model/ticket';

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
  Export the Ticket class
*/
export class TicketService {
  ticket : any;
  constructor(ticket : any = null) {
    /*
      Set the ticket as this.ticket
    */
    this.ticket = ticket;
  }

  /*
    Return an item from Ticket by given id
  */
  getById(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      Ticket.findOne(
        {
          '_id': new ObjectId(id)
        },
        (err : any, result : any) => {
          if (err) {
            console.error(
              `${Time.now()} - ticket get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'ticket get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'ticket get error.'
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
    Return all itens from Ticket
  */
  getAll(event : string) : Promise<unknown> {
    return new Promise((res : any) => {
      Ticket.find(
        {
          event: event
        },
        (err : any, result : any) => {
          if (err) {
            console.error(
              `${Time.now()} - ticket get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'ticket get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'ticket get error.'
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
    Create an item from Ticket by the ticket passed on the constructor
  */
  create() : Promise<unknown> {
    let ticket : Document = new Ticket(this.ticket);
    return new Promise((res : any) => {
      ticket.save((err : any) => {
        if (err) {
          if (err.code === 11000) {
            res({
              'status': 409,
              'response': {
                'error': 'ticket already exists.'
              }
            });
          }
          console.error(
            `${Time.now()} - ticket creation error: `
            +
            err
          );
          if(err instanceof TypeError) {
            res({
              'status': 400,
              'response': {
                'error': 'ticket creation error.'
              }
            });
          } else {
            res({
              'status': 500,
              'response': {
                'error': 'ticket creation error.'
              }
            });
          }
        }
        res({
          'status': 201,
          'response': {
            'message': 'ticket creation completed.'
          }
        });
      });
    });
  }

  /*
    Update an item from ticket by the ticket passed on the constructor
  */
  update(id : string, fields : any) : Promise<unknown> {
    return new Promise((res : any) => {
      Ticket.findOneAndUpdate(
        {
          '_id': new ObjectId(id)
        },
        fields,
        {},
        (err : any) => {
          if (err) {
            console.error(
              `${Time.now()} - ticket update error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'ticket update error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'ticket update error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'ticket update completed.'
            }
          });
        }
      );
    });
  }

  /*
    Delete an item from ticket by the ticket passed on the constructor
  */
  delete(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      Ticket.findOneAndDelete(
        {
          '_id': new ObjectId(id)
        },
        {},
        (err : any) => {
          if (err) {
            console.error(
              `${Time.now()} - ticket delete error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'ticket delete error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'ticket delete error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'ticket delete completed.'
            }
          });
        }
      );
    });
  }
}
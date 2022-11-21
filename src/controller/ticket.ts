/*
Import the ticket service
*/
import {TicketService} from '../service/ticket';

/*
Import the Time utility
*/
import {Time} from '../utils/time';

/*
Export the TicketController class
*/
export class TicketController {
    ticket : any;
    constructor(ticket = null) {
      /*
      Set the ticket as this.ticket
      */
      this.ticket = ticket;
    }

    /*
    Return an item from ticket by given id
    */
    getById(id : string) : Promise<unknown> {
        let ticketInstance : TicketService = new TicketService();
        let result : Promise<unknown> = ticketInstance.getById(id);
        return result;
    }

    /*
    Return all items from ticket
    */
    getAll(event : string) : Promise<unknown> {
        let ticketInstance : TicketService = new TicketService();
        let result : Promise<unknown> = ticketInstance.getAll(event);
        return result;
    }

    /*
    Create an item from ticket by the ticket passed on the constructor
    */
    create() : Promise<unknown> {
        let ticketInstance : TicketController = new TicketService(this.ticket);
        let result : Promise<unknown> = ticketInstance.create();
        return result;
    }

    /*
    Update an item from ticket by the ticket passed on the constructor
    */
    update(id : string, fields : object) : Promise<unknown> {
        let ticketInstance : TicketService = new TicketService();
        let result : Promise<unknown> = ticketInstance.update(id, fields);
        return result;
    }

    /*
    Delete an item from ticket by the ticket passed on the constructor
    */
    delete(id : string) : Promise<unknown> {
        let ticketInstance : TicketService = new TicketService();
        let result : Promise<unknown> = ticketInstance.delete(id);
        return result;
    }
}
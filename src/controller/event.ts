/*
Import the event service
*/
import {EventService} from '../service/event';

/*
Import the Time utility
*/
import {Time} from '../utils/time';

/*
Export the EventController class
*/
export class EventController {
    event : any;
    constructor(event = null) {
      /*
      Set the event as this.event
      */
      this.event = event;
    }

    /*
    Return an item from event by given id
    */
    getById(id : string) : Promise<unknown> {
        let eventInstance : EventService = new EventService();
        let result : Promise<unknown> = eventInstance.getById(id);
        return result;
    }

    /*
    Return all items from event
    */
    getAll() : Promise<unknown> {
        let eventInstance : EventService = new EventService();
        let result : Promise<unknown> = eventInstance.getAll();
        return result;
    }

    /*
    Create an item from event by the event passed on the constructor
    */
    create() : Promise<unknown> {
        let eventInstance : EventController = new EventService(this.event);
        let result : Promise<unknown> = eventInstance.create();
        return result;
    }

    /*
    Update an item from event by the event passed on the constructor
    */
    update(id : string, fields : object) : Promise<unknown> {
        let eventInstance : EventService = new EventService();
        let result : Promise<unknown> = eventInstance.update(id, fields);
        return result;
    }

    /*
    Delete an item from event by the event passed on the constructor
    */
    delete(id : string) : Promise<unknown> {
        let eventInstance : EventService = new EventService();
        let result : Promise<unknown> = eventInstance.delete(id);
        return result;
    }
}
/*
  Export the Time utility
*/
export class Time {
  date : any;
  constructor(date : any = null) {
    /*
      Set the date as this.date
    */
    this.date = date || new Date();
  }

  /*
    Return the current date
  */
  static now() : Date {
    return new Date();
  }

  /*
    Return date set in class instance
  */
  get() : any {
    return this.date;
  }
}
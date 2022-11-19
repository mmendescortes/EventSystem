/*
  Export the Time utility
*/
export class Time {
  constructor(date = null) {
    /*
      Set the date as this.date
    */
    this.date = date || new Date();
  }

  /*
    Return the current date
  */
  static now() {
    return new Date();
  }

  /*
    Return date set in class instance
  */
  get() {
    return this.date;
  }
}
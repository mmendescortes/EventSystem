/*
  Import the Pug library
*/
import * as engine from 'pug';

/*
  Import the Path library
*/
const path = require('path');

/*
  Export the View utility
*/
export class View {
  template: string;
  constructor(type : string, template : string) {
    this.template = path.join(__dirname, '../view', type, template + '.pug');
  }

  /*
    Send new message from Mail instance
  */
  parse(data : string) {
    const view : engine = engine.compileFile(this.template);
    return view(data);
  }
}
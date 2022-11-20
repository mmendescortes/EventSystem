/*
  Import the Pug library
*/
import {compileTemplate, compileFile, LocalsObject} from 'pug';

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
  parse(data : LocalsObject = {}) : string{
    const view : compileTemplate = compileFile(this.template);
    return view(data);
  }
}
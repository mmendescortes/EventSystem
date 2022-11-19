/*
  Import the Pug library
*/
import {pug as engine} from 'pug';

/*
  Import the Path library
*/
import {path} from 'path';

/*
  Export the View utility
*/
export class View {
  constructor(type, template) {
    this.template = path.join(__dirname, '../view', type, template + '.pug');
  }

  /*
    Send new message from Mail instance
  */
  parse(data) {
    const view = engine.compileFile(this.template);
    return view(data);
  }
}
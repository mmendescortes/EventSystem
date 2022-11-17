/*
  Import the Pug library
*/
var engine = require('pug');

/*
  Import the Path library
*/
const path = require('path');

/*
  Export the View utility
*/
module.exports = class View {
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
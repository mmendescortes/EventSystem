/*
  Export the CLI Arguments utility
*/
module.exports = class Arguments {
  /*
    Return the cli arguments
  */
  static get() {
    process.argv.shift();
    process.argv.shift();
    return process.argv;
  }
}
/*
  Export the CLI Arguments utility
*/
export class Arguments {
  /*
    Return the cli arguments
  */
  static get() {
    process.argv.shift();
    process.argv.shift();
    return process.argv;
  }
}
/*
  Export the CLI Arguments utility
*/
export class Arguments {
  /*
    Return the cli arguments
  */
  static get() : Array<string> {
    process.argv.shift();
    process.argv.shift();
    return process.argv;
  }
}
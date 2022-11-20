/*
  Export the String utility
*/
export class String {
  /*
    Return a capitalized version of given string
  */
  static capitalize(str : string, lower : boolean = false) : string {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  } 
}
/*
  Export the String utility
*/
module.exports = class String {
  /*
    Return a capitalized version of given string
  */
  static capitalize(str, lower = false) {
    return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
  } 
}
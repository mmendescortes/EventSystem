/*
  Import the Dotenv library
*/
import {config, DotenvConfigOutput} from "dotenv";

export default (() : DotenvConfigOutput => {
  return config();
});
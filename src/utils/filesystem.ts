/*
  Import the File System library
*/
const fs = require('fs');

/*
  Import the Path library
*/
const path = require('path');

/*
  Export the File System utility
*/
export class FileSystem {
  path : string;
  constructor(dir : string) {
    /*
      Set the date as this.date
    */
    this.path = path.join(__dirname, '..', dir);
  }

  /*
    List files in a given directory
  */
  dir(callback : Function) : void {
    fs.readdir(this.path, function (err : Error, files : Array<string>) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        if(!files.length) callback("");
        files.filter(file=>!file.match(/\.map/)).forEach(file=>callback(file));
    });
  }

  read(path : string) : any {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch(err : any) {
      if (err) return err;
    }
  }
  /*
    Create file with given name and content
  */
  create(name : string, content : string, message : string = 'File was created successfully!') : void {
    fs.writeFile(this.path + '/' + name, content, function (err : string, data : string) {
      if (err) {
        return console.error(err);
      }
      console.info(message);
    });
  }

  /*
    Return date set in class instance
  */
  get() : string {
    return this.path;
  }
}
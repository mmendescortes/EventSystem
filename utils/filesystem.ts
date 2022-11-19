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
  constructor(dir) {
    /*
      Set the date as this.date
    */
    this.path = path.join(__dirname, dir);
  }

  /*
    List files in a given directory
  */
  dir(callback) {
    fs.readdir(this.path, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        if(!files.length) callback("");
        files.filter(file=>!file.match(/\.map/)).forEach(file=>callback(file));
    });
  }

  read(path) {
    try {
      return fs.readFileSync(path, 'utf8');
    } catch(err) {
      if (err) return err;
    }
  }
  /*
    Create file with given name and content
  */
  create(name, content, message = 'File was created successfully!') {
    fs.writeFile(this.path + '/' + name, content, function (err,data) {
      if (err) {
        return console.error(err);
      }
      console.info(message);
    });
  }

  /*
    Return date set in class instance
  */
  get() {
    return this.path;
  }
}
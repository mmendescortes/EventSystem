/*
  Import the File System library
*/
const fs = require('fs');

/*
  Import the UUID library
*/
import {v4} from 'uuid';

/*
  Import the Multer library
*/
import multer, {StorageEngine} from 'multer';

/*
  Import the Express library
*/
import {Request} from 'express';

export class Upload {
    upload : any;
    storage : StorageEngine;
    filter : (req : Request, file : any, cb : Function) => void;
    limits : { fileSize: number; };
    constructor(dataFolder : string = 'uploads', allowedExtensions : Array<string> = [], maxFileSize : number = 200) {
        this.upload = multer;
        this.storage = this.upload.diskStorage({
            destination: function(req : Request, file : any, cb : Function) : void {
                let path : string = dataFolder + '/' + v4() + '/' + v4() + '/';
                fs.mkdirSync(path, {
                    recursive: true
                })
                cb(null, path);
            },
            filename: function(req : Request, file : any, cb : Function) : void {
                cb(null, v4() + file.originalname.match(/\.[0-9A-z]+$/g)[0]);
            }
        })
        this.filter = function(req : Request, file : any, cb : Function) : void {
            let fileExtension = file.originalname.match(/\.[0-9A-z]+$/g)[0];
            if (!allowedExtensions.includes(fileExtension)) {
                // @ts-expect-error
                req.fileValidationError = true;
                // @ts-expect-error
                return cb(null, false, req.fileValidationError);
            }
            cb(null, true);
        }
        this.limits = {
            fileSize: 1048576 * maxFileSize
        }
    }
    action(name : string = 'file', quantity : number = 200) : Array<string> {
        return this.upload({
            storage: this.storage,
            fileFilter: this.filter,
            limits: this.limits
        }).array(name, quantity);
    }
}
import {fs} from 'fs';
import {v4} from 'uuid';
import {multer} from 'multer';
export class upload {
    constructor(dataFolder = 'uploads', allowedExtensions = '', maxFileSize = 200) {
        this.upload = multer;
        this.storage = this.upload.diskStorage({
            destination: function(req, file, cb) {
                let path = dataFolder + '/' + v4() + '/' + v4() + '/';
                fs.mkdirSync(path, {
                    recursive: true
                })
                cb(null, path);
            },
            filename: function(req, file, cb) {
                cb(null, v4() + file.originalname.match(/\.[0-9A-z]+$/g)[0]);
            }
        })
        this.filter = function(req, file, callback) {
            let fileExtension = file.originalname.match(/\.[0-9A-z]+$/g)[0];
            if (!allowedExtensions.includes(fileExtension)) {
                req.fileValidationError = true;
                return callback(null, false, req.fileValidationError);
            }
            callback(null, true);
        }
        this.limits = {
            fileSize: 1048576 * maxFileSize
        }
    }
    action(name = 'file', quantity = 200) {
        return this.upload({
            storage: this.storage,
            fileFilter: this.filter,
            limits: this.limits
        }).array(name, quantity)
    }
}
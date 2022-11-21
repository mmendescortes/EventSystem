/*
  Import the Mongoose library
*/
import mongoose, {Schema, Document} from 'mongoose';

/*
  Import the Bcrypt library
*/
import bcrypt from 'bcryptjs';

/*
  Import the Time utility
*/
import {Time} from '../utils/time';

/*
  Import the History model
*/
import {default as History} from '../model/history';

/*
  Import the UUID library
*/
import {v4} from 'uuid';

/*
  Import the View utility
*/
import {View} from '../utils/view';

/*
  Create the User schema
*/
const schema : Schema = new mongoose.Schema({
  // @ts-expect-error
  name: {
    type: String,
  },
  // @ts-expect-error
  username: {
    type: String,
  },
  // @ts-expect-error
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.',
    match: [
      /^.+@(?:[\w-]+\.)+\w+$/,
      'Please fill a valid email address.'
    ],
  },
  // @ts-expect-error
  password: {
    type: String,
    required: 'Password is required.'
  },
  // @ts-expect-error
  email_confirmation_token: {
    type: String
  },
  // @ts-expect-error
  email_confirmed: {
    type: Boolean,
    default: false
  },
  // @ts-expect-error
  password_reset_token: {
    type: String
  },
  // @ts-expect-error
  role: {
    type: String,
    enum: ['admin', 'staff', 'user'],
    default: 'user'
  }
}, {
  versionKey: 'version_key',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

/*
  Modify the User model before saving
*/
schema.pre(/^(updateOne|findOneAndUpdate)/, function(next : any) {
  let isModifiedEmail : boolean;
  let isModifiedPassword : boolean;
  try {
    // @ts-expect-error
    isModifiedPassword = this.isModified("password");
    // @ts-expect-error
    isModifiedEmail = this.isModified("email");
  } catch (err) {
    if (err) {
      // @ts-expect-error
      isModifiedPassword = !!this._update.password;
      // @ts-expect-error
      this.password = this._update.password;
      // @ts-expect-error
      isModifiedEmail = !!this._update.email;
      // @ts-expect-error
      this.email = this._update.email;
    }
  }
  // @ts-expect-error
  if (isModifiedEmail) {
    // @ts-expect-error
    this.email_confirmed = false;
    // @ts-expect-error
    this.email_confirmation_token = v4();
    let view : View = new View('email', 'confirmEmailLink');
    global.mail.sendMessage(
      process.env.MAIL_USER,
      // @ts-expect-error
      this.email,
      "Confirm your e-mail!",
      view.parse({
        // @ts-expect-error
        user: this.email,
        app: {
          protocol: process.env.APP_PROTOCOL,
          host: process.env.APP_HOST,
          port: process.env.APP_PORT,
          email: process.env.APP_EMAIL,
        }
      }),
      (err : Error) => {
        if(err){
          console.error(
            `${Time.now()} - email confirmation link error: `
            +
            err
          );
        }
      }
    )
  }
  // @ts-expect-error
  if (!isModifiedPassword) return next();
  bcrypt.genSalt(
    // The Number() is meant to work with repl.it
    Number(process.env.SALT_WORK_FACTOR),
    (err : any, salt : any) => {
      if (err) return next(err);
      bcrypt.hash(
        // @ts-expect-error
        this.password,
        salt,
        (err : any, hash : string) => {
          if (err) return next(err);
          try {
            // @ts-expect-error
            this._update.password = hash;
          } catch (err) {
            // @ts-expect-error
            if (err) this.password = hash;
          }
          next();
        }
      );
    }
  );
});

schema.pre('save', function(next : any) {
  bcrypt.genSalt(
    // The Number() is meant to work with repl.it
    Number(process.env.SALT_WORK_FACTOR),
    (err : any, salt : any) => {
      if (err) return next(err);
      bcrypt.hash(
        this.password,
        salt,
        (err : any, hash : string) => {
          if (err) return next(err);
          try {
            this._update.password = hash;
          } catch (err) {
            if (err) this.password = hash;
          }
          next();
        }
      );
    }
  );
});

/*
  Add the change to history after updating
*/
schema.post('findOneAndUpdate', function(model : any) {
  // @ts-expect-error
  const modifiedFields : any = this.getUpdate().$set;
  delete modifiedFields.updated_at;
  Object.keys(modifiedFields).forEach((field) => {
    const history : Document = new History({
      collection_name: "users",
      collection_field: field,
      old_value: model[field],
      new_value: modifiedFields[field],
      object_id: model["_id"]
    });
    history.save((err : any) => {
      if (err) {
        console.error(
          `${Time.now()} - History creation error: `
          +
          err
        );
      }
    });
  })
});

/*
  Compare password to the hash existent on database
*/
schema.methods.comparePassword = function(password : string, callback : Function) {
  bcrypt.compare(
    password,
    this.password,
    (err : any, match : any) => {
      if (err) return callback(err);
      callback(null, match);
    }
  );
};

/*
  Export the User model
*/
export default mongoose.model('User', schema);
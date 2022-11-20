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
  Create the User schema
*/
const schema : Schema = new mongoose.Schema({
  // @ts-expect-error
  username: {
    type: String,
    required: 'Username is required.',
    maxLength: 100
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
    maxLength: 191
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
schema.pre(/^(updateOne|save|findOneAndUpdate)/, function(next) {
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
  }
  // @ts-expect-error
  if (!isModifiedPassword) return next();
  bcrypt.genSalt(
    // The Number() is meant to work with repl.it
    Number(process.env.SALT_WORK_FACTOR),
    (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(
        // @ts-expect-error
        this.password,
        salt,
        (err, hash) => {
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

/*
  Add the change to history after updating
*/
schema.post('findOneAndUpdate', function(model) {
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
    history.save((err) => {
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
    (err, match) => {
      if (err) return callback(err);
      callback(null, match);
    }
  );
};

/*
  Export the User model
*/
export default mongoose.model('User', schema);
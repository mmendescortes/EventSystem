/*
    Import the user model
*/
const User = require('../model/user');

/*
  Import the Time utility
*/
const Time = require('../utils/time');

/*
  Import the ObjectId type from Mongoose library
*/
const ObjectId = require('mongoose').Types.ObjectId;

/*
  Export the User class
*/
module.exports = class UserService {
  constructor(user = null) {
    /*
      Set the user as this.user
    */
    this.user = user;
  }

  /*
    Return an item from User by given id
  */
  signin() {
    return new Promise((res) => {
      let user = this.user
      User.findOne(
        {
          'username': user.username
        },
        (err, result) => {
          if (err) {
            console.error(
              `${Time.now()} - user get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user get error.'
                }
              });
            }
          }
          if(result) {
            result.comparePassword(user.password, (err, r)=>{
              if(err) {
                console.error(
                  `${Time.now()} - user match error: `
                  +
                  err
                );
                res({
                  'status': 500,
                  'response': {
                    'error': 'user match error.'
                  }
                });
              }
              if(!r) {
                res({
                  'status': 403,
                  'response': {
                    'error': "username or password don't match!"
                  }
                });
              }
              res({
                'status': 200,
                'response': result
              });
            });
          } else {
            res({
              'status': 403,
              'response': {
              'error': "username or password don't match!"
              }
            });
          }
        }
      );
    });
  }

  /*
    Return an item from User by given id
  */
  getById(id) {
    return new Promise((res) => {
      User.findOne(
        {
          '_id': new ObjectId(id)
        },
        (err, result) => {
          if (err) {
            console.error(
              `${Time.now()} - user get error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user get error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user get error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': result
          });
        }
      );
    });
  }

  /*
    Create an item from User by the user passed on the constructor
  */
  create() {
    this.user.email_confirmation_token = require('uuid').v4();
    let user = new User(this.user);
    return new Promise((res) => {
      user.save((err) => {
        if (err) {
          if (err.code === 11000) {
            res({
              'status': 409,
              'response': {
                'error': 'user already exists.'
              }
            });
          }
          console.error(
            `${Time.now()} - user creation error: `
            +
            err
          );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user creation error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user creation error.'
                }
              });
            }
        }
        global.mail.sendMessage(
          process.env.MAIL_USER,
          this.user.email,
          "Confirm your e-mail!",
          "Hi, "+this.user.username+"!<br/><br/>Please click <a href='"+process.env.APP_PROTOCOL+"://"+process.env.APP_HOST+":"+process.env.APP_PORT+"/user/confirm/email/"+this.user.email_confirmation_token+"'>here</a> to confirm your e-mail.",
          (err) => {
            if(err){
              res({
                'status': 500,
                'response': {
                  'error': 'user creation error. '+err
                }
              });
            }
            res({
              'status': 201,
              'response': {
                'message': 'user creation completed.'
              }
            });
          }
        )
      });
    });
  }

  /*
    Update an item from user by the user passed on the constructor
  */
  update(id, fields) {
    return new Promise((res) => {
      User.findOneAndUpdate(
        {
          '_id': new ObjectId(id)
        },
        fields,
        {},
        (err) => {
          if (err) {
            console.error(
              `${Time.now()} - user update error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user update error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user update error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'user update completed.'
            }
          });
        }
      );
    });
  }

  /*
    Delete an item from user by the user passed on the constructor
  */
  delete(id) {
    return new Promise((res) => {
      User.findOneAndDelete(
        {
          '_id': new ObjectId(id)
        },
        {},
        (err) => {
          if (err) {
            console.error(
              `${Time.now()} - user delete error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user delete error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user delete error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'user delete completed.'
            }
          });
        }
      );
    });
  }

  /*
    Confirm user e-mail by the token given on parameter
  */
  confirmEmail(token) {
    return new Promise((res) => {
      User.findOneAndUpdate(
        {
          'email_confirmation_token': token
        },
        {
          'email_confirmed': true,
          'email_confirmation_token': ""
        },
        {},
        (err) => {
          if (err) {
            console.error(
              `${Time.now()} - e-mail confirmation error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'e-mail confirmation error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'e-mail confirmation error.'
                }
              });
            }
          }
          res({
            'status': 200,
            'response': {
              'message': 'e-mail confirmation completed.'
            }
          });
        }
      );
    });
  }
}
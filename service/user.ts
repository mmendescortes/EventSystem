/*
    Import the user model
*/
const User = require('../model/user');

/*
  Import the Time utility
*/
const Time = require('../utils/time');

/*
  Import the View utility
*/
const View = require('../utils/view');

/*
  Import the ObjectId type from Mongoose library
*/
const ObjectId = require('mongoose').Types.ObjectId;

/*
  Import the JWT library
*/
const jwt = require('jsonwebtoken');

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
          '$or': [
            {
              'username': user.username
            }, {
              'email': user.username
            }
          ]
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
              if(result.email_confirmed) {
                const token = jwt.sign(result.toJSON(), process.env.USER_JWT_SECRET, {
                  expiresIn: 300
                });
                res({
                  'status': 200,
                  'response': token
                });
              } else {
                let view = new View('email', 'confirmEmailLink');
                global.mail.sendMessage(
                  process.env.MAIL_USER,
                  result.email,
                  "Confirm your e-mail!",
                  view.parse({
                    user: result,
                    app: {
                      protocol: process.env.APP_PROTOCOL,
                      host: process.env.APP_HOST,
                      port: process.env.APP_PORT,
                    }
                  }),
                  (err) => {
                    if(err){
                      res({
                        'status': 500,
                        'response': {
                          'error': 'email confirmation link was not sent, an error happened.'
                        }
                      });
                    }
                    res({
                      'status': 200,
                      'response': {
                        'message': 'Please confirm your e-mail.'
                      }
                    });
                  }
                )
              }
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
        let view = new View('email', 'confirmEmailLink');
        global.mail.sendMessage(
          process.env.MAIL_USER,
          this.user.email,
          "Confirm your e-mail!",
          view.parse({
            user: this.user,
            app: {
              protocol: process.env.APP_PROTOCOL,
              host: process.env.APP_HOST,
              port: process.env.APP_PORT,
            }
          }),
          (err) => {
            if(err){
              res({
                'status': 500,
                'response': {
                  'error': 'user creation error.'
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
          'email_confirmed': false,
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

  /*
    Reset user password by e-mail
  */
  sendResetPasswordEmail(email) {
    return new Promise((res) => {
      let password_reset_token = require('uuid').v4();
      User.findOneAndUpdate(
        {
          'email': email
        },
        {
          'password_reset_token': password_reset_token
        },
        {},
        (err) => {
          if (err) {
            console.error(
              `${Time.now()} - user password reset error: `
              +
              err
            );
            if(err instanceof TypeError) {
              res({
                'status': 400,
                'response': {
                  'error': 'user password reset error.'
                }
              });
            } else {
              res({
                'status': 500,
                'response': {
                  'error': 'user password reset error.'
                }
              });
            }
          }
          let token = jwt.sign({
            'password_reset_token': password_reset_token
          }, process.env.USER_JWT_SECRET, {
            'expiresIn': 300
          });
          let view = new View('email', 'passwordResetLink');
          global.mail.sendMessage(
            process.env.MAIL_USER,
            email,
            "Reset your password!",
            view.parse({
              token: token,
              app: {
                protocol: process.env.APP_PROTOCOL,
                host: process.env.APP_HOST,
                port: process.env.APP_PORT,
              }
            }),
            (err) => {
              if(err){
                res({
                  'status': 500,
                  'response': {
                    'error': 'user password reset error.'
                  }
                });
              }
              res({
                'status': 200,
                'response': {
                  'message': 'user password reset link sent.'
                }
              });
            }
          )
        }
      );
    });
  }
  
  /*
    Reset user password by token
  */
  resetPassword(token, password) {
    return new Promise((res) => {
      jwt.verify(token, process.env.USER_JWT_SECRET, function(err, decoded) {
        if (err) {
          res({
            'status': 401,
            'response': {
              'message': 'invalid password reset token.'
            }
          });
        }
        User.findOneAndUpdate(
          {
            'password_reset_token': decoded.password_reset_token,
          },
          {
            'password': password,
            'password_reset_token': ""
          },
          {},
          (err) => {
            if (err) {
              console.error(
                `${Time.now()} - user password reset error: `
                +
                err
              );
              if(err instanceof TypeError) {
                res({
                  'status': 400,
                  'response': {
                    'error': 'user password reset error.'
                  }
                });
              } else {
                res({
                  'status': 500,
                  'response': {
                    'error': 'user password reset error.'
                  }
                });
              }
            }
            res({
              'status': 200,
              'response': {
                'message': 'user password reset completed.'
              }
            });
          }
        );
      });
    });
  }
}
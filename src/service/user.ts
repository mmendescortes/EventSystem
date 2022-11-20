/*
    Import the user model
*/
import {default as User} from '../model/user';

/*
  Import the Mongoose library
*/
import {Document} from 'mongoose';

/*
  Import the Time utility
*/
import {Time} from '../utils/time';

/*
  Import the View utility
*/
import {View} from '../utils/view';

/*
  Import the ObjectId type from Mongoose library
*/
import {ObjectId} from 'bson';

/*
  Import the JWT library
*/
import * as jwt from 'jsonwebtoken';

/*
  Import the UUID library
*/
import {v4} from 'uuid';

/*
  Export the User class
*/
export class UserService {
  user : any;
  constructor(user : any = null) {
    /*
      Set the user as this.user
    */
    this.user = user;
  }

  /*
    Return an item from User by given id
  */
  signin() : Promise<unknown> {
    return new Promise((res : any) => {
      let user : any = this.user
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
        (err : any, result : any) => {
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
            result.comparePassword(user.password, (err : Error, r : any)=>{
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
                const token : string = jwt.sign(result.toJSON(), process.env.USER_JWT_SECRET, {
                  expiresIn: 300
                });
                res({
                  'status': 200,
                  'response': token
                });
              } else {
                let view : View = new View('email', 'confirmEmailLink');
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
                  (err : Error) => {
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
  getById(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      User.findOne(
        {
          '_id': new ObjectId(id)
        },
        (err : any, result : any) => {
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
  create() : Promise<unknown> {
    this.user.email_confirmation_token = v4();
    let user : Document = new User(this.user);
    return new Promise((res : any) => {
      user.save((err : any) => {
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
        let view : View = new View('email', 'confirmEmailLink');
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
          (err : Error) => {
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
  update(id : string, fields : any) : Promise<unknown> {
    return new Promise((res : any) => {
      User.findOneAndUpdate(
        {
          '_id': new ObjectId(id)
        },
        fields,
        {},
        (err : any) => {
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
  delete(id : string) : Promise<unknown> {
    return new Promise((res : any) => {
      User.findOneAndDelete(
        {
          '_id': new ObjectId(id)
        },
        {},
        (err : any) => {
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
  confirmEmail(token : string) : Promise<unknown> {
    return new Promise((res : any) => {
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
        (err : any) => {
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
  sendResetPasswordEmail(email : string) : Promise<unknown> {
    return new Promise((res : any) => {
      let password_reset_token = v4();
      User.findOneAndUpdate(
        {
          'email': email
        },
        {
          'password_reset_token': password_reset_token
        },
        {},
        (err : any) => {
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
          let token : string = jwt.sign({
            'password_reset_token': password_reset_token
          }, process.env.USER_JWT_SECRET, {
            'expiresIn': 300
          });
          let view : View = new View('email', 'passwordResetLink');
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
            (err : Error) => {
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
  resetPassword(token : string, password : string) : Promise<unknown> {
    return new Promise((res : any) => {
      jwt.verify(token, process.env.USER_JWT_SECRET, (err : any, decoded : any) : void => {
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
          (err : any) => {
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
/*
Import the user service
*/
const UserService = require('../service/user');

/*
Import the Time utility
*/
const Time = require('../utils/time');

/*
Export the UserController class
*/
module.exports = class UserController {
    constructor(user = null) {
    /*
    Set the user as this.user
    */
    this.user = user;
    }

    /*
    Return an item from user by given id
    */
    signin() {
        let userInstance = new UserService(this.user);
        let result = userInstance.signin();
        return result;
    }
  
    /*
    Return an item from user by given id
    */
    getById(id) {
        let userInstance = new UserService();
        let result = userInstance.getById(id);
        return result;
    }

    /*
    Create an item from user by the user passed on the constructor
    */
    create() {
        let userInstance = new UserService(this.user);
        let result = userInstance.create();
        return result;
    }

    /*
    Update an item from user by the user passed on the constructor
    */
    update(id, fields) {
        let userInstance = new UserService();
        let result = userInstance.update(id, fields);
        return result;
    }

    /*
    Delete an item from user by the user passed on the constructor
    */
    delete(id) {
        let userInstance = new UserService();
        let result = userInstance.delete(id);
        return result;
    }

  /*
    Confirm user e-mail by the token given on parameter
  */
    confirmEmail(token) {
        let userInstance = new UserService();
        let result = userInstance.confirmEmail(token);
        return result;
    }

    /*
      Reset user password by e-mail
    */
    sendResetPasswordEmail(email) {
        let userInstance = new UserService();
        let result = userInstance.sendResetPasswordEmail(email);
        return result;
    }
  
    /*
      Reset user password by token
    */
    resetPassword(token, password) {
        let userInstance = new UserService();
        let result = userInstance.resetPassword(token, password);
        return result;
    }
}
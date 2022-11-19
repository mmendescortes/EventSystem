/*
Import the user service
*/
import {UserService} from '../service/user';

/*
Export the UserController class
*/
export class UserController {
    user : any;
    constructor(user : any = null) {
        /*
        Set the user as this.user
        */
        this.user = user;
    }

    /*
    Return an item from user by given id
    */
    signin() : Promise<unknown> {
        let userInstance : UserService = new UserService(this.user);
        let result : Promise<unknown> = userInstance.signin();
        return result;
    }
  
    /*
    Return an item from user by given id
    */
    getById(id : string) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.getById(id);
        return result;
    }

    /*
    Create an item from user by the user passed on the constructor
    */
    create() : Promise<unknown> {
        let userInstance : UserService = new UserService(this.user);
        let result : Promise<unknown> = userInstance.create();
        return result;
    }

    /*
    Update an item from user by the user passed on the constructor
    */
    update(id : string, fields : object) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.update(id, fields);
        return result;
    }

    /*
    Delete an item from user by the user passed on the constructor
    */
    delete(id : string) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.delete(id);
        return result;
    }

  /*
    Confirm user e-mail by the token given on parameter
  */
    confirmEmail(token : string) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.confirmEmail(token);
        return result;
    }

    /*
      Reset user password by e-mail
    */
    sendResetPasswordEmail(email : string) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.sendResetPasswordEmail(email);
        return result;
    }
  
    /*
      Reset user password by token
    */
    resetPassword(token : string, password : string) : Promise<unknown> {
        let userInstance : UserService = new UserService();
        let result : Promise<unknown> = userInstance.resetPassword(token, password);
        return result;
    }
}
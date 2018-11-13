import BaseAPIController from "./BaseAPIController";
import UserProvider from "../providers/UserProvider.js";

export class UserController extends BaseAPIController {

    /* Controller for User Register  */
    create = (req, res, next) => {
    
    }

    /* Controller for User Login  */
    login = (req, res, next) => {
        
    }
}

const controller = new UserController();
export default controller;
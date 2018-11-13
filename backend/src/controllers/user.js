import BaseAPIController from "./BaseAPIController";
import UserProvider from "../providers/UserProvider.js";
import jwt from "jsonwebtoken";

export class UserController extends BaseAPIController {

    /* Controller for User Register  */
    create = (req, res, next) => {
        UserProvider.create(req.body).then((user_data) => { // validating user register data comming from front end
            req.user.create(user_data).then((response) => { // storing data in database
                this.handleSuccessResponse(res, response, next)
            }).catch(this.handleErrorResponse.bind(null, res))
        }).catch(this.handleErrorResponse.bind(null, res))
    }

    /* Controller for User Login  */
    login = (req, res, next) => {
        UserProvider.login(req.body).then(login_data => { // validating user login data comming from front end
            req.user.findOne(login_data).then((response) => { // searching data from database
                console.log(response)
                if (!response) {
                    this.handleErrorResponse(res, 'Invalid Login Credentials', next)
                } else {
                    let data = {};
                    data['role'] = response.role;
                    data['token'] = jwt.sign({ // generating user token for access the functionality only valid for an hour
                        token: response._id,
                    }, "secret_key", {
                        expiresIn: 60 * 60,
                    });
                    this.handleSuccessResponse(res, data, next)
                }
            }).catch(this.handleErrorResponse.bind(null, res))
        }).catch(this.handleErrorResponse.bind(null, res))
    }
}

const controller = new UserController();
export default controller;
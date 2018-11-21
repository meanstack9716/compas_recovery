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
            req.user.findOne(login_data, { firstname: 1, lastname: 1, email: 1, token: 1, role: 1, phone: 1 }).then((response) => { // searching data from database
                if (!response) {
                    this.handleErrorResponse(res, 'Invalid Login Credentials', next)
                } else {
                    let token = jwt.sign({ // generating user token for access the functionality only valid for an hour
                        token: response._id,
                    }, "secret_key", {
                            expiresIn: 60 * 60,
                        });
                    response['token'] = token;
                    req.user.update({ _id: response._id }, { $set: { token: response.token } }).then((updated)=>{
                        this.handleSuccessResponse(res, response, next)
                    })
                }
            }).catch(this.handleErrorResponse.bind(null, res))
        }).catch(this.handleErrorResponse.bind(null, res))
    }
    verify = (req, res, next) => {
        let token = req.query.token || req.headers.token;
        jwt.verify(token, "secret_key", (err, docs) => {
            if (err)
                next(res.status(401).send({ error: "Invalid Token" }));
            else
                res.send({ message: "User Token Is Valid" })
        })
    }
}

const controller = new UserController();
export default controller;
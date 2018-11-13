import moment from "moment";
import jwt from "jsonwebtoken";

export class AuthController {

    // middleware for logged in users
    requiresLogin(req, res, next) {
        
    }

    requiresAdmin(req, res, next) {
        
    }

    // verify token
    verifyToken(req, res, next) {
        
    }
}

const controller = new AuthController();
export default controller;
import * as BaseProvider from "./BaseProvider";
import md5 from "md5";
/* Provider for User Registration */
const create = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.email)
            reject({ message: "email is required" })
        else if (!body.role)
            reject({ message: "role is required" })
        else if (!body.password)
            reject({ message: "password is required" })
        else if (!body.confirm_password)
            reject({ message: "confirm password is required" })
        else {
            if (body.password == body.confirm_password) {
                delete body.confirm_password;
                body.password = md5(body.password);
                resolve(body);
            } else {
                reject("Password Not Matched");
            }
        }
    });
};

/* Provider for User login */
const login = (body) => {
    return new Promise((resolve, reject) => {
        if (!body.email)
            reject({ message: "email is required" })
        else if (!body.password)
            reject({ message: "password is required" })
        else
            resolve({ email: body.email, password: md5(body.password) })
    })
};

export default {
    ...BaseProvider,
    create,
    login
};
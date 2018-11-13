import * as BaseProvider from "./BaseProvider";

/* Provider for User Registration */
const create = (model, validate, body, validationResult) => {
    return new Promise((resolve, reject) => {

    });
};

/* Provider for User login */
const login = (model, body) => {
    return new Promise((resolve, reject) => {

    })
};

export default {
    ...BaseProvider,
    create,
    login
};
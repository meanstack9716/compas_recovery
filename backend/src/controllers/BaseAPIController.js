import errorHandler from "../lib/util";

export default class BaseAPIController {
    constructor() {
    }

    handleErrorResponse(res, err, next) {
        res.status(400).send(errorHandler(err));
    }

    handleSuccessResponse(res, data, next) {
        res.json(data) 
    }
}
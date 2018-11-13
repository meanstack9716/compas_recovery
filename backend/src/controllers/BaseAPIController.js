import errorHandler from "../lib/util";

export default class BaseAPIController {
    constructor() {
    }

    handleErrorResponse(res, err, next) {
        res.status(400).send(errorHandler(err));
    }

    handleSuccessResponse(req, res, next, data) {
        res.json(data) 
    }
}
import mongoose from "mongoose";
import config from "../config";

let db = config.mongodb || process.env.mongodb;

if (!db) {
    console.log("Mongodb information is not fount update config details");
    process.exit(0)
}
let conn = mongoose.createConnection("mongodb://localhost/" + db);
// the middleware function
module.exports = function() {

    // create schema
    
    return function(req, res, next) {
        next();
    };
};
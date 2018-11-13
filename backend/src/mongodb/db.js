import mongoose from "mongoose";
import config from "../config";
import bluebird from "bluebird"
mongoose.Promise = bluebird;
let db = process.env.mongodb || config.mongodb ;

if (!db) {
    console.log("Mongodb information is not fount update config details");
    process.exit(0)
}
let conn = mongoose.createConnection(db);
// the middleware function
module.exports = function () {

    // create schema
    let users = mongoose.Schema({
        email: { type: String, unique: true },
        password: { type: String },
        name: { type: String },
        phone: { type: String },
        role: { type: String, enum: ['admin_supervisor', 'admin_controller', 'sub_contractor', 'customer', 'employees'] },
    }, {
            collection: "users",
            strict: true,
            timestamps: true
        })


    let user_model = conn.model("users", users);
    return function (req, res, next) {
        req.user = user_model
        next();
    };
};
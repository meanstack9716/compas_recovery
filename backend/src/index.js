/* eslint-disable*/
import http from "http";
import express from "express";
import cors from "cors";
import path from "path";
import glob from "glob";
import chalk from "chalk";
import bodyParser from "body-parser";
import config from "./config.json";
import expressValidator from "express-validator";

//mongo connection import
import db from './mongodb/db';

const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(db()) // call db function
// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}));
app.use(bodyParser.json({
    limit: config.bodyLimit
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());

const initRoutes = (app) => {
    // including all routes
    glob("./routes/*.js", {
        cwd: path.resolve("./src")
    }, (err, routes) => {
        if (err) {
            console.log(chalk.red("Error occured including routes"));
            return;
        }
        routes.forEach((routePath) => {
            require(routePath).default(app); // eslint-disable-line
        });
        console.log(chalk.green("included " + routes.length + " route files"));
    });
};

initRoutes(app);
app.listen(process.env.PORT || config.port);
console.log("Started on port " + (process.env.PORT || config.port));
export default app;
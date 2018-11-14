import auth from "../middleware/auth";
import user from "../controllers/user";

export default (app) => {
    /* Route for Token Verification  */
    app.route("/verify").get(auth.verifyToken);

    /* Route for User Registration  */
    app.route("/user/add_user").post(user.create);

    /* Route for User Login  */
    app.route("/user/login").post(user.login);

    /* Route for Token  Verify*/
    app.route("/user/verify").get(user.verify);

    return app;
};
const controller = require("./controller");
const config = require("../../../../config");
const rateLimiter = require("express-rate-limit");
const limiter = rateLimiter(config.rateLimiter);
const celebrate = require("celebrate").celebrate;
const request_validation = require("../../services/validation");
const authentication = require("./auth/authentication");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

module.exports = (router) => {
  /*
     User auth routes
    */
  router.post(
    "/user/sign_up",
    limiter,
    celebrate(request_validation.sign_up),
    controller.user_signup
  );

  router.put(
    "/user/verify_otp",
    limiter,
    celebrate(request_validation.verify_otp),
    controller.verify_otp
  );

  router.put(
    "/user/resend_otp",
    limiter,
    celebrate(request_validation.resend_otp),
    controller.resend_otp
  );

  router.post(
    "/user/login",
    limiter,
    celebrate(request_validation.login),
    controller.user_login
  );

  router.post(
    "/user/login_otp",
    limiter,
    celebrate(request_validation.resend_otp),
    controller.login_otp
  );

  router.post(
    "/user/reset_forgot_password",
    limiter,
    celebrate(request_validation.reset_forgot_password),
    controller.reset_forgot_password
  );

  router.put(
    "/user/update",
    limiter,
    authentication,
    celebrate(request_validation.update_user),
    controller.update_user
  );
};

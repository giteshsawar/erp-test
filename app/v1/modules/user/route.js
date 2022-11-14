const controller = require("./controller");
const config = require("../../../../config");
const rateLimiter = require("express-rate-limit");
const limiter = rateLimiter(config.rateLimiter);
const celebrate = require("celebrate").celebrate;
const request_validation = require("../../services/validation");

module.exports = (router) => {
  /*
     User auth routes
    */
  router.post(
    "/user/sign_up",
    limiter,
    celebrate(request_validation.sign_up),
    controller.signup_user
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
};

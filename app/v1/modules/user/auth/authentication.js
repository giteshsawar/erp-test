const jwt = require("jsonwebtoken");
const config = require("../../../../../config");
const Session = require("../../../services/user/session_model");
const logger = require("../../../../../config/logger");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
  let token = req.headers["x-auth-token"];
  if (!token) {
    req.is_authorized = false;
    return next();
  }
  let secretOrKey = config.jwtSecret;
  try {
    var decoded = jwt.verify(token, secretOrKey);
    if (!ObjectId.isValid(decoded.id)) {
      throw new Error("Invalid Id");
    }
  } catch (err) {
    logger.error("In user authenticate: ");
    logger.error(err);
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Invalid or expired token",
    });
  }

  Session.findOne({
    user_id: decoded.id,
    token: token,
  })
    .populate("user_id")
    .exec((err, user) => {
      if (err) {
        logger.debug("Error while populating user object");
        logger.error(err);
        next(err);
      }
      if (user && user.user_id) {
        req.user = user.user_id;
        req.is_authorized = true;

        // check if verifyid
        if (!req.user.is_verified) {
          return res.status(401).json({
            success: false,
            status: 401,
            message: "This account is not verified.",
          });
        }
        console.log(req.is_authorized);
        return next();
      } else {
        logger.debug("Session not found");
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Invalid or expired token",
        });
      }
    });
};

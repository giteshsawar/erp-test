const logger = require("../../../../config/logger");
const {
  user_signup,
  verify_otp,
  user_login,
  resend_otp,
} = require("../../services/user");
let controller = Object.create(null);

/* 
All user auth related controllers
*/
controller.signup_user = async (req, res) => {
  try {
    console.log(req.query);
    let data = req.body;
    console.log(data);
    const result = await user_signup(data);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while signup user");
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.verify_otp = async (req, res) => {
  try {
    let { phone_number, otp } = req.body;
    const result = await verify_otp(phone_number, otp);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while verify_otp");
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.resend_otp = async (req, res) => {
  try {
    let { phone_number } = req.body;
    const result = await resend_otp(phone_number);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while resend_otp");
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.user_login = async (req, res) => {
  try {
    let { phone_number, password } = req.body;
    const result = await user_login(phone_number, password);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while user_login");
    logger.error(err.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

module.exports = controller;

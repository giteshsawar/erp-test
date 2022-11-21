const logger = require("../../../../config/logger");
const {
  user_signup,
  verify_otp,
  user_login,
  resend_otp,
  login_otp,
  reset_forgot_password,
  update_user,
} = require("../../services/user");
const User = require("../../services/user/model");
let controller = Object.create(null);

/* 
All user auth related controllers
*/
controller.user_signup = async (data, req, res) => {
  try {
    const result = await user_signup(data.userInput);
    return result; //res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while signup user");
    throw new Error(`${error.toString()},while signing up user`);
    // return res.status(400).json({
    //   success: false,
    //   status: 400,
    //   message: error.toString(),
    // });
  }
};

controller.verify_otp = async () => {
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

controller.user_login = async ({ phone_number, password }) => {
  try {
    //let { phone_number, password } = req.body;
    console.log(phone_number);
    const result = await user_login(phone_number, password);
    console.log(result);
    return result;
  } catch (error) {
    logger.error("Error while user_login");
    logger.error(error.message);
    throw new Error(`${error.toString()},while loging user`);
  }
};

controller.login_otp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const result = await login_otp(phone_number);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while login_otp");
    logger.error(error.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.reset_forgot_password = async (req, res) => {
  try {
    const { phone_number, otp, password } = req.body;
    const result = await reset_forgot_password(phone_number, password, otp);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while reset_forgot_password");
    logger.error(error.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.update_user = async (req, res) => {
  try {
    const update = req.body;
    let user_id = req.user._id;
    const result = await update_user(update, user_id);
    return res.status(result.status).json(result);
  } catch (error) {
    logger.error("Error while update_user");
    logger.error(error.message);
    return res.status(400).json({
      success: false,
      status: 400,
      message: error.toString(),
    });
  }
};

controller.user_details = async (req) => {
  try {
    console.log(req.user);
    let userId = req.user._id;
    let user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error("Error while geting user details");
    throw new Error(`${error.toString()},while geting user details`);
  }
};

module.exports = controller;

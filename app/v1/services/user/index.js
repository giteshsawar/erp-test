const User = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const Presets = require("../../../../utils/presets");
const logger = require("../../../../config/logger");

const user_signup = async (data) => {
  try {
    console.log(data);
    let exist = await User.findOne({ phone_number: data.phone_number });
    if (exist) {
      if (exist.is_verified) {
        return {
          success: false,
          status: 404,
          message: constant.SIGNUP.ALREADY_EXISTS,
        };
      }
      const otp = Math.floor(100000 + Math.random() * 900000);
      exist.phone_otp.otp = otp;
      exist.phone_otp.expire_at = Date.now() + Presets.otp_expiry_time;
      await exist.save();
      //FIXME: setup sms sender to phone number.To send otp.
      return {
        success: false,
        status: 200,
        message: constant.SIGNUP.NOT_VERIFYIED,
      };
    }
    let user = new User();
    let otp = Math.floor(100000 + Math.random() * 900000);
    let new_user = await User.create({
      name: data.name,
      phone_number: data.phone_number,
      password: user.generate_hash(data.password),
      phone_otp: {
        otp: otp,
        expire_at: Date.now() + Presets.otp_expiry_time,
      },
    });
    delete new_user.password;
    return {
      success: true,
      status: 200,
      mesage: constant.SIGNUP.SUCCESS,
    };
  } catch (error) {
    console.log(error);
    logger.error(error.mesage);
    throw error;
  }
};

const verify_otp = async (phone_number, otp) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    if (user.phone_otp.expire_at < Date.now()) {
      return {
        success: false,
        status: 400,
        message: constant.VERIFY_OTP.EXPIRE_OTP,
      };
    }
    if (user.phone_otp.otp !== otp) {
      return {
        success: false,
        status: 400,
        message: constant.VERIFY_OTP.INVALID_OTP,
      };
    }
    user.phone_otp.otp = null;
    user.phone_otp.expire_at = null;
    await user.save();
    const token = await user.gen_auth_token();
    delete user.password;
    return {
      success: true,
      status: 200,
      auth_token: token,
      mesage: constant.VERIFY_OTP.SUCCESS,
      user: user,
    };
  } catch (error) {
    logger.error(error.mesage);
    throw error;
  }
};

const resend_otp = async (phone_number) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    let otp = Math.floor(100000 + Math.random() * 900000);
    user.phone_otp.otp = otp;
    user.phone_otp.expire_at = Date.now() + Presets.otp_expiry_time;
    await user.save();
    //FIXME: setup  of sending sms on phonen number.
    return {
      success: true,
      status: 200,
      message: constant.VERIFY_OTP.RESEND_OTP,
    };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const user_login = async (phone_number, password) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        mesage: constant.USER_NOT_FOUND,
      };
    }
    if (user.valid_password(password)) {
      console.log("hello");
      let token = await user.gen_auth_token();
      console.log(token);
      //delete user.password;
      return {
        success: true,
        status: 200,
        message: constant.LOGIN.SUCCESS,
        auth_token: token,
        user: user,
      };
    }
    return {
      success: false,
      status: 400,
      mesage: constant.LOGIN.WORNG_PASSWORD,
    };
  } catch (error) {
    logger.error(erroe.message);
    throw error;
  }
};

module.exports = {
  user_signup,
  verify_otp,
  resend_otp,
  user_login,
};

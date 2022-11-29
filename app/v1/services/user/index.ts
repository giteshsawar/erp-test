const User = require("./model");
const constant = require("../../../../config/constants").response_msgs;
const Presets = require("../../../../utils/presets");
const logger = require("../../../../config/logger");
import { User, UserSignup } from "../../../../interface";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const user_signup = async (data: UserSignup) => {
  try {
    let exist: User = await User.findOne({ phone_number: data.phone_number });
    if (exist) {
      if (exist.is_verified) {
        return {
          success: false,
          status: 404,
          message: constant.SIGNUP.ALREADY_EXISTS,
        };
      }
      const otp = Math.floor(100000 + Math.random() * 900000);
      exist.phone_otp.otp = otp.toString();
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
    // delete new_user.password;
    return {
      success: true,
      status: 200,
      message: constant.SIGNUP.SUCCESS,
      phone_number: new_user.phone_number,
    };
  } catch (error: any) {
    console.log(error);
    logger.error(error.toString());
    throw error;
  }
};

const verify_otp = async (phone_number: String, otp: String) => {
  try {
    let user: User = await User.findOne({ phone_number: phone_number });
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
    user.is_verified = true;
    await user.save();
    const token = await user.gen_auth_token();
    return {
      success: true,
      status: 200,
      auth_token: token,
      message: constant.VERIFY_OTP.SUCCESS,
      user: user,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const resend_otp = async (phone_number: String) => {
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
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const user_login = async (phone_number: String, password: String) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    if (user.valid_password(password)) {
      let token = await user.gen_auth_token();
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
      message: constant.LOGIN.WORNG_PASSWORD,
    };
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

const login_otp = async (phone_number: String) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    if (!user.is_verified) {
      return {
        success: false,
        status: 400,
        message: constant.LOGIN.NOT_VERIFYIED,
      };
    }
    user.phone_otp.otp = Math.floor(100000 + Math.random() * 900000);
    user.phone_otp.expire_at = Date.now() + Presets.otp_expiry_time;
    await user.save();
    //FIXME: set to send otp to phone number.
    return {
      success: true,
      status: 200,
      message: constant.LOGIN.OTP_SENT,
    };
  } catch (error: any) {
    logger.error(error.mesage);
    throw error;
  }
};

const reset_forgot_password = async (
  phone_number: String,
  password: String,
  otp: String
) => {
  try {
    let user = await User.findOne({ phone_number: phone_number });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    if (!user.is_verified) {
      return {
        success: false,
        status: 400,
        message: constant.LOGIN.NOT_VERIFYIED,
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
    user.password = user.generate_hash(password);
    user.phone_otp.otp = null;
    user.phone_otp.expire_at = null;
    await user.save();
    return {
      success: true,
      status: 200,
      message: constant.LOGIN.RESET_FORGOT_PASSWORD,
    };
  } catch (error: any) {
    logger.error(error.toString());
    throw error;
  }
};

const update_user = async (update, user_id) => {
  try {
    if (!ObjectId.isValid(user_id)) {
      return {
        success: false,
        status: 400,
        message: constant.INVALID_OBJECTID,
      };
    }
    let user = await User.findOne({ _id: user_id });
    if (!user) {
      return {
        success: false,
        status: 404,
        message: constant.USER_NOT_FOUND,
      };
    }
    await User.findByIdAndUpdate({ _id: user_id }, update, { new: true });
    return {
      success: true,
      status: 200,
      message: constant.USER.UPDATE,
    };
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

module.exports = {
  user_signup,
  verify_otp,
  resend_otp,
  user_login,
  login_otp,
  reset_forgot_password,
  update_user,
};

// module.exports = {
//   user_signup: (data, req) => {
//     console.log(req);
//     user_signup(data);
//   },
//   verify_otp: (data) =>
//     verify_otp(data.userInput.phone_number, data.userInput.otp),
//   user_login: (phone_number, password) => user_login(phone_number, password),
// };

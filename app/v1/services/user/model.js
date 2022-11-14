const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../../../config");
const Session = require("./session_model");
const logger = require("../../../../config/logger");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    password: { type: String },
    birth_date: { type: Date },
    id_proof: { type: String },
    is_verified: { type: Boolean, default: false },
    phone_otp: {
      otp: { type: String },
      expire_at: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Utility methods
 */

// hash the password
userSchema.methods.generate_hash = function generate_hash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
userSchema.methods.valid_password = function valid_password(password) {
  return bcrypt.compareSync(password, this.password);
};

// generate a jwt token and save inside session
userSchema.methods.gen_auth_token = async function gen_auth_token() {
  // let expiresIn = "10h";
  // if (loginInfo.rememberMe) {
  //   expiresIn = "7d";
  // }
  try {
    const payload = { id: this._id };
    var token = jwt.sign(payload, config.jwtSecret /*, { expiresIn }*/); // eslint-disable-line
  } catch (error) {
    logger.error(error);
    throw error;
  }
  await Session.addSession({ token, id: this._id });
  return token;
};

const User = mongoose.model("User", userSchema, "User");
module.exports = User;

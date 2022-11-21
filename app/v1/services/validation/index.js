const Joi = require("celebrate").Joi;

const ValidatorSchema = {
  sign_up: {
    body: Joi.object()
      .required()
      .keys({
        phone_number: Joi.string().min(10).max(10).required(),
        name: Joi.string().required(),
        password: Joi.string().min(8).required(),
      }),
  },
  verify_otp: {
    body: Joi.object()
      .required()
      .keys({
        phone_number: Joi.string().min(10).max(10).required(),
        otp: Joi.string().required().min(6),
      }),
  },
  resend_otp: {
    body: Joi.object()
      .required()
      .keys({
        phone_number: Joi.string().min(10).max(10).required(),
      }),
  },
  login: {
    body: Joi.object()
      .required()
      .keys({
        phone_number: Joi.string().min(10).max(10).required(),
        password: Joi.string().required(),
      }),
  },
  reset_forgot_password: {
    body: Joi.object()
      .required()
      .keys({
        phone_number: Joi.string().min(10).max(10).required(),
        password: Joi.string().min(8).required(),
        otp: Joi.string().required(),
      }),
  },
  update_user: {
    body: Joi.object().required().keys({
      name: Joi.string(),
      birth_date: Joi.date(),
      id_proof: Joi.string(),
    }),
  },
};

module.exports = ValidatorSchema;

const mongoose = require("mongoose");

const clintSchema = new mongoose.Schema(
  {
    type: { type: String },
    name: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    address: {
      billing_address: {
        address: { type: String, trim: true, required: true },
        zip_code: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        city: { type: String, trim: true, required: true },
      },
      shipping_address: {
        address: { type: String, trim: true, required: true },
        zip_code: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        city: { type: String, trim: true, required: true },
      },
    },
    max_balance: { type: String }, //FIXME:confirm data type.
    number_of_sale: { type: String, trim: true },
    number_of_purchase: { type: String, trim: true },
    contacts: [{ type: String }], //FIXME: confirm data type.
    company_id: { type: mongoose.Types.ObjectId },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Clint = mongoose.model("Clint", clintSchema, "Clint");
module.exports = Clint;

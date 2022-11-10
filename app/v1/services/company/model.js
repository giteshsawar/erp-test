const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    gst_no: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    address: {
      address: { type: String, trim: true, required: true },
      zip_code: { type: String, trim: true, required: true },
      state: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
    },
    is_warehouse_address: { type: Boolean, defult: false },
    locatioin: { type: String, trim: true },
    owner: { type: mongoose.Types.ObjectId, required: true },
    industry_type: { type: String }, //FIXME:CONFIRM THAT MONGO ID OR STRING
    is_active: { type: Boolean, defult: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema, "Company");
module.exports = Company;

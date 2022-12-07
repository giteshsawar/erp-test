import mongoose from "mongoose";

const designationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: String, trim: true },
    company_id: { type: mongoose.Types.ObjectId, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Designation = mongoose.model(
  "Designation",
  designationSchema,
  "Designation"
);
module.exports = Designation;

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    company_id: { type: mongoose.Types.ObjectId, required: true },
    salary: { type: Number },
    joining_date: { type: Date, required: true },
    role_id: { type: mongoose.Types.ObjectId }, //FIXME: is this field is needed here?
    designation_name: { type: String, required: true }, //FIXME:this should be emum or object id.
    is_active: { type: Boolean, defult: true },
    leaving_date: { type: Date },
    leaving_reason: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema, "Employee");
module.exports = Employee;

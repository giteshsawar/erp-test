import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    priveleges: {
      inventory: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
      orders: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
      employees: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
      clients: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
      invoice: {
        view: { type: Boolean, default: false },
        create: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
      },
    },
    company_id: { type: mongoose.Types.ObjectId, required: true },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema, "Role");
module.exports = Role;

const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    address: {
      address: { type: String, trim: true, required: true },
      zip_code: { type: String, trim: true, required: true },
      state: { type: String, trim: true, required: true },
      city: { type: String, trim: true, required: true },
    },
    location: { type: String },
    company_id: { type: mongoose.Types.ObjectId },
    is_active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema, "Warehouse");
module.exports = Warehouse;

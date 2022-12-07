import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    type: { type: String, trim: true },
    order_no: { type: String, trim: true },
    clearance_date: { type: Date },
    invoice_id: { type: mongoose.Types.ObjectId },
    employee_id: { type: mongoose.Types.ObjectId },
    pipeline_id: { type: mongoose.Types.ObjectId },
    pipeline_stage: { type: String },
    warehouse_id: { type: mongoose.Types.ObjectId },
    iteam_list: {
      iteam_id: { type: mongoose.Types.ObjectId },
      variant_id: { type: mongoose.Types.ObjectId },
      quantity: { type: String },
      unit: { type: String },
    },
    category_id: { type: mongoose.Types.ObjectId },
    company_id: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "Order");
module.exports = Order;

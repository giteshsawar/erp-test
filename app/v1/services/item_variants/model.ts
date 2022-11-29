import mongoose from "mongoose";

const itemVariantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    specification: { type: String, trim: true },
    image: [{ type: String }],
    price: {
      amount: { type: Number },
      tax_includes: { type: Number },
      min_price: { type: Number },
    },
    stock: {
      total: { type: String },
      unit_id: { type: String },
      low_stock_limit: { type: String },
    },
    warehouse_id: { type: mongoose.Types.ObjectId },
    owner: { type: mongoose.Types.ObjectId },
    expiry_range: { type: String },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const ItemVariant = mongoose.model(
  "ItemVariant",
  itemVariantSchema,
  "ItemVariant"
);
module.exports = ItemVariant;

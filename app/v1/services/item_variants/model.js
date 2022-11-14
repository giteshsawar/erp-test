const mongoose = require("mongoose");

const itemVariantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    specification: { type: String, trim: true },
    image: { type: String },
    price: {
      amount: { type: Number },
      tax_includes: { type: Number },
      min_price: { type: Number },
    },
    stock: {
      total: { type: String },
      unit_id: { type: String }, //FIXME:confirm data type.
      warehouse_id: { type: mongoose.Types.ObjectId },
      low_stock_limit: { type: String },
    },
    expiry_range: { type: String }, //FIXME:don't understand.
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

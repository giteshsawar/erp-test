const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    theme: { type: String, trim: true },
    display_price: { type: Number, trim: true },
    category_id: { type: mongoose.Types.ObjectId },
    product_id: { type: mongoose.Types.ObjectId },
    variant_id: { type: mongoose.Types.ObjectId },
    price: { type: Number },
    allow_ordering: { type: Boolean, defult: true },
    company_id: { type: mongoose.Types.ObjectId },
    created_by: { type: mongoose.Types.ObjectId }, //employee id.
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Catalog = mongoose.model("Catalog", catalogSchema, "Catalog");
module.exports = Catalog;

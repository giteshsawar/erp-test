const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    category_id: { type: mongoose.Types.ObjectId },
    SKU_id: {}, //FIXME:dought.
    tax_category_id: { type: mongoose.Types.ObjectId }, //FIXME:
    cover_image: { type: String },
    HSN_code_id: { type: mongoose.Types.ObjectId }, //FIXME:
    variant_id: { type: mongoose.Types.ObjectId },
    description: { type: String, trim: true },
    company_id: { type: mongoose.Types.ObjectId },
    is_active: { type: Boolean, defult: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema, "Item");
module.exports = Item;

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    category_id: { type: mongoose.Types.ObjectId },
    SKU_id: { type: Array, trim: true },
    tax_category_id: { type: String },
    cover_image: { type: String },
    HSN_code_id: { type: String },
    variant_id: [{ type: mongoose.Types.ObjectId }],
    description: { type: String, trim: true },
    company_id: { type: mongoose.Types.ObjectId },
    owner: { type: mongoose.Types.ObjectId },
    is_active: { type: Boolean, defult: true },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema, "Item");
export = Item;

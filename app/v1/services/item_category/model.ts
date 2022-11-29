import mongoose from "mongoose";

const itemCategorySchema = new mongoose.Schema(
  {
    type: { type: String },
    name: { type: String, trim: true, required: true },
    specification: { type: String, trim: true },
    description: { type: String, trim: true },
    units: { type: String, enum: [] }, //FIXME:have doubt.
    company_id: { type: mongoose.Types.ObjectId },
    owner: { type: mongoose.Types.ObjectId },
    is_active: { type: Boolean, defult: true },
  },
  {
    timestamps: true,
  }
);

const ItemCategory = mongoose.model(
  "ItemCategory",
  itemCategorySchema,
  "ItemCategory"
);
module.exports = ItemCategory;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    phone_number: { type: String, trim: true, required: true },
    password: { type: String },
    birth_date: { type: Date },
    id_proof: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "User");
module.exports = User;

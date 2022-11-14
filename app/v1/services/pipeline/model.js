const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    module: { type: String, trim: true },
    color: { type: String, trim: true },
    category_id: { type: mongoose.Types.ObjectId },
    product_id: { type: mongoose.Types.ObjectId },
    stage_name: { type: String },
    authorized_employee: [{ type: String }], //employee id.FIXME:confirm data structure
    role_id: { type: mongoose.Types.ObjectId },
    automation_id: { type: String }, //FIXME:confirm data type
    company_id: { type: mongoose.Types.ObjectId },
    is_active: { typw: Boolean, defult: true },
  },
  {
    timestamps: true,
  }
);

const Pipeline = mongoose.model("Pipeline", pipelineSchema, "Pipeline");
module.exports = Pipeline;

const { Schema, model } = require("mongoose");
const TemplateDetailSchema = Schema({
  template: {
    type: Schema.Types.ObjectId,
    ref: "Template",
  },
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section",
  },
  code: {
    type: String,
    // required: true,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
  },
  position: {
    Number,
  },
});

TemplateDetailSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("TemplateDetail", TemplateDetailSchema);

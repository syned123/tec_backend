const { Schema, model } = require("mongoose");
const TemplateSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  description: {
    type: String,
  },
});

TemplateSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Template", TemplateSchema);
const { Schema, model } = require("mongoose");
const SectionSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  template: {
    type: Schema.Types.ObjectId,
    ref: "Template",
  },
  code: {
    type: String,
    // required: true,
  },
  order: {
    type: String,
  },
});

SectionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Section", SectionSchema);

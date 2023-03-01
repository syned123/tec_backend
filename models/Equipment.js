const { Schema, model } = require("mongoose");
const EquipmentSchema = Schema({
  type: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serie: {
    type: String,
    required: true,
  },
});

EquipmentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Equipment", EquipmentSchema);

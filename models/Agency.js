const { Schema, model } = require("mongoose");
const AgencySchema = Schema({
  nameAgency: {
    type: String,
    required: true,
  },
  adress1: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

AgencySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Agency", AgencySchema);

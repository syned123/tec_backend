const { Schema, model } = require("mongoose");
const TicketDetailSchema = Schema({
  ticket: {
    type: String,
    required: true,
  },
  templateDetail: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

TicketDetailSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("TicketDetail", TicketDetailSchema);

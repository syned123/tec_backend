const { Schema, model } = require("mongoose");
const TicketSchema = Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
  },
  city: {
    type: String,
    required: true,
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },
  cnt: {
    type: String,
    required: true,
  },
  typeService: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

TicketSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Ticket", TicketSchema);

const { Schema, model } = require("mongoose");
const TicketSchema = Schema({
  code: {
    type: String,
    // required: true,
  },
  typeService: {
    type: String,
    // required: true,
  },
  entity: {
    type: String,
    // required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "Agency",
  },
  template: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
  },
  cnt: {
    type: String,
    // required: true,
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
  },
  status: {
    type: String,
    // required: true,
  },
  price:{
    type: String,
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

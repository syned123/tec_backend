const { response } = require("express");
const Agency = require("../models/Agency");
const Company = require("../models/Company");
const Contact = require("../models/Contact");
const Equipment = require("../models/Equipment");
const Ticket = require("../models/Ticket");
const TicketDetails = require("../models/TicketDetails");

const getTicket = async (req, res = response) => {
  const ticket = await Ticket.find();
  const equipment = await Equipment.find();
  const agency = await Agency.find();
  const company = await Company.find();
  const detailTicket = await TicketDetails.find();
  const contact = await Contact.find();
  var mapCompany = {};
  company.map((com) => {
    mapCompany[com.id.toString()] = {
      id: com.id,
      name: com.name,
    };
  });
  var mapAgency = {};
  agency.map((agen) => {
    mapAgency[agen.id.toString()] = {
      id: agen.id,
      nameAgency: agen.nameAgency,
    };
  });
  var mapEquipment = {};
  equipment.map((equip) => {
    mapEquipment[equip.id.toString()] = {
      id: equip.id,
      serie: equip.serie,
      type: equip.type,
      make: equip.make,
      model: equip.model,
    };
  });
  var mapContact = {};
  contact.map((contact) => {
    mapContact[contact.id.toString()] = {
      id: contact.id,
      name: contact.name,
      lastname: contact.lastname,
    };
  });

  for (var i = 0; i < ticket.length; i++) {
    var IDticket = ticket[i].id;
    var idTicket = detailTicket.filter((ticket) => ticket.ticket === IDticket);
    // console.log(IDticket, idTicket);
    var equipList = [];
    ticket.map((elem) => {
      equipList.push({
        id: elem.id,
        company: mapCompany[elem.company],
        agency: mapAgency[elem.agency],
        contact: mapContact[elem.contact],
        city: elem.city,
        equipment: mapEquipment[elem.equipment],
        cnt: elem.cnt,
        typeService: elem.typeService,
        entity: elem.entity,
        code: elem.code,
        status: elem.status,
        details: idTicket,
      });
    });
  }

  return res.json({
    ok: true,
    ticket: equipList,
  });
};
const getTicketId = async (req, res = response) => {
  const ticketId = req.params.id;
  console.log(ticketId);
  try {
    const company = await Company.find();
    const agency = await Agency.find();
    const equipment = await Equipment.find();
    const contact = await Contact.find();
    const ticket = await Ticket.findById(ticketId);
    const detailsTicket = await TicketDetails.find();
    const detailTicket = detailsTicket.filter(
      (ticket) => ticket.ticket === ticketId
    );
    const detailLimpios = detailTicket.map((detail) => {
      return {
        templateDetail: detail.templateDetail,
        value: detail.value,
      };
    });
    var mapEquipment = {};
    equipment.map((equip) => {
      mapEquipment[equip.id.toString()] = {
        id: equip.id,
        serie: equip.serie,
        type: equip.type,
        make: equip.make,
        model: equip.model,
      };
    });
    var mapContact = {};
    contact.map((contact) => {
      mapContact[contact.id.toString()] = {
        id: contact.id,
        name: contact.name,
        lastname: contact.lastname,
      };
    });
    return res.json({
      ok: true,
      ticket: {
        id: ticket.id,
        code: ticket.code,
        typeService: ticket.typeService,
        entity: ticket.entity,
        company: ticket.company,
        agency: ticket.agency,
        template: ticket.template,
        city: ticket.city,
        contact: ticket.contact,
        cnt: ticket.cnt,
        equipment: ticket.equipment,
        status: ticket.status,
        details: detailLimpios,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const postTicket = async (req, res = response) => {
  const ticket = new Ticket(req.body);
  var detailsList = [];
  for (var i = 0; i < req.body.details.length; i++) {
    detailsList.push({
      ticket: ticket._id,
      templateDetail: req.body.details[i]["templateDetail"],
      value: req.body.details[i].value,
    });
  }
  TicketDetails.insertMany(detailsList);
  try {
    const ticketSave = await ticket.save();

    return res.json({
      ok: true,
      ticket: ticketSave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const updateTicket = async (req, res = response) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        ok: false,
        msg: "Ticket no existe por ese id",
      });
    }
    const newTicket = {
      ...req.body,
    };
    const ticketUpdate = await Ticket.findByIdAndUpdate(ticketId, newTicket, {
      new: true,
    });
    return res.json({
      ok: true,
      ticket: ticketUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteTicket = async (req, res = response) => {
  const ticketId = req.params.id;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        ok: false,
        msg: "Ticket no existe por ese id",
      });
    }
    await Ticket.findByIdAndDelete(ticketId);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  getTicket,
  postTicket,
  updateTicket,
  deleteTicket,
  getTicketId,
};

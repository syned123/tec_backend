const { response } = require("express");
const Agency = require("../models/Agency");
const Company = require("../models/Company");
const Equipment = require("../models/Equipment");
const Ticket = require("../models/Ticket");

const getTicket = async (req, res = response) => {
  const ticket = await Ticket.find();
  const equipment = await Equipment.find();
  const agency = await Agency.find();
  const company = await Company.find();
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

  var equipList = [];
  ticket.map((elem) => {
    equipList.push({
      id: elem.id,
      company: mapCompany[elem.company],
      agency: mapAgency[elem.agency],
      city: elem.city,
      equipment: mapEquipment[elem.equipment],
      cnt: elem.cnt,
      typeService: elem.typeService,
      entity: elem.entity,
      code: elem.code,
      status: elem.status,
    });
  });
  return res.json({
    ok: true,
    ticket: equipList,
  });
};
const postTicket = async (req, res = response) => {
  const ticket = new Ticket(req.body);
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
module.exports = { getTicket, postTicket, updateTicket, deleteTicket };

const { response } = require("express");
const Company = require("../models/Company");
const Contact = require("../models/Contact");

const getContact = async (req, res = response) => {
  const contact = await Contact.find();
  const company = await Company.find();
  var mapcompany = {};
  company.map((comp) => {
    mapcompany[comp.id.toString()] = {
      id: comp.id,
      name: comp.name,
    };
  });
  var contactList = [];
  contact.map((elem) => {
    contactList.push({
      id: elem.id,
      name: elem.name,
      lastname: elem.lastname,
      phone: elem.phone,
      charge: elem.charge,
      company: mapcompany[elem.company],
    });
  });
  res.json({
    ok: true,
    contactList,
  });
};
const postContact = async (req, res = response) => {
  const contact = new Contact(req.body);
  try {
    const contactSave = await contact.save();
    res.json({
      ok: true,
      contact: contactSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const updateContact = async (req, res = response) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({
        ok: false,
        msg: "Contacto no existe por ese id",
      });
    }
    const newContact = {
      ...req.body,
    };
    const contactUpdate = await Contact.findByIdAndUpdate(
      contactId,
      newContact,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      contact: contactUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteContact = async (req, res = response) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({
        ok: false,
        msg: "Contacto no existe por ese id",
      });
    }
    await Contact.findByIdAndDelete(contactId);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getContact,
  postContact,
  updateContact,
  deleteContact,
};

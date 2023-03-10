const { response } = require("express");
const Agency = require("../models/Agency");
const Company = require("../models/Company");

const getAgency = async (req, res = response) => {
  const agency = await Agency.find();
  const company = await Company.find();
  var mapcompany = {};
  company.map((comp) => {
    mapcompany[comp.id.toString()] = {
      id: comp.id,
      name: comp.name,
    };
  });
  var agencyList = [];
  agency.map((elem) => {
    agencyList.push({
      id: elem.id,
      nameAgency: elem.nameAgency,
      adress1: elem.adress1,
      department: elem.department,
      city: elem.city,
      company: mapcompany[elem.company],
    });
  });
  return res.json({
    ok: true,
    agencyList,
  });
};
const postAgency = async (req, res = response) => {
  const agency = new Agency(req.body);
  try {
    const agencySave = await agency.save();
    return res.json({
      ok: true,
      agency: agencySave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const updateAgency = async (req, res = response) => {
  const agencyId = req.params.id;
  try {
    const agency = await Agency.findById(agencyId);
    if (!agency) {
      res.status(404).json({
        ok: false,
        msg: "Agencia no existe por ese id",
      });
    }
    const newAgency = {
      ...req.body,
    };
    const agencyUpdate = await Agency.findByIdAndUpdate(agencyId, newAgency, {
      new: true,
    });
    res.json({
      ok: true,
      agency: agencyUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteAgency = async (req, res = response) => {
  const agencyId = req.params.id;
  try {
    const agency = await Agency.findById(agencyId);
    if (!agency) {
      res.status(404).json({
        ok: false,
        msg: "Agencia no existe por ese id",
      });
    }
    await Agency.findByIdAndDelete(agencyId);
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
  getAgency,
  postAgency,
  updateAgency,
  deleteAgency,
};

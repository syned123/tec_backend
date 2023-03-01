const { response } = require("express");
const Company = require("../models/Company");
const getCompany = async (req, res = response) => {
  const company = await Company.find();
  return res.json({
    ok: true,
    company,
  });
};
const postCompany = async (req, res = response) => {
  const company = new Company(req.body);
  try {
    const companySave = await company.save();
    return res.json({
      ok: true,
      company: companySave,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const updateCompany = async (req, res = response) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      res.status(404).json({
        ok: false,
        msg: "Company no existe por ese id",
      });
    }
    const newCompany = {
      ...req.body,
    };
    const companyUpdate = await Company.findByIdAndUpdate(
      companyId,
      newCompany,
      { new: true }
    );
    return res.json({
      ok: true,
      company: companyUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteCompany = async (req, res = response) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        ok: false,
        msg: "Company no existe por ese id",
      });
    }

    await Company.findByIdAndDelete(companyId);
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
  getCompany,
  postCompany,
  updateCompany,
  deleteCompany,
};

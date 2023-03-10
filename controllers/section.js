const { response } = require("express");
const Section = require("../models/Section");

const getSection = async (req, res = response) => {
  const section = await Section.find();
  return res.json({
    ok: true,
    section
  })
};
const postSection = async (req, res = response) => {
  const section = new Section(req.body);
  try {
    const sectionSave = await section.save();
    return res.json({
      ok: true,
      section: sectionSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = { getSection, postSection };

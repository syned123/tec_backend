const { response } = require("express");
const TemplateDetail = require("../models/TemplateDetail");
const getTemplateDetail = async (req, res = response) => {
  const templateDetail = await TemplateDetail.find();
  return res.json({
    ok: true,
    templateDetail,
  });
};
module.exports = { getTemplateDetail };

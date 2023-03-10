const { response } = require("express");
const Section = require("../models/Section");
const Template = require("../models/Template");
const TemplateDetail = require("../models/TemplateDetail");

const getTemplateID = async (req, res = response) => {
  const templateId = req.params.templateId;
  try {
    const template = await Template.findById(templateId);
    if (!template) {
      res.status(404).json({
        ok: false,
        msg: "template no existe por ese id",
      });
    }
    res.json({
      ok: true,
      template: template,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const templateCode = async (req, res = response) => {
  function get_template(cb) {
    var query = Template.find({
      code: req.params.templateCode,
    });
    query.exec((listError, templates) => {
      var template = null;
      if (!listError && templates && templates[0]) {
        template = templates[0];
      }
      cb(template, listError);
    });
  }
  function getSectionsAndDetails(template, cb) {
    var query = Section.find({
      template: template._id,
    });
    query.exec((error, sections) => {
      var queryDetails = TemplateDetail.find({
        template: template._id,
      });
      queryDetails.exec((err, details) => {
        cb({
          sections: sections || [],
          details: details || [],
        });
      });
    });
  }
  const finishGetMongo = (template, error) => {
    if (!template && !error) {
      return res.status(404).json({ message: "Template not found." });
    }
    if (error) {
      return res.status(500).json({
        message: "An error happen on Templates.",
        err: error,
      });
    }
    getSectionsAndDetails(template, (sectionsDetails) => {
      var seccionesLimpias = sectionsDetails.sections.map((section) => {
        var details = [];
        for (var i = 0; i < sectionsDetails.details.length; i++) {
          if (
            section._id.toString() ==
            sectionsDetails.details[i].section.toString()
          ) {
            details.push({
              label: sectionsDetails.details[i].label,
              code: sectionsDetails.details[i].code,
              type: sectionsDetails.details[i].type,
              position: sectionsDetails.details[i].position,
            });
          }
        }
        return {
          name: section.name,
          code: section.code,
          order: section.order,
          details: details,
        };
      });
      var templateLimpio = {
        id: template._id,
        name: template.name,
        code: template.code,
        sections: seccionesLimpias,
      };
      res.json(templateLimpio);
    });
  };
  get_template(finishGetMongo);
};
module.exports = { getTemplateID, templateCode };

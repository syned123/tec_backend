const mongoose = require("mongoose");
const Section = require("../models/Section");
const Template = require("../models/Template");
const TemplateDetail = require("../models/TemplateDetail");

const DefaultTemplates = () => {
  function create_template_details(template, sections, cb) {
    const types = {
      textArea: "TEXTAREA",
      boolean: "BOOLEANOPTION",
      check: "CHECK",
      checkOne: "CHECKONE",
      table: "TABLE",
    };
    var list = [
      {
        label: "",
        code: "DESC_FALLA",
        type: types.textArea,
        position: 0,
        template: template._id,
        section: sections.DESCRIPCION_FALLA._id,
      },
      {
        label: "Limpieza de Roller de Goma",
        code: "LIM_ROLLER_GOMA",
        type: types.check,
        position: 0,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de Rodamientos Metalicos",
        code: "LIM_RODA_META",
        type: types.check,
        position: 1,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de Sensores Externos",
        code: "LIM_SEN_EXT",
        type: types.check,
        position: 2,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de Sensores Internos",
        code: "LIM_SEN_INT",
        type: types.check,
        position: 3,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de Sensores de Rodamientos Plasticos",
        code: "LIM_SEN_RODAMI_PLAS",
        type: types.check,
        position: 4,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de DISPLAY y Panel de Opciones",
        code: "LIM_DIS_PANEL_OPC",
        type: types.check,
        position: 5,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Limpieza de CASE",
        code: "LIM_CASE",
        type: types.check,
        position: 6,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },

      {
        label: "Limpieza de Sensores UV",
        code: "LIM_SEN_UV",
        type: types.checkOne,
        position: 0,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Calibracion de Sensores IR",
        code: "CAL_SEN_IR",
        type: types.checkOne,
        position: 1,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Calibracion de Sensores MG",
        code: "CAL_SEN_MG",
        type: types.checkOne,
        position: 2,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Calibracion de CIS",
        code: "CAL_CIS",
        type: types.checkOne,
        position: 3,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Calibracion Sensor de Espesor",
        code: "CAL_SEN_ESPE",
        type: types.checkOne,
        position: 4,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Calibracion de Regleta",
        code: "CAL_REGLE",
        type: types.checkOne,
        position: 5,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "Pruebas de Papel Blanco",
        code: "PRU_PAP_BLA_GR",
        type: types.checkOne,
        position: 6,
        template: template._id,
        section: sections.REPORTE_MANTENIMIENTO._id,
      },
      {
        label: "",
        code: "REPU_TABLE",
        type: types.table,
        position: 0,
        template: template._id,
        section: sections.REPUESTOS_CONSUMIBLES_UTILIZADOS._id,
      },
      {
        label: "",
        code: "DESC_SER_PRES",
        type: types.textArea,
        position: 0,
        template: template._id,
        section: sections.DESCRIPCION_SERVICIO_PRESTADO._id,
      },
      {
        label: "",
        code: "OBSER",
        type: types.textArea,
        position: 0,
        template: template._id,
        section: sections.OBSERVACIONES._id,
      },
    ];
    TemplateDetail.insertMany(list, (error, createdDetails) => {
      if (error) {
        return console.log(
          "DEFAULT: an error happend on detail creation",
          error
        );
      }
      cb(createdDetails);
    });
  }
  function create_sections(template, cb) {
    var list = [
      {
        name: "Descripción De La Falla",
        code: "DESCRIPCION_FALLA",
        order: 1,
        template: template._id,
      },
      {
        name: "Reporte De Mantenimiento",
        code: "REPORTE_MANTENIMIENTO",
        order: 2,
        template: template._id,
      },
      {
        name: "Repuestos Y/O Consumibles Utilizados",
        code: "REPUESTOS_CONSUMIBLES_UTILIZADOS",
        order: 3,
        template: template._id,
      },
      {
        name: "Descripción Del Servicio Prestado",
        code: "DESCRIPCION_SERVICIO_PRESTADO",
        order: 4,
        template: template._id,
      },
      {
        name: "Observaciones",
        code: "OBSERVACIONES",
        order: 5,
        template: template._id,
      },
    ];
    Section.insertMany(list, (error, createdSections) => {
      if (error) {
        return console.log(
          "DEFAULT: an Error Happend on section creation",
          error
        );
      }
      var mappedSections = {};
      createdSections.map((section) => {
        mappedSections[section.code] = section;
      });
      cb(mappedSections);
    });
  }
  function create_template(createTemplate) {
    var query = Template.find({ code: "TEMPLATE_SERVICIO_MANTENIMIENTO" });
    query.exec((listError, templates) => {
      if (listError) {
        return console.log(
          "DEFAULT: an Error Happend when getting template list",
          listError
        );
      }
      if (!templates.length) {
        Template.create(
          {
            name: "Servicio de mantenimiento",
            code: "TEMPLATE_SERVICIO_MANTENIMIENTO",
            description: "Es un un template para el servicio de mantenimiento",
          },
          (error, createdTemplate) => {
            if (error) {
              return console.log(
                "DEFAULT: an Error Happend on template creation",
                error
              );
            }
            createTemplate(createdTemplate);
          }
        );
      } else {
        console.log("DEFAULT: Already created Templated data.");
      }
    });
  }
  function install() {
    console.log("Instalation has been started...");
    console.log("Creating template...");
    create_template((template) => {
      console.log("Template has been created.");
      //console.log("install",template);
      console.log("Creating sections...");
      create_sections(template, (sections) => {
        console.log("Sections have been created.");
        console.log("Creating template details...");
        //console.log("return sections", sections)
        create_template_details(template, sections, (templateDetails) => {
          //console.log("return template details:", templateDetails)
          console.log("Template details have been created.");
          console.log("Instalation finished.");
        });
      });
    });
  }
  return { install: install };
};
module.exports = DefaultTemplates;

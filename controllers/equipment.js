const { response } = require("express");
const Equipment = require("../models/Equipment");

const getEquipment = async (req, res = response) => {
  const equipment = await Equipment.find();
  res.json({
    ok: true,
    equipment,
  });
};
const postEquipment = async (req, res = response) => {
  const equipment = new Equipment(req.body);
  try {
    const equipmentSave = await equipment.save();
    res.json({
      ok: true,
      equipment: equipmentSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const updateEquipment = async (req, res = response) => {
  const equipmentId = req.params.id;
  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      res.status(404).json({
        ok: false,
        msg: "Equipo no existe por ese id",
      });
    }
    const newEquipment = {
      ...req.body,
    };
    const equipmentUpdate = await Equipment.findByIdAndUpdate(
      equipmentId,
      newEquipment,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      equipment: equipmentUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteEquipment = async (req, res = response) => {
  const equipmentId = req.params.id;
  try {
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      res.status(404).json({
        ok: false,
        msg: "Equipo no existe por ese id",
      });
    }
    await Equipment.findByIdAndDelete(equipmentId);
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
  getEquipment,
  postEquipment,
  updateEquipment,
  deleteEquipment,
};

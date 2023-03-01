const { Router } = require("express");
const router = Router();
const {
  getEquipment,
  postEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipment");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getEquipment", getEquipment);
router.post("/postEquipment", [validarCampos], postEquipment);
router.put("/updateEquipment/:id", updateEquipment);
router.delete("/deleteEquipment/:id", deleteEquipment);
module.exports = router;

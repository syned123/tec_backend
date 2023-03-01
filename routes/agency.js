const { Router } = require("express");
const router = Router();
const {
  getAgency,
  postAgency,
  updateAgency,
  deleteAgency,
} = require("../controllers/agency");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getAgency", getAgency);
router.post("/postAgency", [validarCampos], postAgency);
router.put("/updateAgency/:id", updateAgency);
router.delete("/deleteAgency/:id", deleteAgency);
module.exports = router;

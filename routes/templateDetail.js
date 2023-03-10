const { Router } = require("express");
const { getTemplateDetail } = require("../controllers/templateDetail");

const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getTemplateDetail", getTemplateDetail);
// router.post("/postSection", postSection);
// router.put("/updateAgency/:id", updateAgency);
// router.delete("/deleteAgency/:id", deleteAgency);
module.exports = router;

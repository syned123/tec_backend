const { Router } = require("express");
const { getSection, postSection } = require("../controllers/section");
const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getSection", getSection);
router.post("/postSection", postSection);
// router.put("/updateAgency/:id", updateAgency);
// router.delete("/deleteAgency/:id", deleteAgency);
module.exports = router;

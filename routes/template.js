const { Router } = require("express");
const { getTemplateID, templateCode } = require("../controllers/template");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.use(validarJWT);

router.get("/:templateId", getTemplateID);
router.get("/bycode/:templateCode", templateCode);

// router.post("/postAgency", [validarCampos], postAgency);
// router.put("/updateAgency/:id", updateAgency);
// router.delete("/deleteAgency/:id", deleteAgency);
module.exports = router;

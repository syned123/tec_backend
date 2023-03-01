const { Router } = require("express");
const router = Router();
const {
  getContact,
  postContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getContact", getContact);
router.post("/postContact", [validarCampos], postContact);
router.put("/updateContact/:id", updateContact);
router.delete("/deleteContact/:id", deleteContact);
module.exports = router;

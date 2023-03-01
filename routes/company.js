const { Router } = require("express");
const router = Router();
const {
  getCompany,
  postCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
router.use(validarJWT);
router.get("/getCompany", getCompany);
router.post("/postCompany", [validarCampos], postCompany);
router.put("/updateCompany/:id", updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);
module.exports = router;

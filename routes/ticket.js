const { Router } = require("express");
const {
  getTicket,
  postTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.use(validarJWT);
router.get("/getTicket", getTicket);
router.post("/postTicket", [validarCampos], postTicket);
router.put("/updateTicket/:id", updateTicket);
router.delete("/deleteTicket/:id", deleteTicket);
module.exports = router;

const { Router } = require("express");
const {
  getTicket,
  postTicket,
  updateTicket,
  deleteTicket,
  getTicketId,
} = require("../controllers/ticket");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.use(validarJWT);
router.get("/", getTicket);
router.post("/",  postTicket);
router.get("/:id", getTicketId)
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
module.exports = router;

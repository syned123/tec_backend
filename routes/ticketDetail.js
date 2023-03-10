const { Router } = require("express");
const { getTicketDetail, postTicketDetail } = require("../controllers/ticketDetails");

const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.use(validarJWT);
router.get("/", getTicketDetail);
router.post("/", postTicketDetail);
// // router.get("/getTicketId/:ticketId", getTicketId);
// router.put("/updateTicketDetail/:id", updateTicketDetail);
// router.delete("/deleteTicketDetail/:id", deleteTicketDetail);
module.exports = router;

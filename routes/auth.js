const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUser,
  putUser,
  deleteUser,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post("/new", [validarCampos], crearUsuario);
router.post("/", [validarCampos], loginUsuario);
router.get("/renew", validarJWT, revalidarToken);
router.get("/getuser", validarJWT, getUser);
router.put("/putUser/:id", validarJWT, putUser);
router.delete("/deleteUser/:id", validarJWT, deleteUser);
module.exports = router;

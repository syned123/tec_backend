const { response } = require("express");
const jwt = require("jsonwebtoken");
const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la peticion",
    });
  }
  try {
    const { uid, name, lastname, rol } = jwt.verify(token, "tecnogenia");
    req.uid = uid;
    req.name = name;
    req.lastname = lastname;
    req.rol = rol;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
  next();
};
module.exports = {
  validarJWT,
};

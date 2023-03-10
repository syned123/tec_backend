const jwt = require("jsonwebtoken");

const generarJWT = (uid, name, lastname, rol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, lastname, rol };
    jwt.sign(
      payload,
      "tecnogenia",
      {
        expiresIn: "3h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generarJWT };

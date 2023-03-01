const { response } = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);

    //encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    const token = await generarJWT(usuario.id, usuario.name);
    return res.status(201).json({
      ok: true,
      id: usuario.id,
      name: usuario.name,
      lastname: usuario.lastname,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }
    //confirmar password

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      id: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const revalidarToken = async (req, res = response) => {
  const { id, name } = req;
  const token = await generarJWT(id, name);
  res.json({
    ok: true,
    id,
    name,
    token,
  });
};
const getUser = async (req, res = response) => {
  const user = await Usuario.find();
  res.json({
    ok: true,
    user,
  });
};
const putUser = async (req, res = response) => {
  const userId = req.params.id;
  try {
    const user = await Usuario.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese id",
      });
    }
    const newUser = {
      ...req.body,
    };
    const userUpdate = await Usuario.findByIdAndUpdate(userId, newUser, {
      new: true,
    });
    return res.json({
      ok: true,
      user: userUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const deleteUser = async(req, res = response) => {
  const userId = req.params.id;
  try {
    const user = await Usuario.findById(userId);
    if (!user) {
      res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese id",
      });
    }
    await Usuario.findByIdAndDelete(userId);
    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getUser,
  putUser,
  deleteUser,
};

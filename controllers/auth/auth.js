const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Agente = require("../../models/agentes/agente");
const { generarJWT } = require("../../helpers/generar-jwt");


const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const agente = await Agente.findOne({ where: { email} });
    if (!agente) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }
   // SI el usuario está activo
      if ( !agente.estado ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false'
        });
    }
    // console.log(agente);
    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, agente.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }
     

    // Generar el JWT
    const token = await generarJWT(agente.id);

    res.json({
      agente,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const validarTokenagente = async (req, res = response) => {
  // Generar el JWT
  const token = await generarJWT(req.agente.id);
  // console.log(token,req.agente.id);
  res.json({
    agente: req.agente,
    token: token,
  });
};

module.exports = {
  login,
  validarTokenagente,
};

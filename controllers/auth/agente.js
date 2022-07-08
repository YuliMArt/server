const { response } = require("express");
const Agente = require("../../models/agentes/agente");
const { io } = require("../../server/server");
const agentesGet = async (req = request, res = response) => {
  // const { limite = 5, desde = 0 } = req.query;

  const { count: total, rows: agentes } = await Agente.findAndCountAll({
    where: { estado: true },
  });
  res.json({
    total,
    agentes,
  });
};
const agentePost = async (req, res = response) => {
  const {name, email, password, rol = "USER_ROLE",permisos } = req.body;

console.log(name, email, password);

  // const Agentei = new Agente({
  //   id: uuidv4(),
  //   nombre,
  //   email,
  //   password,
  //   img: "",
  //   rol,
  // });

  // // Encriptar la contraseña
  // const salt = bcryptjs.genSaltSync();
  // Agentei.password = bcryptjs.hashSync(password, salt);

  // // Guardar en BD
  // await Agentei.save();
  // const agente = await Agente.findByPk(Agentei.id);

  // res.json(agente);
  res.json({ok:true});
};
const agentesPut = async (req, res = response) => {
  let { id, password, email, rol, nombre } = req.body;
let agente="";
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    password = bcryptjs.hashSync(password, salt);
  }
  if (password.length > 0) {
    agente = await Agente.update(
      { nombre, email, password, rol },
      {
        where: { id: id },
      }
    );
  } else {
   agente = await Agente.update(
      { nombre, email, rol },
      {
        where: { id: id },
      }
    );
  }
  res.json(agente);
};
const agentesDelete = async (req, res = response) => {
  const { id } = req.params;
  const agente = await Agente.update({ estado: false }, { where: { id } });

  res.json(agente);
};
module.exports = {
  agentePost,
  agentesGet,
  agentesPut,
  agentesDelete,
};

const Agente = require("../models/agentes/agente");
const Rol = require("../models/agentes/role");

const esRoleValido = async (rol = "USER_ROLE") => {
  const existeRol = await Rol.findOne({ where: { rol } });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (email = "") => {
  // Verificar si el email existe{ where: { title: 'My Title' } }
  const existeEmail = await Agente.findOne({ where: { email } });

  if (existeEmail) {
    throw new Error(`El email: ${email}, ya está registrado`);
  }
};

const existeAgentePorId = async (id) => {
  // Verificar si el email existe

  const existeAgente = await Agente.findByPk(id);
  if (!existeAgente) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,

  existeAgentePorId,
  coleccionesPermitidas,
};

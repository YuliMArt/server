const { check } = require("express-validator");
const { Router } = require("express");
const {
  emailExiste,
  esRoleValido,
  existeAgentePorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { agentePost, agentesGet, agentesPut, agentesDelete } = require("../controllers/auth/agente");
// ! ruta ** /api/agente
const router = Router();

router.get("/", agentesGet);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // check("rol").custom(esRoleValido),
    validarCampos,
  ],
  agentePost
);
router.put(
  "/:id",
  [
    check("id").custom(existeAgentePorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  agentesPut
);

router.delete('/:id',[
    check('id').custom( existeAgentePorId ),
    validarCampos
],agentesDelete );



module.exports = router;

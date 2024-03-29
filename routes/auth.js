const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth/auth");
const { validarCampos } = require("../middlewares/validar-campos");
// !ruta **/api/login
const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);


// router.get("/", [validarJWT], validarTokenUsuario);

module.exports = router;

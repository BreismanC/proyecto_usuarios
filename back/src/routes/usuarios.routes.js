const express = require("express");
const router = express.Router();

const {
  getUsuarios,
  getUsuarioById,
  postUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../controllers/usuarios.controllers");

router.get("/", getUsuarios);

router.get("/:id", getUsuarioById);

router.post("/", postUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

module.exports = router;

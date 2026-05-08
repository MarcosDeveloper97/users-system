const express = require("express");

const router = express.Router();

const {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
} = require("../controllers/usuariosController");

router.get("/", listarUsuarios);

router.get("/:id", buscarUsuario);

router.post("/", criarUsuario);

router.put("/:id", atualizarUsuario);

router.delete("/:id", deletarUsuario);

module.exports = router;
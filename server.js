const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let usuarios = [];

if (fs.existsSync("usuarios.json")) {
    usuarios = JSON.parse(fs.readFileSync("usuarios.json"));
}

function salvarDados() {
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2));
}

// ================= ROTAS =================

// Listar usuarios
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// Buscar por ID
app.get("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }

    res.json(usuario);
});

// Criar usuario
app.post("/usuarios", (req, res) => {
    const { nome, idade } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "Nome invalido" });
    }

    if (!idade || idade <= 0) {
        return res.status(400).json({ erro: "Idade invalida" });
    }

    const novoUsuario = {
        id: Date.now(),
        nome,
        idade
    };

    usuarios.push(novoUsuario);
    salvarDados();

    res.status(201).json(novoUsuario);
});

// Atualizar usuario
app.put("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }

    usuario.nome = nome;
    usuario.idade = idade;

    salvarDados();

    res.json(usuario);
});

// Deletar usuario
app.delete("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Usuario nao encontrado" });
    }

    usuarios.splice(index, 1);
    salvarDados();

    res.json({ mensagem: "Usuario excluido" });
});

// ================= SERVER =================
app.listen(3001, "127.0.0.1", () => {
    console.log("Servidor rodando em http://127.0.0.1:3001");
});
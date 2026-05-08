const fs = require("fs");

let usuarios = [];

if (fs.existsSync("data/usuarios.json")) {
    usuarios = JSON.parse(fs.readFileSync("data/usuarios.json"));
}

function salvarDados() {
    fs.writeFileSync(
        "data/usuarios.json",
        JSON.stringify(usuarios, null, 2)
    );
}

function listarUsuarios(req, res) {
    res.json(usuarios);
}

function buscarUsuario(req, res) {
    const id = Number(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuario nao encontrado"
        });
    }

    res.json(usuario);
}

function criarUsuario(req, res) {
    const { nome, idade } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome invalido"
        });
    }

    if (!idade || idade <= 0) {
        return res.status(400).json({
            erro: "Idade invalida"
        });
    }

    const novoUsuario = {
        id: Date.now(),
        nome,
        idade
    };

    usuarios.push(novoUsuario);

    salvarDados();

    res.status(201).json(novoUsuario);
}

function atualizarUsuario(req, res) {
    const id = Number(req.params.id);

    const { nome, idade } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({
            erro: "Usuario nao encontrado"
        });
    }

    usuario.nome = nome;
    usuario.idade = idade;

    salvarDados();

    res.json(usuario);
}

function deletarUsuario(req, res) {
    const id = Number(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Usuario nao encontrado"
        });
    }

    usuarios.splice(index, 1);

    salvarDados();

    res.json({
        mensagem: "Usuario excluido"
    });
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
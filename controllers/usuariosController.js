const db = require("../database/db");

function listarUsuarios(req, res) {
    db.all("SELECT * FROM usuarios", [], (erro, rows) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar usuarios"
            });
        }

        res.json(rows);
    });
}

function buscarUsuario(req, res) {
    const id = Number(req.params.id);

    db.get(
        "SELECT * FROM usuarios WHERE id = ?",
        [id],
        (erro, row) => {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao buscar usuario"
                });
            }

            if (!row) {
                return res.status(404).json({
                    erro: "Usuario nao encontrado"
                });
            }

            res.json(row);
        }
    );
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

    db.run(
        "INSERT INTO usuarios (nome, idade) VALUES (?, ?)",
        [nome, idade],
        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao criar usuario"
                });
            }

            res.status(201).json({
                id: this.lastID,
                nome,
                idade
            });
        }
    );
}

function atualizarUsuario(req, res) {
    const id = Number(req.params.id);
    const { nome, idade } = req.body;

    db.run(
        "UPDATE usuarios SET nome = ?, idade = ? WHERE id = ?",
        [nome, idade, id],
        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao atualizar"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Usuario nao encontrado"
                });
            }

            res.json({
                id,
                nome,
                idade
            });
        }
    );
}

function deletarUsuario(req, res) {
    const id = Number(req.params.id);

    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        function (erro) {
            if (erro) {
                return res.status(500).json({
                    erro: "Erro ao deletar"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: "Usuario nao encontrado"
                });
            }

            res.json({
                mensagem: "Usuario excluido"
            });
        }
    );
}

module.exports = {
    listarUsuarios,
    buscarUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
};
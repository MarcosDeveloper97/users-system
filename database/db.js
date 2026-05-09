const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db", (erro) => {
    if (erro) {
        console.log("Erro ao conectar no banco");
    } else {
        console.log("Banco conectado");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL
    )
`);

module.exports = db;
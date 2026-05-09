const express = require("express");
const app = express();

require("./database/db");

app.use(express.json());

const usuariosRoutes = require("./routes/usuarios");

app.use("/usuarios", usuariosRoutes);

app.listen(3001, "127.0.0.1", () => {
    console.log(
        "Servidor rodando em http://127.0.0.1:3001"
    );
});
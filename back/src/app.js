const express = require("express");
const app = express();

//Importacion de las rutas
const usuarios = require("./routes/usuarios.routes");

//Middlewares
app.use(express.json());

//Ruta home
app.get("/", (req, resp) => {
  resp.send("Prueba de servidor ");
});

//Ruta "usuarios"
app.use("/usuarios", usuarios);

module.exports = app;

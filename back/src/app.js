const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

// Import routes
const users = require("./routes/users.routes");

//Middlewares
//Permite analizar que a través de los cuerpos de la petición se utiliza UTF-8
app.use(express.urlencoded({ extended: false }));

//Permite la transferencia de archivos en formato JSON
app.use(express.json());

//Evitar problemas de cors
//Configuraciones de cabecera
//Permite las funciones de HTTP
app.use((req, res, next) => {
  res.header("Access-control-Allow-origin", "*");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Permitir el manejo de archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

//Permitir el acceso a los archivos estaticos
app.use("/public", express.static(path.join(__dirname, "..", "public")));

//Ruta home
app.get("/", (req, resp) => {
  resp.send("Prueba de servidor ");
});

//Rout "user"
app.use("/users", users);

module.exports = app;

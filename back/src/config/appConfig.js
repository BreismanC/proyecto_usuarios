const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");

//App configuration
const appConfig = (app) => {
  //Permite analizar que a través de los cuerpos de la petición se utiliza UTF-8 y pueda recibir formularios
  app.use(express.urlencoded({ extended: false }));

  //Permite la transferencia de archivos en formato JSON
  app.use(express.json());

  //Permite evitar problemas con CORS
  app.use(cors());

  //Creación de logs por cada petición hecha
  app.use(morgan("dev"));

  //Permitir el manejo de archivos
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/temp/",
    })
  );

  //Permitir el acceso a los archivos estaticos
  app.use("/public", express.static(path.join(__dirname, "../..", "public")));
};

module.exports = appConfig;

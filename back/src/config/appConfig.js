const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");

//App configuration
const appConfig = (app) => {
  //Permite analizar que a través de los cuerpos de la petición se utiliza UTF-8 y pueda recibir formularios
  app.use(express.urlencoded({ extended: false }));

  //Permite la transferencia de archivos en formato JSON
  app.use(express.json());

  //Evitar problemas de cors
  //Configuraciones de cabecera
  //Permite las funciones de HTTP
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

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

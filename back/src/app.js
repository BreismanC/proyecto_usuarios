const express = require("express");
const app = express();
const appConfig = require("./config/appConfig");
const routerConfig = require("./config/routerConfig");

//Configuracion de la app
appConfig(app);
routerConfig(app);

module.exports = app;

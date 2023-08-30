const express = require("express");
const app = express();
const appConfig = require("./config/appConfig");
const routerConfig = require("./config/routerConfig");

//App configuration and Router configuration
appConfig(app);
routerConfig(app);

module.exports = app;

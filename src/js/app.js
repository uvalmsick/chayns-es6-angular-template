import angular from "angular";
import Config from "./config/config";
import AppController from "./controllers/app";

let app = angular.module("app", [])
    .config(Config.get)
    .controller("appController", AppController);

export default app;
import angular from "angular";
import app from "../app";

angular.element(document).ready(() => {
    chayns.ready.then(() => {
        angular.bootstrap(document, [app.name]);
    });
});

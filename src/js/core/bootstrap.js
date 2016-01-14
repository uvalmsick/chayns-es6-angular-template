import angular from "angular";
import app from "../app";

angular.element(document).ready(() => {
    chayns.ready.then(() => {
        angular.bootstrap(document, [app.name]);
    });
    angular.bootstrap(document, [app.name]);
});

window.addEventListener('load', function(e) {
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            window.location.reload(true);
        }
    }, false);

}, false);
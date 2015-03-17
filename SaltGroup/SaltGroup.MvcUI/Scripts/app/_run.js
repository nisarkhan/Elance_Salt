(function () {
    require(["/Scripts/app/_config-paths"], function (paths) {
        require.config({
            paths: paths
        });
        require(["ko", "app"], function (ko, app) {
            app.initialize();
            ko.applyBindings(app);
        });
    });
})();

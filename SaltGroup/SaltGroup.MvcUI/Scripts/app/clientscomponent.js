define(["ko", "clients"], function (ko, clients) {
    function getProto(params) {
        var F = function () { };
        F.prototype = clients.create(params.app, params.datamodel, params.sammy);

        return new F();
    }

    return getProto;
});


define(["ko", "lists", "clients-search"], function (ko, lists, search) {
    var options = {
        name: "Clients",
        bindingMemberName: "clients",
        hashDefault: "/clients/index",
        factory: create
    };

    ko.components.register("clients-search", {
        template: { require: "text!templates/clients-search.html" },
        viewModel: { require: "clients-search" }
    });

    function create(app, datamodel) {
        function urlItemInfo(item) {
            return "#/" + app.controller() + "/display/" + item.ClientPKID();
        }

        function urlItemEdit(item) {
            return "#/" + app.controller() + "/edit/" + item.ClientPKID();
        }

        var F = function () { };
        F.prototype = lists(app, datamodel);
        F.prototype.urlItemEdit = urlItemEdit;
        F.prototype.urlItemInfo = urlItemInfo;

        var retval = new F();
        retval.entityName(options.name);
        retval.headPage("Clients information");
        retval.setOrder("CustomerID");

        return retval;
    }

    return {
        options: options,
        create: create
    };
});


define(["ko", "forms"], function (ko, forms) {
    // Components register
    ko.components.register("clients-display", {
        template: { require: "text!templates/clients-display-tmpl" }
    });
    ko.components.register("clients-edit", {
        template: { require: "text!templates/clients-edit-tmpl" }
    });

    function ClientsForm(settings) {
        // Configuration variables.
        var app = settings.app;
        var datacontext = settings.datamodel.datacontext;
        var sammy = settings.sammy;

        var F = function () { };
        F.prototype = forms({
            app: app,
            datacontext: datacontext,
            shell: settings.shell,
            entityName: settings.shell.entityName,
            editTmpl: "clients-edit",
            displayTmpl: "clients-display",
            editHead: "Clients update",
            insertHead: "New client",
            displayHead: "Client info",
            genericHead: "Client data"
        });

        var retval = new F();
        settings.currentView(retval);
        retval.activate(settings.action, settings.id);
        return retval;
    }

    return ClientsForm;
});

define(["ko", "forms"], function (ko, forms) {
    // Components register
    ko.components.register("tracking-display", {
        template: { require: "text!templates/tracking-display-tmpl" }
    });
    ko.components.register("tracking-edit", {
        template: { require: "text!templates/tracking-edit-tmpl" }
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
            editTmpl: "tracking-edit",
            displayTmpl: "tracking-display",
            editHead: "Job tracking update",
            insertHead: "New client",
            displayHead: "Job tracking info",
            genericHead: "Job tracking"
        });

        var retval = new F();
        settings.currentView(retval);
        retval.activate(settings.action, settings.id);
        return retval;
    }

    return ClientsForm;
});

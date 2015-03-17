define(["ko", "forms"], function (ko, forms) {
    // Components register
    ko.components.register("vendors-display", {
        template: { require: "text!templates/vendors-display-tmpl" }
    });
    ko.components.register("vendors-edit", {
        template: { require: "text!templates/vendors-edit-tmpl" }
    });

    function VendorsForm(settings) {
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
            editTmpl: "vendors-edit",
            displayTmpl: "vendors-display",
            editHead: "Vendors update",
            insertHead: "New vendor",
            displayHead: "Vendor info",
            genericHead: "Vendor data"
        });

        var retval = new F();
        settings.currentView(retval);
        retval.activate(settings.action, settings.id);
        return retval;
    }

    return VendorsForm;
});

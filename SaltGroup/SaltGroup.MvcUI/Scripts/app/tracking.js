define(["require", "jquery", "ko", "clientslist"], function (require, jquery, ko, list) {
    var options = {
        name: "Tracking",
        bindingMemberName: "tracking",
        hashDefault: "/tracking",
        factory: TrackingViewModel
    };

    ko.components.register("tracking-menu", {
        template: { require: "text!templates/tracking-menu.html" }
    });
    ko.components.register("tracking-form", {
        template: { require: "text!templates/forms-shell-tmpl" },
        viewModel: { require: "tracking-form" }
    });

    function TrackingViewModel(app, datamodel, sammy) {
        var vm = {
            action: app.action,
            controller: app.controller,
            entityName: "Clients"
        };

        var formParams = {
            action: "",
            app: app,
            currentView: app.view,
            datamodel: datamodel,
            sammy: sammy,
            shell: vm
        };

        var bodyTmpl = app.bodyTmpl;
        var componentName = app.componentName;
        var componentParams = app.componentParams;
        var componentPanel = app.componentPanel;
        var currentView = app.view;
        var viewmodelList = list.create(app, datamodel);

        sammy(function () {
            this.get("#/tracking", function () {
                // Activar vista index de clientes.
                setTrackingHome();
            });
            this.get("#/tracking/index", function () {
                // Activar vista index de clientes.
                setTrackingHome();
            });
//            this.get("#/tracking/reports", function () {
                // Activar vista search de clientes.
//                setClientsSearch();
//            });
            this.get("#/tracking/edit/:id", function () {
                setTrackingForm("edit", this.params["id"]);
            });
            this.get("#/tracking/display/:id", function () {
                setTrackingForm("display", this.params["id"]);
            });
            this.get("#/tracking/insert", function () {
                setTrackingForm("insert");
            });
        });

        function activate() {
        }

        function setTrackingHome() {
            viewmodelList.verInfo(true);
            viewmodelList.verEdit(false);
            viewmodelList.headPage("Auditor info");
            viewmodelList.activate();
            currentView(viewmodelList);
            componentParams(viewmodelList);
            componentName("clients-list");
            componentPanel("tracking-menu");
            vm.action("index");
            vm.controller("tracking");
        }

        function setTrackingForm(action, id) {
            vm.controller("tracking");
            vm.action(action);
            formParams.action = action;
            formParams.id = id;
            componentParams(formParams);
            componentName("tracking-form");
            componentPanel("tracking-menu");
        }

        /*
        function reqTemplate(viewName, data) {
            var reqName = "text!templates/" + viewName;
            require([reqName], function (template) {
                data = template;
            });
        }
        */

        return vm;
    }

    function create(app, datamodel, sammy) {
        return new TrackingViewModel(app, datamodel, sammy);
    }

    return {
        options: options,
        create: create
    };
});


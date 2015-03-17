define(["require", "jquery", "ko", "clientslist"], function (require, jquery, ko, list) {
    var options = {
        name: "Clients",
        bindingMemberName: "clients",
        hashDefault: "/clients",
        factory: ClientsViewModel
    };

    ko.components.register("clients-menu", {
        template: { require: "text!templates/clients-menu.html" }
    });
    ko.components.register("clients-list", {
        template: { require: "text!templates/clients-list.html" }
    });
    ko.components.register("clients-form", {
        template: { require: "text!templates/forms-shell-tmpl" },
        viewModel: { require: "clientsform" }
    });

    function ClientsViewModel(app, datamodel, sammy) {
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
        var componentName   = app.componentName;
        var componentParams = app.componentParams;
        var componentPanel = app.componentPanel;
        var currentView = app.view;
        var viewmodelList = list.create(app, datamodel);

        sammy(function () {
            this.get("#/clients", function () {
                // Activar vista index de clientes.
                setClientsIndex();
            });
            this.get("#/clients/index", function () {
                // Activar vista index de clientes.
                setClientsIndex();
            });
            this.get("#/clients/search", function () {
                // Activar vista search de clientes.
                setClientsSearch();
            });
            this.get("#/clients/edit/:id", function () {
                setClientsForm("edit", this.params["id"]);
            });
            this.get("#/clients/display/:id", function () {
                setClientsForm("display", this.params["id"]);
            });
            this.get("#/clients/insert", function () {
                setClientsForm("insert");
            });
            this.get('/', function () { this.app.runRoute('get', '#clients') });
        });

        function activate() {
        }

        function setClientsIndex() {
            viewmodelList.verInfo(true);
            viewmodelList.verEdit(false);
            viewmodelList.headPage("Clients information");
            viewmodelList.activate();
            currentView(viewmodelList);
            componentParams(viewmodelList);
            componentName("clients-list");
            componentPanel("clients-menu");
            vm.action("index");
            vm.controller("clients");
        }

        function setClientsSearch() {
            viewmodelList.verInfo(false);
            viewmodelList.verEdit(true);
            viewmodelList.headPage("Clients update")
            viewmodelList.activate();
            currentView(viewmodelList);
            componentParams(viewmodelList);
            componentName("clients-list");
            componentPanel("clients-menu");
            vm.action("search");
            vm.controller("clients");
        }

        function setClientsForm(action, id) {
            vm.controller("clients");
            vm.action(action);
            formParams.action = action;
            formParams.id = id;
            componentParams(formParams);
            componentName("clients-form");
            componentPanel("clients-menu");
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
        return new ClientsViewModel(app, datamodel, sammy);
    }

    return {
        options: options,
        create: create
    };
});


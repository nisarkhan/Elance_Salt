define(["require", "jquery", "ko", "vendors-list"], function (require, jquery, ko, list) {
    var options = {
        name: "Vendors",
        bindingMemberName: "vendors",
        hashDefault: "/vendors",
        factory: VendorsViewModel
    };

    ko.components.register("vendors-menu", {
        template: { require: "text!templates/vendors-menu.html" }
    });
    ko.components.register("vendors-list", {
        template: { require: "text!templates/vendors-list.html" }
    });
    ko.components.register("vendors-form", {
        template: { require: "text!templates/forms-shell-tmpl" },
        viewModel: { require: "vendors-form" }
    });

    function VendorsViewModel(app, datamodel, sammy) {
        var vm = {
            action: app.action,
            controller: app.controller,
            entityName: "Vendors"
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
            this.get("#/vendors", function () {
                // Activar vista index de clientes.
                setVendorsIndex();
            });
            this.get("#/vendors/index", function () {
                // Activar vista index de clientes.
                setVendorsIndex();
            });
            this.get("#/vendors/search", function () {
                // Activar vista search de clientes.
                setVendorsSearch();
            });
            this.get("#/vendors/edit/:id", function () {
                setVendorsForm("edit", this.params["id"]);
            });
            this.get("#/vendors/display/:id", function () {
                setVendorsForm("display", this.params["id"]);
            });
            this.get("#/vendors/insert", function () {
                setVendorsForm("insert");
            });
        });

        function activate() {
        }

        function setVendorsIndex() {
            viewmodelList.verInfo(true);
            viewmodelList.verEdit(false);
            viewmodelList.headPage("Vendors information");
            viewmodelList.activate();
            currentView(viewmodelList);
            componentParams(viewmodelList);
            componentName("vendors-list");
            componentPanel("vendors-menu");
            vm.action("index");
            vm.controller("vendors");
        }

        function setVendorsSearch() {
            viewmodelList.verInfo(false);
            viewmodelList.verEdit(true);
            viewmodelList.headPage("Vendors update")
            viewmodelList.activate();
            currentView(viewmodelList);
            componentParams(viewmodelList);
            componentName("vendors-list");
            componentPanel("vendors-menu");
            vm.action("search");
            vm.controller("vendors");
        }

        function setVendorsForm(action, id) {
            vm.controller("vendors");
            vm.action(action);
            formParams.action = action;
            formParams.id = id;
            componentParams(formParams);
            componentName("vendors-form");
            componentPanel("vendors-menu");
        }

        return vm;
    }

    function create(app, datamodel, sammy) {
        return new VendorsViewModel(app, datamodel, sammy);
    }

    return {
        options: options,
        create: create
    };
});


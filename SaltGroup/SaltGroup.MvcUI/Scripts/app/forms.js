// EDIT and VIEW Form - View model.
define(["jquery", "ko"], function ($, ko) {
    ko.components.register("entity-notfound", {
        template: { require: "text!templates/entity-notfound-tmpl" }
    });
    ko.components.register("buttons-display", {
        template: { require: "text!templates/buttons-display-tmpl" }
    });
    ko.components.register("buttons-edit", {
        template: { require: "text!templates/buttons-edit-tmpl" }
    });

    var FormsPrototype = function (options) {
        /// Locals.
        var datacontext = options.app.datacontext;
        var logger = options.app.logger;

        var settings = {
            notfoundTmpl: "entity-notfound",
            editTmpl: options.editTmpl,
            displayTmpl: options.displayTmpl,
            editHead: options.editHead,
            insertHead: options.insertHead,
            displayHead: options.displayHead,
            genericHead: options.genericHead,
            action: options.app.action,
            controller: options.app.controller
        };

        /// Public interface
        var vm = {
            /// Properties.
            action: options.app.action,
            controller: options.app.controller,
            entityName: options.entityName,

            formData: ko.observable(),
            formComponent: ko.observable(""),
            buttonsTmpl: ko.observable(""),
            headPage: ko.observable(""),
            subheadPage: ko.observable(""),

            /// Overridables.
            createEntity: createEntity,

            /// Behaviors.
            activate: activate,
            clickCancelButton: clickCancelButton,
            doSubmit: function () { }                // Switch action
        };

        /// Interface deployment.
        // Activate the model view.
        function activate(action, id) {
            vm.headPage(getHeadByAction(action));
            setConfigsByAction(action, id);
        }

        // Click event on Cancel Button
        function clickCancelButton() {
            window.location.hash = "/" + vm.controller();
        }

        function setConfigsByAction(action, id) {
            vm.formComponent("empty-component");
            switch (action) {
                case "edit":
                    setConfigsEdit(id);
                    break;
                case "insert":
                    setConfigsInsert();
                    break;

                case "display":
                    setConfigsDisplay(id);
                    break;
            }
        }

        function setConfigsEdit(id) {
            // Headers
            vm.headPage(settings.editHead);
            // Data component
            setItemById(id, settings.editTmpl);
            // Buttons
            vm.buttonsTmpl("buttons-edit")
        }

        function setConfigsInsert() {
            // Headers
            vm.headPage(settings.insertHead);
            // Data
            setItemNew();
            // Component
            vm.formComponent(settings.editTmpl);
            // Buttons
            vm.buttonsTmpl("buttons-edit")
        }

        function setConfigsDisplay(id) {
            // Headers
            vm.headPage(settings.displayHead);
            // Data component
            setItemById(id, settings.displayTmpl);
            // Buttons
            vm.buttonsTmpl("buttons-display")
        }

        /// Local functions and procudures helpers.
        // Setting entity data by id and given action.
        function setdataByAction(action, id) {
            switch (action) {
                case "edit":
                case "display":
                    setItemById(id);
                    break;

                case "insert":
                    setItemNew();
                    break;
            }
        }

        // Setting entity data by given id.
        function setItemById(id, comp) {
            return datacontext.getItemEntity(vm.entityName, id)
                .then(function (data) {
                    vm.formData(data.entity);
                    if (data.entity === null)
                        vm.formComponent(settings.notfoundTmpl);
                    else
                        vm.formComponent(comp || getComponentByAction(action));
                })
                .fail(function (error) {
                    vm.formComponent(settings.notfoundTmpl);
                    errorQuerying(error);
                });
        }

        // Setting entity data by entity new.
        function setItemNew() {
            vm.formData(createEntity());
        }

        // Return created entity new.
        function createEntity() {
            try {
                return datacontext.crearEntidad(vm.entityName);
            }
            catch (error) {
                logger.error("Error durante la creación de entidad." + error, vm.entityName);
            }
        }

        // Return head text by given action.
        function getHeadByAction(action) {
            switch (action) {
                case "edit":
                    return settings.editHead;

                case "insert":
                    return settings.insertHead;

                case "display":
                    return settings.displayHead;
            }
            return settings.genericHead;
        }

        // Return template name by given action.
        function getComponentByAction(action) {
            switch (action) {
                case "edit":
                case "insert":
                    return settings.editTmpl;

                case "display":
                    return settings.displayTmpl;
            }
            return "entity-notfound";
        }

        /// Publica error ocurrido durante la consulta de datos.
        function errorQuerying(error) {
            logger.error("Error durante la consulta de datos. " + error.message, vm.entityName);
        }

        return vm;
    };

    return FormsPrototype;
});



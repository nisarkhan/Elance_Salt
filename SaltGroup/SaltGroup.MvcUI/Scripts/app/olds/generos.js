define(["ko"], function (ko) {
    // init
    var logger = {};
    var datacontext = {};
    var entidadName = "Genero";

    //#region Interfaz pública del módulo.
    var vm = {
        /// *** Entidades *** ///

        // Nombre de la entidad administrada.
        entidad: ko.computed(function () { return entidadName;}),
        // Valores de la entidad actual
        values: ko.observable({}),


        /// *** Comportamientos *** ///

        // Interfaz diálogo emergente. En desuso en esta vista.
        submitDialog: function () { },
        clickCancelarDialog: function () { },
        dialogTmpl: ko.observable("none-tmpl"),
        dataDialog: ko.observable(null),

        // Activar el modelo de vista
        activate: activate,
        // Inicialización del modelo de vista
        inicializar: inicializar
    };

    /// *** Valores entidad *** ///
    vm.IDGenero = ko.computed({
        read: function () {
            if (vm.values() && vm.values().IDGenero) {
                return vm.values().IDGenero();
            } else {
                return 0;
            }
        },
        write: function (value) {
            if (vm.values() && vm.values().IDGenero) {
                vm.values().IDGenero(value);
            }
        }
    });
    vm.Descripcion = ko.computed({
        read: function () {
            if (vm.values() && vm.values().Descripcion) {
                return vm.values().Descripcion();
            } else {
                return "";
            }
        },
        write: function (value) {
            if (vm.values() && vm.values().Descripcion) {
                vm.values().Descripcion(value);
            }
        }
    });

    //#endregion            - Interfaz pública del módulo.

    //#region Implementación de comportamientos

    function activate(shell) {
        shell.headPage("Género/Uso apropiado");
        shell.controller("generos");
        shell.currentEntity("Genero");
    }

    function inicializar(options) {
        logger = options.logger;
        datacontext = options.datacontext;
    }

    //#endregion            - Implementación de comportamientos.

    return vm;
});



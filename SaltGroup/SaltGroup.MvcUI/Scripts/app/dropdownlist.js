define(["ko"], function (ko) {
    var DropdownList = function (options) {
        /// *** Settings *** ///
        var logger = options.logger;
        var datacontext = options.datacontext;

        var vm = {
            // Identificador del elemento actualmente seleccionado.
            currentItemId: options.itemId || ko.observable(0),
            // Identificador que filtra los elementos mostrados.
            currentScopeId: options.scopeId || ko.observable(0),
            // Plantilla para el objeto seleccionado.
            selectedItemTmpl: ko.observable(options.selectedTmpl),
            // Plantilla para los elementos de la lista.
            listItemsTmpl: ko.observable(options.itemTmpl),
            // Evento de selección de un elemento.
            clickListItem: options.clickItem || clickListItem,
            // Elemento actualmente seleccionado.
            selectedItem: ko.observable(),
            // Lista observable de elementos a mostrar.
            listItems: ko.observableArray()
        };

        vm.currentItemId.subscribe(function (newValue) {
            setItem(getItem(newValue));
        })

        /// *** Eventos *** ///
        // Evento click en un elemento de la lista
        function clickListItem(item) {
            vm.currentItemId(getItemId(item));
        }

        // Evento de modificación al filtro de elementos.
        if (options.scopeId) {
            vm.currentScopeId.subscribe(function (newValue) {
                setList();
            });
        }
        else {
            setList();
        }

        /// *** Overridables *** ///
        // Obtiene el ID del elemento dado.
        function getItemId(item) {
            // El llamador puede modificar el comportamiento.
            if (options.getItemId) return options.getItemId(item);

            if (item && item[options.itemName]) {
                return item[options.itemName]();
            }
            logger.warning("No ha seleccionado elemento.", options.title);
            return 0;
        }

        // Determina si el elemento "item" tiene un valor clave dado por "id".
        function esIdItem(item, id) {
            // Elllamador puede modificar el comportamiento.
            if (options.esIdItem) return options.esIdItem(item, id);

            return item && item[options.itemName] && item[options.itemName]() === id;
        }


        /// *** Recursos genéricos *** ///

        // Carga la lista de elementos.
        function setList() {
            var query = datacontext.getQueryEntity(options.resource);
            if (options.scopeName)
                query = query.where(options.scopeName, "eq", vm.currentScopeId());
            datacontext.getListByQuery(query)
                .then(function (data) {
                    vm.listItems(data.results);
                    setItem(getItem(vm.currentItemId()));
                })
                .fail(function (error) {
                    logger.error("No se cargó lista de elementos: " + error.message, options.title);
                })
        }

        // Obtiene un elemento de la lista a partir de su ID.
        function getItem(id) {
            if (id === 0) return undefined;
            for (var i = 0; i < vm.listItems().length; i++) {
                if (esIdItem(vm.listItems()[i], id)) {
                    return vm.listItems()[i];
                }
            }
            return undefined;
        }

        // Establecer elemento actual.
        function setItem(item) {
            if (item)
                vm.selectedItemTmpl(options.selectedTmpl);
            else
                vm.selectedItemTmpl(options.selectedNoneTmpl);
            vm.selectedItem(item);
        }


        return vm;
    };

    return {
        // Crea una instancia Dropdownlist
        create: create,
        // Obtiene el prototipo de Dropdownlist
        proto: getProto
    };

    function getProto(options) {
        return DropdownList(options);
    }

    function create(options) {
        var f = function () { };
        f.prototype = getProto(options);

        return new f();
    }
});


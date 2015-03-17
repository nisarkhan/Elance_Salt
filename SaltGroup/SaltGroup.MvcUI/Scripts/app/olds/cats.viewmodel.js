// CATALOGOS modelo de vista.
define(["require", "ko", "home/PagingModel"], function (require, ko, pagingModel) {
    // Contenedor de variables locales.
    var self = this;

    //#region Interfaz de módulo

    // Objeto interfaz del módulo.
    var vm = {
        /// *** Propiedades *** ///

        // Controlador que determina la marca en uso.
        controller: ko.observable(""),
        // Acción: Productos, Detalles.
        action: ko.observable("productos"),
        // Dirección a submarca o línea de productos.
        slug: ko.observable(""),
        // Encabezado de la página.
        headPage: ko.observable(""),
        // Sub encabezado de la página.
        subheadPage: ko.observable(""),
        // URL a regresar.
        urlRegresar: ko.observable(""),
        // Ruta de la imagen al producto mostrado actualmente.
        rutaImagen: ko.observable(""),
        // Marca actualmente en uso.
        marca: ko.observable(),
        // Submarca o línea de productos actual.
        linea: ko.observable(),
        // Página de productos mostrados.
        listaProductos: ko.observableArray(),
        // Producto actualmente seleccionado.
        producto: ko.observable(),
        // Colores alternativos del producto seleccionado.
        colores: ko.observable(),
        // Determina si se consulta el servidor en busca de colores.
        buscandoColores: ko.observable(false),
        // Nombre de la plantilla para elementos de producto
        productosItemTmpl: ko.observable("productos-short-tmpl"),


        /// *** Comportamientos *** ///

        // Inicializar objeto.
        inicializar: inicializar,
        // Establecer la configuración del modelo.
        settings: settings,
        // Seleccionar un producto del catálogo.
        selectItem: selectItem,
        // Cargar producto al carrito.
        submitDialog: submitDialog,
        // Seleccionar color alterno de producto
        clickColor: clickColor,
        // Cerrar el diálogo detalles de producto.
        clickCerrarDialogo: clickCerrarDialogo,


        /// *** Utilidades varias *** ///

        // Ruta a la imagen principal de producto.
        rutaImagenPrincipal: rutaImagenPrincipal,
        // Agregar servicios específicos de la marca.
        addServices: addServices,
        // Determina si en un momento dado se está efectuando una consulta de servidor.
        consultandoServidor: ko.observable(false),
        // Herramienta de paginación
        paging: {}
    };

    // Redirigir la paginación a la obtención de productos.
    vm.paging.pagination = getDataList;

    //#endregion            - Interfaz de módulo.


    //#region Variables locales

    // Servicios específicos de la marca.
    self.services = {};
    // Puntero a la aplicación.
    self.app = {};
    // Puntero a la utilidad de mensajes.
    var logger = {};
    // Puntero al contexto de datos.
    var datacontext = {};
    // Puntero a las funciones de utilidad.
    var common = {};

    // Servicios de la marca actualmente en uso.
    self.marcaServices = function () {
        return self.services[vm.controller()];
    };

    //#endregion                            - Variables locales


    //#region Implementación de la interfaz

    // Inicializar catálogo de productos.
    function inicializar(app) {
        logger = app.logger;
        datacontext = app.datacontext;
        common = app.common;
        self.app = app;
        vm.paging = pagingModel.create(logger, datacontext);
        vm.paging.pagination = getDataList;
    }

    // Establece las configuraciones de funcionamiento
    function settings(controller, slug, regresar) {
        slug = slug || "all";
        vm.controller(controller);
        vm.slug(slug);
        vm.headPage("Catálogo de productos ");
        vm.urlRegresar(regresar || "/");
        getMarca();
        addServices(controller);
    }

    // Agregar servicio específico de la marca.
    function addServices(controller) {
        if (self.services[controller]) return;

        var services = "services/" + controller;
        require([services], function (marcaServices) {
            if (marcaServices.inicializar)
                marcaServices.inicializar(vm);
            self.services[controller] = marcaServices.create(logger, datacontext);
            ko.applyBindings(vm);
        });
    }

    /// Obtener la ruta de una imagen, dado un Producto.
    function rutaImagenPrincipal(producto) {
        if (!self.marcaServices()) return null;
        return self.marcaServices().rutaImagenPrincipal(producto);
    }

    // Seleccionar un producto del catálogo.
    function selectItem(item) {
        vm.producto(item);
        vm.rutaImagen(self.marcaServices().rutaImagenes(item));

        common.showModal(item.Descripcion());
    }

    // Click en un elemento de la lista de colores alternos.
    function clickColor(color) {
        vm.rutaImagen(self.marcaServices().rutaImagenes(vm.producto(), color));
    }

    // Remitir diálogo para especificar compra de producto.
    function submitDialog(form) {
        alert("Ventas en línea, muy pronto.");
        common.hideModal();
    }

    // Cerrar diálogo.
    function clickCerrarDialogo() {
        common.hideModal();
    }

    //#endregion                    - Implementación de la interfaz

    //#region Funciones de alcance local

    // Publica error ocurrido durante la consulta de datos.
    function errorQuerying(error) {
        vm.consultandoServidor(false);
        logger.error("Error durante la consulta de datos. " + error.message, vm.headPage());
    }

    // Obtener la marca de producto.
    function getMarca() {
        vm.consultandoServidor(true);
        var query = datacontext.getQueryEntity("marcas")
                        .where("Slug", "eq", vm.controller())
                        .expand("Lineas");
        datacontext.getListByQuery(query)
            .then(setMarca)
            .fail(errorQuerying);
    }

    // Establecer la marca obtenida de base de datos.
    function setMarca(data) {
        if (data.results.length < 1) {
            logger.warning("No se encontró la marca solicitada...!");
            vm.marca(undefined);
            vm.consultandoServidor(false);
            return;
        }
        vm.marca(data.results[0]);
        vm.headPage(vm.marca().Denominacion());
        vm.subheadPage("Catálogo de productos");
        getLinea();
    }

    /// Obtener lista de elementos en paginación.
    function getDataList(page) {
        page = page || 1;
        var previousPage = vm.paging.page();
        vm.paging.page(page);
        vm.consultandoServidor(true);
        datacontext.getPageByQuery(getQueryList(), vm.paging)
            .then(setPage)
            .fail(function (error) {
                vm.paging.page(previousPage);
                errorQuerying(error);
            });
    }

    /// Establece los datos en el listado de paginación.
    function setPage(data) {
        vm.listaProductos(data.results);
        vm.paging.total(data.inlineCount);
        vm.consultandoServidor(false);
    }

    /// Obtiene la consulta básica de la entidad.
    function getQueryList() {
        var query = datacontext.getQueryEntity("productos");
        if (vm.linea()) {
            query = query.where("IDLinea", "eq", vm.linea().IDLinea());
        } else {
            query = query.where("IDMarca", "eq", vm.marca().IDMarca());
        }
        return query.orderBy("IDProducto").expand("Marca").expand("Linea");
    }

    // Obtener la submarca o línea de productos.
    function getLinea() {
        if (!vm.slug() || vm.slug().length < 1 || vm.slug() === "all") {
            vm.linea(undefined);
            getDataList();
        } else {
            vm.consultandoServidor(true);
            var pred = datacontext.Predicate("IDMarca", "eq", vm.marca().IDMarca())
                        .and("Slug", "eq", vm.slug());
            var query = datacontext.getQueryEntity("lineas")
                            .where(pred);
            datacontext.getListByQuery(query)
                .then(setLinea)
                .fail(errorQuerying);
        }
    }

    // Establecer la submarca obtenida de base de datos.
    function setLinea(data) {
        if (data.results.length < 1) {
            logger.warning("No se encontró el catálogo solicitado...!");
            vm.linea(undefined);
            return;
        }
        vm.linea(data.results[0]);
        vm.subheadPage(vm.linea().Denominacion());
        getDataList();
    }

    // Obtener lista de colores alternativos del producto actual.
    function getColores() {
        if (!vm.producto() || vm.producto() < 1) {
            vm.colores(undefined);
            return;
        }
        vm.buscandoColores(true);
        var query = datacontext.getQueryEntity("colores")
                    .where("IDProducto", "eq", vm.producto().IDProducto());
        datacontext.getListByQuery(query)
            .then(setColores)
            .fail(function (error) {
                errorQuerying(error);
                vm.buscandoColores(false);
            });
    }

    function setColores(data) {
        if (data.results.length < 1) {
            logger.warning("No se encontraron colores de producto disponibles.");
            vm.colores(undefined);
            return;
        }
        vm.colores(data.results);
        vm.buscandoColores(false);
    }

    //#endregion                    - Funciones de alcance local

    return vm;
});




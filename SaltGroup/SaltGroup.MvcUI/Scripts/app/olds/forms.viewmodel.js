// Modelo de vista para FORMULARIOS.
define(["require", "jquery", "ko", "home/PagingModel"],
    function (require, $, ko, PagingModel) {

        var self = this;
        var logger = {};
        var datacontext = {};

        //#region Configuraciones generales

        self.app = {};
        self.controller = ko.observable("");
        self.action = ko.observable("");
        self.headPage = ko.observable("");
        self.subheadPage = ko.observable("");
        self.currentEntity = ko.observable("");
        self.dataList = ko.observableArray();
        self.formTmpl = ko.observable("none-tmpl");
        self.botonesTmpl = ko.observable("none-tmpl");
        self.shellTmpl = ko.observable("none-tmpl");
        self.dialogTmpl = ko.observable("none-tmpl");
        self.urlRegresar = ko.observable("/");
        self.views = {};
        self.dataModel = ko.computed({
            read: function () {
                if (self[self.currentEntity()])
                    return self[self.currentEntity()]();
                return null;
            },
            write: function (value) {
                self[self.currentEntity()](value);
            }
        });
        self.currentView = ko.computed(function () {
            return self.views[self.controller()];
        })
        self.paging = PagingModel.create();


        //#endregion                            - Configuraciones generales

        //#region Comportamientos para remisión de formulario

        /// Envío genérico de formulario
        self.doSubmit = function () {
            switch (self.action()) {
                case "editar":
                case "agregar":
                    self.doGuardar();
                    break;

                case "eliminar":
                    self.doEliminar();
                    break;
            }
        };

        /// Envío de formulario para eliminar registro actual
        self.doEliminar = function () {
            datacontext.eliminarEntidad(self.dataModel());
            datacontext.saveChanges()
                .then(function () {
                    logger.success("Registro eliminado exitosamente...");
                    initListar();
                })
        };

        /// Envío de formulario para guardar cambios
        self.doGuardar = function () {
            datacontext.saveChanges()
                .then(function () {
                    logger.success("Sus cambios fueron guardados... " + self.controller());
                    initVer();
                });
        };

        //#endregion                            - Remisión de formulario

        //#region Comportamientos modelo de vista

        /// Inicializar objeto actual
        function inicializar(app) {
            logger = app.logger;
            datacontext = app.datacontext;
            self.app = app;
            ko.applyBindings(vm);
        }

        /// Seleccionar elemento del listado y cambiar a vista "Ver".
        function selectItem(item) {
            self[self.currentEntity()](item);
            initVer();
        }

        /// Click en "Agregar registro".
        function clickAgregar() {
            self[self.currentEntity()](crearEntidad());
            initAgregar();
        }

        function clickEliminar() {
            self.formTmpl(self.controller() + "-ver-tmpl");
            self.botonesTmpl("botones-eliminar-tmpl");
            initEliminar();
        }

        function clickEditar() {
            self.formTmpl(self.controller() + "-editar-tmpl");
            self.botonesTmpl("botones-editar-tmpl");
            initEditar();
        }

        // Cambia las vistas de edición por "Ver" o "Listar".
        function clickCancelar() {
            if (!datacontext.hayCambios() || confirm("¿Realmente desea cancelar sus cambios?")) {
                // Rechazar los cambios antes de cambiar de vista.
                self.dataModel().entityAspect.rejectChanges();

                // Cambiar a la vista apropiada según vista actual.
                if (self.action() !== "agregar" && self.action() !== "ver" && self.currentView()) {
                    initVer();
                } else {
                    initListar();
                }
            }
        }

        function clickDialogOk() {
            self.doGuardar();
        }

        //#endregion  -  Comportamientos modelo de vista.

        //#region Establecer vistas de formulario

        /// Establecer vista listado de registros.
        function initListar() {
            getDataList();
            self.action("index");
            self.subheadPage("");
            self.botonesTmpl("botones-list-tmpl");
            self.formTmpl(self.controller() + "-listitem-tmpl");
            self.shellTmpl(self.controller() + "-shell-tmpl");
            self.urlRegresar("/");
        }

        /// Establecer vista mostrar registro actual.
        function initVer() {
            self.action("ver");
            self.subheadPage("Examinar registro.");
            self.shellTmpl("forms-shell-tmpl");
            self.formTmpl(self.controller() + "-ver-tmpl");
            self.botonesTmpl("botones-ver-tmpl");
        }

        /// Establecer vista editar registro actual.
        function initEditar() {
            self.action("editar");
            self.subheadPage("Editar registro.");
            //        self.doSubmit = self.doGuardar;
            self.shellTmpl("forms-shell-tmpl");
            self.formTmpl(self.controller() + "-editar-tmpl");
            self.botonesTmpl("botones-editar-tmpl");
            if (self.views[self.controller()].initEditar) {
                self.views[self.controller()].initEditar();
            }
        }

        /// Establecer vista eliminar registro actual.
        function initEliminar() {
            self.action("eliminar");
            self.subheadPage("Eliminar registro.");
            //        self.doSubmit = self.doEliminar;
            self.shellTmpl("forms-shell-tmpl");
            self.formTmpl(self.controller() + "-ver-tmpl");
            self.botonesTmpl("botones-eliminar-tmpl");
        }

        /// Establecer vista agregar nuevo registro.
        function initAgregar() {
            self.action("agregar");
            self.subheadPage("Crear nuevo registro.");
            //        self.doSubmit = self.doGuardar;
            self.formTmpl(self.controller() + "-editar-tmpl");
            self.shellTmpl("forms-shell-tmpl");
            self.botonesTmpl("botones-editar-tmpl");
            if (self.views[self.controller()].initAgregar) {
                self.views[self.controller()].initAgregar();
            }
        }

        /// Establece un modelo vista como vista actual.
        function navigateToView(controller, action, id) {
            var _view = self.views[self.controller()];
            if (_view && _view.deactivate)
                self.views[self.controller()].deactivate(vm);
            self.shellTmpl("none-tmpl");
            self.formTmpl("none-tmpl");
            if (self.views[controller]) {
                setView(controller, action, id);
            } else {
                addViewModel(controller, action, id);
            }
        }

        //#endregion - Establecer vistas de formulario

        //#region Utilidades

        /// Obtener lista de elementos en paginación.
        function getDataList(page) {
            page = page || 1;
            self.paging.page(page);
            datacontext.getPageByQuery(getQueryEntity(), self.paging)
                .then(setPage)
                .fail(errorQuerying);
        }

        /// Establece los datos en el listado de paginación.
        function setPage(data) {
            vm.dataList(data.results);
            self.paging.total(data.inlineCount);
        }

        function setCurrentItem(id) {
            datacontext.getItemEntity(self.currentEntity(), id)
                .then(function (data) {
                    self[self.currentEntity()](data.entity);
                })
                .fail(errorQuerying);
        }

        function switchAction(action) {
            action = action || "index";
            switch (action) {
                case "index":
                    initListar();
                    break;

                case "ver":
                    initVer();
                    break;

                case "editar":
                    initEditar();
                    break;

                case "eliminar":
                    initEliminar();
                    break;

                case "agregar":
                    initAgregar();
                    break;

                default:
                    initListar();
                    break;
            }
        }

        /// Publica error ocurrido durante la consulta de datos.
        function errorQuerying(error) {
            logger.error("Error durante la consulta de datos. " + error.message, self.currentEntity());
        }

        // Establecer vista
        function setView(controller, action, id) {
            self.views[controller].activate(vm);
            if (id)
                setCurrentItem(id);
            switchAction(action);
        }

        // Cargar modelos de vista de nivel entidad.
        function addViewModel(controller, action, id) {
            require([controller], function (_vista) {
                self.views[controller] = _vista;
                self[_vista.entidad()] = ko.computed({
                    read: function () {
                        return self.views[controller].values();
                    },
                    write: function (data) {
                        self.views[controller].values(data);
                    }
                });
                _vista.inicializar({
                    viewModel: vm,
                    app: self.app,
                    logger: logger,
                    datacontext: datacontext
                });
                setView(controller, action, id);
            });
        }

        //#endregion                            - Utilidades

        //#region Utilidades "overridables".

        /// Crea una nueva entidad para agregar.
        // NOTA: En este momento ningún elemento lo cancela.
        function crearEntidad() {
            if (self.currentView().crearEntidad)
                return self.currentView().crearEntidad();
            return datacontext.crearEntidad(self.currentEntity());
        }

        /// Obtiene la consulta básica de la entidad.
        function getQueryEntity() {
            if (self.currentView().getQueryEntity)
                return self.currentView().getQueryEntity();
            return datacontext.getQueryEntity(self.controller());
        }

        //#endregion                            - Overridables

        //#region Módulo de retorno con el modelo de vista.
        var vm = {
            //*** Propiedades ***//

            /// Instancia de la aplicación actual.
            app: self.app,
            /// Inicialización del objeto.
            inicializar: inicializar,
            /// Nombre del controlador API para entidad actual.
            controller: self.controller,
            /// Acción que se ejecuta.
            action: self.action,
            /// Encabezado de página para formulario.
            headPage: self.headPage,
            /// Subencabezado de formulario.
            subheadPage: self.subheadPage,
            /// Nombre de la entidad miembro actual.
            currentEntity: self.currentEntity,
            /// Nombre de la vista actual (controller).
            currentView: self.currentView,
            /// Colección de registros a mostrar en lista "Index".
            dataList: ko.computed({
                read: function () {
                    if (self.currentView() && self.currentView().dataList)
                        return self.currentView().dataList();
                    return self.dataList();
                },
                write: function (value) {
                    if (self.currentView() && self.currentView().dataList)
                        self.currentView().dataList(value);
                    else self.dataList(value);
                }
            }),
            /// Nombre de la plantilla para la vista "Index".
            shellTmpl: self.shellTmpl,
            /// Nombre de la plantilla de formulario actual.
            formTmpl: self.formTmpl,
            /// Nombre de la plantilla de botones actual.
            botonesTmpl: self.botonesTmpl,
            /// Nombre de la plantilla que utiliza el diálogo emergente.
            dialogTmpl: self.dialogTmpl,
            /// Elemento entidad actual del modelo de datos.
            dataModel: self.dataModel,
            /// URL previa.
            urlRegresar: self.urlRegresar,
            /// Propiedades de paginación.
            paging: self.paging,
            /// Modelo de vista para el diálogo emergente.
            modelDialog: self.currentView,
            /// Coleccióin de listas registradas.
            views: self.views,


            //*** Comportamientos ***//

            /// Envío genérico de formulario
            doSubmit: self.doSubmit,
            /// Seleccionar elemento del listado y cambiar a vista "Ver".
            selectItem: selectItem,
            /// Click en el botón "Agregar".
            clickAgregar: clickAgregar,
            /// Click en el botón "Eliminar".
            clickEliminar: clickEliminar,
            /// Click en el botón "Editar".
            clickEditar: clickEditar,
            /// Click en el botón "Cancelar".
            clickCancelar: clickCancelar,


            //*** Utilidades ***//

            /// Inicializar el objeto actual.

            /// Actualiza la lista de datos a mostrar.
            getDataList: getDataList,
            /// Obtiene la consulta básica de la entidad.
            getQueryEntity: getQueryEntity,
            /// Navega al modelo de vista indicado
            navigateToView: navigateToView
        };

        //#endregion                            - Módulo

        return vm;
    });


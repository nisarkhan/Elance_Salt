// Entity LISTS for tables or grids.
define(["jquery", "ko", "home/PagingModel"], function ($, ko, pagingModel) {
    ko.components.register("data-pager", {
        template: { require: "text!templates/data-pager.html" }
    });

    var ListsPrototype = function (app, datamodel) {
        var logger = app.logger;
        var datacontext = datamodel.datacontext;
        var queryPredicate = undefined;

        var vm = {
            action: app.action,
            controller: app.controller,
            entityName: ko.observable(""),
            headPage: ko.observable(""),
            subheadPage: ko.observable(""),
            setOrder: ko.observable(""),
            dataList: ko.observableArray(),
            verInfo: ko.observable(false),
            verEdit: ko.observable(false),
            paging: pagingModel.create(),
            setOrderBy: setOrderBy,
            paramsSearch: {
                searchExecute: searchExecute,
                logger: logger,
                datacontext: datacontext
            },
            activate: activate
        };

        vm.paging.pagination = getDataList;

        function activate() {
            getDataList();
        }

        // Ejecutar consulta de búsqueda. Falta implementar.
        function searchExecute(queryAditional) {
            queryPredicate = queryAditional;
            return getDataList();
        }

        /// Obtener lista de elementos en paginación.
        function getDataList(page) {
            page = page || 1;
            vm.paging.page(page);
            return datacontext.getPageByQuery(getQueryEntity(), vm.paging)
                .then(setPage)
                .fail(errorQuerying);
        }

        /// Establecer nuevo orden de listado.
        function setOrderBy(order) {
            vm.setOrder(order);
            getDataList();
        }

        /// Publica error ocurrido durante la consulta de datos.
        function errorQuerying(error) {
            logger.error("Error durante la consulta de datos. " + error.message, vm.entityName());
        }

        /// Obtiene la consulta básica de la entidad.
        function getQueryEntity() {
            var query = datacontext.getQueryEntity(vm.entityName());
            if (vm.setOrder()) {
                query = query.orderBy(vm.setOrder());
            }
            if (queryPredicate)
                query = query.where(queryPredicate);
            return query;
        }

        /// Establece los datos en el listado de paginación.
        function setPage(data) {
            vm.dataList(data.results);
            vm.paging.total(data.inlineCount);
        }

        return vm;
    };

    return ListsPrototype;
});


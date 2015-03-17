define(["jquery", "ko", "Q", "breeze", "home/logger"], function ($, ko, Q, breeze, logger) {
    var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
    var serviceName = serviceRoot + 'breeze/saltdata';
    //    breeze.config.initializeAdapterInstance('dataService', 'WebApi', true);
    breeze.NamingConvention.none.setAsDefault();

    var manager = new breeze.EntityManager(serviceName);

    return {
        crearEntidad: crearEntidad,
        eliminarEntidad: eliminarEntidad,
        getList: getList,
        getPage: getPage,
        getPageByQuery: getPageByQuery,
        getQueryEntity: getQueryEntity,
        getQueryPaging: getQueryPaging,
        getListByQuery: getListByQuery,
        getItemEntity: getItemEntity,
        Predicate: Predicate,
        hayCambios: hayCambios,
        saveChanges: saveChanges
    };

    function Predicate(campo, operador, valor) {
        return breeze.Predicate.create(campo, operador, valor);
    }

    function crearEntidad(entidad, initialValues) {
        return manager.createEntity(entidad, initialValues);
    }

    function eliminarEntidad(entidad) {
        entidad && entidad.entityAspect.setDeleted();
    }

    function getList(entidad) {
        return getListByQuery(getQueryEntity(entidad));
    }

    function getListByQuery(query) {
        return manager.executeQuery(query);
    }

    function getPage(entidad, paging) {
        return getPageByQuery(getQueryEntity(entidad), paging);
    }

    function getPageByQuery(query, paging) {
        query = getQueryPaging(query, paging);

        return manager.executeQuery(query);
    }

    function getQueryEntity(entidad) {
        return breeze.EntityQuery.from(entidad);
    }

    function getQueryPaging(query, paging) {
        var skip = paging.size() * (paging.page() - 1);

        return query.skip(skip).take(paging.size())
                    .inlineCount();
    }

    function getItemEntity(entidad, id) {
        return manager.fetchEntityByKey(entidad, id, true);
    }

    /// Detecta si ha habido cambios en el manager.
    /// NOTA: Hace falta detectar modificaciones a nuevo registro.
    function hayCambios() {
        return manager.hasChanges();
    }

    function saveChanges() {
        return manager.saveChanges()
                .then(logroGuardar)
                .fail(falloGuardar);

        function logroGuardar(saveResult) {
            logger.success("Se guardaron " + saveResult.entities.length + " registros.");
            logger.log(saveResult);
        }

        function falloGuardar(error) {
            var reason = error.message;
            var detail = error.detail;

            if (error.entityErrors) {
                reason = handleSaveValidationError(error);
            } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error 
                reason =
                    "Otro usuario podría haber eliminado el registro." +
                    " Tal vez tenga qué reiniciar la aplicación.";
            } else {
                reason = "Falló al guardar sus cambios: " + reason +
                         " Tal vez tenga qué reiniciar la aplicación.";
            }

            logger.error(error, reason);
            // DEMO ONLY: discard all pending changes
            // Let them see the error for a second before rejecting changes
            setTimeout(function () {
                manager.rejectChanges();
            }, 1000);
            throw error; // so caller can see it
        }

        function handleSaveValidationError(error) {
            var message = "No se guardó debido a un error de validación";
            try { // fish out the first error
                var firstErr = error.entityErrors[0];
                message += ": " + firstErr.errorMessage;
            } catch (e) { /* eat it for now */ }
            return message;
        }
    }
});


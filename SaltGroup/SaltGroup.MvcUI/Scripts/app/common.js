
define(["require", "jquery", "bootstrap"], function (require, $) {
    var common = {};


    common.getFragment = function getFragment() {
        if (window.location.hash.indexOf("#") === 0) {
            return parseQueryString(window.location.hash.substr(1));
        } else {
            return {};
        }
    };

    common.getAccessToken = function () {
        var fragment = common.getFragment();

        return fragment.access_token;
    };

    /// Convierte una cadena de consulta en un conjuntod de pares clave/valor.
    common.parseQueryString = function (queryString) {
        var data = {},
            pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

        if (queryString === null) {
            return data;
        }

        pairs = queryString.split("&");

        for (var i = 0; i < pairs.length; i++) {
            pair = pairs[i];
            separatorIndex = pair.indexOf("=");

            if (separatorIndex === -1) {
                escapedKey = pair;
                escapedValue = null;
            } else {
                escapedKey = pair.substr(0, separatorIndex);
                escapedValue = pair.substr(separatorIndex + 1);
            }

            key = decodeURIComponent(escapedKey);
            value = decodeURIComponent(escapedValue);

            data[key] = value;
        }

        return data;
    };

    /// Obtiene el valor almacenado en un parámetro de consulta.
    common.getParameterByName = function (name) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == name) { return pair[1]; }
        }
        return (false);
    };

    /// Despliega el cuadro de diálogo
    common.abrirModal = function (urlGet, titleDialog) {
        common.showModal(titleDialog);
        if (urlGet) {
            $("#bodyModalDialog").load(urlGet);
        }
    };

    common.showModal = function (titleDialog) {
        $("#modalDialogPartial").modal("show");
        if (titleDialog) {
            $("#headerModalDialog").text(titleDialog);
        }
    };

    common.hideModal = function () {
        $("#modalDialogPartial").modal("hide");
    };

    common.initupload = function (opciones) {
        $('#fileupload').fileupload({
            url: '/api/imagenes',
            dataType: 'json',
            formData: opciones.formData,
            autoUpload: true,
            done: function (e, data) {
                // aplicar los datos de la imagen
                // falta una propiedad receptora del IDImagen.
                // 
                opciones.done(data.result);
                $('<p/>').text(data.result.Archivo).appendTo("#files");
            },
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            },
            fail: function (e, data) {
                alert("falló el envío.");
            }
        });
    };

    return common;
});

define(["ko"], function (ko) {
    return function (data) {
        var params = data.value;
        var datacontext = params.datacontext;
        var logger = params.logger;
        var codeField = "ClientCode";
        var nameField = "CompanyLegalName";
        var phoneField = "PhoneNumber";
        var codeSearch = ko.observable("");
        var nameSearch = ko.observable("");
        var phoneSearch = ko.observable("");
        var selfSearch = {};

        codeSearch.subscribe(function (newValue) {
            if (newValue && newValue.length)
                selfSearchExecution();
        });
        nameSearch.subscribe(function (newValue) {
            if (newValue && newValue.length)
                selfSearchExecution();
        });
        phoneSearch.subscribe(function (newValue) {
            if (newValue && newValue.length > 3)
                selfSearchExecution();
        });

        function clickSearchButton() {
            clearTimeout(selfSearch);
            searchExecute();
        }

        function clickResetButton() {
            clearTimeout(selfSearch);
            codeSearch("");
            nameSearch("");
            phoneSearch("");
            params.searchExecute();
        }

        function isAllEmpty() {
            return codeSearch().length < 1 &&
                    nameSearch().length < 1 &&
                    phoneSearch().length < 1;
        }

        function searchExecute() {
            var predicate = getPredicate();
            if (predicate)
                params.searchExecute(predicate);
            else
                logger.warning("Search criteria is not set...");
        }

        function selfSearchExecution() {
            clearTimeout(selfSearch);
            selfSearch = setTimeout(searchExecute, 300);
        }

        function getPredicate() {
            var codePredicate = undefined;
            var namePredicate = undefined;
            var phonePredicate = undefined;
            var code = trim(codeSearch());
            var name = trim(nameSearch());
            var phone = trim(phoneSearch());
            if (code && code.length > 0)
                codePredicate = datacontext.Predicate(codeField, "contains", code);
            if (name && name.length > 0)
                namePredicate = datacontext.Predicate(nameField, "contains", name);
            if (phone && phone.length > 0)
                phonePredicate = datacontext.Predicate(phoneField, "contains", phone);

            var predicates = new Array();
            if (codePredicate)
                predicates.push(codePredicate);
            if (namePredicate)
                predicates.push(namePredicate);
            if (phonePredicate)
                predicates.push(phonePredicate);

            if (predicates.length > 0) {
                if (predicates.length > 1) {
                    var inicial = predicates.shift();
                    return inicial.and(predicates);
                }
                return predicates[0];
            }

            return undefined;
        }

        function trim(cadena) {
            return cadena.replace(/^\s+|\s+$/, "");
        }

        return {
            codeSearch: codeSearch,
            nameSearch: nameSearch,
            phoneSearch: phoneSearch,
            clickSearchButton: clickSearchButton,
            clickResetButton: clickResetButton
        };
    };
});

define(["ko"], function (ko) {

    var pagingModel = (function () {

        var ctor = function () {
            var self = this;

            self.page = ko.observable(1);
            self.size = ko.observable(10);
            self.total = ko.observable(0);
            self.paging = ko.observable(5);
            self.arrayNumbers = new Array(1);

            self.pages = ko.computed(function () {
                return Math.ceil(self.total() / self.size());
            });
            self.first = ko.computed(function () {
                return (self.page() - 1) * self.size() + 1;
            });
            self.count = ko.computed(function () {
                var nextFirst = self.page() * self.size() + 1;
                if (nextFirst > self.total() + 1) {
                    nextFirst = self.total() + 1;
                }
                return nextFirst - self.first();
            });
            self.pagingFirst = ko.computed(function () {
                var pagesBack = Math.floor(self.paging() / 2);
                var pagingFirst = self.page() - pagesBack;
                if ((pagingFirst + self.paging() - 1) > self.pages()) {
                    pagingFirst = self.pages() - self.paging() + 1;
                }
                if (pagingFirst < 1) return 1;
                return pagingFirst;
            });
            self.pagingLast = ko.computed(function () {
                var pagingLast = self.pagingFirst() + self.paging() - 1;
                if (pagingLast > self.pages()) return self.pages();
                return pagingLast;
            });
            self.numbers = ko.computed(function () {
                self.arrayNumbers.splice(0, self.arrayNumbers.length);
                for (var i = self.pagingFirst(), j = 0 ; i <= self.pagingLast() ; i++) {
                    self.arrayNumbers[j] = i;
                    j++;
                }
                return self.arrayNumbers;
            });

            var vm = {
                /// Número de página que se presenta (basado en 1).
                page: self.page,
                /// Primer registro que se presenta (basado en 1).
                first: self.first,
                /// Cantidad máxima de registros presentados.
                size: self.size,
                /// Cantidad de páginas en la colección.
                pages: self.pages,
                /// Cantidad máxima de páginas a mostrar en la paginación.
                paging: self.paging,
                /// Array de números de página a mostrar.
                numbers: self.numbers,
                /// Cantidad de elementos presentados.
                count: self.count,
                /// Cantidad total de elementos en la consulta.
                total: self.total,
                /// Click en un botón de página.
                clickPageButton: clickPageButton,
                /// Click en el botón página previa.
                clickPrevButton: clickPrevButton,
                /// Click en el botón página próxima.
                clickNextButton: clickNextButton,
                /// Acción a realizar cuando se efectúa la paginación.
                pagination: function () { }
            };

            /// No hace nada, el implementador debe suscribirse a ésta.
            function pagination(page) {
                vm.pagination(page);
            }

            function clickPageButton(page) {
                pagination(page);
            }
            function clickPrevButton() {
                var page = self.page() - 1;
                if (page < 1) page = 1;

                pagination(page);
            }
            function clickNextButton() {
                var page = self.page() + 1;
                if (page > self.pages()) page = self.pages();

                pagination(page);
            }
            function clickPagerPrevButton() {
                var page = self.page() - self.paging();
                if (page < 1) page = 1;

                pagination(page);
            }
            function clickPagerNextButton() {
                var page = self.page() + self.paging();
                if (page > self.pages()) page = self.pages();

                pagination(page);
            }

            return vm;
        };
        return ctor;
    })();

    return {
        create: create
    };

    function create() {
        return new pagingModel();
    }
});

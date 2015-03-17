define(["ko", "lists"], function (ko, lists) {
    var options = {
        name: "Vendors",
        bindingMemberName: "vendors",
        hashDefault: "/vendors/index",
        factory: create
    };

    ko.components.register("vendors-search", {
        template: { require: "text!templates/vendors-search.html" },
        viewModel: { require: "vendors-search" }
    });

    function create(app, datamodel) {
        function urlItemInfo(item) {
            return "#/vendors/display/" + item.VendorPKID();
        }

        function urlItemEdit(item) {
            return "#/vendors/edit/" + item.VendorPKID();
        }

        var F = function () { };
        F.prototype = lists(app, datamodel);
        F.prototype.urlItemEdit = urlItemEdit;
        F.prototype.urlItemInfo = urlItemInfo;

        var retval = new F();
        retval.entityName(options.name);
        retval.headPage("Vendor information");
        retval.setOrder("VendorPKID");

        return retval;
    }

    return {
        options: options,
        create: create
    };
});


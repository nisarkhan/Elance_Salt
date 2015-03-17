define(["ko"], function (ko) {
    function MenuViewModel(options) {
        var params = options.value;
        var controller = params.controller;
        var action = params.action;

        var vm = {
            controller: controller,
            action: action
        };
        return vm;
    }
    return MenuViewModel;
});

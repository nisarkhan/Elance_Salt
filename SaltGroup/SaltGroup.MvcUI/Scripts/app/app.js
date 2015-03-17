define(["jquery", "ko", "Q", "home/logger", "home/datamodel", "home/common", "sammy", "clients", "vendors", "tracking", "bootstrap"],
    function ($, ko, Q, logger, dataModel, common, Sammy, clients, vendors, tracking) {

        ko.components.register("empty-component", {
            template: "<div>Wait...</div>"
        });

        function appViewModel() {
            // Private state
            var self = this;
            self.logger = logger;
            self.dataModel = dataModel;
            self.datacontext = dataModel.datacontext;

            // Data
            self.Views = {
                Loading: {} // Other views are added dynamically by app.addViewModel(...).
            };

            // UI state
            self.view = ko.observable(self.Views.Loading);

            self.loading = ko.computed(function () {
                return self.view() === self.Views.Loading;
            });
            self.componentName = ko.observable("empty-component");
            self.componentParams = ko.observable();
            self.bodyTmpl = ko.observable("generic-component-tmpl");
            self.componentPanel = ko.observable("empty-component");

            self.action = ko.observable("");
            self.controller = ko.observable("");

            // Public interface.
            var vm = {
                logger: logger,
                datacontext: dataModel.datacontext,
                common: common,
                Views: self.Views,
                dataModel: self.dataModel,
                view: self.view,
                loading: self.loading,
                bodyTmpl: self.bodyTmpl,
                componentPanel: self.componentPanel,
                componentName: self.componentName,
                componentParams: self.componentParams,
                addViewModel: addViewModel,
                controller: self.controller,
                action: self.action,
                initialize: initialize
            };

            // Other operations
            function addViewModel (options) {
                var viewItem = new options.factory(self, dataModel, Sammy),
                    navigator;

                // Add view to AppViewModel.Views enum (for example, app.Views.Home).
                self.Views[options.name] = viewItem;

                // Add binding member to AppViewModel (for example, app.home);
                self[options.bindingMemberName] = ko.computed(function () {
                    /*                if (!dataModel.getAccessToken()) {
                                        // The following code looks for a fragment in the URL to get the access token which will be
                                        // used to call the protected Web API resource
                                        var fragment = common.getFragment();
                    
                                        if (fragment.access_token) {
                                            // returning with access token, restore old hash, or at least hide token
                                            window.location.hash = fragment.state || '';
                                            dataModel.setAccessToken(fragment.access_token);
                                        } else {
                                            // no token - so bounce to Authorize endpoint in AccountController to sign in or register
                                            window.location = "/Account/Authorize?client_id=web&response_type=token&state=" + encodeURIComponent(window.location.hash);
                                        }
                                    }
                                    */
                    return self.Views[options.name];
                });

                if (typeof (options.navigatorFactory) !== "undefined") {
                    navigator = options.navigatorFactory(self, dataModel);
                } else {
                    navigator = function () {
                        window.location.hash = options.hashDefault;
                    };
                }

                // Add navigation member to AppViewModel (for example, app.NavigateTohome());
                self["navigateTo" + options.bindingMemberName] = navigator;
            };

            function initialize (viewActive) {
                Sammy().run();
                location.hash = viewActive;
                ko.applyBindings(vm);
            };

            // Private operations
            function cleanUpLocation() {
                window.location.hash = "";

                if (typeof (history.pushState) !== "undefined") {
                    history.pushState("", document.title, location.pathname);
                }
            }

            /// Add views to navigate.
            vm.addViewModel(clients.options);
            vm.addViewModel(vendors.options);
            vm.addViewModel(tracking.options);

            return vm;
        }
        return new appViewModel();
    });



define(["home/datacontext"], function (datacontext) {
    var self = this;
    // Routes
    self.userInfoUrl = "/api/Me";
    self.siteUrl = "/";

    // Route operations

    // Other private operations

    // Operations

    // Data
    self.returnUrl = self.siteUrl;

    // Data access operations
    self.setAccessToken = function (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
    };

    self.getAccessToken = function () {
        return sessionStorage.getItem("accessToken");
    };

    return {
        userInfoUrl: self.userInfoUrl,
        siteUrl: self.siteUrl,
        returnUrl: self.returnUrl,
        setAccessToken: self.setAccessToken,
        getAccessToken: self.getAccessToken,
        datacontext: datacontext
    };
});


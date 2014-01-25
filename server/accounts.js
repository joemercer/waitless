Accounts.loginServiceConfiguration.remove({
    service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
    service: "facebook",
    appId: "1459026397651152",
    secret: "53232bf57d941c28c5816e165890af6a"
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
        user.profile = options.profile;
    }
    return user;
});
Accounts.loginServiceConfiguration.remove({
    service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
    service: "facebook",
    appId: "607442322661481",
    secret: "7731fdbd9a85748fc2e16038f8cfebe6"
});

Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
        user.profile = options.profile;
    }
    return user;
});
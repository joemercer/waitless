Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=larger";
        user.profile = options.profile;
    }
    return user;
});
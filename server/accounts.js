Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=large";
        options.profile.store = null;
        options.profile.drink = null;
        options.profile.drinkSize = null;
        user.profile = options.profile;
    }
    return user;
});
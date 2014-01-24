////////// Server only logic //////////


// # Accounts
// __________

Accounts.registerLoginHandler(function(loginRequest) {

  //we create a admin user if not exists, and get the userId
  var userId = loginRequest.uWaterlooId;
  var user = Meteor.users.findOne({_id: userId});
  if(!user) {
    Meteor.users.insert({
      _id: userId,
      createdAt: (new Date()),
      profile: {
        name: 'Suzy Q'
      }
    });
  }

  //creating the token and adding to the user
  var stampedToken = Accounts._generateStampedLoginToken();
  Meteor.users.update(userId, 
    {$push: {'services.resume.loginTokens': stampedToken}}
  );

  //send loggedin user's user id
  //sending token along with the userId
  return {
    id: userId,
    token: stampedToken.token
  }

});

// # Groups
// ________



Meteor.methods({
  // login: function(id) {
  //   return 'hello';
  // }
});
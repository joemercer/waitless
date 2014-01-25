
Session.set('partial', 'home');

Template.loggedIn.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

// # Home
// ______

Template.home.events({
	'click .goto-store': function() {
		router.storeView('storeName');
	}
});

// # Store
// ______

Template.store.events({
	'click .goto-home': function() {
		router.home();
	}
});


// # Router
// ________

var Router = Backbone.Router.extend({
  routes: {
  	'': 'homeView',
    ":store": "storeView"
  },
  home: function() {
  	console.log('home');
  	Session.set('partial', 'home');
  	this.navigate('', true);
  },
  storeView: function (store) {
  	console.log('store');
  	Session.set('partial', 'store');
  	this.navigate(store, true);
  }
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});



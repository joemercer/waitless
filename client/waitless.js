
Session.set('partial', 'home');

Template.loggedIn.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

// # Home
// ______

Template.home.events({
	'click .goto-create-order': function() {
		router.createOrderView();
	},
	'click .goto-profile': function() {
		router.profileView();
	}
});

// # Profile
// _________

Template.profile.events({
	'click .goto-home': function() {
		router.home();
	},
	'click .goto-create-store': function() {
		router.createStoreView();
	},
	'click .goto-create-product': function() {
		router.createProductView();
	}
});

// # Create Store
// ______

Template.createStore.events({
	'click .goto-home': function() {
		router.home();
	}
});

// # Create Product
// ______

Template.createProduct.events({
	'click .goto-home': function() {
		router.home();
	}
});

// # Place Order
// _____________

Template.createOrder.events({
	'click .goto-home': function() {
		router.home();
	}
});


// # Router
// ________

var Router = Backbone.Router.extend({
  routes: {
  	'': 'homeView',
    'profile': 'profileView',
    'profile/createStore': 'createStoreView',
    'profile/createProduct': 'createProductView',
    'createOrder': 'createOrderView'
  },
  home: function () {
  	Session.set('partial', 'home');
  	this.navigate('', true);
  },
  profileView: function () {
  	Session.set('partial', 'profile');
  	this.navigate('profile', true);
  },
  createStoreView: function () {
  	Session.set('partial', 'createStore');
  	this.navigate('profile/createStore', true);
  },
 	createProductView: function () {
  	Session.set('partial', 'createProduct');
  	this.navigate('profile/createProduct', true);
  },
  createOrderView: function () {
  	Session.set('partial', 'createOrder');
  	this.navigate('createOrder', true);
  }
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});



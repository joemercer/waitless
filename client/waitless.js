
Session.set('partial', 'home');

// # Logged Out
// ============

Template.loggedOut.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

Template.loggedOut.events({
	'click .goto-store-login': function() {
		router.storeLoginView();
	}
});

// # storeLogin
// ____________createOrder

Template.storeLogin.events({
	'click .goto-home': function() {
		router.home();
	},
	'click .goto-store-view': function() {
		router.storeView('fakeStoreName');
	}
});

// # storeView
// _______________

Template.storeView.events({
	'click .goto-home': function() {
		router.home();
	}
});

// # Logged In
// ===========

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
	}
});

// # Place Order
// _____________

Session.set('activeStore', null);

Template.createOrder.events({
	'click .goto-home': function() {
		router.home();
	}
});

// # products
// __________

Template.products.products = function() {
	var storeId = Session.get('activeStore');
	if (!storeId) return;
	return Products.find({store_id: storeId});
};

Template.sizes.sizes = function() {
	var prod_name = Session.get("product").name;
	if (!prod_name) return;
	return Products.find({item: prod_name});
};

Template.times.times = function() {
	var available_times = [];
	var minutes = 0;
	for (var i = 0; i < 5; i++) {
		var time_now = new Date();
		var minutes_now = (time_now.getHours() * 60) + time_now.getMinutes() + minutes;
		var closest_time = 5 * Math.round(minutes_now/5);
		var next_time = Order_Times.findOne({numMinutes: closest_time})

		if(next_time) {
			available_times.push(next_time.label);
		}
		minutes += 5;
	}
	return available_times;
};


// # Router
// ________

var Router = Backbone.Router.extend({
  routes: {
  	'store': 'storeLoginView',
  	'store/:store': 'storeView',
  	'': 'homeView',
    'profile': 'profileView',
    'profile/createStore': 'createStoreView',
    'profile/createProduct': 'createProductView',
    'createOrder': 'createOrderView'
  },
  storeLoginView: function() {
  	Session.set('partial', 'storeLogin');
  	this.navigate('store', true);
  },
  storeView: function(storeName) {
  	Session.set('partial', 'storeView');
  	this.navigate('store/'+storeName, true);
  },
  home: function () {
  	Session.set('partial', 'home');
  	this.navigate('', true);
  },
  profileView: function () {
  	Session.set('partial', 'profile');
  	this.navigate('profile', true);
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


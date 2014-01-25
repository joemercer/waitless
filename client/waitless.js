
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

// # sizes
// _______

Template.sizes.sizes = function() {
	var prod_id = Session.get("product").product_id;
	if (!prod_id) return;
	var product = Products.findOne({
		_id: prod_id
	});
	if (!product) return;
	return product.sizes;
};

// # times
// _______

Template.times.times = function() {
	var minutes = 0;
	var time_now = new Date();
	var minutes_now = (time_now.getHours() * 60) + time_now.getMinutes() + minutes;
	var closest_time = 5 * Math.round(minutes_now/5);
	var available_times = Order_Times.find({numMinutes: {$gt : closest_time}}, {limit: 5})
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
    'createOrder': 'createOrderView',
    'createOrder/store': 'createOrderChooseStore',
    'createOrder/product': 'createOrderChooseProduct',
    'createOrder/size': 'createOrderChooseSize',
    'createOrder/time': 'createOrderChooseTime',
    'createOrder/verify': 'createOrderChooseVerify'
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

  	this.createOrderChooseStore();
  },
  createOrderChooseStore: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_one").addClass("active");
  	router.navigate('createOrder/store', true);
		$("#buy_one").fadeIn();
  },
  createOrderChooseProduct: function () {
  	Session.set('partial', 'createOrder');

  	// change the view
  	$("#buy_two").addClass("active");
		$("#buy_one").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/product', true);
			$("#buy_two").fadeIn();
		});
  },
  createOrderChooseSize: function () {
  	Session.set('partial', 'createOrder');

  	// change the view
  	$("#buy_three").addClass("active");
		$("#buy_two").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/size', true);
			$("#buy_three").fadeIn();
		});
  },
  createOrderChooseTime: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_four").addClass("active");
		$("#buy_three").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/time', true);
			$("#buy_four").fadeIn();
		});
  },
  createOrderVerify: function () {
  	Session.set('partial', 'createOrder');

  	$("#buy_confirm").addClass("active");
		$("#buy_four").fadeOut( function() {
			$(this).removeClass("active");
			router.navigate('createOrder/verify', true);
			$("#buy_confirm").fadeIn();
		});
  }
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});


});


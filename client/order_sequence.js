Meteor.startup(function () {


	Session.set("order", {})
	Template.createOrder.events({
		'click .select-store': function(e) {
			var order = Session.get("order");
			console.log(this._id);
			order.store_id = this._id;
			Session.set("order", order);
		}
	});


});
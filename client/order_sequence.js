Meteor.startup(function () {


	Session.set("order", {})
	Template.createOrder.events({
		'click .select-store': function(e) {
			var order = Session.get("order");
			order.store_id = this._id;
			Session.set("order", order);

			Session.set('activeStore', this._id);

			$("#choose_product").addClass("active");
			$("#choose_store").fadeOut( function() {
				$(this).removeClass("active");
				$("#choose_product").fadeIn();
			});
		}
	});


});
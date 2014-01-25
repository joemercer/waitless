Meteor.startup(function () {


	Session.set("order", {})
	Template.createOrder.events({
		'click .select-store': function(e) {
			var order = Session.get("order");

			console.log(this._id);
			order.store_id = this._id;
			Session.set("order", order);

			Session.set('activeStore', this._id);

			// $("#choose_product").addClass("active");
			$("#buy_one").fadeOut( function() {
				$(this).removeClass("active");
				$("#buy_confirm").fadeIn();
			});
		},
		'click .select-product': function(e) {
			var order = Session.get("order");
			order.items = [this._id, 1];
			Session.set("order", order);

		}
	});


});
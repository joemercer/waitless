Meteor.startup(function () {


	Session.set("order", {});
	Session.set("product", {});
	Template.createOrder.events({
		'click .select-store': function(e) {
			var order = Session.get("order");
			order.store_id = this._id;
			Session.set("order", order);

			Session.set('activeStore', this._id);

			router.createOrderChooseProduct();
		},
		'click .select-product': function(e) {
			// var order = Session.get("order");
			// order.items = [this._id, 1];
			// Session.set("order", order);
			var product = Session.get("product");
			product.name = this.item;
			product.product_id = this._id;
			Session.set("product", product);

			router.createOrderChooseSize();
		},
		'click .select-size': function(e) {
			var order = Session.get("order");
			order.items = [
				{
					product: Session.get('product').product_id,
					size: this.toString(),
					quantity: 1
				}
			];
			Session.set("order", order);

			router.createOrderChooseTime();
		},
		'click .select-time': function(e) {
			var order = Session.get("order");
			order.time_of_pickup = this.label;
			Session.set("order", order);

			router.createOrderVerify();
		},
		'click .item_brew': function(e) {
			var order = Session.get("order");
			Orders.insert({
				status: "requesting",
				store_id: order.status_id,
				time_of_order: new Date().getTime(),
				time_of_pickup: order.time_of_pickup,
				total_amount: 2.95,
				user_id: Meteor.user()._id,
				items: order.items
			});
		}
	});


});
////////// Shared code (client and server) //////////

Stores = new Meteor.Collection('stores');
Products = new Meteor.Collection('products');
// Users = new Meteor.Collection('users');
Orders = new Meteor.Collection('orders');

if (Meteor.isClient) {
  Template.stores.helpers({
    stores: function() {
      return Stores.find();
    },
    findProducts: function(store_id) {
      var products = Products.find({store_id: store_id});
      if (products) {
        return products;
      } else {
        return ['none'];
      }
    }
  })

  Template.products.helpers({
    findProducts: function(store_id) {
      var products = Products.find({store_id: store_id});
      if (products) {
        return products;
      } else {
        return ['none'];
      }
    }
  })

  // Template.users.helpers({
  //   users: function() {
  //     return Users.find();
  //   },
  //   findUserOrders: function(user) {
  //     var orders = Orders.find({user_id: user});
  //     return orders;
  //   }
  // })

  // Template.orders.helpers({
  //   orders: function(p) {
  //     return Orders.find();
  //   }, 
  //   dateFormat: function(date) {
  //     return new Date(date);
  //   },
  //   findStore: function(store_id) {
  //     var store = Stores.findOne(store_id);
  //     return store.name + ' - ' + store.location;
  //   }, // the name and location of the store
  //   findUserName: function(user_id) {
  //     var user = Users.findOne(user_id);
  //     if (user) {
  //       return user.name;
  //     }
  //   },
  //   getItem: function(item_array) {
  //     var product = Products.findOne(item_array[0]);
  //     if (product) {
  //       return item_array[1] + ' : ' + product.item + ' - ' + product.size
  //     }
  //   }
  // })

}


Meteor.methods({
  createStore: function(storeName, storelocation) {
    var store = Stores.findOne({name: storeName, location: storelocation});
    if (store) {
      return store._id;
    } else {
      return Stores.insert({
                    name: storeName, 
                    location: storelocation 
      });
    }
  },
  createUser: function(user_name) {
    var user = Users.findOne({name: user_name});
    if (user) {
      return user._id;
    } else {
      return Users.insert({
        name: user_name
      })
    }
  }, 
  createOrder: function(store, pickup_time, items_req, total, user) {
    Orders.insert({
      store_id: store,
      time_of_order: new Date(),
      time_of_pickup: pickup_time,
      status: "requesting", 
      total_amount: total,
      items: items_req,
      user_id: user,
    })
  }
})
// if the database is empty on server start, create some sample data.

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    // Only add stores and products if no stores already exist
    if (Stores.find({}).count() === 0) {

      // First let's add some stores
      var storeData = [
        {
          username: "timmiesSLC",
          name: "Tim Hortons",
          location: "SLC"
        },
        {
          username: "timmiesDC",
          name: "Tim Hortons",
          location: "DC"
        },
        {
          username: "thebucksyo",
          name: "Starbucks",
          location: "King and University"
        }
      ]
      for(var i=0; i < storeData.length; ++i) {
        Stores.insert(storeData[i]);
      }

      // Now let's add some products
      var productData = [
        {
          item: "Coffee",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "SLC"
          })._id
        },
        {
          item: "Peppermint Tea",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "SLC"
          })._id
        }, 
        {
          item: "Peppermint Mocha",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "SLC"
          })._id
        },
        {
          item: "Vanilla Latte",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "SLC"
          })._id
        },
        {
          item: "White Chocolate Frappuccino",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "SLC"
          })._id
        },
        {
          item: "Coffee",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "DC"
          })._id
        },
        {
          item: "Earl Gray Tea",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "DC"
          })._id
        },
        {
          item: "Chai Tea",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "DC"
          })._id
        },
        {
          item: "Orange Mocha Frappuccino!",
          sizes: ["Small","Medium","Large","XLarge"],
          store_id: Stores.findOne({
            location: "King and University"
          })._id
        }
      ]
      for (var i=0; i < productData.length; ++i) {
        Products.insert(productData[i]);
      }

      // Finally let's add some orders
      var orderData = [
        {
          status: "requesting",
          store_id: Stores.findOne({
            location: "SLC"
          })._id,
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 1.25,
          user_id: "FAKEUSER",
          items: [
            {
              product: Products.findOne({
                store_id: Stores.findOne({
                  location: "SLC"
                })._id,
                item: "Peppermint Mocha"
              })._id,
              size: "Medium",
              quantity: 2
            },
            {
              product: Products.findOne({
                store_id: Stores.findOne({
                  location: "SLC"
                })._id,
                item: "Peppermint Tea"
              })._id,
              size: "Large",
              quantity: 1
            }
          ]
        },
        {
          status: "requesting",
          store_id: Stores.findOne({
            location: "SLC"
          })._id,
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 13.75,
          user_id: "FAKEUSER",
          items: [
            {
              product: Products.findOne({
                store_id: Stores.findOne({
                  location: "SLC"
                })._id,
                item: "Peppermint Mocha"
              })._id,
              size: "Small",
              quantity: 3
            }
          ]
        },
        {
          status: "requesting",
          store_id: Stores.findOne({
            location: "DC"
          })._id,
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 1.25,
          user_id: "FAKEUSER",
          items: [
            {
              product: Products.findOne({
                store_id: Stores.findOne({
                  location: "DC"
                })._id,
                item: "Coffee"
              })._id,
              size: "XLarge",
              quantity: 1
            }
          ]
        }
      ]

      for (var i=0; i<orderData.length; ++i) {
        Orders.insert(orderData[i]);
      };

    }

    // Add all the possible time options
    // if they haven't been added yet
    if (Order_Times.find({}).count() === 0) {
      var hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12',
                    '13','14','15','16','17','18','19','20','21','22','23'];
      var minutes = ['00','05','10','15','20','25','30','35','40','45','50','55'];

      var newTime;
      for (var i=0; i<hours.length; ++i) {
        for (var j=0; j<minutes.length; ++j) {
          newTime = {
            label: hours[i]+':'+minutes[j],
            numMinutes: ((parseInt(hours[i])*60) + parseInt(minutes[j]))
          }

          Order_Times.insert(newTime);
        }
      }

    }


  });
}
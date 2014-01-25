// if the database is empty on server start, create some sample data.

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var buildStores = false;
    var buildProducts = false;
    var buildUsers = false;
    var buildOrders = false;
    if (buildUsers) {
      var userData = [
        {
          name: "Joe Mercer"
        },
        {
          name: "Nicole Jiang"
        },
        {
          name: "Bonnie Li"
        }
      ];

      for (var i=0; i<userData.length; ++i) {
        Users.insert(userData[i]);
      };

    } else if (buildOrders) {
      var orderData = [
        {
          status: "requesting",
          store_id: "jvPxsnAcC96znkfSp",
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 1.25,
          user_id: "bATjJfMARA6fhpsHZ",
          items: [
            ["fcqhDNMLGXeM937Y9", 2],
            ["rxeawaCHMZARBoZ5w", 1]
          ]
        },
        {
          status: "requesting",
          store_id: "jvPxsnAcC96znkfSp",
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 13.75,
          user_id: "F9n52yEuEcyskNPm8",
          items: [
            ["rxeawaCHMZARBoZ5w", 3]
          ]
        },
        {
          status: "requesting",
          store_id: "BE9G8NYYqRjzRDQDS",
          time_of_order: new Date().getTime(),
          time_of_pickup: 139078683626932,
          total_amount: 1.25,
          user_id: "F9n52yEuEcyskNPm8",
          items: [
            ["pTGc3YDA9hbhPcGh7", 1]
          ]
        }
      ]

      for (var i=0; i<orderData.length; ++i) {
        Orders.insert(orderData[i]);
      };
    } else if (buildStores) {
    	var storeData = [
    		{
    			name: "Tim Hortons",
    			location: "SLC"
    		},
    		{
    			name: "Tim Hortons",
    			location: "DC"
    		}
    	]
    	for(var i=0; i < storeData.length; ++i) {
    		Stores.insert(storeData[i]);
    	}
    } else if (buildProducts) {
    	var productData = [
    		{
    			item: "Peppermint Tea",
    			size: "Small",
    			store_id: "bLkjvYdyzZJARBuRt"
    		}, 
    		{
    			item: "Peppermint Mocha",
    			size: "Small",
    			store_id: "bLkjvYdyzZJARBuRt"
    		},
    		{
    			item: "Coffee",
    			size: "Medium",
    			store_id: "amm5w6P8489ubAaRd"
    		}
    	]
    	for (var i=0; i < productData.length; ++i) {
    		Products.insert(productData[i]);
    	}
    }



  });
}
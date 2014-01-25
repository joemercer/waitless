// if the database is empty on server start, create some sample data.

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var buildStores = false;
    var buildProducts = false;
    var buildUsers = false;
    var buildOrders = false;
    var buildTimes = false;
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
    } else if (buildTimes) {
    	
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
// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  if (Groups.find({}).count() === 0) {
    var groupData = [
      {
        creator: '1',
        createdAt: (new Date()),
        groupName: 'Math239',
        members: ['1','2','3']
      },
      {
        creator: '1',
        createdAt: (new Date()),
        groupName: 'CS245',
        members: ['1','3']
      },
      {
        creator: '2',
        createdAt: (new Date()),
        groupName: 'ECE101',
        members: ['2','3']
      }
    ];

    for (var i=0; i<groupData.length; ++i) {
      Groups.insert(groupData[i]);
    };

  }

});

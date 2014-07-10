// Connect to MongoDB instance
var mongoose = require('mongoose');
var database_uri = 'mongodb://localhost'
mongoose.connect(database_uri);

// Insert bathroom documents
var models = require('./models');
models.Room.create({name: 'NYC 5th Floor Men\'s', num_stalls: 4}, function(err, room) {
	if (err) {
		console.log('Error inserting room document!', err);
	} else {
		models.Stall.create([{stall_num: 1, status: 1, room_id: room['_id']},
							 {stall_num: 2, status: 1, room_id: room['_id']},
							 {stall_num: 3, status: 1, room_id: room['_id']},
							 {stall_num: 4, status: 1, room_id: room['_id']}],
							 function(err) {
			if (err) {
				console.log('Error inserting stall documents!', err);
			} else {
				console.log('Done.');
				mongoose.disconnect();
			}
		});
	}
});
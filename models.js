var Mongoose = require('mongoose');

var RoomSchema = new Mongoose.Schema({
	name: String,
	num_stalls: Number
});

var StallSchema = new Mongoose.Schema({
	stall_num: Number,
	status: Number,
	room_id: Mongoose.Schema.ObjectID
})

exports.Room = Mongoose.model('Room', RoomSchema);
exports.Stall = Mongoose.model('stall', StallSchema);
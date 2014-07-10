var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var RoomSchema = new Schema({
	name: String,
	num_stalls: Number
});

var StallSchema = new Schema({
	stall_num: Number,
	status: Number,
	room_id: ObjectId
})

exports.Room = mongoose.model('Room', RoomSchema);
exports.Stall = mongoose.model('stall', StallSchema);
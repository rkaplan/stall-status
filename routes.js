var models = require('./models');
var ObjectId = require('mongoose').Types.ObjectId;

exports.getBathroomNames = function(req, res) {
	models.Room.find({}, function(err, rooms) {
		if (err) {
			res.status(500).send({error: 'Error getting bathroom names.'});
		} else {
			res.status(200).send(rooms);
		}
	});
}

exports.getBathroomStatus = function(req, res) {
	models.Stall
		.find({room_id: ObjectId(req.query['room_id'])}, {status: 1, _id: 0}, function(err, stalls) {
			if (err) {
				res.status(500).send({error: 'Error getting stall.'});
			} else {
				res.status(200).send(stalls);
			}
	});
}

exports.openStall = function(req, res, callback) {
	models.Stall
		.update({room_id: ObjectId(req.body['room_id']), stall_num: req.body['stall_num']},
				{status: 1},
				{multi: false},
				callback);
}

exports.closeStall = function(req, res, callback) {
	models.Stall
		.update({room_id: ObjectId(req.body['room_id']), stall_num: req.body['stall_num']},
				{status: -1},
				{multi: false},
				callback);
}
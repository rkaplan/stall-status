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

exports.openStall = function(req, res) {
	models.Stall
		.update({room_id: ObjectId(req.body['room_id']), stall_num: parseInt(req.body['stall_num'])},
				{status: 1},
				{multi: false},
				function(err, numStalls, raw) {
					if (err) {
						res.status(500).send({error: 'Error updating stall status to true!', data: raw})
						return false;
					}
					if (numStalls != 1) {
						res.status(400).send({error: 'Stall not found: updating status to true.', data: raw})
						return false;
					}
					res.status(200).send({ok: 1});
					return true;
				});
}

exports.closeStall = function(req, res) {
	models.Stall
		.update({room_id: ObjectId(req.body['room_id']), stall_num: req.body['stall_num']},
				{status: -1},
				{multi: false},
				function(err, numStalls, raw) {
					if (err) {
						res.status(500).send({error: 'Error updating stall status to false!', data: raw})
						return false;
					}
					if (numStalls != 1) {
						res.status(400).send({error: 'Stall not found: updating status to false.', data: raw})
						return false;
					}
					res.status(200).send({ok: 1});
					return true;
				});
}
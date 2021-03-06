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
		.find({}, {status: 1, _id: 0}, function(err, stalls) {
			if (err) {
				res.status(500).send({error: 'Error getting stall.'});
			} else {
				res.status(200).send(stalls);
			}
	});
}

exports.openStall = function(req, res, callback) {
	models.Stall
		.update({stall_num: req.body['stall_num'], status: 0},
				{status: 1},
				{multi: false},
				callback);
}

exports.closeStall = function(req, res, callback) {
	models.Stall
		.update({stall_num: req.body['stall_num'], status: 1},
				{status: 0},
				{multi: false},
				callback);
}
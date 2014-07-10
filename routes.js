var models = require('./models');

exports.getBathroomNames = function(req, res) {
	models.Room.find({}, 'name', function(err, rooms) {
		if (err) {
			res.status(500).send({error: 'Error getting bathroom names.'});
			return;
		}
		console.log(JSON.stringify(rooms));
		res.status(200).send(rooms);
	});
}

exports.openStall = function(req, res) {
	models.Stall
		.update({room_id: req['room_id'], stall_num: req['stall_num']},
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
		.update({room_id: req['room_id'], stall_num: req['stall_num']},
				{status: 0},
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
// Connect to MongoDB instance
var mongoose = require('mongoose');
var database_uri = process.env.MONGOLAB_URI || 'mongodb://localhost'
mongoose.connect(database_uri);

// Configure server
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
var routes = require('./routes');

// Start server on port 3000
var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// Route to return all bathroom names
app.get('/rooms', routes.getBathroomNames);

// Route to return initial statue of bathroom
app.get('/rooms/status', routes.getBathroomStatus);

// Start socket.io
var io = require('socket.io').listen(server);

// Open stall route
app.post('/stalls/open', function(req, res) {
	console.log('opening: ', req.body);
	routes.openStall(req, res, function(err, numStalls, raw) {
		console.log(raw);
		if (err) {
			res.status(500).send({error: 'Error updating stall status to open!', data: raw})
			return;
		}
		if (numStalls === 1) {
			io.emit('stall_open', {stall_num: req.body['stall_num']});
		}
		res.status(200).send({ok: 1});
	});
});

// Close stall route
app.post('/stalls/close', function(req, res) {
	console.log('closing: ', req.body);
	routes.closeStall(req, res, function(err, numStalls, raw) {
		console.log(raw);
		if (err) {
			res.status(500).send({error: 'Error updating stall status to closed!', data: raw})
			return;
		}
		if (numStalls === 1) {
			io.emit('stall_close', {stall_num: req.body['stall_num']});
		}
		res.status(200).send({ok: 1});
	});
});

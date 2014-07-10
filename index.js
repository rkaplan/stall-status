// Connect to MongoDB instance
var mongoose = require('mongoose');
var database_uri = 'mongodb://localhost'
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
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

// Route to return all bathroom names
app.get('/rooms', routes.getBathroomNames);

// Start socket.io
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {

	// Open stall route
	app.post('/stalls/open', function(req, res) {
		if (routes.openStall(req, res)) {
			socket.emit('stall_open', {stall_num: req['stall_num']});
		}
	});

	// Close stall route
	app.post('/stalls/close', function(req, res) {
		if (routes.closeStall(req, res)) {
			socket.emit('stall_close', {stall_num: req['stall_num']});
		}
	});

	// setInterval(function() {
	// 	if (Math.random() > 0.5) {
	// 		socket.emit('stall_open', {stall_id: Math.floor(Math.random() * 4)})
	// 	} else {
	// 		socket.emit('stall_close', {stall_id: Math.floor(Math.random() * 4)})
	// 	}
	// }, 5000);
})
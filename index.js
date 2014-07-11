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

// Start socket.io
var io = require('socket.io').listen(server);

// Open stall route
app.post('/stalls/open', function(req, res) {
	console.log('opening: ', req.body);
	if (routes.openStall(req, res)) {
		io.emit('stall_open', {stall_num: req['stall_num']});
	}
});

// Close stall route
app.post('/stalls/close', function(req, res) {
	console.log('closing: ', req.body);
	io.emit('stall_close', {stall_num: req['stall_num']});
	if (routes.closeStall(req, res)) {
		io.emit('stall_close', {stall_num: req['stall_num']});
	}
});

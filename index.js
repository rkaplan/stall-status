var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io').listen(server);

app.post('/api', function(req, res) {
	console.log('hello');
});

io.on('connection', function(socket) {
	setInterval(function() {
		socket.emit('hello', 'message');
	}, 1000);
})
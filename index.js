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

app.get('/rooms', function(req, res) {
	// send list of all bathrooms
	res.send({status: 200, bathroom_names: ['NYC Men\'s 5th Floor', 'NYC Women\'s NYC 5th Floor']});
});

io.on('connection', function(socket) {
	// socket.emit('room_name', )
	setInterval(function() {
		if (Math.random() > 0.5) {
			socket.emit('stall_open', { stall_id : Math.floor(Math.random() * 4)})
		} else {
			socket.emit('stall_close', { stall_id : Math.floor(Math.random() * 4)})
		}
	}, 5000);
})
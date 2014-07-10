var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var io = require('socket.io');

app.post('/api', function(req, res) {
	console.log('hello');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
var socket = io();
var bathrooms;
var stalls = [];
for (var i = 0; i < 4; i++) {
    stalls.push(d3.select('#stalls').append('svg')
                  .attr('width', 250)
                  .attr('height', 300));
}

// var svg = d3.select('#stalls').append('svg')
//             .attr('width', 800)
//             .attr('height', 400);

$.get('/rooms', function(data) {
    console.log(data);
    bathrooms = data['bathroom_names'];
});

function setupSocketListeners() {
    socket.on('stall_open', function(msg){
      console.log('message from the server: ');
      console.log(msg);
    });

    socket.on('stall_close', function(msg){
      console.log('message from the server: ');
      console.log(msg);
    });
}

function renderStalls() {

    var stallJson = {
        
    }

    var stallRects = [
        [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
        [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
        [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
        [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}]
    ];

    for (var i = 0; i < 4; i++) {
        var rects = stalls[i].selectAll('rect')
                          .data(stallRects[i])
                          .enter()
                          .append('rect');

        var rectAttrs = rects
                          .attr('x', function (d) { return d.x; })
                          .attr('y', function (d) { return d.y; })
                          .attr('width', function (d) { return d.width; })
                          .attr('height', function (d) { return d.height; })
                          .style('fill', function(d) { return d.color; });
    }
}

setupSocketListeners();
renderStalls();










// if (window.webkitNotifications && navigator.userAgent.indexOf('Chrome') > -1) {
//   console.log('Web Notifications are supported with the WebKit API');
// } else if (window.Notification) {
//   console.log('Web Notifications are supported with the W3C/Safari API');
// } else {
//   console.log('Web Notifications are not supported in this browser');
// }

// if (window.Notification.permission === 'granted') {
//   console.log('Web Notifications are allowed');
// } else if (window.Notification.permission === 'default') {
//   console.log('Web Notifications are not allowed, need to ask permission');
//   console.log('Hi');
//   window.Notification.requestPermission(function(e) { console.log('received!');} );
// } else {
//   console.log('Web Notifications are not allowed');
// }
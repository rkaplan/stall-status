var socket = io();
var bathrooms;
var stalls = [];
var numFreeStalls = 4;

for (var i = 0; i < 4; i++) {
    stalls.push(d3.select('#stalls').append('svg')
                  .attr('width', 250)
                  .attr('height', 300));
}

stallRects = [
    [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
    [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
    [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
    [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}]
];

$.get('/rooms', function(data) {
    console.log(data);
    bathrooms = data['bathroom_names'];
});

function stallOpened(data) {
    console.log('open message from the server: ');
    console.log(data);
    var idx = parseInt(data['stall_num']);
    stalls[idx].select('rect')
        .style('fill', 'green');
    numFreeStalls++;
    $('#numStalls').text(numFreeStalls);
}

function stallClosed(data) {
    console.log('close message from the server: ');
    console.log(data);
    var idx = parseInt(data['stall_num']);
    stalls[idx].select('rect')
        .style('fill', 'red');
    numFreeStalls--;
    $('#numStalls').text(numFreeStalls);
}

function setupSocketListeners() {
    socket.on('stall_open', stallOpened);
    socket.on('stall_close', stallClosed);
}

function renderStalls() {

    // var stallJson = [
    //     {'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}
    // ];

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
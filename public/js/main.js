var socket = io();
var bathrooms;
var stalls;
var numFreeStalls = 0;

function setStallColor(stallNum, color) {
  $(stalls[stallNum])
      .attr('stroke', color)
      .attr('fill', color)
}

function increaseFreeStalls() {
  if (numFreeStalls < 4)
    numFreeStalls++;
  $('#numStalls').text(numFreeStalls);
}

function decreaseFreeStalls() {
  if (numFreeStalls > 0)
    numFreeStalls--;
  $('#numStalls').text(numFreeStalls);
}

// for (var i = 0; i < 4; i++) {
//     stalls.push(d3.select('#stalls').append('svg')
//                   .attr('width', 250)
//                   .attr('height', 300));
// }

// stallRects = [
//     [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
//     [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
//     [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}],
//     [{'x': 25, 'y': 0, 'width': 200, 'height': 250, 'color': 'green'}]
// ];

function stallOpened(data) {
    console.log('open message from the server: ');
    console.log(data);
    var idx = parseInt(data['stall_num']);
    setStallColor(idx, 'green');
    increaseFreeStalls();
}

function stallClosed(data) {
    console.log('close message from the server: ');
    console.log(data);
    var idx = parseInt(data['stall_num']);
    setStallColor(idx, 'red');
    decreaseFreeStalls();
}

function setupSocketListeners() {
    socket.on('stall_open', stallOpened);
    socket.on('stall_close', stallClosed);
}

function renderStalls() {
    stalls = $('.stallSvg');

    $.get('/rooms', function(data) {
      console.log(data);
      bathrooms = data;

      $.get('/rooms/status', {room_id: bathrooms[0]['_id']}, function(resp) {
          console.log('this is the setup obj from server:');
          console.log(resp);

          for (var i = 0; i < 4; i++) {
            var colorToSet = resp[i].status === 1 ? 'green' : 'red';
            setStallColor(i, colorToSet);
            if (resp[i].status === 1)
              increaseFreeStalls();

            // var rects = stalls[i].selectAll('rect')
            //                   .data(stallRects[i])
            //                   .enter()
            //                   .append('rect');

            // var rectAttrs = rects
            //                   .attr('x', function (d) { return d.x; })
            //                   .attr('y', function (d) { return d.y; })
            //                   .attr('width', function (d) { return d.width; })
            //                   .attr('height', function (d) { return d.height; })
            //                   .style('fill', function(d) { return d.color; });

          }
      });
  });
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
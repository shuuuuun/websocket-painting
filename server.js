var PORT = 2020;

var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(PORT);

function handler (req, res) {
  // console.log('request.url:', req.url);
  var file = (__dirname + '/public' + req.url).replace(/\/$/,'/index.html');
  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}


io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('createDot', function (data) {
    io.emit('createDot', data); // broadcast
    
    socket.on('motion', function (data) {
      io.emit('update', data); // broadcast
    });
  });
});


console.log('start');



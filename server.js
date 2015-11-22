var PORT = 2020;

// // var socket = require('socket.io');
// var Server = require('socket.io');
// var io = new Server();
// // var io = require('socket.io')();
// io.on('connection', function(socket){
//   socket.on('event', function(data){});
//   socket.on('disconnect', function(){});
//   console.log('hoge');
// });
// io.listen(PORT);
// io.sockets.emit('an event sent to all connected clients');
// io.emit('an event sent to all connected clients');


// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(PORT, '127.0.0.1');
// console.log('Server running at http://localhost:' + PORT +'/');


var http = require('http');
var server = http.createServer(handler);
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(PORT);

// console.log(__dirname, __filename);
function handler (req, res) {
  console.log('request.url:', req.url);
  var file = (__dirname + '/public' + req.url).replace(/\/$/,'/index.html');
  // console.log('file:', file);
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
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
  socket.on('textsubmit', function (data) {
    console.log(data);
    // socket.emit('hoge', data); // 同じ画面にしか送れないと思ったら
    // socket.broadcast.emit('hoge', data); // broadcastすれば良かった
    io.emit('hoge', data); // これでもok
    
  });
});


console.log('start');



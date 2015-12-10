(function(win, doc){
  var ns = win.App = win.App || {};
  
  // var URL = 'http://172.21.33.194:2020';
  // var URL = 'http://192.168.1.4:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  var $win = $(window);
  var util = new ns.Util();
  var throttleInterval = 10;
  var adjustment = 10;
  var dotX = 0;
  var dotY = 0;
  var connectionId = util.getRandomInt(0,9999999); // 0~9999999の乱数
  
  socket.emit('createDot', {
    connectionId: connectionId,
    top: dotX,
    left: dotY,
  });
  
  var $container = $('.container');
  var $toucharea = $('.toucharea');
  var $dot = $('.dot');
  
  var containerW = $container.width();
  var containerH = $container.height();
  
  var radius = containerW / 2 + $toucharea.width() / 2;
  var AIG = {};
  
  var touch = new ns.TouchController($toucharea);
  var position = new ns.PositionController($toucharea, radius);
  
  touch.on("touchstart",function(evt, info){
    $win.off("devicemotion", setGravityPosition);
  });
  touch.on("touchmove",function(evt, info){
    // position.movePosition({ x: info.moveX, y: info.moveY });
    position.movePosition({ x: info.deltaX, y: info.deltaY });
    setDot(info.deltaX, info.deltaY);
  });
  touch.on("touchend",function(evt, info){
    position.adjustPosition(AIG);
  });
  position.on("adjustend",function(evt){
    $win.on("devicemotion", setGravityPosition);
  });
  
  $win.on("devicemotion", getGravity);
  $win.on("devicemotion", setGravityPosition);
  
  function getGravity(evt){
    evt = evt.originalEvent || evt; // for jquery
    if (!evt.accelerationIncludingGravity) return;
    
    // 傾き
    AIG.x = evt.accelerationIncludingGravity.x || 0;
    AIG.y = evt.accelerationIncludingGravity.y || 0;
    AIG.z = evt.accelerationIncludingGravity.z || 0;
    
    // 基準が9.8なので0~1にする
    AIG.x /= 9.8;
    AIG.y /= 9.8;
    AIG.z /= 9.8;
    
    setDot(AIG.x, -AIG.y);
  }
  function setGravityPosition(){
    position.setPosition(AIG);
  }
  
  setInterval(tick, 10);
  
  function setDot(x, y){
    dotX += x;
    dotY += y;
  }
  
  function tick(){
    // dotX += position.x || 0;
    // dotY += position.y || 0;
    socket.emit('motion', {
      connectionId: connectionId,
      left: dotX,
      top: dotY,
      // left: position.x,
      // top: position.y,
    });
  }
  
})(this, document);


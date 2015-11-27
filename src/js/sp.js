(function(win, doc){
  var ns = win.App = win.App || {};
  
  var util = new ns.Util();
  var throttleInterval = 10;
  var adjustment = 10;
  var dot;
  var container;
  
  // var URL = 'http://172.21.33.194:2020';
  // var URL = 'http://192.168.1.4:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  var dotX = 0,
      dotY = 0;
  
  var connectionId = util.getRandomInt(0,9999999); // 0~9999999の乱数
  
  socket.emit('createDot', {
    connectionId: connectionId,
    top: dotX,
    left: dotY,
  });
  
  $(function(){
    container = document.querySelector('.container');
    dot = document.querySelector('.dot');
    
    containerW = $(container).width();
    containerH = $(container).height();
  });
  
  window.addEventListener('devicemotion', util.throttle(function(evt){
      
      //傾き
      var xg = evt.accelerationIncludingGravity.x || 0;
      var yg = evt.accelerationIncludingGravity.y || 0;
      var zg = evt.accelerationIncludingGravity.z || 0;
      
      dotX += (xg / adjustment);
      dotY -= (yg / adjustment);
      
      socket.emit('motion', {
        connectionId: connectionId,
        left: dotX,
        top: dotY,
      });
      
      // dot.style.left = dotX + 'px';
      // dot.style.top = dotY + 'px';
      
      dot.style.left = (xg * adjustment) + '%';
      dot.style.top = -(yg * adjustment) + '%';
      
  },throttleInterval), true);
  
})(this, document);


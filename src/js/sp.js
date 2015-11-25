(function(win, doc){
  var ns = win.App = win.App || {};
  
  var util = new ns.Util();
  var throttleInterval = 10;
  var threshold = 5;
  var adjustment = 1;
  var konsole;
  var dot;
  var container;
  
  var URL = 'http://172.21.33.194:2020';
  // var URL = 'http://192.168.1.4:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  var dotX = 0,
      dotY = 0;
  
  $(function(){
    konsole = document.querySelector('.konsole');
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
      
      //回転値
      var a = evt.rotationRate.alpha || 0; // z方向
      var b = evt.rotationRate.beta  || 0; // x方向
      var g = evt.rotationRate.gamma || 0; // y方向
      
      var txt  = '傾きx: ' + xg.toString().slice(0,5) + '<br>';
          txt += '傾きy: ' + yg.toString().slice(0,5) + '<br>';
          txt += '傾きz: ' + zg.toString().slice(0,5) + '<br>';
      
          txt += 'alpha(z): ' + a.toString().slice(0,5) + '<br>';
          txt += 'beta(x):  ' + b.toString().slice(0,5) + '<br>';
          txt += 'gamma(y): ' + g.toString().slice(0,5) + '<br>';
      
      
      dotX += (xg / adjustment);
      dotY -= (yg / adjustment);
      
      socket.emit('motion', {
        top: dotX,
        left: dotY,
      });
      
      var left = dotX;
      var top = dotY;
      
      // var left = (dotX < -containerW/2) ? -containerW/2: dotX;
      // var top = (dotY < -containerH/2) ? -containerH/2: dotY;
      
      dot.style.left = left + 'px';
      dot.style.top = top + 'px';
      
      
  },throttleInterval), true);

})(this, document);


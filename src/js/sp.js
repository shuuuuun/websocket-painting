(function(win, doc){
  var ns = win.App = win.App || {};
  
  var util = new ns.Util();
  var throttleInterval = 10;
  var threshold = 5;
  var adjustment = 1;
  var konsole;
  var dot;
  
  var URL = 'http://172.21.33.194:2020';
  // var URL = 'http://192.168.1.4:2020';
  
  var socket = io.connect(URL);
  // var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  $(function(){
    konsole = document.querySelector('.konsole');
    dot = document.querySelector('.dot');
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
      
      if (!xg || !yg || !zg) {
          txt = 'Not Supported!!';
          konsole.innerHTML = txt;
          return;
      }
      // konsole.innerHTML = txt;
      
      var currentLeft = parseFloat(dot.style.left) || 0;
      var currentTop = parseFloat(dot.style.top) || 0;
      
      dot.style.left = (currentLeft + (xg / adjustment)) + 'px';
      dot.style.top = (currentTop - (yg / adjustment)) + 'px';
      
      
      socket.emit('motion', {
        top: dot.style.top,
        left: dot.style.left,
      });
      
  },throttleInterval), true);

})(this, document);


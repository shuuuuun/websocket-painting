(function(win, doc){
  var ns = win.App = win.App || {};
  
  var util = new ns.Util();
  var pi = Math.PI;
  
  // var URL = 'http://localhost:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  var COLOR_LIST = ["#FFCC66", "#FF6666", "#CCFF66", "#66CCFF", "#FF6FCF", "#66FFCC", "#FFFF66"];
  var throttleInterval = 10;
  
  var dotAry = [];
  var connectionIdList = [];
  
  $(function(){
    var cnvs = document.getElementById("cnvs");
    var ctx = cnvs.getContext("2d");
    
    cnvs.width = window.innerWidth;
    cnvs.height = window.innerHeight;
    
    ctx.translate(cnvs.width / 2, cnvs.height / 2);
    
    socket.on('createDot', function (data) {
      dotAry.push(new Dot(data));
      connectionIdList.push(data.connectionId);
      
      socket.on('update', util.throttle(update, throttleInterval));
    });
    
    function update(data){
      var index = connectionIdList.indexOf(data.connectionId);
      dotAry[index].update(data);
      
      render();
    }
    
    function render(){
      //ctx.clearRect(0, 0, cnvs.width, cnvs.height);
      
      $.each(dotAry, function(index, dot){
        ctx.save();
          ctx.fillStyle = dot.fillStyle;
          ctx.arc(dot.dotX, dot.dotY, 5, 0, pi * 2);
          ctx.fill();
          ctx.closePath();
        ctx.restore();
      });
    }
  });
  
  
  function Dot(data){
    var r = util.getRandomInt(0,COLOR_LIST.length-1);
    this.fillStyle = COLOR_LIST[r];
    this.dotX = data.left;
    this.dotY = data.top;
  }
  Dot.prototype.create = function(){};
  Dot.prototype.update = function(data){
    this.dotX = data.left;
    this.dotY = data.top;
  };
  
  
})(this, document);

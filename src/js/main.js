(function(win, doc){
  var ns = win.App = win.App || {};
  
  var util = new ns.Util();
  
  var PI = Math.PI;
  var COLOR_LIST = ["#FFCC66", "#FF6666", "#CCFF66", "#66CCFF", "#FF6FCF", "#66FFCC", "#FFFF66"];
  var THROTTLE_INTERVAL = 10;
  
  // var URL = 'http://localhost:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  var dotAry = [];
  var connectionIdList = [];
  
  var cnvs = document.getElementById("cnvs");
  var ctx = cnvs.getContext("2d");
  
  cnvs.width = $(win).width();
  cnvs.height = $(win).height();
  ctx.translate(cnvs.width / 2, cnvs.height / 2);
  
  
  socket.on('createDot', function (data) {
    dotAry.push(new Dot(data));
    connectionIdList.push(data.connectionId);
    
    socket.on('update', util.throttle(update, THROTTLE_INTERVAL));
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
        ctx.beginPath();
        ctx.arc(dot.dotX, dot.dotY, 5, 0, PI * 2);
        ctx.fill();
        ctx.closePath();
      ctx.restore();
    });
  }
  
  
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
  
  
  (function setQrCode(){
    var $qrimg = $(".qr img");
    var size = 200;
    var src = "https://chart.googleapis.com/chart?cht=qr&chs="+size+"x"+size+"&chl=" + encodeURIComponent(location.origin) + "/sp/";
    $qrimg.attr("src", src);
  })();
  
  
})(this, document);

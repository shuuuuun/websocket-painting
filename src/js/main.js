(function(win, doc){
  var ns = win.App = win.App || {};
  
  // var $win = $(win);
  var util = new ns.Util();
  var konsole;
  var dot;
  
  var URL = 'http://localhost:2020';
  // var socket = io.connect(URL);
  var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  
  $(function(){
    var $wrapper = $('.wrapper');
    
    
    var cnvs = document.getElementById("cnvs");
    var ctx = cnvs.getContext("2d");
    
    cnvs.width = window.innerWidth - 20;
    cnvs.height = window.innerHeight - 20;
    
    var dotX = cnvs.width/2,
        dotY = cnvs.height/2;
        
    var xg = 0,
        yg = 0,
        zg = 0;
    
    socket.on('update', function (data) {
      console.log(data);
      dotX = data.left;
      dotY = data.top;
      
      render();
    });  
    
    function render(){
        //ctx.clearRect(0, 0, cnvs.width, cnvs.height);
        
        //ctx.save();
        //ctx.strokeStyle = "#000";
        ctx.fillStyle = "#ffcc66";
        //ctx.rect(dotX, dotY, 10, 10);
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();
        //ctx.restore();
    }
  });
  
  
  
})(this, document);

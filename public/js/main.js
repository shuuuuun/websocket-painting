!function(t,n){var e=t.App=t.App||{},i=(new e.Util,"http://localhost:2020"),o=io.connect(i);$(function(){function t(){e.fillStyle="#ffcc66",e.arc(i,c,5,0,2*Math.PI),e.fill(),e.closePath()}var n=($(".wrapper"),document.getElementById("cnvs")),e=n.getContext("2d");n.width=window.innerWidth-20,n.height=window.innerHeight-20;var i=n.width/2,c=n.height/2;o.on("update",function(n){console.log(n),i=n.left,c=n.top,t()})})}(this,document);
(function(win, doc){
  var ns = win.App = win.App || {};
  
  // var $win = $(win);
  var util = new ns.Util();
  var konsole;
  var dot;
  
  // var URL = 'ws://localhost:2020';
  var URL = 'http://localhost:2020';
  // var URL = 'http://192.168.1.4:2020';
  
  var socket = io.connect(URL);
  // var socket = io(); // URL指定しなくてもデフォルトで現在のホストに接続する
  // socket.on('news', function (data) {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'data' });
  // });  
  
  $(function(){
    var $wrapper = $('.wrapper');
    
    // var $form = $('.js-form');
    // var $input = $('.js-input');
    // var $submit = $('.js-submit');
    // $form.on('submit',function(){
    //   // alert('submit');
    //   return false;
    // });
    // $submit.on('click',function(){
    //   // alert('click');
    //   socket.emit('textsubmit', { value: $input.val() });
    //   // return false;
    // });
    
    // socket.on('hoge', function (data) {
    //   console.log(data);
    //   $wrapper.append($('<p>').text(data.value));
    // });  
    
    
    konsole = document.querySelector('.konsole');
    dot = document.querySelector('.dot');
    
    socket.on('update', function (data) {
      console.log(data);
      dot.style.left = data.left;
      dot.style.top = data.top;
    });  
    
  });
  
  
  
})(this, document);

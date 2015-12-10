(function(win, doc){
  var ns = win.App = win.App || {};
  
  ns.PositionController = function($element, radius){
    ns.EventDispatcher.call(this);
    this.$element = $element;
    this.radius = radius;
  };
  ns.PositionController.prototype = Object.create(ns.EventDispatcher.prototype);
  ns.PositionController.prototype.constructor = ns.PositionController;
  
  ns.PositionController.prototype.movePosition = function(travel){
    var before = this.checkPosition();
    this.x = (before.left + travel.x);
    this.y = (before.top + travel.y);
    this.$element.css({
      "top": this.y + "px",
      "left": this.x + "px",
    });
  };
  ns.PositionController.prototype.checkPosition = function(){
    return {
      top:  this.$element.position().top,
      left: this.$element.position().left,
    };
  };
  ns.PositionController.prototype.adjustPosition = function(AIG){
    var _this = this;
    this.x = AIG.x * this.radius;
    this.y = -AIG.y * this.radius;
    this.$element.animate({
      "top": this.y + "px",
      "left": this.x + "px",
    }, function(){
      _this.trigger("adjustend");
    });
  };
  ns.PositionController.prototype.setPosition = function(AIG){
    this.x = AIG.x * this.radius;
    this.y = -AIG.y * this.radius;
    this.$element.css({
      "top": this.y + "px",
      "left": this.x + "px",
    });
  };
  
})(this, document);

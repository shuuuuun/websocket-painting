!function(t){function i(t){return!!this.event_list[t]}function e(t,i){var e=this.has(t);if(!e)return this.event_list[t]=[i],this;var s=this.event_list[t].indexOf(i);return s>=0?this:(this.event_list[t].push(i),this)}function s(t,i){var e=this.has(t);if(!e)return this;var s=this.event_list[t],r=s.indexOf(i);return 0>r?this:(s.splice(r,1),this)}function r(t){var i=this.has(t);if(!i)return this;var e=this.event_list[t].slice(),s=e.length,r={type:t},n=Array.prototype.slice.call(arguments);n.shift(),n.unshift(r);for(var h=0;s>h;++h)e[h]&&e[h].apply(this,n);return this}var n=t.App=t.App||{};n.EventDispatcher=function(){this.event_list=[]},n.EventDispatcher.prototype.has=i,n.EventDispatcher.prototype.on=e,n.EventDispatcher.prototype.off=s,n.EventDispatcher.prototype.trigger=r,n.EventDispatcher.prototype.fire=r}(this);
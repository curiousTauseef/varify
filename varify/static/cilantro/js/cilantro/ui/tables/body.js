var __bind=function(t,e){return function(){return t.apply(e,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(t,e){function i(){this.constructor=t}for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};define(["underscore","marionette","./row"],function(t,e,i){var n,o;return n=function(e){function n(){return this.itemViewOptions=__bind(this.itemViewOptions,this),o=n.__super__.constructor.apply(this,arguments)}return __extends(n,e),n.prototype.tagName="tbody",n.prototype.template=function(){},n.prototype.itemView=i.Row,n.prototype.itemViewOptions=function(e){return t.defaults({collection:e.data},this.options)},n}(e.CollectionView),{Body:n}});
//@ sourceMappingURL=body.js.map
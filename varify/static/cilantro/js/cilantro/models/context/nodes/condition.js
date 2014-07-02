var __hasProp={}.hasOwnProperty,__extends=function(t,e){function i(){this.constructor=t}for(var n in e)__hasProp.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};define(["underscore","./base"],function(t,e){var i,n;return i=function(e){function i(){return n=i.__super__.constructor.apply(this,arguments)}return __extends(i,e),i.prototype.type="condition",i.prototype.validate=function(e){if(null==e.operator||null==e.field||null==e.value)return"Not a valid condition node";if(t.isArray(e.value)&&!e.value.length)return"Empty condition value";if(t.isArray(e.value)&&"range"===e.operator){if(2!==e.value.length)return"Exactly 2 values must be supplied to define a range";if(e.value[0]>e.value[1])return"Lower bound value must be less than upper bound value"}},i.prototype.toJSON=function(e){var n;return n=i.__super__.toJSON.call(this,e),null!=n.value&&"object"==typeof n.value&&(n.value=t.clone(n.value)),n},i}(e.ContextNodeModel),{ConditionNodeModel:i}});
//@ sourceMappingURL=condition.js.map
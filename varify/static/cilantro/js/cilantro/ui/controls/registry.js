define(["underscore","loglevel","../../core","./date","./number","./search","./select","./infograph","./null"],function(t,e,i,n,o,s,r,a,l){var c={infograph:a.InfographControl,number:o.NumberControl,date:n.DateControl,search:s.SearchControl,singleSelectionList:r.SingleSelectionList,multiSelectionList:r.MultiSelectionList,nullSelector:l.NullSelector},u={},h=0,d=function(t,i){h++,require([i],function(e){u[t]=e,h--},function(t){e.debug(t),h--})},p=function(t,e){switch(typeof e){case"function":u[t]=e;break;case"string":d(t,e);break;default:throw new Error("control must be a function or AMD module")}};return{get:function(t){return u[t]||c[t]},set:function(e,i){"object"==typeof e?t.each(e,function(t,e){p(e,t)}):p(e,i)},ready:function(){return 0===h},clear:function(){u={}}}});
//@ sourceMappingURL=registry.js.map
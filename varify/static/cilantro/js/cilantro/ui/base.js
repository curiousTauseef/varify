define(["jquery","underscore","marionette"],function(t,e,i){var n=i.ItemView.extend({align:"center",constructor:function(t){if(i.ItemView.prototype.constructor.call(this,t),!this.template)if(this.options.template)this.template=this.options.template;else{var n=[],s=e.result(this.options,"icon")||e.result(this,"icon"),o=e.result(this.options,"message")||e.result(this,"message");s&&n.push(s),o&&n.push(o),this.template=function(){return n.join(" ")}}this.align&&this.$el.css("text-align",this.align)}}),s=n.extend({className:"empty-view",icon:'<i class="icon-info"></i>',message:"No data available"}),o=s.extend({className:"empty-search-view",icon:'<i class="icon-search icon-2x"></i>',message:"We could not find anything related to your search"}),r=n.extend({className:"error-view",icon:'<i class="icon-exclamation"></i>',message:"Something went awry.."}),a=r.extend({className:"error-overlay-view",template:"base/error-overlay",onRender:function(){t(this.options.target).append(this.$el)}}),l=n.extend({className:"load-view",icon:'<i class="icon-spinner icon-spin"></i>',message:"Loading..."});return{EmptyView:s,EmptySearchView:o,ErrorView:r,ErrorOverlayView:a,LoadView:l}});
//@ sourceMappingURL=base.js.map
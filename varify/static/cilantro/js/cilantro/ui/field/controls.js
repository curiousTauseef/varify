define(["underscore","marionette","loglevel","../../core","../base","../controls"],function(t,e,i,n,o,s){var r=function(t,e){e&&(e.listenTo(t,"change",function(t,i){e.clear(),e.set(i)}),t.listenTo(e,"change",function(e){t._changing||t.set(e.toJSON())}))},a=function(t,e){e.stopListening(t),t.stopListening(e)},l=o.ErrorView.extend({message:"Error rendering field control"}),c=o.LoadView.extend({message:"Loading and rendering field controls..."}),u=e.ItemView.extend({errorView:l,template:function(){},initialize:function(){var e=this.model.get("control");if(e=s.get(e)||e,t.isFunction(e))this.viewClass=e;else{var n=this;require([e],function(t){n.viewClass=t,n.render()},function(t){n.showErrorView(),i.debug(t)})}},onRender:function(){this.viewClass&&(this.view=new this.viewClass(this.model.toJSON()),this.view.render(),this.$el.html(this.view.el),this.listenTo(this.view,{beforeready:this.onControlBeforeReady,error:this.onControlError}),this.view.ready(!0))},onBeforeClose:function(){if(this.view){var t=this.model.get("filter");a(this.view,t),this.view.close()}},onControlBeforeReady:function(){var t=this.model.get("filter");this.view.set(t.toJSON()),r(this.view,t)},onControlError:function(){this.showErrorView()},showErrorView:function(){this.view=new this.errorView(this.model.toJSON()),this.view.render(),this.$el.html(this.view.el)}}),h=e.CollectionView.extend({itemView:u,emptyView:c});return{FieldControls:h}});
//@ sourceMappingURL=controls.js.map
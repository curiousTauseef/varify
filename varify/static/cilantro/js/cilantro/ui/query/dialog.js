define(["underscore","marionette","../core"],function(e,t,i){var n=t.ItemView.extend({className:"modal hide",template:"query/delete-dialog",options:{header:"Delete Query"},events:{"click .delete-query-button":"deleteQuery"},ui:{header:".modal-header h4",alert:".alert"},showError:function(e){this.ui.alert.html(e).show()},hideError:function(){this.ui.alert.hide()},deleteQuery:function(){this.hideError();var e=this.model,t=this;this.model.destroy().fail(function(){t.open(e),t.showError("Sorry, there was a problem deleting your query. Please try again.")}),this.close()},onRender:function(){this.ui.header.text(this.options.header),this.$el.modal({show:!1,keyboard:!1,backdrop:"static"})},open:function(e){this.hideError(),this.model=e,this.$el.modal("show")},close:function(){delete this.model,this.$el.modal("hide")}}),o=t.ItemView.extend({className:"modal hide",template:"query/edit-dialog",options:{header:"Query Properties"},events:{"click [data-save]":"saveQuery"},ui:{header:".modal-header h4",alert:".alert",name:".query-name",description:".query-description",email:".query-emails",publicity:".query-publicity"},initialize:function(){if(this.data={},!(this.data.context=this.options.context))throw new Error("context model required");if(!(this.data.view=this.options.view))throw new Error("view model required")},showError:function(e){this.ui.alert.html(e).show()},hideError:function(){this.ui.alert.hide()},saveQuery:function(){if(this.hideError(),!this.ui.name.val())return this.showError("Please supply a name for the query"),void 0;var e={name:this.ui.name.val(),description:this.ui.description.val(),usernames_or_emails:this.ui.email.val(),"public":this.ui.publicity.prop("checked")};this.model||(this.model=new this.collection.model,e.context_json=this.data.context.toJSON().json,e.view_json=this.data.view.toJSON().json),this.model.collection||this.collection.add(this.model);var t=this.model,n=this;this.model.save(e).done(function(){i.notify({header:"Saved",level:"info",timeout:5e3,message:"Successfully saved your query"})}).fail(function(){n.open(t),n.showError("Sorry, there was a problem saving your query. Please try again.")}),this.close()},onRender:function(){this.ui.header.text(this.options.header),this.$el.modal({show:!1,keyboard:!1,backdrop:"static"})},open:function(t){this.hideError(),this.model=t;var i,n,o,s;if(t)i=this.model.get("name"),n=this.model.get("description"),o=e.pluck(this.model.get("shared_users"),"email").join(", "),s=this.model.get("public");else{var r=Date().toString().split(" ");i="Query on "+r.slice(0,5).join(" "),n="",o="",s=!1}this.ui.name.val(i),this.ui.description.val(n),this.ui.email.val(o),this.ui.publicity.prop("checked",s),this.$el.modal("show")},close:function(){delete this.model,this.$el.modal("hide")}});return{DeleteQueryDialog:n,EditQueryDialog:o}});
//@ sourceMappingURL=dialog.js.map
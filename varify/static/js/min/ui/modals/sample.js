define(["jquery","underscore","marionette","cilantro","../sample"],function(e,t,n,r,i){var s=i.SampleView.extend({tagName:"tr",template:"varify/sample/row",modelEvents:{"change:selected":"renderSelected","change:filtered":"renderFiltered"},events:{click:"triggerSelected"},renderSelected:function(){this.$el.toggleClass("selected",!!this.model.get("selected"))},renderFiltered:function(){this.$el.toggleClass("filtered",!!this.model.get("filtered"))},triggerSelected:function(e){e.preventDefault(),e.stopPropagation(),this.model.get("selected")?this.model.trigger("deselect",this.model):this.model.trigger("select",this.model)},onRender:function(){this.renderSelected(),this.renderFiltered()}}),o=n.CompositeView.extend({template:"varify/sample/table",itemView:s,itemViewContainer:"tbody",ui:{input:"input",loader:"[data-target=loader]"},events:{"input @ui.input":"_handleFilter","click thead th":"handleSort"},collectionEvents:{sort:"_renderChildren",reset:"handleFilter hideLoader"},initialize:function(){this._handleFilter=t.debounce(this.handleFilter,r.INPUT_DELAY)},onRender:function(){var e=this;t.defer(function(){e.ui.input.focus()})},hideLoader:function(){if(this.isClosed)return;this.ui.loader.hide()},handleFilter:function(){if(this.isClosed)return;this.applyFilter(this.ui.input.val())},handleSort:function(t){if(!this.collection.length)return;this.applySort(e(t.target).data("sort"))},applyFilter:function(e){var t=new RegExp(e,"i");this.collection.each(function(e){var n=!0;t.test(e.get("label"))?n=!1:t.test(e.get("batch"))?n=!1:t.test(e.get("project"))&&(n=!1),e.set("filtered",n)})},applySort:function(e){var t="asc";this.collection._sortAttr===e&&(t=this.collection._sortDir==="asc"?"desc":"asc"),this.$("[data-sort="+this.collection._sortAttr+"]").removeClass(this.collection._sortDir),this.$("[data-sort="+e+"]").addClass(t),this.collection._sortAttr=e,this.collection._sortDir=t;var n;e==="created"?n=function(e){return(new Date(e)).getTime()}:n=function(e){return e},this.collection.comparator=function(r,i){var s=n(r.get(e)),o=n(i.get(e));return s<o?t==="asc"?-1:1:s>o?t==="asc"?1:-1:0},this.collection.sort()}}),u=n.Layout.extend({id:"sample-dialog",className:"modal hide",template:"varify/modals/sample",regions:{samples:"[data-target=samples-region]"},ui:{empty:"[data-target=empty-message]",selectedSample:"[data-target=selected-sample]",cancelButton:".cancel-button",saveButton:"[data-target=save]",clearButton:".clear-button"},events:{"click @ui.cancelButton":"cancelAndClose","click @ui.saveButton":"handleSaveSample","click @ui.clearButton":"clearSelected"},regionViews:{samples:o},initialize:function(){this.data={};if(!(this.data.context=this.options.context))throw new Error("context model required");if(!(this.data.samples=this.options.samples))throw new Error("samples collection required");this.data.filter=this.data.context.define({concept:r.config.get("varify.sample.concept"),field:r.config.get("varify.sample.field")}),this.listenTo(this.data.samples,"reset",this.onSamplesReset),this.listenTo(this.data.samples,"select",this.setSelected),this.listenTo(this.data.samples,"deselect",this.setDeselected)},onRender:function(){this.$el.modal({backdrop:"static",keyboard:!1,show:!1});var e=new this.regionViews.samples({collection:this.data.samples});this.samples.show(e)},onSamplesReset:function(){this.data.samples.length===0?(this.samples.close(),this.ui.empty.show()):this.getSelected()},_selectSample:function(e){var t;e&&(typeof e=="object"&&(e=e.value),typeof e=="number"?t=this.data.samples.get(e):(t=this.data.samples.findWhere({label:e}),t&&this.data.filter.set("value",t.id,{trigger:!1}))),t&&this.data.samples.trigger("select",t)},getSelected:function(){var e=this.data.filter.get("value"),n=this.data.filter.get("operator");if(n==="in"){var r=this;t.each(e,function(e){r._selectSample(e)})}else this._selectSample(e)},clearSelected:function(){this.data.samples.each(function(e){e.set("selected",!1)}),this.renderSelectedSamples()},setDeselected:function(e){this.data.samples.get(e.id).set("selected",!1),this.renderSelectedSamples()},setSelected:function(e){this.data.samples.each(function(t){t.set("selected",t.get("selected")||t.id===e.id)}),this.renderSelectedSamples()},_getSampleHtml:function(e){return"<li><strong>"+e.get("label")+"</strong> from project <strong>"+e.get("project")+" ("+e.get("batch")+")</strong></li>"},renderSelectedSamples:function(){var e=this.data.samples.where({selected:!0}),n;if(!e.length)n="<p><strong>Please select a sample.</strong></p>";else{var r=this,i=t.map(e,function(e){return r._getSampleHtml(e)});n="<ul class=unstyled>"+i.join("")+"</ul>"}this.ui.selectedSample.html(n),this.ui.saveButton.prop("disabled",!e)},cancelAndClose:function(){this.getSelected(),this.close()},handleSaveSample:function(e){e.preventDefault();var n=t.pluck(this.data.samples.where({selected:!0}),"id");this.data.filter.set({operator:"in",value:n}),this.data.filter.hasChanged()&&this.data.filter.apply(),this.close()},open:function(){this.$el.modal("show")},close:function(){this.$el.modal("hide")}});return{SampleDialog:u}})
define(["jquery","underscore","backbone","marionette","./base","./core"],function(t,e,i,n,o,s){var r=n.ItemView.extend({tagName:"label",className:"checkbox",template:"export/option"}),a=o.EmptyView.extend({message:"No exporters available."}),l=n.CollectionView.extend({itemView:r,emptyView:a}),c=n.ItemView.extend({template:"export/progress",ui:{status:"[data-target=status]",cancel:"[data-target=cancel]"},events:{"click @ui.cancel":"cancel"},modelEvents:{"change:status":"renderStatus"},getCookieName:function(){return"export-type-"+this.model.get("type")},getExportUrl:function(){var t=this.model.get("href");return"/"!==t.charAt(t.length-1)&&(t+="/"),t+(this.model.get("pages")||"")},initialize:function(){var e=this.getCookieName(),i=this.getExportUrl();this.iframe=t("<iframe />").attr("src",i).css("display","none"),this.model.set({url:i,cookie:e,status:"pending",time:0})},start:function(t){if("canceled"!==this.model.get("status")){s.utils.setCookie(this.model.get("cookie"),null),this.$el.append(this.iframe);var e=this,i=setInterval(function(){e.check()},t.monitorDelay);this.model.set({interval:i,status:"loading"})}},cancel:function(){var t=this.model.get("cookie"),e=this.model.get("interval");clearInterval(e),s.utils.setCookie(t,null),this.iframe.remove(),this.model.set("status","canceled")},check:function(){var t=this.model.get("cookie"),e=this.model.get("time"),i=this.model.get("interval");e+=this.monitorDelay,"complete"===s.utils.getCookie(t)?(clearInterval(i),s.utils.setCookie(t,null),this.model.set("status","complete")):e>=this.options.monitorTimeout?(clearInterval(i),this.model.set("status","timeout")):this.checkError()&&(clearInterval(i),this.model.set("status","error"))},checkError:function(){return this.iframe[0].document?0!==this.iframe.contents()[0].body.children.length:!1},renderStatus:function(t,e){var i,n=!0;switch(e){case"error":i='<span class="label label-important">Error</span>';break;case"timeout":i='<span class="label label-warning">Request Timed Out</span>';break;case"complete":i='<span class="label label-success">Complete</span>';break;case"loading":i='<div class="label label-info"><i class="icon-spinner icon-spin"></i> Downloading...</span>',n=!1;break;case"canceled":i='<span class="label label-warning">Canceled</span>'}this.ui.cancel.hide(),this.ui.status.html(i),this.model.set("done",n)}}),u=n.CompositeView.extend({className:"export-batch",template:"export/batch",itemView:c,start:function(){var t=this.options;this.children.each(function(i,n){e.delay(function(){i.start(t)},n*t.requestDelay)})},finish:function(){var t=this;this.$el.html('<h3><i class="icon-ok-sign text-success" /> Export Done</h3>').css("text-align","center"),e.delay(function(){t.$el.slideUp({duration:300,easing:"easeInOutQuad",complete:function(){t.close()}})},2e3)}}),h=/^[0-9]+(\.\.\.[0-9]+)?$/,d=n.Layout.extend({template:"export/dialog",id:"exporter-dialog",className:"modal hide",options:{requestDelay:500,monitorDelay:200,monitorTimeout:6e5},ui:{pageOption:"[name=pages]",pageRange:"[name=page-range]",error:"[data-target=error]",save:"[data-toggle=save]"},events:{"click @ui.save":"exportData","click @ui.pageOption":"togglePageOption","click [data-action=change-columns]":"changeColumnsClicked"},regions:{types:"[data-target=types]",progress:"[data-target=progress]"},initialize:function(){if(this.data={},!(this.data.exporters=this.options.exporters))throw new Error("exporters collection required")},open:function(){this.$el.modal("show")},hide:function(){this.$el.modal("hide")},onRender:function(){this.$el.modal({show:!1});var t=new l({collection:this.data.exporters});this.types.show(t)},togglePageOption:function(){this.ui.pageRange.prop("disabled",!this.pageRangeSelected())},getSelectedOptions:function(){return this.types.currentView.$(":checked").map(function(){return this.value})},getPageRange:function(){return this.pageRangeSelected()?this.ui.pageRange.val():void 0},pageRangeSelected:function(){return"range"===this.ui.pageOption.filter(":checked").val()},isPageRangeValid:function(){return h.test(this.getPageRange())},changeColumnsClicked:function(){s.dialogs.columns.open()},validate:function(){var t=[],e=this.getSelectedOptions();return this.pageRangeSelected()&&!this.isPageRangeValid()&&t.push("<p>The page range entered is invalid. It must be a single page, e.g. 1, or a range of pages, e.g. 2...5.</p>"),0===e.length&&t.push("<p>An export type must be selected.</p>"),0===s.data.views.session.facets.length&&t.push("<p>One or more columns must be selected. Click <a data-action=change-columns>here</a> to select columns.</p>"),t},exportData:function(){this.ui.error.hide();var t=this.getSelectedOptions(),n=this.validate();if(n.length)return this.ui.error.html(n).show(),void 0;this.ui.save.prop("disabled",!0);var o,s=this,r=e.map(t,function(t){return o=s.data.exporters.get(t).toJSON(),o.pages=s.getPageRange(),o}),a=new i.Collection(r);this.listenTo(a,"change:status",function(){a.where({done:!0}).length===a.length&&(this.stopListening(a),this.ui.save.prop("disabled",!1),e.delay(function(){l.finish()},1e3))});var l=new u(e.extend({collection:a},this.options));this.progress.show(l),l.start()}});return{ExporterDialog:d}});
//@ sourceMappingURL=exporter.js.map
var __bind=function(e,t){return function(){return e.apply(t,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};define(["underscore","marionette","../../models","../../utils","../../templates","cilantro/utils/numbers"],function(e,t,n,r,i,s){var o,u,a;return u=function(t){function n(){return this.render=__bind(this.render,this),this.fetchMetricsSuccess=__bind(this.fetchMetricsSuccess,this),this.fetchMetricsError=__bind(this.fetchMetricsError,this),this.collapseAssessmentRow=__bind(this.collapseAssessmentRow,this),this.expandAssessmentRow=__bind(this.expandAssessmentRow,this),n.__super__.constructor.apply(this,arguments)}return __extends(n,t),n.prototype.template=function(){},n.prototype.initialize=function(){return this.metrics=this.options.metrics,this.$content=$('<div class="content">'),this.$el.append(this.$content),this.$el.attr("id","variant-details-content")},n.prototype.events={"click .cohort-sample-popover":function(e){return $(".cohort-sample-popover").not(e.target).popover("hide")},"click .assessment-details-table .icon-plus":"expandAssessmentRow","click .assessment-details-table .icon-minus":"collapseAssessmentRow"},n.prototype.expandAssessmentRow=function(e){var t,n;return n=$(e.target).closest("tr"),t=$("#"+n.attr("id")+"-details"),t.show(),$(e.target).addClass("hide"),n.find(".icon-minus").removeClass("hide")},n.prototype.collapseAssessmentRow=function(e){var t,n;return n=$(e.target).closest("tr"),t=$("#"+n.attr("id")+"-details"),t.hide(),$(e.target).addClass("hide"),n.find(".icon-plus").removeClass("hide")},n.prototype.renderCohorts=function(e){var t;return t=[],t.push("<h4>Cohorts</h4>"),e.cohorts!=null&&e.cohorts.length?t.push(""+i.cohortVariantDetailList(e.cohorts)):t.push("<p class=muted>No cohorts</p>"),t.join("")},n.prototype.renderPredictions=function(e){var t,n,r,i;t=[],t.push("<h4>Prediction Scores</h4>"),t.push("<ul class=unstyled>");if(i=e.sift[0]){n="";switch(i.prediction){case"Damaging":n="text-error";break;default:n="muted"}t.push("<li><small>SIFT</small> <span class="+n+">"+i.prediction+"</span></li>")}if(r=e.polyphen2[0]){n="";switch(r.prediction){case"Probably Damaging":n="text-error";break;case"Possibly Damaging":n="text-warning";break;default:n="muted"}t.push("<li><small>PolyPhen2</small> <span class="+n+">"+r.prediction+"</span></li>")}return t.push("</ul>"),!i&&!r&&t.push("<p class=muted>No predictions scores</p>"),t.join("")},n.prototype.renderSummary=function(e,t){var n,s,o,u,a,f,l;s=[],s.push("<h4>"+e.sample.label+" <small>in "+e.sample.project+"</small></h4>"),s.push("<ul class=unstyled>"),s.push("<li><small>Variant Result ID </small>"+e.id+"</li>"),a=r.depthClass(e.read_depth),s.push("<li><small>Coverage</small> <span class="+a+">"+e.read_depth+"x</span> <span class=muted>(<span title=Ref>"+e.read_depth_ref+"</span>/<span title=Alt>"+e.read_depth_alt+"</span>)</span> </li>"),s.push("<li><small>Raw Coverage</small> "),e.raw_read_depth!=null?s.push(""+e.raw_read_depth+"x"):s.push("<span class=muted>n/a</span>"),s.push("</li>"),a=r.qualityClass(e.quality),s.push("<li><small>Quality</small> <span class="+a+">"+e.quality+"</span> </li>"),s.push("<li style=word-wrap:break-word><small>Genotype</small> "+e.genotype_value+" <small>("+e.genotype_description+")</small></li>"),s.push("<li><small>Base Counts</small> ");if(e.base_counts){n=[],l=e.base_counts;for(u in l)f=l[u],n.push(""+u+"="+f);s.push(n.sort().join(", "))}else s.push("<span class=muted>n/a</span>");return s.push("</li>"),s.push("<li><small>Position</small> "+i.genomicPosition(t.chr,t.pos)+"</li>"),s.push("<li><small>Genes</small> "+i.geneLinks(t.uniqueGenes)+"</li>"),o=i.hgmdLinks(t.phenotypes),o&&s.push("<li><small>HGMD IDs</small> "+o+"</li>"),t.rsid&&s.push("<li><small>dbSNP</small> "+i.dbSNPLink(t.rsid)+"</li>"),s.push("</ul>"),s.push("<a href='http://localhost:10000/show?request=chr"+t.chr+":g."+t.pos+t.ref+">"+t.alt+"' target=_blank class='btn btn-primary btn-small alamut-button'>Query Alamut</a>"),s.join("")},n.prototype.renderFrequencies=function(e){var t,n,r;return t=[],t.push("<h4>1000 Genomes</h4>"),(r=e["1000g"][0])?(t.push("<ul class=unstyled>"),r.all_af!=null&&t.push("<li><small>All</small> "+s.prettyNumber(r.all_af*100)+"%</li>"),r.amr_af!=null&&t.push("<li><small>American</small> "+s.prettyNumber(r.amr_af*100)+"%</li>"),r.afr_af!=null&&t.push("<li><small>African</small> "+s.prettyNumber(r.afr_af*100)+"%</li>"),r.eur_af!=null&&t.push("<li><small>European</small> "+s.prettyNumber(r.eur_af*100)+"%</li>"),t.push("</ul>")):t.push("<p class=muted>No 1000G frequencies</p>"),t.push('<h4 title="Exome Variant Server">EVS</h4>'),(n=e.evs[0])?(t.push("<ul class=unstyled>"),n.all_af!=null&&t.push("<li><small>All</small> "+s.prettyNumber(n.all_af*100)+"%</li>"),n.afr_af!=null&&t.push("<li><small>African</small> "+s.prettyNumber(n.afr_af*100)+"%</li>"),n.eur_af!=null&&t.push("<li><small>European</small> "+s.prettyNumber(n.eur_af*100)+"%</li>"),t.push("</ul>")):t.push("<p class=muted>No EVS frequencies</p>"),t.join("")},n.prototype.renderEffects=function(t){var n,i,s,o,u,a,f,l,c,h;n=[],n.push("<h4>Effects</h4>"),f=!1,e.each(t.effects,function(e){if(e.transcript!=null)return f=!0});if(f){n.push("<ul class=unstyled>"),h=e.groupBy(t.effects,"type");for(a in h){s=h[a],n.push("<li>"),u=r.priorityClass(r.effectImpactPriority(s[0].impact)),n.push("<span class="+u+">"+a+"</span>"),n.push("<ul>");for(l=0,c=s.length;l<c;l++)i=s[l],n.push("<li>"),n.push('<small><a href="http://www.ncbi.nlm.nih.gov/nuccore/'+i.transcript.transcript+'">'+i.transcript.transcript+"</a></small> "),t.uniqueGenes.length>1&&(o=i.transcript.gene)&&n.push('<small>for <a target=_blank href="http://www.genenames.org/data/hgnc_data.php?hgnc_id='+o.hgnc_id+'">'+o.symbol+"</a></small> "),n.push("<ul><li>"),i.hgvs_c&&n.push(""+i.hgvs_c+" "),i.segment&&n.push(""+i.segment+" "),n.push("</li>"),(i.hgvs_p||i.amino_acid_change)&&n.push("<li>"+(i.hgvs_p||i.amino_acid_change)+"</li>"),n.push("</ul>");n.push("</li></ul>")}n.push("</ul>")}else n.push("<p class=muted>No SNPEff effects known</p>");return n.join("")},n.prototype._renderPhenotypeCollection=function(t){var n,r,i,s,o,u;n=[],i=e.sortBy(t,function(e){return e.term}),n.push("<ul>");for(o=0,u=i.length;o<u;o++){r=i[o],n.push("<li>"+r.term);if(r.hpo_id||r.hgmd_id)r.hgmd_id&&n.push(" (HGMD: "+r.hgmd_id+")"),r.hpo_id&&(s=String("0000000"+r.hpo_id).slice(-7),n.push(' (<a href="http://www.human-phenotype-ontology.org/hpoweb/showterm?id=HP_'+s+'">HPO: '+s+"</a>)"));n.push("</li>")}return n.push("</ul>"),n},n.prototype.renderPhenotypes=function(t){var n;return n=[],n.push("<h4>Phenotypes</h4>"),t.phenotypes[0]?(n.push("<ul class=unstyled>"),n.push("<li>Variant:</li>"),n=n.concat(this._renderPhenotypeCollection(t.phenotypes)),n.push("</ul>")):n.push("<p class=muted>No associated variant phenotypes</p>"),t.uniqueGenes[0]&&(n.push("<ul class=unstyled>"),e.each(t.uniqueGenes,function(e){return n.push("<li>"+e.symbol+":</li>"),e.phenotypes[0]?n=n.concat(this._renderPhenotypeCollection(e.phenotypes)):n.push("<p class=muted>No phenotypes for this gene</p>")},this),n.push("</ul>")),n.join("")},n.prototype._renderArticleCollection=function(t){var n,r,i,s,o;n=[],i=e.sortBy(t,function(e){return e}),n.push("<ul>");for(s=0,o=i.length;s<o;s++)r=i[s],n.push('<li><a href="http://www.ncbi.nlm.nih.gov/pubmed/'+r+'">'+r+"</a></li>");return n.push("</ul>"),n},n.prototype.renderPubmed=function(t){var n;return n=[],n.push("<h4>Articles</h4>"),t.articles[0]?(n.push("<ul class=unstyled>"),n.push("<li>Variant:</li>"),n=n.concat(this._renderArticleCollection(t.articles)),n.push("</ul>")):n.push("<p class=muted>No PubMed articles for this variant</p>"),t.uniqueGenes[0]&&(n.push("<ul class=unstyled>"),e.each(t.uniqueGenes,function(e){return n.push("<li>"+e.symbol+":</li>"),e.articles[0]?n=n.concat(this._renderArticleCollection(e.articles)):n.push("<p class=muted>No PubMed articles for this gene</p>")},this),n.push("</ul>")),n.join("")},n.prototype.fetchMetricsError=function(){return $("#assessment-metrics").html("<p class=text-error>Error loading metrics.</p>")},n.prototype.fetchMetricsSuccess=function(){var t,n;return $("#assessment-metrics").html(""),e.isEmpty(this.metrics.get("metrics"))?$("#assessment-metrics").html("<p class=muted>No assessments have been made on this variant</p>"):(n=this.metrics.get("metrics"),t=[],t.push("<div class=row-fluid>"),t.push("<div class=span4>"),t.push("<strong>Pathogenicities</strong>"+i.assessmentMetrics(n.pathogenicities,!0)),t.push("</div>"),t.push("<div class=span4>"),t.push("<strong>Categories</strong>"+i.assessmentMetrics(n.categories,!0)),t.push("</div>"),t.push("</div>"),t.push("<div class=row-fluid>"),t.push("<table class=assessment-details-table>"),t.push("<thead><tr><th></th><th>Sample</th><th>User</th><th>Pathogenicity</th><th>Category</th><th>Mother</th><th>Father</th><th>Sanger Requested</th></tr></thead>"),t.push("<tbody>"+i.assessmentRows(n.assessments)+"</tbody>"),t.push("</table>"),t.push("</div>"),$("#assessment-metrics").append(t.join(" ")),$(".username-popover").popover())},n.prototype.renderAssessmentMetricsContainer=function(){var e;return e=[],e.push("<h4>Assessments</h4>"),e.push("<div id=assessment-metrics><img src='"+r.toAbsolutePath("static/images/loader-tiny.gif")+"' /></div>"),e.join("")},n.prototype._span=function(e,t){return t==null&&(t=12),$('<div class="span'+t+'" />').html(e)},n.prototype.render=function(){var e,t,n,r;return r=this.model.get("variant"),e=$("<div class=row-fluid />"),t=$("<div class=row-fluid />"),n=$('<div class="row-fluid  assessments-table-container" />'),e.append(this._span(this.renderSummary(this.model.attributes,r),3)),e.append(this._span(this.renderEffects(r),3)),e.append(this._span(this.renderPhenotypes(r),3)),e.append(this._span(this.renderPredictions(r),3)),t.append(this._span(this.renderCohorts(r),3)),t.append(this._span(this.renderFrequencies(r),3)),t.append(this._span(this.renderPubmed(r),3)),n.append(this._span(this.renderAssessmentMetricsContainer(),12)),this.$content.append(e,t,n),this.$el.find(".cohort-sample-popover").popover(),this.metrics.fetch({success:this.fetchMetricsSuccess,error:this.fetchMetricsError}),this.$el},n}(t.ItemView),o=function(t){function n(){return this.onAssessmentFetchSuccess=__bind(this.onAssessmentFetchSuccess,this),this.onAssessmentFetchError=__bind(this.onAssessmentFetchError,this),n.__super__.constructor.apply(this,arguments)}return __extends(n,t),n.prototype.template=function(){},n.prototype.el="#knowledge-capture-content",n.prototype.update=function(e){return this.model==null&&(this.formContainer=$("#knowledge-capture-form-container"),this.feedbackContainer=$("#knowledge-capture-feedback-container"),this.saveButton=$("#save-assessment-button"),this.auditButton=$("#audit-trail-button"),this.errorContainer=$("#error-container"),this.errorMsg=$("#error-message"),$(".alert-error > .close").on("click",this.closeFormErrorsClicked)),this.formContainer.hide(),this.feedbackContainer.show(),this.errorContainer.hide(),this.model=e,this.model.fetch({error:this.onAssessmentFetchError,success:this.onAssessmentFetchSuccess})},n.prototype.onAssessmentFetchError=function(){return this.formContainer.hide(),this.feedbackContainer.hide(),this.errorContainer.show(),this.errorMsg.html("<h5 class=text-error>Error retrieving knowledge capture data.</h5>"),this.saveButton.hide(),this.auditButton.hide()},n.prototype.onAssessmentFetchSuccess=function(){return this.errorContainer.hide(),this.feedbackContainer.hide(),this.formContainer.show(),this.render()},n.prototype.closeFormErrorsClicked=function(e){return $(e.target).parent().hide()},n.prototype.isValid=function(){var t;return this.model.set({evidence_details:$("#evidence-details").val(),sanger_requested:$("input[name=sanger-radio]:checked").val(),pathogenicity:$("input[name=pathogenicity-radio]:checked").val(),assessment_category:$("input[name=category-radio]:checked").val(),mother_result:$("#mother-results").val(),father_result:$("#father-results").val()}),t=!0,this.errorContainer.hide(),this.errorMsg.html(""),e.isEmpty(this.model.get("pathogenicity"))&&this.errorMsg.append("<h5>Please select a pathogenicity.</h5>"),e.isEmpty(this.model.get("assessment_category"))&&this.errorMsg.append("<h5>Please select a category.</h5>"),e.isEmpty(this.model.get("mother_result"))&&(t=!1,this.errorMsg.append("<h5>Please select a result from the &quot;Mother&quot; dropdown.</h5>")),e.isEmpty(this.model.get("father_result"))&&(t=!1,this.errorMsg.append("<h5>Please select a result from the &quot;Father&quot; dropdown.</h5>")),this.model.get("sanger_requested")==null&&(t=!1,this.errorMsg.append("<h5>Please select one of the &quot;Sanger Requested&quot; options.</h5>")),t||this.errorContainer.show(),t},n.prototype.setRadioChecked=function(e,t){var n,r;return r=$("input:radio[name="+e+"]"),$(r.prop("checked",!1)),n=$(r.filter("[value="+t+"]")),$(n.prop("checked",!0)),$(n.change())},n.prototype.render=function(){return this.setRadioChecked("category-radio",this.model.get("assessment_category")),this.setRadioChecked("pathogenicity-radio",this.model.get("pathogenicity")),this.setRadioChecked("sanger-radio",this.model.get("sanger_requested")),$("#mother-results").val(this.model.get("mother_result")),$("#father-results").val(this.model.get("father_result")),$("#evidence-details").val(this.model.get("evidence_details"))},n}(t.ItemView),a=function(e){function t(){return this.onSaveSuccess=__bind(this.onSaveSuccess,this),this.onSaveError=__bind(this.onSaveError,this),t.__super__.constructor.apply(this,arguments)}return __extends(t,e),t.prototype.className="modal hide",t.prototype.template="varify/modals/result",t.prototype.ui={variantDetailsTabContent:"#variant-details-content",saveButton:"#save-assessment-button",auditTrailButton:"#audit-trail-button"},t.prototype.events={"click #close-review-button":"close","click #save-assessment-button":"saveAndClose","click #variant-details-link":"hideButtons","click #knowledge-capture-link":"showButtons"},t.prototype.initialize=function(){return this.assessmentTab=new o},t.prototype.hideButtons=function(){return this.ui.saveButton.hide(),this.ui.auditTrailButton.hide()},t.prototype.showButtons=function(){return this.ui.saveButton.show(),this.ui.auditTrailButton.show()},t.prototype.saveAndClose=function(e){if(this.assessmentTab.isValid())return this.assessmentTab.model.save(null,{success:this.onSaveSuccess,error:this.onSaveError}),this.close()},t.prototype.close=function(){return this.$el.modal("hide")},t.prototype.onSaveError=function(e,t){return $("#review-notification").html("Error saving knowledge capture data."),$("#review-notification").addClass("alert-error"),this.showNotification()},t.prototype.onSaveSuccess=function(e,t){return $("#review-notification").html("Saved changes."),$("#review-notification").addClass("alert-success"),this.showNotification(),this.selectedSummaryView.model.fetch()},t.prototype.showNotification=function(){return $("#review-notification").show(),setTimeout(this.hideNotification,5e3)},t.prototype.hideNotification=function(){return $("#review-notification").removeClass("alert-error alert-success"),$("#review-notification").hide()},t.prototype.onRender=function(){return this.$el.modal({show:!1,keyboard:!1,backdrop:"static"})},t.prototype.update=function(e,t){var r,i;return this.selectedSummaryView=e,this.model=t,i=new n.AssessmentMetrics({},{variant_id:t.get("variant").id,result_id:t.id}),this.detailsTab=new u({model:t,metrics:i}),this.ui.variantDetailsTabContent.html(this.detailsTab.render),r=new n.Assessment({sample_result:this.model.id}),this.model.get("assessment")!=null&&(r.id=this.model.get("assessment").id),this.assessmentTab.update(r),this.$el.modal("show")},t}(t.ItemView),{ResultDetails:a}})
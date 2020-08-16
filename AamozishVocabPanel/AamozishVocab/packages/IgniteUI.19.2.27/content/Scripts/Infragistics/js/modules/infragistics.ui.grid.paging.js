/*!@license
 * Infragistics.Web.ClientUI Grid Paging 19.2.27
 *
 * Copyright (c) 2011-2020 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.ui.widget.js
 *	infragistics.ui.grid.framework.js
 *	infragistics.ui.editors.js
 *	infragistics.ui.shared.js
 *	infragistics.dataSource.js
 *	infragistics.util.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.ui.grid.framework","./infragistics.ui.editors"],factory)}else{return factory(jQuery)}})(function($){$.widget("ui.igGridPaging",$.ui.igWidget,{css:{pagerClass:"ui-widget ui-iggrid-pager ui-helper-clearfix ui-corner-bottom ui-widget-header ui-iggrid-footer",pageLink:"ui-iggrid-pagelink ui-helper-reset",page:"ui-iggrid-page ui-state-default ui-corner-all",pageHover:"ui-iggrid-page-hover ui-state-hover",pageList:"ui-helper-reset ui-iggrid-pagelist ui-iggrid-paging-item",pageLinkCurrent:"ui-iggrid-pagelinkcurrent",pageCurrent:"ui-iggrid-pagecurrent ui-state-active ui-corner-all",pageFocused:"ui-iggrid-pagefocused ui-state-focus",nextPage:"ui-iggrid-nextpage ui-iggrid-paging-item ui-state-default",prevPage:"ui-iggrid-prevpage ui-iggrid-paging-item ui-state-default",firstPage:"ui-iggrid-firstpage ui-iggrid-paging-item ui-state-default ui-corner-left",lastPage:"ui-iggrid-lastpage ui-iggrid-paging-item ui-state-default ui-corner-right",nextPageLabel:"ui-iggrid-nextpagelabel",prevPageLabel:"ui-iggrid-prevpagelabel",firstPageLabel:"ui-iggrid-firstpagelabel",lastPageLabel:"ui-iggrid-lastpagelabel",nextPageLabelDisabled:"ui-iggrid-nextpagelabeldisabled ui-state-disabled",prevPageLabelDisabled:"ui-iggrid-prevpagelabeldisabled ui-state-disabled",firstPageLabelDisabled:"ui-iggrid-firstpagelabeldisabled ui-state-disabled",lastPageLabelDisabled:"ui-iggrid-lastpagelabeldisabled ui-state-disabled",nextPageImage:"ui-iggrid-pageimg ui-iggrid-nextpageimg ui-icon ui-icon-triangle-1-e",prevPageImage:"ui-iggrid-pageimg ui-iggrid-prevpageimg ui-icon ui-icon-triangle-1-w",firstPageImage:"ui-iggrid-pageimg ui-iggrid-firstpageimg ui-icon ui-icon-arrowstop-1-w",lastPageImage:"ui-iggrid-pageimg ui-iggrid-lastpageimg ui-icon ui-icon-arrowstop-1-e",nextPageImageDisabled:"ui-iggrid-pageimg ui-iggrid-nextpageimgdisabled ui-icon ui-state-disabled ui-icon-triangle-1-e",prevPageImageDisabled:"ui-iggrid-pageimg ui-iggrid-prevpageimgdisabled ui-icon ui-state-disabled ui-icon-triangle-1-w",firstPageImageDisabled:"ui-iggrid-pageimg ui-iggrid-firstpageimgdisabled ui-icon ui-state-disabled ui-icon-arrowstop-1-w",lastPageImageDisabled:"ui-iggrid-pageimg ui-iggrid-lastpageimgdisabled ui-icon ui-state-disabled ui-icon-arrowstop-1-e",pagerRecordsLabel:"ui-iggrid-pagerrecordslabel ui-iggrid-results",pageSizeLabel:"ui-iggrid-pagesizelabel",pageSizeDropDown:"ui-iggrid-pagesizedropdown",pageSizeDropDownContainer:"ui-helper-clearfix ui-iggrid-pagesizedropdowncontainer",pageSizeDropDownContainerAbove:"ui-widget ui-helper-clearfix ui-iggrid-pagesizedropdowncontainerabove ui-iggrid-toolbar ui-widget-header and ui-corner-top",pageDropDownContainer:"ui-iggrid-pagedropdowncontainer",pageDropDownLabels:"ui-iggrid-pagedropdownlabels",pageDropDown:"ui-iggrid-pagedropdown",pagerRightAreaContainer:"ui-iggrid-paging",pagingResults:"ui-iggrid-results"},options:{pageSize:25,recordCountKey:null,pageSizeUrlKey:null,pageIndexUrlKey:null,currentPageIndex:0,type:null,showPageSizeDropDown:true,pageSizeDropDownLabel:undefined,pageSizeDropDownTrailingLabel:undefined,pagerRecordsLabelTemplate:undefined,nextPageLabelText:undefined,prevPageLabelText:undefined,firstPageLabelText:undefined,lastPageLabelText:undefined,currentPageDropDownLeadingLabel:undefined,currentPageDropDownTrailingLabel:undefined,currentPageDropDownTooltip:undefined,pageSizeDropDownTooltip:undefined,pagerRecordsLabelTooltip:undefined,prevPageTooltip:undefined,nextPageTooltip:undefined,firstPageTooltip:undefined,lastPageTooltip:undefined,pageTooltipFormat:undefined,locale:{pageSizeDropDownLabel:undefined,pageSizeDropDownTrailingLabel:undefined,nextPageLabelText:undefined,prevPageLabelText:undefined,firstPageLabelText:undefined,lastPageLabelText:undefined,currentPageDropDownLeadingLabel:undefined,currentPageDropDownTrailingLabel:undefined,currentPageDropDownTooltip:undefined,pageSizeDropDownTooltip:undefined,pagerRecordsLabelTooltip:undefined,prevPageTooltip:undefined,nextPageTooltip:undefined,firstPageTooltip:undefined,lastPageTooltip:undefined,pageTooltipFormat:undefined,pagerRecordsLabelTemplate:undefined},pageSizeDropDownLocation:"above",showPagerRecordsLabel:true,showFirstLastPages:true,showPrevNextPages:true,pageSizeList:[5,10,20,25,50,75,100],pageCountLimit:10,visiblePageCount:5,defaultDropDownWidth:70,delayOnPageChanged:350,persist:true,inherit:false},events:{pageIndexChanging:"pageIndexChanging",pageIndexChanged:"pageIndexChanged",pageSizeChanging:"pageSizeChanging",pageSizeChanged:"pageSizeChanged",pagerRendering:"pagerRendering",pagerRendered:"pagerRendered"},dropDownVisibleItemsCount:10,_loadingIndicator:null,_isPaging:false,_onVirtRecordsRender:function(){this._dataRendered()},_create:function(){this._oPageIndex=this.options.currentPageIndex;this._oPageSize=this.options.pageSize},changeGlobalLanguage:function(){},changeGlobalRegional:function(){},_changeLocaleForPager:function(){var $pager=this._pager(),$e,self=this,$plabel=this._plabel(),$container=this.grid.container(),gridId=this.grid.id();$.ui.igWidget.prototype.changeLocale.call(this,$pager);$pager.find("[data-page-list-item]").each(function(){var $e=$(this);$e.attr("title",self._getLocaleValue("pageTooltipFormat").replace("${index}",$e.attr("data-pageTooltipFormat")))});$e=$container.find("[data-dd-container-label='"+gridId+"']");if($e.length){$e.text(this._getLocaleValue("currentPageDropDownTrailingLabel").replace("${count}",$e.attr("data-currentPageDropDownTrailingLabel")))}if($plabel.length){$plabel.text(this._getLocaleValue("pagerRecordsLabelTemplate").replace("${startRecord}",$plabel.attr("data-startRecord")).replace("${endRecord}",$plabel.attr("data-endRecord")).replace("${recordCount}",$plabel.attr("data-recordCount")))}},changeLocale:function(){this._changeLocaleForPager();this._super(this.grid.container().find("[data-pagesize-dd-container='"+this.grid.id()+"']"));this._superApply(arguments)},_registerWidget:$.noop,_unregisterWidget:$.noop,_setOption:function(key,value){var items,pager;pager=this._pager();this._super(key,value);if(key==="type"||key==="showPageSizeDropDown"||key==="pageSizeDropDownLocation"||key==="showPagerRecordsLabel"||key==="visiblePageCount"){throw new Error(this._getLocaleValue("optionChangeNotSupported").replace("{optionName}",key))}if(key==="pageSize"){this.pageSize(value)}else if(key==="currentPageIndex"){this.pageIndex(value)}else if(key==="showFirstLastPages"){if(value===true){pager.find(".ui-iggrid-firstpage").show();pager.find(".ui-iggrid-lastpage").show()}else{pager.find(".ui-iggrid-firstpage").hide();pager.find(".ui-iggrid-lastpage").hide()}}else if(key==="showPrevNextPages"){if(value===true){pager.find(".ui-iggrid-prevpage").show();pager.find(".ui-iggrid-nextpage").show()}else{pager.find(".ui-iggrid-prevpage").hide();pager.find(".ui-iggrid-nextpage").hide()}}else if(key==="pageSizeList"){if($.type(value)==="string"){items=value.split(",")}else{items=value}if(this._pageSizeDD){this._pageSizeDD.igNumericEditor("option","listItems",items)}}},pageIndex:function(index){if(index!==null&&index!==undefined){if(index<0||index>=this.grid.dataSource.pageCount()){throw new Error(this._getLocaleValue("invalidPageIndex"))}this._overrideLabel=true;this.options.currentPageIndex=index;this.grid.element.trigger("iggriduisoftdirty",{owner:this})}if(this.grid._hasUnboundColumns&&this.options.type==="remote"){this.grid._rebindUnboundColumns=true}this._savePagingData();return this.grid.dataSource.pageIndex(index)},pageSize:function(size){var noCancel=true;if(size){this.grid.dataSource.settings.paging.pageIndex=0;this.options.currentPageIndex=0;noCancel=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});if(noCancel){this._showLoading();if(this.grid._hasUnboundColumns&&this.options.type==="remote"){this.grid._rebindUnboundColumns=true}this._overrideLabel=true;this.options.pageSize=size;this._savePagingData();this.grid.dataSource.pageSize(size)}if(this._pageSizeDD){this._pageSizeDD.igNumericEditor("value",size)}}else{return this.grid.dataSource.pageSize()}},_savePagingData:function(){if(!this.options.persist){return}var pagingData;if(this.element.closest(".ui-iggrid-root").data("igGrid")){pagingData={pageIndex:this.options.currentPageIndex,pageSize:this.options.pageSize};this.grid._savePersistenceData(pagingData,"paging",this.grid.element[0].id)}},_loadPagingData:function(){var pagingData;if(this.element.closest(".ui-iggrid-root").data("igGrid")){pagingData=this.grid._getPersistenceData("paging",this.grid.element[0].id);if(!pagingData){return}this.grid.dataSource.settings.paging.pageIndex=pagingData.pageIndex;this.options.currentPageIndex=pagingData.pageIndex;this.options.pageSize=pagingData.pageSize}},_initLoadingIndicator:function(){this._loadingIndicator=this.grid.container().igLoading().data("igLoading").indicator()},_nextPage:function(event){var noCancel=true,noCancelBinding=true;noCancel=this._trigger(this.events.pageIndexChanging,null,{newPageIndex:this.options.currentPageIndex+1,currentPageIndex:this.options.currentPageIndex,owner:this});if(noCancel){if(this.options.currentPageIndex>=this.grid.dataSource.pageCount()-1){return}this.options.currentPageIndex=this.options.currentPageIndex+1;noCancelBinding=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});this._shouldFirePageIndexChanged=true;if(noCancelBinding){this._showLoading();this._overrideLabel=true;this.grid.element.trigger("iggriduisoftdirty",{owner:this});if(this.grid._hasUnboundColumns&&this.options.type==="remote"){this.grid._rebindUnboundColumns=true}this._savePagingData();this.grid.dataSource.nextPage()}}if(event){event.stopPropagation();event.preventDefault()}},_prevPage:function(event){var noCancel=true,noCancelBinding=true;noCancel=this._trigger(this.events.pageIndexChanging,null,{newPageIndex:this.options.currentPageIndex-1,currentPageIndex:this.options.currentPageIndex,owner:this});if(noCancel){if(this.options.currentPageIndex===0){return}this.options.currentPageIndex=this.options.currentPageIndex-1;noCancelBinding=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});this._shouldFirePageIndexChanged=true;if(noCancelBinding){this._showLoading();this._overrideLabel=true;this.grid.element.trigger("iggriduisoftdirty",{owner:this});if(this.grid._hasUnboundColumns&&this.options.type==="remote"){this.grid._rebindUnboundColumns=true}this._savePagingData();this.grid.dataSource.prevPage()}}if(event){event.stopPropagation();event.preventDefault()}},_firstPage:function(event){var noCancel=true,noCancelBinding=true;noCancel=this._trigger(this.events.pageIndexChanging,null,{newPageIndex:0,currentPageIndex:this.options.currentPageIndex,owner:this});if(noCancel){noCancelBinding=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});this._shouldFirePageIndexChanged=true;if(noCancelBinding){this._showLoading();this.pageIndex(0)}}if(event){event.stopPropagation();event.preventDefault()}},_lastPage:function(event){var noCancel=true,noCancelBinding=true;noCancel=this._trigger(this.events.pageIndexChanging,null,{newPageIndex:this.grid.dataSource.pageCount()-1,currentPageIndex:this.options.currentPageIndex,owner:this});if(noCancel){noCancelBinding=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});this._shouldFirePageIndexChanged=true;if(noCancelBinding){this._showLoading();this.pageIndex(this.grid.dataSource.pageCount()-1)}}if(event){event.stopPropagation();event.preventDefault()}},_showLoading:function(){this._loadingIndicator.show()},_hideLoading:function(){this._loadingIndicator.hide()},_bindEvents:function(){var paging=this,grid=this.grid,noCancel=true,id,noCancelBinding=true;id="#"+grid.element[0].id+"_pager";$(id+" li").bind({mousedown:function(event){var $eventTarget=$(event.target),newIndex=$eventTarget.data("pageIndex");if(newIndex===undefined){newIndex=$eventTarget.parent().data("pageIndex")}if($.type(newIndex)==="number"&&newIndex!==paging.options.currentPageIndex){noCancel=paging._trigger(paging.events.pageIndexChanging,event,{newPageIndex:newIndex,currentPageIndex:paging.options.currentPageIndex,owner:paging});paging._shouldFirePageIndexChanged=true;if(noCancel){noCancelBinding=paging.grid._trigger(paging.grid.events.dataBinding,null,{owner:paging.grid,dataSource:paging.grid.dataSource});if(noCancelBinding){paging._showLoading(grid.element.children("tbody"));paging.pageIndex(newIndex)}}}}});$(id+" li, "+id+" div.ui-iggrid-paging-item").bind({mouseover:function(event){if(!$(event.currentTarget).find("span").first().hasClass("ui-state-disabled")){$(event.currentTarget).addClass(paging.css.pageHover)}},mouseout:function(event){$(event.currentTarget).removeClass(paging.css.pageHover)}})},_fixedColumnsChanged:function(args){if(args.isInit){this._pager().css("clear","both")}},_gridRendered:function(gridContainer){var self=this,caption=this.grid._caption();if(this.options.showPageSizeDropDown===true&&this.options.pageSizeDropDownLocation==="above"&&!this._pageSizeDropDownRendered){if(caption.length){self._renderPageSizeDropDown(caption,null,true)}else{self._renderPageSizeDropDown(gridContainer,true)}}if(this.grid.options.autoAdjustHeight){this.grid._initializeHeights();this.grid._adjustLastColumnWidth()}if(this.grid.options.caption!==null&&!($.ig.util.isIE&&$.ig.util.browserVersion>=8)){caption.removeClass("ui-corner-top")}},_rowDeleted:function(){if(this.options.type==="remote"){return}var currentPageIndex=this.options.currentPageIndex,pageCount=this.grid.dataSource.pageCount();if(currentPageIndex>0&&currentPageIndex+1>pageCount){currentPageIndex--}this.pageIndex(currentPageIndex)},_rowAdded:function(){if(this.options.type==="remote"){return}var currentPageIndex=this.options.currentPageIndex,pageCount=this.grid.dataSource.pageCount();if(currentPageIndex<pageCount-1&&this.grid.options.autoCommit){this.pageIndex(pageCount-1)}else{this._dataRendered()}},_gridCommit:function(){if(this.options.type==="remote"){return}if(this.options.currentPageIndex>this.grid.dataSource.pageCount()-1){this.pageIndex(this.grid.dataSource.pageCount()-1)}else{this.pageIndex(this.options.currentPageIndex)}return true},_plabel:function(){return this._pager().find(".ui-iggrid-pagerrecordslabel")},_pager:function(){return this.grid.container().find(".ui-iggrid-pager")},_getDSLocalRecordsCount:function(){var ds=this.grid.dataSource;if(ds._filter){if(ds.isGroupByApplied()&&ds.settings.groupby.pagingMode==="allRecords"){return ds.totalLocalRecordsCount()}return ds._filteredData.length}return ds.totalLocalRecordsCount()},_dataRendered:function(){var id=this.grid.element[0].id,filtering,tmpl,kbrdNavEvents,edtrOpts,i,html,pager=null,pageList,pagesArray,dropDownContainer,pageCount,startRecord=0,endRecord=0,recordsCount=0,localRecordsCount=0,noCancel=true,startPageIndex=0,endPageIndex=0,pagerHtml=toStaticHTML('<div id="'+id+'_pager"></div>'),pageLinkHtml=toStaticHTML('<li class="${pageClass}" tabIndex="0">'+'<a class="${pageLinkClass}" href="javascript:void(0);" '+'tabIndex="-1">${page}</a></li>'),template=this._getLocaleValue("pagerRecordsLabelTemplate"),self=this,pagerRight=null,vpc=this.options.visiblePageCount,val=0,recordsLabel=null;this._deleteOld();this._initLoadingIndicator();noCancel=this._trigger(this.events.pagerRendering,null,{dataSource:this.grid.dataSource,owner:this});if(noCancel){if(this.grid._shouldResetPaging){this.options.currentPageIndex=0;this.grid._shouldResetPaging=false}if(this._plabel().length>0){this._pager().find(".ui-iggrid-paging").remove()}else{this._pager().empty()}if(this.grid.dataSource.pageSizeDirty()){this.options.currentPageIndex=this.grid.dataSource.pageIndex();this.grid.dataSource.pageSizeDirty(false)}if(this._pager().length===0){id=this.grid.element[0].id;pager=$(pagerHtml).appendTo(this.grid.container())}else{pager=this._pager()}if(this.grid.hasFixedColumns()){pager.css("clear","both")}pager.addClass(this.css.pagerClass);if(this.options.showPagerRecordsLabel){recordsCount=this.grid.dataSource.totalRecordsCount()>0?this.grid.dataSource.totalRecordsCount():this.grid.dataSource.totalLocalRecordsCount();startRecord=this.options.currentPageIndex===0?1:this.options.currentPageIndex*this.pageSize()+1;localRecordsCount=this._getDSLocalRecordsCount();if(this.grid.dataSource._filter){recordsCount=localRecordsCount;filtering=this.grid.element.data("igTreeGridFiltering");if(filtering){tmpl=filtering._getFilterSummaryPagerTemplate();if(tmpl!==undefined&&tmpl!==null){template=tmpl}}}if(startRecord>recordsCount){startRecord=this.grid.dataSource.pageIndex()*this.pageSize()+1;this.options.currentPageIndex=this.grid.dataSource.pageIndex()}endRecord=this.options.currentPageIndex===0&&this.pageSize()<=recordsCount?this.pageSize():startRecord+this.pageSize()>recordsCount?recordsCount:startRecord-1+this.pageSize();if(this.grid.dataSource.totalLocalRecordsCount()===0){startRecord=0;endRecord=0}if(endRecord>localRecordsCount&&this.options.type==="local"){endRecord=localRecordsCount}if(this.grid.container().find(".ui-iggrid-footer .ui-iggrid-results").data("overrideLabel")===0||this._overrideLabel||!this.grid.dataSource._filter){this._plabel().remove();template=template.replace("${startRecord}",startRecord).replace("${endRecord}",endRecord).replace("${recordCount}",recordsCount);recordsLabel=$("<span>"+template+"</span>").appendTo(pager).attr({id:pager[0].id+"_label",title:this._getLocaleValue("pagerRecordsLabelTooltip"),"data-localeid":"pagerRecordsLabelTooltip","data-localeattr":"title","data-startRecord":startRecord,"data-endRecord":endRecord,"data-recordCount":recordsCount}).addClass(this.css.pagerRecordsLabel).show()}else if(this._plabel().length===0){recordsLabel=$("<span></span>").appendTo(pager).attr("id",pager[0].id+"_label").addClass(this.css.pagerRecordsLabel).attr({title:this._getLocaleValue("pagerRecordsLabelTooltip"),"data-localeid":"pagerRecordsLabelTooltip","data-localeattr":"title"}).show()}if(recordsLabel){recordsLabel.data("hideflag",false)}this._plabel().show();this._overrideLabel=false}pageCount=this.grid.dataSource.pageCount();pagerRight=$("<div></div>").appendTo(pager).addClass(this.css.pagerRightAreaContainer);if(this.options.showFirstLastPages===true){this._renderFirstPage(pagerRight)}if(this.options.showPrevNextPages===true){this._renderPrevPage(pagerRight)}if(this.grid.dataSource.pageCount()<=this.options.pageCountLimit){pageList=$("<ul></ul>").appendTo(pagerRight).addClass(this.css.pageList);if(!this._pagerEvents){this._pagerEvents={keydown:function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){var noCancel=true,noCancelBinding=true,newIndex=$(event.currentTarget).closest("li").data("pageIndex");if(newIndex!==self.options.currentPageIndex){noCancel=self._trigger(self.events.pageIndexChanging,null,{newPageIndex:newIndex,currentPageIndex:self.options.currentPageIndex,owner:self});self._shouldFirePageIndexChanged=true;if(noCancel){noCancelBinding=self.grid._trigger(self.grid.events.dataBinding,null,{owner:self.grid,dataSource:self.grid.dataSource});if(noCancelBinding){self._showLoading();self.pageIndex(newIndex)}}}event.stopPropagation();event.preventDefault()}},focus:function(event){$(event.currentTarget).closest("li").addClass(self.css.pageFocused)},blur:function(event){$(event.currentTarget).closest("li").removeClass(self.css.pageFocused)}}}else{this._pager().undelegate("li",this._pagerEvents)}this._pager().delegate("li",this._pagerEvents);val=Math.floor(parseInt(vpc,10)/2);startPageIndex=this.options.currentPageIndex-val;if(startPageIndex<0){startPageIndex=0}endPageIndex=this.options.currentPageIndex+val;if(this.options.currentPageIndex-startPageIndex<val){endPageIndex+=val-(this.options.currentPageIndex-startPageIndex)}if(this.grid.dataSource.pageCount()-(this.options.currentPageIndex+1)<val&&vpc%2!==0){startPageIndex=startPageIndex-(val-(this.grid.dataSource.pageCount()-(this.options.currentPageIndex+1)))}if(endPageIndex>=this.grid.dataSource.pageCount()){endPageIndex=this.grid.dataSource.pageCount()-1}if(startPageIndex<0){startPageIndex=0}if(vpc%2===0&&endPageIndex-startPageIndex<vpc-1){startPageIndex-=vpc-1-(endPageIndex-startPageIndex)}if(startPageIndex<0){startPageIndex=0}for(i=startPageIndex;i<=endPageIndex&&i-startPageIndex<vpc;i++){html=pageLinkHtml.replace("${page}",i+1).replace("${pageLinkClass}",i===this.options.currentPageIndex?this.css.pageLinkCurrent:this.css.pageLink);html=html.replace("${pageClass}",i===this.options.currentPageIndex?this.css.pageCurrent:this.css.page);$(html).appendTo(pageList).attr({"data-page-list-item":true,title:this._getLocaleValue("pageTooltipFormat").replace("${index}",i+1),"data-pageTooltipFormat":i+1}).data("pageIndex",i)}}else{pagesArray=[];for(i=1;i<=pageCount;i++){pagesArray.push(i.toString())}dropDownContainer=$("<div></div>").appendTo(pagerRight).addClass(this.css.pageDropDownContainer).attr({title:this._getLocaleValue("currentPageDropDownTooltip"),"data-localeid":"currentPageDropDownTooltip","data-localeattr":"title"});$("<span></span>").appendTo(dropDownContainer).text(this._getLocaleValue("currentPageDropDownLeadingLabel")).attr("data-localeid","currentPageDropDownLeadingLabel").addClass(this.css.pageDropDownLabels);kbrdNavEvents=this._getEditorKeyboardNavigation();edtrOpts={language:this.grid.options.language,listItems:pagesArray,dropDownAttachedToBody:true,visibleItemsCount:this.dropDownVisibleItemsCount,suppressNotifications:true,isLimitedToListValues:true,width:this.options.defaultDropDownWidth,allowNullValue:false,buttonType:"dropdown",value:this.options.currentPageIndex+1,minValue:1,maxValue:pagesArray[pagesArray.length-1],dropDownListOpened:$.proxy(this._onSelectDropDownOpened,this),textChanged:$.proxy(this._onSelectDropDownPageIndex,this)};edtrOpts=$.extend(edtrOpts,kbrdNavEvents);this._curPageDD=$("<span />").appendTo(dropDownContainer).addClass(this.css.pageDropDownContainer).igNumericEditor(edtrOpts);this._curPageDD.igNumericEditor("selectedListIndex",this.options.currentPageIndex);$("<span></span>").appendTo(dropDownContainer).attr({"data-dd-container-label":id,"data-currentPageDropDownTrailingLabel":this.grid.dataSource.pageCount()}).text(this._getLocaleValue("currentPageDropDownTrailingLabel").replace("${count}",this.grid.dataSource.pageCount())).addClass(this.css.pageDropDownLabels)}if(this.options.showPrevNextPages===true){this._renderNextPage(pagerRight)}if(this.options.showFirstLastPages===true){this._renderLastPage(pagerRight)}if(this.options.showPageSizeDropDown&&this.options.pageSizeDropDownLocation==="inpager"){this._renderPageSizeDropDown(pagerRight)}this._bindEvents(pager);this._hideLoading(this.grid.element.children("tbody"));pager.show();if(this._shouldFirePageSizeChanged){this._shouldFirePageSizeChanged=false;this._trigger(this.events.pageSizeChanged,null,{pageSize:this.pageSize(),owner:this})}this._trigger(this.events.pagerRendered,null,{dataSource:this.grid.dataSource,owner:this});if(this._shouldFirePageIndexChanged){this._shouldFirePageIndexChanged=false;this._trigger(this.events.pageIndexChanged,null,{pageIndex:this.options.currentPageIndex,owner:this})}}},_getEditorKeyboardNavigation:function(){return{focus:function(e,args){var edtr=args.owner;if(edtr._dropDownList&&!edtr._dropDownList.is(":visible")){edtr.showDropDown()}},keydown:function(e,args){var edtr=args.owner,$activeItem;if(edtr._dropDownList&&edtr._dropDownList.is(":visible")){if(e.keyCode===$.ui.keyCode.DOWN){edtr._hoverNextDropDownListItem();e.preventDefault()}else if(e.keyCode===$.ui.keyCode.UP){edtr._hoverPreviousDropDownListItem();e.preventDefault()}else if(e.keyCode===$.ui.keyCode.ENTER){$activeItem=edtr._dropDownList.children(".ui-igedit-listitem").filter('[data-active="true"]');if($activeItem.length&&$activeItem.is(edtr.getSelectedListItem())&&$activeItem.text()!==edtr.field().val()){edtr.selectedListIndex(parseInt(edtr.field().val())-1);e.preventDefault()}}}}}},_onSelectDropDownOpened:function(event,args){var dd=args.owner,$ddCont=dd.dropDownContainer(),$selItem=dd.getSelectedListItem();if(!$selItem.length){return}$ddCont.scrollTop($selItem.igPosition().top-(this.dropDownVisibleItemsCount-1)*$selItem.outerHeight())},_onSelectDropDownPageIndex:function(event,args){var self=this;if(this._timeoutId!==undefined){clearTimeout(this._timeoutId)}if(parseInt(this.options.delayOnPageChanged,10)===0||event&&event.originalEvent&&event.originalEvent.type!=="keypress"){this._dropDownPageIndex(event,args)}else{this._timeoutId=setTimeout(function(){self._dropDownPageIndex(event,args)},this.options.delayOnPageChanged)}},_dropDownPageIndex:function(event,args){var noCancel=true,noCancelBinding=true,parsedString,editor=args.owner,val=args.text,pageInd=parseInt(val,10),mapping={"\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\uff10":"0"};if(val===""){return}if(isNaN(pageInd)){parsedString=val;$.each(mapping,function(jpVal,engVal){parsedString=parsedString.replace(new RegExp(jpVal,"g"),engVal)});pageInd=parseInt(parsedString,10);if(isNaN(pageInd)){editor.value(this.options.currentPageIndex+1);return}}if(pageInd<=0||pageInd>this.grid.dataSource.pageCount()){editor.hideDropDown();editor.value(this.options.currentPageIndex+1);return}if(pageInd-1===this.options.currentPageIndex){editor.hideDropDown();return}noCancel=this._trigger(this.events.pageIndexChanging,null,{newPageIndex:pageInd-1,currentPageIndex:this.options.currentPageIndex,owner:this});if(noCancel){noCancelBinding=this.grid._trigger(this.grid.events.dataBinding,null,{owner:this.grid,dataSource:this.grid.dataSource});if(noCancelBinding){editor.selectedListIndex(pageInd-1);this._shouldFirePageIndexChanged=true;if(!isNaN(pageInd)){this._showLoading();this.pageIndex(pageInd-1)}}}},_renderPrevPage:function(pager){var prev,self=this,imgspan;prev=$("<div></div>").appendTo(pager).addClass(this.css.prevPage).attr({title:this._getLocaleValue("prevPageTooltip"),"data-localeid":"prevPageTooltip","data-localeattr":"title"});if(this.options.currentPageIndex===0){$("<span></span>").appendTo(prev).addClass(this.css.prevPageImageDisabled);$("<span></span>").appendTo(prev).addClass(this.css.prevPageLabelDisabled).attr("data-localeid","prevPageLabelText").append(this._getLocaleValue("prevPageLabelText"))}else{prev.bind("mousedown",$.proxy(this._prevPage,this));imgspan=$("<span></span>").appendTo(prev).addClass(this.css.prevPageImage);$("<span></span>").appendTo(prev).addClass(this.css.prevPageLabel).attr("data-localeid","prevPageLabelText").append(this._getLocaleValue("prevPageLabelText"));imgspan.wrap(toStaticHTML('<a href="javascript:void(0);" tabIndex="-1"></a>'));prev.attr("tabIndex","0").bind({keydown:function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._prevPage();event.stopPropagation();event.preventDefault()}},focus:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-default").addClass("ui-state-focus")},blur:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-focus").addClass("ui-state-default")}})}},_renderNextPage:function(pager){var next,self=this,imgspan;next=$("<div></div>").appendTo(pager).addClass(this.css.nextPage).attr({title:this._getLocaleValue("nextPageTooltip"),"data-localeid":"nextPageTooltip","data-localeattr":"title"});if(this.options.currentPageIndex===this.grid.dataSource.pageCount()-1){$("<span></span>").appendTo(next).addClass(this.css.nextPageLabelDisabled).attr("data-localeid","nextPageLabelText").append(this._getLocaleValue("nextPageLabelText"));$("<span></span>").appendTo(next).addClass(this.css.nextPageImageDisabled)}else{next.bind("mousedown",$.proxy(this._nextPage,this));$("<span></span>").appendTo(next).addClass(this.css.nextPageLabel).attr("data-localeid","nextPageLabelText").append(this._getLocaleValue("nextPageLabelText"));imgspan=$("<span></span>").appendTo(next).addClass(this.css.nextPageImage);imgspan.wrap(toStaticHTML('<a href="javascript:void(0);" tabIndex="-1"></a>'));next.attr("tabIndex","0").bind({keydown:function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._nextPage();event.stopPropagation();event.preventDefault()}},focus:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-default").addClass("ui-state-focus")},blur:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-focus").addClass("ui-state-default")}})}},_renderFirstPage:function(pager){var first,self=this,imgspan;first=$("<div></div>").appendTo(pager).addClass(this.css.firstPage).attr({title:this._getLocaleValue("firstPageTooltip"),"data-localeid":"firstPageTooltip","data-localeattr":"title"});if(this.options.currentPageIndex===0){$("<span></span>").appendTo(first).addClass(this.css.firstPageImageDisabled);$("<span></span>").appendTo(first).addClass(this.css.firstPageLabelDisabled).attr("data-localeid","firstPageLabelText").append(this._getLocaleValue("firstPageLabelText"))}else{first.bind("mousedown",$.proxy(this._firstPage,this));imgspan=$("<span></span>").appendTo(first).addClass(this.css.firstPageImage);$("<span></span>").appendTo(first).addClass(this.css.firstPageLabel).attr("data-localeid","firstPageLabelText").append(this._getLocaleValue("firstPageLabelText"));imgspan.wrap(toStaticHTML('<a href="javascript:void(0);" tabIndex="-1"></a>'));first.attr("tabIndex","0").bind({keydown:function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._firstPage();event.stopPropagation();event.preventDefault()}},focus:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-default").addClass("ui-state-focus")},blur:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-focus").addClass("ui-state-default")}})}},_renderLastPage:function(pager){var last,self=this,imgspan;last=$("<div></div>").appendTo(pager).addClass(this.css.lastPage).attr({title:this._getLocaleValue("lastPageTooltip"),"data-localeid":"lastPageTooltip","data-localeattr":"title"});if(this.options.currentPageIndex===this.grid.dataSource.pageCount()-1){$("<span></span>").appendTo(last).addClass(this.css.lastPageLabelDisabled).attr("data-localeid","lastPageLabelText").append(this._getLocaleValue("lastPageLabelText"));$("<span></span>").appendTo(last).addClass(this.css.lastPageImageDisabled)}else{last.bind("mousedown",$.proxy(this._lastPage,this));$("<span></span>").appendTo(last).addClass(this.css.lastPageLabel).attr("data-localeid","lastPageLabelText").append(this._getLocaleValue("lastPageLabelText"));imgspan=$("<span></span>").appendTo(last).addClass(this.css.lastPageImage);imgspan.wrap(toStaticHTML('<a href="javascript:void(0);" tabIndex="-1"></a>'));last.attr("tabIndex","0").bind({keydown:function(event){if(event.keyCode===$.ui.keyCode.ENTER||event.keyCode===$.ui.keyCode.SPACE){self._lastPage();event.stopPropagation();event.preventDefault()}},focus:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-default").addClass("ui-state-focus")},blur:function(event){$(event.currentTarget).closest("div").removeClass("ui-state-focus").addClass("ui-state-default")}})}},_renderPageSizeDropDown:function(parent,prepend,insertAfter){var i,ps,editorId=this.grid.id()+"_editor",cClass,items,self=this,edtrOpts,kbrdNavEvents;cClass=this.options.pageSizeDropDownLocation==="above"?this.css.pageSizeDropDownContainerAbove:this.css.pageSizeDropDownContainer;if(insertAfter){parent=$("<div></div>").insertAfter(parent).addClass(cClass)}else{if(prepend){parent=$("<div></div>").prependTo(parent).addClass(cClass)}else{parent=$("<div></div>").appendTo(parent).addClass(cClass)}}parent.attr({"data-pagesize-dd-container":this.grid.id(),title:this._getLocaleValue("pageSizeDropDownTooltip"),"data-localeid":"pageSizeDropDownTooltip",
"data-localeattr":"title"});parent=$("<div></div>").appendTo(parent).addClass(this.css.pagingResults);if(prepend){$("<span>"+this._getLocaleValue("pageSizeDropDownTrailingLabel")+"</span>").attr("data-localeid","pageSizeDropDownTrailingLabel").prependTo(parent).addClass(this.css.pageSizeLabel);$("<span></span>").prependTo(parent).attr("id",editorId);$("<span>"+this._getLocaleValue("pageSizeDropDownLabel")+"</span>").attr("data-localeid","pageSizeDropDownLabel").prependTo(parent).addClass(this.css.pageSizeLabel)}else{$("<span>"+this._getLocaleValue("pageSizeDropDownLabel")+"</span>").attr("data-localeid","pageSizeDropDownLabel").appendTo(parent).addClass(this.css.pageSizeLabel);$("<span></span>").appendTo(parent).attr("id",editorId).addClass(this.css.pageSizeDropDown);$("<span>"+this._getLocaleValue("pageSizeDropDownTrailingLabel")+"</span>").attr("data-localeid","pageSizeDropDownTrailingLabel").appendTo(parent).addClass(this.css.pageSizeLabel)}items=this.options.pageSizeList===null||this.options.pageSizeList.length===0?[5,10,20,25,50,75,100]:this.options.pageSizeList;if($.type(items)==="string"){items=items.split(",")}ps=this.pageSize();kbrdNavEvents=this._getEditorKeyboardNavigation();edtrOpts={language:this.grid.options.language,width:this.options.defaultDropDownWidth,dropDownAttachedToBody:true,suppressNotifications:true,buttonType:"dropdown",dropDownOnReadOnly:true,listItems:items,allowNullValue:false,readOnly:true,textAlign:"left",value:ps,valueChanged:function(e,args){if(self.options.pageSizeDropDownLocation==="inpager"){setTimeout(function(){self._changePageSize(e,args)},0)}else{self._changePageSize(e,args)}},rendered:function(e,args){var edtr=args.owner;edtr.editorContainer().addClass(self.css.pageSizeDropDown);edtr.field().removeClass("ui-state-disabled");edtr.editorContainer().removeClass("ui-state-disabled")}};edtrOpts=$.extend(edtrOpts,kbrdNavEvents);this._pageSizeDD=this.grid.container().find("#"+editorId).igNumericEditor(edtrOpts);for(i=0;i<items.length;i++){if(items[i]===ps){this._pageSizeDD.igNumericEditor("selectedListIndex",i);break}}if($.ig.util.isIE8===true&&this.grid.options._isHierarchicalGrid&&this.grid.options.fixedHeaders){$("<col></col>").appendTo(this.grid.headersTable().find("colgroup")).remove()}this._pageSizeDropDownRendered=true;this._trigger("pagingdropdownrendered")},_changePageSize:function(event,args){var noCancel=true,size=args.owner.value();noCancel=this._trigger(this.events.pageSizeChanging,null,{currentPageSize:this.pageSize(),newPageSize:size,owner:this});if(noCancel){if(this.options.type==="remote"){this.grid.element.trigger("iggriduidirty",{owner:this})}else{this.grid.element.trigger("iggriduisoftdirty",{owner:this})}this.pageSize(size);if(this.options.type==="remote"){this._shouldFirePageSizeChanged=true}else{this._trigger(this.events.pageSizeChanged,null,{pageSize:size,owner:this})}}else{args.owner.value(this.pageSize())}},_deleteOld:function(destroy){if(this._curPageDD){this._curPageDD.igNumericEditor("destroy");delete this._curPageDD}if(destroy&&this._pageSizeDD&&this._pageSizeDD.data("igNumericEditor")&&this._pageSizeDD.closest("body").length>0){this._pageSizeDD.igNumericEditor("destroy");delete this._pageSizeDD}},destroy:function(){var pager=this._pager();this.pageSize(0);this._deleteOld(true);this.grid.element.off(".paging");if(this.options.showPageSizeDropDown===true&&this.options.pageSizeDropDownLocation==="above"){$("#"+this.grid.container()[0].id+" .ui-iggrid-pagesizedropdowncontainerabove").remove()}pager.remove();if(this._loadingIndicator){delete this._loadingIndicator}this._superApply(arguments);return this},_injectGrid:function(gridInstance,isRebind){this.grid=gridInstance;if(this.options.type===null){this.options.type=this.grid._inferOpType()}if(!this.options.persist){if(isRebind){this.options.currentPageIndex=this._oPageIndex;this.options.pageSize=this._oPageSize}}else{this._loadPagingData()}this.grid.dataSource.settings.paging.type=this.options.type||"remote";this.grid.dataSource.settings.paging.pageIndex=this.options.currentPageIndex;if(this.options.type==="local"){this.grid.dataSource.persistedPageIndex(this.grid.dataSource.settings.paging.pageIndex)}this.grid.dataSource.settings.paging.pageSize=parseInt(this.options.pageSize,10);if(this.options.pageSizeUrlKey!==null&&this.options.pageIndexUrlKey){this.grid.dataSource.settings.paging.pageSizeUrlKey=this.options.pageSizeUrlKey;this.grid.dataSource.settings.paging.pageIndexUrlKey=this.options.pageIndexUrlKey}if(this.options.recordCountKey!==null){this.grid.dataSource.settings.responseTotalRecCountKey=this.options.recordCountKey}this.grid.dataSource.settings.paging.enabled=true;if(this._pageSizeDD){this._pageSizeDD.igNumericEditor("option","value",this.options.pageSize)}this.grid.element.off(".paging").on("iggridvirtualrecordsrender.paging",$.proxy(this._onVirtRecordsRender,this))}});$.extend($.ui.igGridPaging,{version:"19.2.27"});return $});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});
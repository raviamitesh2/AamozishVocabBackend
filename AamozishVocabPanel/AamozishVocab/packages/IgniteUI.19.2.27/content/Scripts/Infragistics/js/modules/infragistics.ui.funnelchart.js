/*!@license
 * Infragistics.Web.ClientUI FunnelChart 19.2.20192.315
 *
 * Copyright (c) 2011-2020 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 * jquery.js
 * jquery-ui.js
 * infragistics.util.js
 * infragistics.util.jquery.js
 * infragistics.datasource.js
 * infragistics.templating.js
 * infragistics.ext_core.js
 * infragistics.ext_collections.js
 * infragistics.ext_ui.js
 * infragistics.dv_core.js
 * infragistics.dv_geometry.js
 * infragistics.dv_jquerydom.js
 * infragistics.datachart_core.js
 * infragistics.dvcommonwidget.js
 * infragistics.funnelchart.js
 * infragistics.ui.widget.js
 * infragistics.ui.basechart.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.util.jquery","./infragistics.funnelchart","./infragistics.dv_jquerydom","./infragistics.dvcommonwidget","./infragistics.ui.basechart"],factory)}else{factory(jQuery)}})(function($){var _aNull=function(v,nan){return v===null||v===undefined||nan&&typeof v==="number"&&isNaN(v)};$.widget("ui.igFunnelChart",$.ui.igBaseChart,{css:{chart:"ui-funnel ui-corner-all ui-widget-content",tooltip:"ui-funnel-tooltip ui-widget-content ui-corner-all"},options:{bezierPoints:null,legend:null,valueMemberPath:null,brushes:null,outlines:null,bottomEdgeWidth:.35,innerLabelMemberPath:null,outerLabelMemberPath:null,innerLabelVisibility:"visible",outerLabelVisibility:"collapsed",outerLabelAlignment:null,funnelSliceDisplay:null,formatInnerLabel:null,formatOuterLabel:null,transitionDuration:0,isInverted:false,useBezierCurve:false,allowSliceSelection:false,useUnselectedStyle:false,selectedSliceStyle:null,unselectedSliceStyle:null,legendItemBadgeTemplate:null,useOuterLabelsForLegend:false,textStyle:null,outerLabelTextStyle:null,outlineThickness:-1,pixelScalingRatio:NaN,outerLabelTextColor:null,textColor:null},events:{sliceClicked:null},_create:function(){$.ui.igBaseChart.prototype._create.apply(this);this._defStyle("selected");this._defStyle("unselected");var funnelChart=this._chart;if(funnelChart){funnelChart.sliceClicked=$.ig.Delegate.prototype.combine(funnelChart.sliceClicked,$.proxy(this._fireFunnelChart_sliceClicked,this))}},_provideContainer:function(chart,elem){var elemWrapper=new $.ig.JQueryDomWrapper(elem[0],elem);var renderer=new $.ig.JQueryDomRenderer(elemWrapper,$.proxy(this._getLocaleValue,this));this._renderer=renderer;renderer.fireTooltip=$.proxy(this._fireTooltip,this);chart.provideContainer(renderer)},selectedSliceItems:function(selection){var i,v,sel=this._chart;if(selection===undefined){sel=this.selectedSliceIndexes();i=sel?sel.length:0;while(i-- >0){v=sel[i]=this.getDataItem(sel[i]);if(v===null){sel.splice(i,1)}}return sel}i=selection?selection.length:0;sel=[];while(i-- >0){v=this.findIndexOfItem(selection[i]);if(v>=0){sel[sel.length]=v}}this.selectedSliceIndexes(sel);return this},selectedSliceIndexes:function(selection){var i,v,sel=this._chart;if(sel&&selection!==undefined&&selection!==true){sel.selectedIndexes(selection);return this}sel=sel?sel.selectedIndexes():null;if(selection){return sel}i=sel?sel.length:0;selection=[];while(i-- >0){v=selection[i]=sel[i];if(v===null||isNaN(v)||v<0){selection.splice(i,1)}}return selection},isSelected:function(slice){var sel=this.selectedSliceIndexes(true);return!(slice===null||!sel||!sel.contains(typeof slice==="number"?slice:this.findIndexOfItem(slice)))},toggleSelection:function(slice){if(typeof slice!=="number"){slice=this.findIndexOfItem(slice)}if(slice>=0&&this._chart){this._chart.toggleSelection(slice)}return this},_fireFunnelChart_sliceClicked:function(chart,evt){var i=evt.index();this._trigger("sliceClicked",null,{owner:this,index:i,item:evt.item(),selected:this.isSelected(i)})},_getValueKeyName:function(){return"valueMemberPath"},_getRemoteDataKeys:function(){var o=this.options;return[o.valueMemberPath,o.innerLabelMemberPath,o.outerLabelMemberPath]},_getNotifyResizeName:function(){return"notifyResized"},_createChart:function(){return new $.ig.XamFunnelChart},_setLegend:function(chart,value){var legend=this._legend;if(legend&&legend.data("igChartLegend")!==undefined){legend.igChartLegend("destroy");if(legend[0]._remove){legend.remove()}delete this._legend;chart.legend(null)}if(!value){return}if(typeof value==="string"){value={element:value}}legend=value.element;if(legend){legend=$("#"+legend)}value.owner=this;value.type="item";if(!legend||legend.length!==1){legend=$("<div />").insertAfter(this.element);legend[0]._remove=true}this._legend=legend;chart.legend(legend.igChartLegend(value).data("igChartLegend").legend)},_set_option:function(funnelChart,key,value){if(key==="legend"){this._setLegend(funnelChart,value);return true}if(key==="bezierPoints"){var i=-1,len=0;if(typeof value==="string"){value=value.split(" ");len=value.length;while(++i<len){if(isNaN(value[i]=parseFloat(value[i]))){len=0}}}if(len<2){len=4;value=[.5,0,.5,1]}funnelChart.upperBezierControlPoint({__x:value[0],__y:value[1]});if(len>3){funnelChart.lowerBezierControlPoint({__x:value[2],__y:value[3]})}return true}if(key!=="sliceClicked"){if($.ui.igBaseChart.prototype._set_option.apply(this,arguments)){return true}}switch(key){case"valueMemberPath":funnelChart.valueMemberPath(value);return true;case"brushes":var isRGB=true,val=value?value[0]:null;if(typeof val=="string"&&val=="HSV"||val=="RGB"){if(value[0]=="HSV"){isRGB=false}value=value.slice(1)}var $tempBrushCollection=new $.ig.BrushCollection;for(var i=0;value&&i<value.length;i++){var $tempBrush=$.ig.Brush.prototype.create(value[i]);$tempBrushCollection.add($tempBrush)}funnelChart.brushes($tempBrushCollection);return true;case"outlines":var isRGB=true,val=value?value[0]:null;if(typeof val=="string"&&val=="HSV"||val=="RGB"){if(value[0]=="HSV"){isRGB=false}value=value.slice(1)}var $tempBrushCollection=new $.ig.BrushCollection;for(var i=0;value&&i<value.length;i++){var $tempBrush=$.ig.Brush.prototype.create(value[i]);$tempBrushCollection.add($tempBrush)}funnelChart.outlines($tempBrushCollection);return true;case"bottomEdgeWidth":funnelChart.bottomEdgeWidth(value);return true;case"innerLabelMemberPath":funnelChart.innerLabelMemberPath(value);return true;case"outerLabelMemberPath":funnelChart.outerLabelMemberPath(value);return true;case"innerLabelVisibility":switch(value){case"visible":funnelChart.innerLabelVisibility(0);break;case"collapsed":funnelChart.innerLabelVisibility(1);break}return true;case"outerLabelVisibility":switch(value){case"visible":funnelChart.outerLabelVisibility(0);break;case"collapsed":funnelChart.outerLabelVisibility(1);break}return true;case"outerLabelAlignment":switch(value){case"left":funnelChart.outerLabelAlignment(0);break;case"right":funnelChart.outerLabelAlignment(1);break}return true;case"funnelSliceDisplay":switch(value){case"uniform":funnelChart.funnelSliceDisplay(0);break;case"weighted":funnelChart.funnelSliceDisplay(1);break}return true;case"formatInnerLabel":funnelChart.formatInnerLabel(value);return true;case"formatOuterLabel":funnelChart.formatOuterLabel(value);return true;case"transitionDuration":funnelChart.transitionDuration(value);return true;case"isInverted":funnelChart.isInverted(value);return true;case"useBezierCurve":funnelChart.useBezierCurve(value);return true;case"allowSliceSelection":funnelChart.allowSliceSelection(value);return true;case"useUnselectedStyle":funnelChart.useUnselectedStyle(value);return true;case"selectedSliceStyle":funnelChart.selectedSliceStyle(value);return true;case"unselectedSliceStyle":funnelChart.unselectedSliceStyle(value);return true;case"legendItemBadgeTemplate":var $tempTemplate=new $.ig.DataTemplate;if(value.render){$tempTemplate.render(value.render);if(value.measure){$tempTemplate.measure(value.measure)}}else{$tempTemplate.render(value)}funnelChart.legendItemBadgeTemplate($tempTemplate);return true;case"useOuterLabelsForLegend":funnelChart.useOuterLabelsForLegend(value);return true;case"textStyle":funnelChart.textStyle(value);return true;case"outerLabelTextStyle":funnelChart.outerLabelTextStyle(value);return true;case"outlineThickness":funnelChart.outlineThickness(value);return true;case"pixelScalingRatio":funnelChart.pixelScalingRatio(value);return true;case"outerLabelTextColor":if(value==null){funnelChart.outerLabelTextColor(null)}else{var $tempBrush=$.ig.Brush.prototype.create(value);funnelChart.outerLabelTextColor($tempBrush)}return true;case"textColor":if(value==null){funnelChart.textColor(null)}else{var $tempBrush=$.ig.Brush.prototype.create(value);funnelChart.textColor($tempBrush)}return true}},_setOption:function(key,val){var chart=this._chart,o=this.options;if(o[key]===val){return this}$.Widget.prototype._setOption.apply(this,arguments);this._set_option(chart,key,val);return this},_dataEvt:function(act,before){if(act===0||act===1){return}var sel,i,old=this._oldSel;if(before){old=this.selectedSliceItems();this._oldSel=old&&old.length?old:null;return}delete this._oldSel;sel=this.selectedSliceIndexes();if(!old&&(!sel||!sel.length)){return}i=old?old.length:0;while(i-- >0){old[i]=this.findIndexOfItem(old[i]);if(old[i]<0){sel=null;old.splice(i,1)}else if(sel&&sel[i]!==old[i]){sel=null}}if(!sel){this.selectedSliceIndexes(old||null)}},_defStyle:function(sel){var v,bk0,b0,style={},name=sel+"SliceStyle",span=this.element.find("SPAN");if(span.length!==1||this.options[name]){return}bk0=span.css("background-color");b0=span.css("border-top-color");sel="ui-funnel-slice-"+sel;span.addClass(sel);v=span.css("background-color");if(v&&v!=="transparent"&&v!==bk0){style.fill=v}v=span.css("border-top-color");if(v&&v!==b0){style.stroke=v}v=parseFloat(span.css("opacity"));if(!isNaN(v)&&v>0&&v<1){style.opacity=v}span.removeClass(sel);this._set_option(this._chart,name,style)},exportVisualData:function(){return this._chart.exportVisualData()},destroy:function(){if(this._chart){this._setLegend(this._chart)}$.ui.igBaseChart.prototype.destroy.apply(this);if(this._renderer!=null){this._renderer.destroy();this._renderer=null}}});$.extend($.ui.igFunnelChart,{version:"19.2.20192.315"});return $.ui.igFunnelChart});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});
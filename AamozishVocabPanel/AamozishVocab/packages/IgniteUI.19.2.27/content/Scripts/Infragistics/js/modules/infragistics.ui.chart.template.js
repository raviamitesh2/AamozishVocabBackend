/*!@license
 * Infragistics.Web.ClientUI Chart 19.2.20192.315
 *
 * Copyright (c) 2011-2020 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends:
 * jquery.js
 * jquery-ui.js
 * infragistics.util.js
 * infragistics.datasource.js
 * infragistics.templating.js
 * infragistics.ext_core.js
 * infragistics.ext_collections.js
 * infragistics.ext_ui.js
 * infragistics.dv_core.js
 * infragistics.dv_geometry.js
 * infragistics.datachart_core.js
 * infragistics.dvcommonwidget.js
 * infragistics.datachart_categorycore.js
 * infragistics.datachart_category.js
 * infragistics.datachart_rangecategory.js
 * infragistics.datachart_verticalcategory.js
 * infragistics.datachart_financial.js
 * infragistics.datachart_extendedfinancial.js
 * infragistics.datachart_extendedaxes.js
 * infragistics.datachart_polar.js
 * infragistics.datachart_radial.js
 * infragistics.datachart_scatter.js
 * infragistics.datachart_stacked.js
 * infragistics.datachart_annotation.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.datasource","./infragistics.datachart_core","./infragistics.dvcommonwidget"],factory)}else{factory(jQuery)}})(function($){$.widget("ui.igDataChart",{options:{syncChannel:null,synchronizeVertically:true,syncrhonizeHorizontally:false,width:500,height:500,dataSource:null,dataSourceUrl:null,dataSourceType:null,responseDataKey:null,responseDataType:null,legend:{element:null,type:"legend",width:null,height:null},axes:[{type:null,name:null,dataSource:null,dataSourceUrl:null,dataSourceType:null,responseDataKey:null,responseDataType:null,remove:false,labelLocation:null,labelVisibility:"visible",labelExtent:null}],series:[{type:null,name:null,dataSource:null,dataSourceUrl:null,dataSourceType:null,responseDataKey:null,remove:false,showTooltip:false,legend:{element:null,type:"legend",width:null,height:null}}]},css:{chart:"ui-corner-all ui-widget-content",unsupportedBrowserClass:"ui-chart-non-html5-supported-message ui-helper-clearfix",tooltip:"ui-chart-tooltip ui-widget-content ui-corner-all"},events:{tooltipShowing:"tooltipShowing",tooltipShown:"tooltipShown",tooltipHiding:"tooltipHiding",tooltipHidden:"tooltipHidden",browserNotSupported:"browserNotSupported"},_creationOptions:null,_axisTemplate:null,_seriesTemplate:null,_axisOpt:null,_seriesOpt:null,_initialDataSource:null,_createWidget:function(options,element){this._creationOptions=options;this.options.legend=null;this.options.series[0].legend=null;if(options.dataSource&&$.type(options.dataSource)==="array"||$.type(options.dataSource)==="object"&&!(options.dataSource instanceof $.ig.DataSource)){this._initialDataSource=options.dataSource;options.dataSource=null}this._axisTemplate=$.extend(false,{},this.options.axes[0]);this._seriesTemplate=$.extend(false,{},this.options.series[0]);$.Widget.prototype._createWidget.apply(this,arguments)},_init:function(){},_notInitialized:true,_create:function(){if(!$.ig.ChartCommon._isCanvasSupported()){$.ig.ChartCommon._renderUnsupportedBrowser(this)}else{if(this._initialDataSource){this._creationOptions.dataSource=this._initialDataSource;this.options.dataSource=this._initialDataSource}this._axes={};this._series={};this._axisOpt={};this._seriesOpt={};this._chart=new $.ig.XamDataChart;if(this._creationOptions.name){this._chart.name(this._creationOptions.name)}this._chart.tooltipStyle(this.css.tooltip);$.ig.ChartCommon._renderChartContainer(this);this._tooltipTemplates={};this._initialDataBind();if(this.dsCount===0&&this._notInitialized){this._initializeDataChart()}}},_initialDataBind:function(){var ds=this._getAllDataSources(),self=this;$.each(ds,function(i,val){self.dataSources[i].dataBind()})},_initCallback:function(success,error){this.dsCount--;if(this.dsCount===0&&success){this._initializeDataChart()}},_getAllDataSources:function(){var self=this,options=this.options,axes,series;self.dataSources={};this.dsCount=0;if(options.dataSource||options.dataSourceUrl){this.dsCount++;$.ig.ChartCommon._setupDataSource(this,options,this._initCallback)}if(options.axes){axes=options.axes;$.each(axes,function(i,val){if(val.dataSource||val.dataSourceUrl){self.dsCount++;$.ig.ChartCommon._setupDataSource(self,val,self._initCallback)}})}if(options.series){series=options.series;$.each(series,function(i,val){if(val.dataSource||val.dataSourceUrl){self.dsCount++;$.ig.ChartCommon._setupDataSource(self,val,self._initCallback)}})}return self.dataSources},_setChartOption:function(chart,key,value){return false},_setChartOptions:function(options,chart){var self=this;$.each(options,function(key,value){if(!self._setChartOption(chart,key,value)){self._setCoreChartOption(chart,key,value)}else{self.options[key]=value}})},_createAxisFromType:function(axisType){switch(axisType){case"numericX":return new $.ig.NumericXAxis;case"numericY":return new $.ig.NumericYAxis;case"categoryX":return new $.ig.CategoryXAxis;case"categoryDateTimeX":return new $.ig.CategoryDateTimeXAxis;case"categoryY":return new $.ig.CategoryYAxis;case"categoryAngle":return new $.ig.CategoryAngleAxis;case"numericAngle":return new $.ig.NumericAngleAxis;case"numericRadius":return new $.ig.NumericRadiusAxis;case"percentChangeY":return new $.ig.PercentChangeYAxis;default:break}},_createSeriesFromType:function(seriesType){switch(seriesType){case"area":return new $.ig.AreaSeries;case"bar":return new $.ig.BarSeries;case"column":return new $.ig.ColumnSeries;case"line":return new $.ig.LineSeries;case"rangeArea":return new $.ig.RangeAreaSeries;case"rangeColumn":return new $.ig.RangeColumnSeries;case"splineArea":return new $.ig.SplineAreaSeries;case"spline":return new $.ig.SplineSeries;case"stepArea":return new $.ig.StepAreaSeries;case"stepLine":return new $.ig.StepLineSeries;case"waterfall":return new $.ig.WaterfallSeries;case"financial":return new $.ig.FinancialPriceSeries;case"typicalPriceIndicator":return new $.ig.TypicalPriceIndicator;case"polarArea":return new $.ig.PolarAreaSeries;case"polarLine":return new $.ig.PolarLineSeries;case"polarScatter":return new $.ig.PolarScatterSeries;case"radialColumn":return new $.ig.RadialColumnSeries;case"radialLine":return new $.ig.RadialLineSeries;case"radialPie":return new $.ig.RadialPieSeries;case"scatter":return new $.ig.ScatterSeries;case"scatterLine":return new $.ig.ScatterLineSeries;case"absoluteVolumeOscillatorIndicator":return new $.ig.AbsoluteVolumeOscillatorIndicator;case"averageTrueRangeIndicator":return new $.ig.AverageTrueRangeIndicator;case"accumulationDistributionIndicator":return new $.ig.AccumulationDistributionIndicator;case"averageDirectionalIndexIndicator":return new $.ig.AverageDirectionalIndexIndicator;default:break}},_setCoreChartOption:function(chart,key,value){var self=this,axis=null,axisOpt=null,axisIsNew=false,merged,settings,newLink,oldLink,seriesIsNew,series=null,seriesOpt=null;switch(key){case"axes":$.each(value,function(i,val){if(!val.name){throw new Error("must specify axis name when setting options.")}axis=self._getAxisByName(val.name);if(axis&&val.remove){delete self._axes[val.name];delete self._axisOpt[val.name];var ind=self.options.axes.indexOf(self._axisOpt[val.name]);self.options.axes.splice(ind,1);self._chart.axes().remove(axis);if(self.dataSources[val.name]){delete self.dataSources[val.name].settings;delete self.dataSources[val.name]}if(self._target&&self._target.name()===val.name){self._target=null}return}if(axis){axisOpt=self._axisOpt[val.name]}if(!axis){axis=self._createAxisFromType(val.type);axis.name(val.name);axisIsNew=true}if(axis){if(axisIsNew){self._axes[val.name]=axis;self.options.axes.push(axisOpt);merged=$.ig.ChartCommon._mergeIntoNewWithDataSource(self._axisTemplate,val);self._axisOpt[val.name]=merged}self._setAxisOptions(val,axis);if(axisIsNew){if($.ig.util.canAssign($.ig.CategoryAxisBase.prototype.$type,axis.$type)){if(self.dataSources[axis.name()]){self._setItemsSource(axis,axis.name())}else{self._setItemsSource(axis,self._containerSourceID)}}}else{$.ig.ChartCommon._mergeIntoWithDataSource(axisOpt,val)}if(axisIsNew){self._chart.axes().add(axis)}}});if(this._pendingCrossingAxes.length>0){$.each(this._pendingCrossingAxes,function(i,val){val()});this._pendingCrossingAxes.length=0}break;case"series":if(!this._duringInit){seriesIsNew=false;$.each(value,function(i,val){if(!val.name){throw new Error("must specify series name when setting options.")}series=self._getSeriesByName(val.name);if(series&&val.remove){delete self._series[val.name];delete self._seriesOpt[val.name];var ind=self.options.series.indexOf(self._seriesOpt[val.name]);self.options.series.splice(ind,1);self._chart.series().remove(series);if(self.dataSources[val.name]){delete self.dataSources[val.name].settings;delete self.dataSources[val.name]}if(self._target&&self._target.name()===val.name){self._target=null}return}if(!series&&!val.remove){series=self._createSeriesFromType(val.type);series.name(val.name);seriesIsNew=true}if(series){seriesOpt=self._seriesOpt[val.name]}if(series){if(seriesIsNew){self._series[val.name]=series;self.options.series.push(seriesOpt);merged=$.ig.ChartCommon._mergeIntoNewWithDataSource(self._seriesTemplate,val);self._seriesOpt[val.name]=merged}if(val.coercionMethods){series.coercionMethods(val.coercionMethods)}self._setSeriesOptions(val,series);if(seriesIsNew){if(self.dataSources[series.name()]){self._setItemsSource(series,series.name())}else{self._setItemsSource(series,self._containerSourceID)}}else{$.ig.ChartCommon._mergeIntoWithDataSource(seriesOpt,val)}if(seriesIsNew){self._chart.series().add(series)}}})}break;case"syncChannel":newLink=null;if(value&&value.length>0){newLink=$.ig.SyncLinkManager.prototype.instance().getLink(value)}oldLink=this._chart.actualSyncLink();if(oldLink){$.ig.SyncLinkManager.prototype.instance().releaseLink(oldLink)}if(newLink){this._chart.actualSyncLink(newLink)}else{this._chart.actualSyncLink(new $.ig.SyncLink)}this.options[key]=value;break;case"synchronizeVertically":settings=this._chart.syncSettings();settings.synchronizeVertically(value);this.options[key]=value;break;case"synchronizeHorizontally":settings=this._chart.syncSettings();settings.synchronizeHorizontally(value);this.options[key]=value;break;case"legend":$.ig.ChartCommon._setLegend(this._chart,value);break;case"width":if(!this._duringInit){this._chartElement.css("width",value);this.notifyContainerResized()}break;case"height":if(!this._duringInit){this._chartElement.css("height",value);this.notifyContainerResized()}break;case"size":if(!this._duringInit){if(value.width){this._chartElement.css("width",value.width)}if(value.height){this._chartElement.css("height",value.height)}this.notifyContainerResized()}break}},_setOption:function(key,value){if(key==="dataSource"||key==="dataSourceUrl"||typeof value[0]!=="undefined"&&(value[0].dataSource||value[0].dataSourceUrl)){var dataOptions={},id;if(key==="dataSource"||key==="dataSourceUrl"){dataOptions.dataSource=value;id=this._containerSourceID}else{dataOptions=value[0];id=value[0].name;if(this._target&&this._target.name()===id){this._target=null}}$.ig.ChartCommon._setupDataSource(this,dataOptions,this._chartDataCallBack);if(key==="series"||key==="axes"){if(!this._setChartOption(this._chart,key,value)){this._setCoreChartOption(this._chart,key,value)}else{this.options[key]=value}}this.dataSources[id].dataBind()}else{if(!this._setChartOption(this._chart,key,value)){this._setCoreChartOption(this._chart,key,value)}else{this.options[key]=value}}},_chartDataCallBack:function(success,e,dataSource){if(!success){return false}if(dataSource.settings.id===this._containerSourceID){var self=this,axes=this._axes,series=this._series;$.each(axes,function(name,target){self._setItemsSource(target,dataSource.settings.id)});$.each(series,function(name,target){self._setItemsSource(target,dataSource.settings.id)})}else{this._setItemsSource(this._getNotifyTarget(dataSource.settings.id),dataSource.settings.id)}},_setItemsSource:function(target,id){if(target.itemsSource){target.itemsSource(this.dataSources[id].dataView())}},widget:function(){return this.element},id:function(){return this.element[0].id},_getAxisByName:function(name){if(typeof this._axes[name]==="undefined"){return null}return this._axes[name]},_getSeriesByName:function(name){if(typeof this._series[name]==="undefined"){return null}return this._series[name]},_chartElement:null,_initializeDataChart:function(){var opt=this._creationOptions;this._duringInit=true;this._setChartOptions(this._creationOptions,this._chart);this._duringInit=false;if(this._creationOptions.series){this._setCoreChartOption(this._chart,"series",this._creationOptions.series)}this._bindChartEvents(this._chart);this._notInitialized=false},_bindChartEvents:function(chart){},_getChartEvt:function(evtArgs){var e={},seriesOpt=this._seriesOpt[evtArgs.series().name()],pos;e.chart=this.element;e.series=seriesOpt;e.item=evtArgs.item();if(evtArgs.originalEvent&&evtArgs.originalEvent()!==null&&evtArgs.originalEvent().position&&evtArgs.originalEvent().position()!==null){pos=evtArgs.originalEvent().position();e.positionX=pos.x();e.positionY=pos.y()}return e},_fireChart_seriesCursorMouseMove:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesCursorMouseMove",null,e)},_fireChart_seriesMouseLeftButtonDown:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesMouseLeftButtonDown",null,e)},_fireChart_seriesMouseLeftButtonUp:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesMouseLeftButtonUp",null,e)},_fireChart_seriesMouseMove:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesMouseMove",null,e)},_fireChart_seriesMouseEnter:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesMouseEnter",null,e)},_fireChart_seriesMouseLeave:function(sender,evtArgs){var e=this._getChartEvt(evtArgs);this._trigger("seriesMouseLeave",null,e)},_fireChart_windowRectChanged:function(sender,evtArgs){var e={},oldRect=evtArgs.oldRect(),newRect=evtArgs.newRect();if(oldRect){e.oldTop=oldRect.top();e.oldLeft=oldRect.left();e.oldWidth=oldRect.width();e.oldHeight=oldRect.height()}e.newTop=newRect.top();e.newLeft=newRect.left();e.newWidth=newRect.width();e.newHeight=newRect.height();e.chart=this.element;this._trigger("windowRectChanged",null,e)},_fireChart_gridAreaRectChanged:function(sender,evtArgs){var e={},oldRect=evtArgs.oldRect(),newRect=evtArgs.newRect();if(oldRect){e.oldTop=oldRect.top();e.oldLeft=oldRect.left();e.oldWidth=oldRect.width();e.oldHeight=oldRect.height()}e.newTop=newRect.top();e.newLeft=newRect.left();e.newWidth=newRect.width();e.newHeight=newRect.height();e.chart=this.element;this._trigger("gridAreaRectChanged",null,e)},_fireChart_refreshCompleted:function(sender,evtArgs){var e={};e.chart=this.element;this._trigger("refreshCompleted",null,e)},_fireChart_axisRangeChanged:function(sender,evtArgs){var e={};e.chart=this.element;e.axis=this._axisOpt[evtArgs.axis().name()];e.oldMinimumValue=evtArgs.oldMinimumValue();e.oldMaximumValue=evtArgs.oldMaximumValue();e.newMinimumValue=evtArgs.minimumValue();e.newMaximumValue=evtArgs.maximumValue();this._trigger("axisRangeChanged",null,e)},_setAxisOptions:function(options,axis){var self=this;var crossingSets=[];$.each(options,function(key,value){if(!self._setAxisOption(axis,key,value)){self._setCoreAxisOption(axis,key,value)}else{self._axisOpt[axis.name()][key]=value}})},_pendingCrossingAxes:[],_setCoreAxisOption:function(axis,key,value){var labelSettings=null,tempBrush,tempAxis,self=this;switch(key){case"crossingAxis":if(value){tempAxis=this._getAxisByName(value);if(tempAxis){axis.crossingAxis(tempAxis)}else{this._pendingCrossingAxes.push(function(){var tempAxis=self._getAxisByName(value);if(tempAxis){axis.crossingAxis(tempAxis)}})}}else{axis.crossingAxis(null)}break;case"labelLocation":labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}switch(value){case"outsideTop":labelSettings.location(0);break;case"outsideBottom":labelSettings.location(1);break;case"outsideLeft":labelSettings.location(2);break;case"outsideRight":labelSettings.location(3);break;case"insideTop":labelSettings.location(4);break;case"insideBottom":labelSettings.location(5);break;case"insiudeLeft":labelSettings.location(6);break;case"insideRight":labelSettings.location(7);break;default:break}if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break;case"labelVisibility":labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}switch(value){case"visible":labelSettings.visibility(0);break;case"collapsed":labelSettings.visibility(1);break;default:break}if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break;case"labelExtent":if(value===null){value=NaN}labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}labelSettings.extent(value);if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break;case"labelAngle":if(value===null){value=0}labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}labelSettings.angle(value);if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break;case"labelTextStyle":labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}labelSettings.textStyle(value);if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break;case"labelTextColor":tempBrush=new $.ig.Brush;tempBrush.fill(value);if(value===null){tempBrush=null}labelSettings=axis.labelSettings();if(labelSettings===null){labelSettings=new $.ig.AxisLabelSettings}labelSettings.textColor(tempBrush);if(!axis.labelSettings()){axis.labelSettings(labelSettings)}break}},_setAxisOption:function(axis,key,value){return false},_setSeriesOptions:function(options,series){var self=this;$.each(options,function(key,value){if(!self._setCoreSeriesOption(series,key,value)){self._seriesSetOption(series,key,value)}else{self._seriesOpt[series.name()][key]=value}})},_setCoreSeriesOption:function(series,key,value){var templ;switch(key){case"legend":$.ig.ChartCommon._setLegend(series,value);return true;case"showTooltip":if(value===true){$.ig.ChartCommon._addTooltip(this,series,this.css.tooltip)}return true;case"tooltipTemplate":if($.tmpl){templ=typeof $("#"+value).data().tmpl==="undefined"?$.template(series.name()+"TooltipTemplate",value):value;this._tooltipTemplates[series.name()]=templ}return true;case"displayType":switch(value){case"candlestick":series.displayType(0);break;case"ohlc":series.displayType(1);break;case"line":series.displayType(0);break;case"area":series.displayType(1);break;case"column":series.displayType(2);break}return true}return false},_tooltipTemplate:null,_tooltipTtemplates:null,_tooltip:{},_seriesSetOption:function(series,key,value){return false},exportImage:function(width,height){return $.ig.ChartCommon._getImage(width,height,this)},destroy:function(){if(this._chartElement){this._chartElement.remove()}$.Widget.prototype.destroy.apply(this,arguments)},styleUpdated:function(){this._chart.styleUpdated();return this},resetZoom:function(){this._chart.resetZoom();return this},_itemAdded:function(item,dataSource){this._notifyItemAdded(dataSource,item,dataSource.dataView().length-1)},_itemInserted:function(item,dataSource){this._notifyItemAdded(dataSource,item,item.rowIndex)},_notifyItemAdded:function(dataSource,newItem,index){this._chart.notifyInsertItem(dataSource,index,newItem.row)},_itemUpdated:function(item,dataSource){this._chart.notifySetItem(dataSource,item.rowIndex,item.oldRow,item.newRow)},_itemRemoved:function(item,dataSource){this._chart.notifyRemoveItem(dataSource,item.rowIndex,item.row)},addItem:function(item,targetName){var dataSourceId=targetName||this._containerSourceID;if(this.dataSources[dataSourceId]){this.dataSources[dataSourceId].addRow(null,item,true)}},insertItem:function(item,index,targetName){var dataSourceId=targetName||this._containerSourceID;if(this.dataSources[dataSourceId]){this.dataSources[dataSourceId].insertRow(null,item,index,true)}},removeItem:function(index,targetName){var dataSourceId=targetName||this._containerSourceID;if(this.dataSources[dataSourceId]){this.dataSources[dataSourceId].deleteRow(index,true)}},setItem:function(index,item,targetName){var dataSourceId=targetName||this._containerSourceID;if(this.dataSources[dataSourceId]){this.dataSources[dataSourceId].updateRow(index,item,true)}},_getNotifyTarget:function(targetName){var target=this._getSeriesByName(targetName);if(!target){target=this._getAxisByName(targetName)}return target},notifySetItem:function(dataSource,index,newItem,oldItem){this._chart.notifySetItem(dataSource,index,oldItem,newItem);return this},notifyClearItems:function(dataSource){this._chart.notifyClearItems(dataSource);return this},notifyInsertItem:function(dataSource,index,newItem){this._chart.notifyInsertItem(dataSource,index,newItem);return this},notifyRemoveItem:function(dataSource,index,oldItem){this._chart.notifyRemoveItem(dataSource,index,oldItem);return this},scrollIntoView:function(targetName,item){var target=this._getNotifyTarget(targetName);if(target&&target.scrollIntoView){target.scrollIntoView(item)}return this},scaleValue:function(targetName,unscaledValue){var target=this._getNotifyTarget(targetName);if(target&&target.scaleValue){return target.scaleValue(unscaledValue)}return 0},unscaleValue:function(targetName,scaledValue){var target=this._getNotifyTarget(targetName);if(target&&target.unscaleValue){return target.unscaleValue(scaledValue)}return 0},flush:function(){this._chart.flush()},exportVisualData:function(){return this._chart.exportVisualData()},getActualMinimumValue:function(targetName){var target=this._getNotifyTarget(targetName);if(target&&target.actualMinimumValue){return target.actualMinimumValue()}return 0},getActualMaximumValue:function(targetName){var target=this._getNotifyTarget(targetName);if(target&&target.actualMaximumValue){return target.actualMaximumValue()}return 0},notifyContainerResized:function(){this._chart.notifyContainerResized()}});$.extend($.ui.igDataChart,{version:"19.2.20192.315"});$.widget("ui.igPieChart",{options:{width:500,height:500,dataSource:null,dataSourceUrl:null,dataSourceType:null,responseDataKey:null,responseDataType:null},css:{chart:"ui-corner-all ui-widget-content",unsupportedBrowserClass:"ui-chart-non-html5-supported-message ui-helper-clearfix",tooltip:"ui-chart-tooltip ui-widget-content ui-corner-all"},events:{tooltipShowing:"tooltipShowing",tooltipShown:"tooltipShown",tooltipHiding:"tooltipHiding",tooltipHidden:"tooltipHidden",browserNotSupported:"browserNotSupported"},_creationOptions:null,_createWidget:function(options,element){this._creationOptions=options;$.Widget.prototype._createWidget.apply(this,arguments)},_create:function(){if(!$.ig.ChartCommon._isCanvasSupported()){$.ig.ChartCommon._renderUnsupportedBrowser(this)}else{this._tooltipTemplates={};this._initialDataBind()}},_initialDataBind:function(){$.ig.ChartCommon._setupDataSource(this,this.options,this._initializeChart);this.dataSources[this.id()].dataBind()},_initializeChart:function(){this._chart=new $.ig.XamPieChart;if(!this.options.name){this.options.name="pieChart"}this._chart.name("pieChart");$.ig.ChartCommon._renderChartContainer(this);this._chart.itemsSource(this.dataSources[this.id()].dataView());this._setChartOptions(this._creationOptions,this._chart);this._bindChartEvents(this._chart)},_bindChartEvents:function(pieChart){},_getChartEvt:function(evtArgs){var e={},seriesOpt=this.options,pos;e.chart=this.element;e.series=seriesOpt;e.item=evtArgs.item();if(evtArgs.originalEvent&&evtArgs.originalEvent()!==null&&evtArgs.originalEvent().position&&evtArgs.originalEvent().position()!==null){pos=evtArgs.originalEvent().position();e.positionX=pos.x();e.positionY=pos.y()}return e},_firePieChart_sliceClick:function(sender,evtArgs){var e={},isExploded,isSelected;e.slice={};e.slice.item=evtArgs.slice().dataContext();isExploded=evtArgs.slice().isExploded();isSelected=evtArgs.slice().isSelected();e.slice.isExploded=isExploded;e.slice.isSelected=isSelected;this._trigger("sliceClick",null,e);if(e.slice.isExploded!==isExploded){evtArgs.slice().isExploded(e.slice.isExploded)}if(e.slice.isSelected!==isSelected){evtArgs.slice().isSelected(e.slice.isSelected)}},_setChartOptions:function(options,chart){var self=this;$.each(options,function(key,value){if(!self._setCoreChartOption(chart,key,value)){self._setChartOption(chart,key,value)}})},_setCoreChartOption:function(chart,key,value){var exploded,templ;switch(key){case"dataSource":chart.itemsSource(this.dataSources[this.id()].dataView());break;case"explodedSlices":if(value.length){exploded=new $.ig.IndexCollection;$.each(value,function(i,val){exploded.add(val)});this._chart.explodedSlices(exploded)}break;case"legend":$.ig.ChartCommon._setLegend(this._chart,value);break;case"showTooltip":if(value===true){$.ig.ChartCommon._addTooltip(this,this._chart,this.css.tooltip)}break;case"tooltipTemplate":if($.tmpl){templ=typeof $("#"+value).data().tmpl==="undefined"?$.template(this.id()+"TooltipTemplate",value):value;this._tooltipTemplate=templ}break}},_tooltipTemplate:null,_tooltipTemplates:null,_tooltip:{},_setOption:function(key,value){if(key==="dataSource"||key==="dataSourceUrl"){var data={};data.dataSource=value;$.ig.ChartCommon._setupDataSource(this,data,this._chartDataCallBack);this.dataSources[this.id()].dataBind()}else{if(!this._setChartOption(this._chart,key,value)){this._setCoreChartOption(this._chart,key,value)}}},_itemAdded:function(item,dataSource){this._chart.notifyInsertItem(this.dataSources[this.id()].dataView().length,item)},_itemInserted:function(item,dataSource){this._chart.notifySetItem(item.rowIndex,item)},_itemUpdated:function(item,dataSource){this._chart.notifySetItem(item.rowIndex,item.oldRow,item.newRow)},_itemRemoved:function(item,dataSource){this._chart.notifyRemoveItem(item.rowIndex,item.row)},addItem:function(item){this.dataSources[this.id()].addRow(null,item,true)},insertItem:function(item,index){this.dataSources[this.id()].insertRow(null,item,index,true)},removeItem:function(index){this.dataSources[this.id()].deleteRow(index,true)},setItem:function(index,item){this.dataSources[this.id()].updateRow(index,item,true)},_chartDataCallBack:function(){this._chart.itemsSource(this.dataSources[this.id()].dataView())},_setChartOption:function(pieChart,key,value){return false},exportImage:function(width,height){return $.ig.ChartCommon._getImage(width,height,this)},destroy:function(){$.Widget.prototype.destroy.call(this);return this},id:function(){return this.element[0].id},notifyContainerResized:function(){this._chart.notifyContainerResized()},flush:function(){if(this._chart&&typeof this._chart.flush==="function"){this._chart.flush()}}});$.extend($.ui.igPieChart,{version:"19.2.20192.315"});$.widget("ui.igChartLegend",{options:{type:"legend",width:null,height:null},css:{legend:"ui-corner-all ui-widget-content ui-chart-legend",legendItemsList:"ui-chart-legend-items-list",legendItem:"ui-chart-legend-item",legendItemBadge:"ui-chart-legend-item-badge",legendItemText:"ui-chart-legend-item-text"},events:{},_create:function(){switch(this.options.type){case"item":this.legend=new $.ig.ItemLegend;break;case"legend":this.legend=new $.ig.Legend;break}this.legend.name(this.id());this.legend.legendItemsListStyle(this.css.legendItemsList);this.legend.legendItemStyle(this.css.legendItem);this.legend.legendItemBadgeStyle(this.css.legendItemBadge);this.legend.legendItemTextStyle(this.css.legendItemText);this.element.css("width",this.options.width);this.element.css("height",this.options.height);this.element.addClass(this.css.legend);this.legend.provideContainer(this.element)},getLegend:function(){return this.legend},destroy:function(){$.Widget.prototype.destroy.call(this);return this},id:function(){return this.element[0].id}});$.extend($.ui.igChartLegend,{version:"19.2.20192.315"});$.ig.ChartCommon=$.ig.ChartCommon||{};$.extend($.ig.ChartCommon,{_isCanvasSupported:function(){var canvas=document.createElement("canvas");return!!(canvas.getContext&&canvas.getContext("2d"))},_renderUnsupportedBrowser:function(chart){if(chart._trigger(chart.events.browserNotSupported)){var container=$("<div></div>").addClass(chart.css.unsupportedBrowserClass).appendTo(chart.element),ul,browserUnsupported;if($.ig.util.isIE){browserUnsupported="Internet Explorer "+$.ig.util.browserVersion}else if($.ig.util.isOpera){browserUnsupported="Opera "+$.ig.util.browserVersion}else if($.ig.util.isWebKit){browserUnsupported="Webkit "+$.ig.util.browserVersion}else if($.ig.util.isFF){browserUnsupported="Mozilla Firefox "+$.ig.util.browserVersion}else{browserUnsupported=$.ig.util.browserVersion}$("<div></div>").addClass("ui-chart-current-browser-label").html($.ig.Chart.locale.currentBrowser.replace("{0}",browserUnsupported)).appendTo(container);$("<div></div>").addClass("ui-chart-non-html5-text").html($.ig.Chart.locale.unsupportedBrowser).appendTo(container);ul=$("<ul></ul>").addClass("ui-chart-browsers-list").appendTo(container);$("<a></a>").attr("href",$.ig.Chart.locale.chromeDownload).attr("target","_blank").addClass("ui-chart-chrome-icon").html($.ig.Chart.locale.chrome8).appendTo($("<li></li>").addClass("ui-corner-all").appendTo(ul));$("<a></a>").attr("href",$.ig.Chart.locale.firefoxDownload).attr("target","_blank").addClass("ui-chart-firefox-icon").html($.ig.Chart.locale.firefox36).appendTo($("<li></li>").addClass("ui-corner-all").appendTo(ul));$("<a></a>").attr("href",$.ig.Chart.locale.operaDownload).attr("target","_blank").addClass("ui-chart-Opera-icon").html($.ig.Chart.locale.opera11).appendTo($("<li></li>").addClass("ui-corner-all").appendTo(ul));$("<a></a>").attr("href",$.ig.Chart.locale.safariDownload).attr("target","_blank").addClass("ui-chart-safari-icon").html($.ig.Chart.locale.safari5).appendTo($("<li></li>").addClass("ui-corner-all").appendTo(ul));$("<a></a>").attr("href",$.ig.Chart.locale.ieDownload).attr("target","_blank").addClass("ui-chart-ie-icon").html($.ig.Chart.locale.ie9).appendTo($("<li></li>").addClass("ui-corner-all").appendTo(ul));chart.element.addClass("ui-chart-non-html5");chart.element.css("width",chart.options.width);chart.element.css("height",chart.options.height)}},_drawCanvas:function(canvasElemnts,iWidth,iHeight){var oSaveCanvas=document.createElement("canvas");oSaveCanvas.width=iWidth;oSaveCanvas.height=iHeight;oSaveCanvas.style.width=iWidth+"px";oSaveCanvas.style.height=iHeight+"px";var oSaveCtx=oSaveCanvas.getContext("2d");$.each(canvasElemnts,function(i,canvas){oSaveCtx.drawImage(canvas,0,0,iWidth,iHeight)});return oSaveCanvas},_getImage:function(width,height,chart){var expCanvas,imgElement=document.createElement("img");width=width||$("#"+chart.id()+"_chart_container").width();height=height||$("#"+chart.id()+"_chart_container").height();expCanvas=this._drawCanvas($("#"+chart.id()+" canvas"),width,height);imgElement.src=expCanvas.toDataURL("image/png");return imgElement},_renderChartContainer:function(chart){var opt=chart.options,chartElement;if(!chart._isRendered){chartElement=$("<div id='"+chart.id()+"_chart_container'></div>").appendTo(chart.element);chartElement.addClass(chart.css.chart);chartElement.css("width",opt.width);chartElement.css("height",opt.height);chart._chart.provideContainer(chartElement);chart._chartElement=chartElement}},_setLegend:function(item,value){if(item.legend()===null){if(!$("#"+value.element).data("igChartLegend")){$("#"+value.element).igChartLegend(value)}item.legend($("#"+value.element).igChartLegend("getLegend"))}else{$("#"+item.legend().name()).igChartLegend(value)}},_containerSourceID:null,_initDataOptions:function(chart,options,callBack){if(options.dataSourceUrl){options.dataSource=options.dataSourceUrl}chart._containerSourceID=chart.id();var dataOptions={id:options.name||chart._containerSourceID,rowAdded:chart._itemAdded,rowDeleted:chart._itemRemoved,rowUpdated:chart._itemUpdated,rowInserted:chart._itemInserted,callback:callBack,callee:chart,responseDataKey:options.responseDataKey,primaryKey:options.primaryKey,responseTotalRecCountKey:options.responseTotalRecCountKey,dataSource:options.dataSource};if(options.dataSourceType!==null){dataOptions.type=options.dataSourceType}return dataOptions},_setupDataSource:function(chart,options,callback){var dataOptions=this._initDataOptions(chart,options,callback);if(typeof chart.dataSources==="undefined"){chart.dataSources={}}if(!(dataOptions.dataSource instanceof $.ig.DataSource)){if($.type(dataOptions.dataSource)==="string"&&dataOptions.dataSource.indexOf("$callback=?")!==-1){chart.dataSources[dataOptions.id]=new $.ig.JSONPDataSource(dataOptions)}else{chart.dataSources[dataOptions.id]=new $.ig.DataSource(dataOptions)}}else{chart.dataSources[dataOptions.id]=dataOptions.dataSource;dataOptions.dataSource=chart.dataSources[dataOptions.id].settings.dataSource;if(chart.dataSources[dataOptions.id].settings.responseDataKey!==null){delete dataOptions.responseDataKey;
if(dataOptions.schema){dataOptions.schema.searchField=chart.dataSource.settings.responseDataKey}}chart.dataSources[dataOptions.id].settings=this._mergeDataSourceSettings(chart.dataSources[dataOptions.id].settings,dataOptions);if(dataOptions.schema){chart.dataSources[dataOptions.id]._initSchema()}}},_mergeDataSourceSettings:function(s1,s2){if(!s1){return s2}if(!s2){return null}var source1=s1.dataSource,source2=s2.dataSource,newSettings;if(source1&&($.type(source1)==="array"||$.type(source1)==="object")){s1.dataSource=null}if(source2&&($.type(source2)==="array"||$.type(source2)==="object")){s2.dataSource=null}newSettings=$.extend(true,{},s1,s2);if(source2&&($.type(source2)==="array"||$.type(source2)==="object")){s2.dataSource=source2;newSettings.dataSource=source2}else if(source1&&($.type(source1)==="array"||$.type(source1)==="object")){s1.dataSource=source1}if(!source2&&typeof source2!=="undefined"){newSettings.dataSource=null}return newSettings},_mergeIntoWithDataSource:function(o1,o2){var ds1,ds2,setToNull,s1=null,s2=null;if(o1.dataSource){ds1=o1.dataSource}if(o2.dataSource){ds2=o2.dataSource}setToNull=false;if(!o2.dataSource&&typeof o2.dataSource!=="undefined"){setToNull=true}o1.dataSource=null;o2.dataSource=null;$.extend(true,o1,o2);if(ds1){o1.dataSource=ds1}if(ds2){o2.dataSource=ds2;o1.dataSource=ds2}if(o1.dataSource){if(o1.dataSource&&o1.dataSource.settings){s1=o1.dataSource.settings}if(o2.dataSource&&o2.dataSource.settings){s2=o2.dataSource.settings}o1.dataSource.settings=this._mergeDataSourceSettings(s1,s2)}},_mergeIntoNewWithDataSource:function(o1,o2){var ds1,ds2,setToNull,newObj,s1=null,s2=null;if(o1.dataSource){ds1=o1.dataSource}if(o2.dataSource){ds2=o2.dataSource}setToNull=false;if(!o2.dataSource&&typeof o2.dataSource!=="undefined"){setToNull=true}o1.dataSource=null;o2.dataSource=null;newObj=$.extend(true,{},o1,o2);if(ds1){o1.dataSource=ds1;newObj.dataSource=ds1}if(ds2){o2.dataSource=ds2;newObj.dataSource=ds2}if(newObj.dataSource){if(o1.dataSource&&o1.dataSource.settings){s1=o1.dataSource.settings}if(o2.dataSource&&o2.dataSource.settings){s2=o2.dataSource.settings}newObj.dataSource.settings=this._mergeDataSourceSettings(s1,s2)}return newObj},_addTooltip:function(chart,series,clss){if(typeof chart._tooltip[series.name()]==="undefined"){chart._tooltip[series.name()]=$('<div id="'+chart.id()+'_tooltip" class="'+clss+'"></div>')}this._bindTooltipEvents(chart,chart._tooltip[series.name()]);series.toolTip(chart._tooltip[series.name()])},_bindTooltipEvents:function(chart,tooltip){tooltip.updateToolTip=$.ig.Delegate.prototype.combine(tooltip.updateToolTip,$.proxy(this._fireToolTip_updateToolTip,chart));tooltip.hideToolTip=$.ig.Delegate.prototype.combine(tooltip.hideToolTip,$.proxy(this._fireToolTip_hideToolTip,chart))},_fireToolTip_updateToolTip:function(args){var e={},noCancel,template;e=this._getChartEvt(args);e.element=null;if(e.series!==null){e.element=this._tooltip[e.series.name]}noCancel=this._trigger(this.events.tooltipShowing,null,e);if(e===null){noCancel=false}if(noCancel){template=this._tooltipTemplate;if(e.series!==null&&typeof this._tooltipTemplates[e.series.name]!=="undefined"){template=this._tooltipTemplates[e.series.name]}if(template){this._tooltip[e.series.name].children().remove();$.tmpl(template,e).appendTo(this._tooltip[e.series.name])}if(args.hideOthers){$.each(this._tooltip,function(i,tip){tip.hide()})}this._tooltip[e.series.name].show();this._trigger(this.events.tooltipShown,null,e)}},_fireToolTip_hideToolTip:function(args){var e={},noCancel;e=this._getChartEvt(args);e.element=null;if(e.series!==null){e.element=this._tooltip[e.series.name]}noCancel=this._trigger(this.events.tooltipHiding,null,e);if(noCancel){$.each(this._tooltip,function(i,tip){tip.hide()});this._trigger(this.events.tooltipHidden,null,e)}}});return $.ui.igDataChart});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});
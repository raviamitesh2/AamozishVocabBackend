/*!@license
* Infragistics.Web.ClientUI infragistics.datachart_verticalcategory.js 19.2.20192.315
*
* Copyright (c) 2011-2020 Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends:
*     jquery-1.4.4.js
*     jquery.ui.core.js
*     jquery.ui.widget.js
*     infragistics.util.js
*     infragistics.ext_core.js
*     infragistics.ext_collections.js
*     infragistics.dv_core.js
*     infragistics.dv_geometry.js
*     infragistics.datachart_category.js
*     infragistics.datachart_categorycore.js
*     infragistics.datachart_core.js
*     infragistics.ext_ui.js
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections","./infragistics.dv_core","./infragistics.dv_geometry","./infragistics.datachart_category","./infragistics.datachart_categorycore","./infragistics.datachart_core","./infragistics.ext_ui"],factory)}else{factory(igRoot)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$i=$$t;$$0=$.ig.globalDefs.$$0;$$4=$.ig.globalDefs.$$4;$$1=$.ig.globalDefs.$$1;$$w=$.ig.globalDefs.$$w;$$r=$.ig.globalDefs.$$r;$$f=$.ig.globalDefs.$$f;$$g=$.ig.globalDefs.$$g;$$j=$.ig.globalDefs.$$j;$$6=$.ig.globalDefs.$$6;$$a=$.ig.globalDefs.$$a;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine(["CategoryYAxis:a","BarSeries:e","BarBucketCalculator:f","IBarSeries:g","CategoryYAxisView:i","BarSeriesView:j"]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.defEnum,$e=$.ig.util.getBoxIfEnum,$f=$.ig.util.getDefaultValue,$g=$.ig.util.getEnumValue,$h=$.ig.util.getValue,$i=$.ig.util.intSToU,$j=$.ig.util.nullableEquals,$k=$.ig.util.nullableIsNull,$l=$.ig.util.nullableNotEquals,$m=$.ig.util.toNullable,$n=$.ig.util.toString$1,$o=$.ig.util.u32BitwiseAnd,$p=$.ig.util.u32BitwiseOr,$q=$.ig.util.u32BitwiseXor,$r=$.ig.util.u32LS,$s=$.ig.util.unwrapNullable,$t=$.ig.util.wrapNullable,$u=String.fromCharCode,$v=$.ig.util.castObjTo$t,$w=$.ig.util.compareSimple,$x=$.ig.util.tryParseNumber,$y=$.ig.util.tryParseNumber1,$z=$.ig.util.numberToString,$0=$.ig.util.numberToString1,$1=$.ig.util.parseNumber;$c("CategoryYAxis:a","CategoryAxisBase",{a1:function(){return new $$t.i(this)},gs:function(a){$.ig.CategoryAxisBase.prototype.gs.call(this,a);this._kx=a},_kx:null,isVertical:function(){return true},dv:function(){return this.i1().height()},getCategoryBoundingBox:function(a,b,c){return this.getCategoryBoundingBoxHelper(a,b,c,true)},kw:function(a){if($b($$4.$x.$type.specialize(Array),a)!==null){return a.asArray()}return null},getScaledBucketValueList:function(a,b,c,d,e){var f;var g=e.e;var h=e.d;var i=e.c;var j=e.a;var k=!i.isEmpty();var l=this.categoryMode()==0?this.jy-1:this.jy;if(l<0){l=0}var m=i.top();var n=i.height();var o=g.top();var p=g.height();var q=h.top();var r=h.height();var s=0;var t=1;var u=this.kw(a);var v=false;if(u!=null){v=true}var w;for(var x=0;x<b.count();x++){w=b.item(x);for(var y=c;y<d;y++){if(v){f=u[y]}else{f=a.item(y)}if(k){var z=l>=1?f[w]/l:l==0?.5:NaN;if(!j){z=1-z}z=m+n*(z-s)/t;var aa=(z-o*r)/p;f[w]=aa}else{var ab=l>=1?f[w]/l:l==0?.5:NaN;if(!j){ab=1-ab}ab=q+r*(ab-o)/p;f[w]=ab}}}},init:function(){this.k6=1;this.k5=1;$.ig.CategoryAxisBase.prototype.init.call(this);this._jm=new $$4.x(Number,0);this._ab=$$t.$a.$type},interval:function(a){if(arguments.length===1){this.h($$t.$a.intervalProperty,a);return a}else{return this.c($$t.$a.intervalProperty)}},ky:0,actualInterval:function(a){if(arguments.length===1){if(this.actualInterval()!=a){var b=this.ky;this.ky=a;this.g0("ActualInterval",b,this.actualInterval())}return a}else{return this.ky}},d7:function(){return this.actualInterval()},minorInterval:function(a){if(arguments.length===1){this.h($$t.$a.minorIntervalProperty,a);return a}else{return this.c($$t.$a.minorIntervalProperty)}},k0:0,actualMinorInterval:function(a){if(arguments.length===1){if(this.actualMinorInterval()!=a){var b=this.k0;this.k0=a;this.g0("ActualMinorInterval",b,this.actualMinorInterval())}return a}else{return this.k0}},k6:0,k8:function(a){if(arguments.length===1){this.k6=a;return a}else{return this.k6}},k5:0,k7:function(a){if(arguments.length===1){this.k5=a;return a}else{return this.k5}},getScaledValue:function(a,b){if(!b.c.isEmpty()){var c=this.k2(a,$.ig.NumericScaler.prototype.ac,b.c);c=(c-b.d.top())/b.d.height();c=b.d.top()+b.d.height()*(c-b.e.top())/b.e.height();return c}return this.k2(a,b.e,b.d)},k2:function(a,b,c){var d=this.categoryMode()==0?this.jy-1:this.jy;if(d<0){d=0}var e=d>=1?a/d:d==0?.5:NaN;if(!this._b9){e=1-e}return c.top()+c.height()*(e-b.top())/b.height()},getUnscaledValue:function(a,b){if(!b.c.isEmpty()){var c=b.e.top()+b.e.height()*(a-b.d.top())/b.d.height();c=c*b.d.height()+b.d.top();c=this.getUnscaledValue3(c,$.ig.NumericScaler.prototype.ac,b.c,this.categoryMode());return c}return this.getUnscaledValue3(a,b.e,b.d,this.categoryMode())},d0:function(a,b,c){if(!b.c.isEmpty()){var d=b.e.top()+b.e.height()*(a-b.d.top())/b.d.height();d=d*b.d.height()+b.d.top();d=this.getUnscaledValue3(d,$.ig.NumericScaler.prototype.ac,b.c,c);return d}return this.getUnscaledValue3(a,b.e,b.d,c)},getUnscaledValue3:function(a,b,c,d){var e=b.top()+(a-c.top())*b.height()/c.height();if(!this._b9){e=1-e}var f=d==0?this.jy-1:this.jy;if(f<0){f=0}return e*f},scrollRangeIntoView:function(a,b){if(a==NaN||b==NaN||this.jf()==null||this.jf().count()==0){return}var c=a/this.jf().count();var d=b/this.jf().count();this.seriesViewer().windowRect(new $$a.ae(0,this.seriesViewer().windowRect().x(),1-d,this.seriesViewer().windowRect().width(),d-c))},as:function(){return new $.ig.VerticalAxisLabelPanel},dj:function(){return this.interval()},getCategorySize:function(a,b,c){var d=this.iz(b,c);return d.height()/(this.jy*a.height())},jr:function(a,b,c){var d=0;if(!$.ig.util.isNaN(this.gap())){d=$.ig.MathUtil.prototype.b(this.gap(),0,1)}var e=0;if(!$.ig.util.isNaN(this.overlap())){e=Math.min(this.overlap(),1)}var f=1-.5*d;var g=this.getCategorySize(a,b,c)*f/(this.j1()-(this.j1()-1)*e);return g},getGroupCenter:function(a,b,c,d){var e=.5;if(this.j1()>1){var f=0;if(!$.ig.util.isNaN(this.gap())){f=$.ig.MathUtil.prototype.b(this.gap(),0,1)}var g=0;if(!$.ig.util.isNaN(this.overlap())){g=Math.min(this.overlap(),1)}var h=1-.5*f;var i=h/(this.j1()-(this.j1()-1)*g);var j=(h-i)/(this.j1()-1);e=.25*f+.5*i+a*j}return this.getCategorySize(b,c,d)*e},scrollIntoView:function(a){var b=this.seriesViewer()!=null?this.seriesViewer().actualWindowRect():$$a.$ae.empty();b=b.copy();var c=this.i1();var d=new $$a.ae(0,0,0,1,1);var e=this.iy();var f=new $.ig.ScalerParams(0,d,d,this.isInverted(),e);var g=!b.isEmpty()&&!c.isEmpty()&&this.jf()!=null?this.jf().indexOf(a):-1;var h=g>-1?this.getScaledValue(g,f):NaN;if(!$.ig.util.isNaN(h)&&this.seriesViewer().c0()){if(!$.ig.util.isNaN(h)){if(h<b.top()+.1*b.height()){h=h+.4*b.height();b.y(h-.5*b.height())}if(h>b.bottom()-.1*b.height()){h=h-.4*b.height();b.y(h-.5*b.height())}}this.seriesViewer().km(b,false,true)}},cn:function(){if(this.cg()&&this.useEnhancedIntervalManagement()){this._a9=this.a8()}if(this.jf()==null){return false}var a=this.jf().count();if(a!=this.k7()){var b=new $.ig.AxisRangeChangedEventArgs(0,1,1,this.k7(),a);this.k7(a);this.g1(b);return true}return false},ji:function(a){if(a==null){return false}var b=this.bb();if(b==null){return false}return b.synchronizeVertically()},g7:function(a){$.ig.CategoryAxisBase.prototype.g7.call(this,a);var b=this.seriesViewer()!=null?this.seriesViewer().actualWindowRect():$$a.$ae.empty();var c=this.i1();var d=this.iw();var e=this.iv();var f=new $.ig.ScalerParams(0,b,c,this.isInverted(),d);var g=this._a2.ay();var h=this._a2.a1();var i=this._a2.az();var j=this._a2.a0();var k=this._a2.e();var l=this._a2.f();var m=this._a2.g();this.he();this.gi(g);this.gi(h);this.gi(i);this.gi(j);this._cv.clear();this._cw.clear();this._jm.clear();this._a2.at(this,b,c);if(b.isEmpty()||c.isEmpty()){this._bo.count(0);this._bn.count(0);this._bm.count(0)}if(this._bo.count()==0&&this._bn.count()==0){this._a2.y()}if(this.labelSettings()!=null){this.labelSettings().registerAxis(this)}if(this.itemsSource()==null||this.jf()==null||this.jf().count()==0){this._bo.count(0);this._bn.count(0);this._bm.count(0);this._a2.y();return}if(!b.isEmpty()&&!c.isEmpty()){var n=this.getUnscaledValue(e.top(),f);var o=this.getUnscaledValue(e.bottom(),f);if(!this.isInverted()){n=Math.ceil(n);o=Math.floor(o)}else{n=Math.floor(n);o=Math.ceil(o)}var p=c.left();var q=0;if(this.crossingAxis()!=null){var r=$b($.ig.NumericXAxis.prototype.$type,this.crossingAxis());if(r!=null){var s=this.ha(p,q,b,c,d,c.left(),c.right());p=s.p0;q=s.p1}}this.hf(g,p,c,k,true);this._a2.ao(q);var t=Math.min(n,o);var u=Math.max(n,o);var v=new $.ig.LinearCategorySnapper(1,t,u,e.height(),this.interval(),this.categoryMode(),this.d9());var w=Math.floor((t-0)/v._g);var x=Math.ceil((u-0)/v._g);if(!$.ig.util.isNaN(w)&&!$.ig.util.isNaN(x)){var y=$.ig.truncate(w);var z=$.ig.truncate(x);var aa=this.getScaledValue(0+y*v._g,f);var ab=Math.abs(this.getScaledValue(v._g,f)-this.getScaledValue(0,f));this._at._bn=this.getScaledValue(v._g,f);for(var ac=y;ac<=z;++ac){var ad=this.getScaledValue(0+(ac+1)*v._g,f);if(aa<=e.bottom()){if(ac%2==0){this.gr(h,aa,ad,c)}this.gq(i,aa,c,l,false);this._jm.add(aa)}if(this.categoryMode()!=0&&this.j1()!=0&&this._cj){if(this.minorInterval()>0&&this.minorInterval()<v._g){var ae=ab*this.minorInterval();if(!this.isInverted()){var af=aa;while(af-ae>ad){af-=ae;if(Math.abs(af-ad)<1e-4){break}this.gq(j,af,c,m,false)}}else{var ag=aa;while(ag+ae<ad){ag+=ae;if(Math.abs(ag-ad)<1e-4){break}this.gq(j,ag,c,m,false)}}this.actualMinorInterval(this.minorInterval())}else{for(var ah=0;ah<$.ig.truncate(v._g);ah++){for(var ai=0;ai<this.j1();ai++){var aj=this.getGroupCenter(ai,b,c,d);if(!this.isInverted()){aj=-aj}var ak=this.getScaledValue(ah+ac*v._g,f)+aj;this.gq(j,ak,c,m,false)}}this.actualMinorInterval(.5)}}var al=aa;if(this.categoryMode()!=0){var am=this.getScaledValue(ac*v._g+1,f);al=(aa+am)/2}if(al<=e.bottom()&&al>=e.top()){var an=0;if(v._g>=1){an=ac*$.ig.truncate(Math.floor(v._g))}else{if(ac*v._g*2%2==0){an=$.ig.truncate(Math.floor(ac*v._g))}else{an=-1}}if(this.jf()!=null&&an<this.jf().count()&&an>=0){var ao=this.jf().item(an);var ap=this.e6(ao);if(!$.ig.util.isNaN(al)&&!Number.isInfinity(al)&&ap!=null){if(typeof ap==="string"&&ap.equals("")){}else{this._cv.add1(ap);this._cw.add(new $.ig.LabelPosition(al))}}}}aa=ad}}this.actualInterval(v._g);if((this.labelSettings()==null||this.labelSettings().visibility()==0)&&this.crossingAxis()!=null){if(this.labelSettings()!=null&&(this.labelSettings().location()==6||this.labelSettings().location()==7)){this.seriesViewer().ht()}}this._a2.au(this._cv,this._cw);this.km()}},az:function(){return 1},$type:new $.ig.Type("CategoryYAxis",$.ig.CategoryAxisBase.prototype.$type)},true);$c("BarFramePreparer:b","CategoryFramePreparer",{init:function(a,b){if(a>0){switch(a){case 1:this.init1.apply(this,arguments);break}return}$$t.$b.init1.call(this,1,b,$b($.ig.ISupportsMarkers.prototype.$type,b),$b($.ig.IProvidesViewport.prototype.$type,b),$b($.ig.ISupportsErrorBars.prototype.$type,b),$b($.ig.IBucketizer.prototype.$type,b))},init1:function(a,b,c,d,e,f){$.ig.CategoryFramePreparer.prototype.init1.call(this,1,b,c,d,e,f);this._aa=new $.ig.DefaultCategoryTrendlineHost;if($b($.ig.IHasCategoryTrendline.prototype.$type,b)!==null){this._aa=$b($.ig.IHasCategoryTrendline.prototype.$type,b)}this._ab=new $.ig.DefaultSingleValueProvider;if($b($.ig.IHasSingleValueCategory.prototype.$type,b)!==null){this._ab=$b($.ig.IHasSingleValueCategory.prototype.$type,b)}},l:function(a,b,c,d,e,f){var g=b[1];var h=b[0];var i=new $$a.ae(0,g-5,h-5,11,11);if(!$.ig.util.isNaN(g)&&!$.ig.util.isNaN(h)&&!Number.isInfinity(g)&&!Number.isInfinity(h)&&c.tryAdd(i)){a.m.add({__x:g,__y:h,$type:$$a.$y.$type,getType:$.ig.$op.getType,getGetHashCode:$.ig.$op.getGetHashCode,typeName:$.ig.$op.typeName});this._c.updateMarkerTemplate(e,d,f);return true}return false},w:function(a,b,c){if(this._aa.trendLineType()==0||this._aa.trendlinePreparer()==null||this._aa.trendLinePeriod()<1){return}var d=a._k;var e=new $.ig.ScalerParams(0,a._m,a._l,a._b.isInverted(),d);var f=new $.ig.ScalerParams(0,a._m,a._l,a._c.isInverted(),d);var g=b._f;if(a._d!=null&&a._d.sortedIndices()!=null){g=new $.ig.SafeSortedReadOnlyDoubleCollection(0,g,a._d.sortedIndices())}var h=function(){var $ret=new $.ig.TrendResolutionParams;$ret._c=a._h;$ret._d=a._i;$ret._e=a._j;$ret._a=c;$ret._b=a._g;$ret._f=a._l;return $ret}();if(this._aa.trendLineType()!=0){this._aa.trendlinePreparer().prepareLineCore(a._a.p,this._aa.trendLineType(),g,this._aa.trendLinePeriod(),function(i){return a._c.getScaledValue(i,f)},function(i){return a._b.getScaledValue(i,e)},h)}},$type:new $.ig.Type("BarFramePreparer",$.ig.CategoryFramePreparer.prototype.$type)},true);$c("BarTrendFitCalculator:c","Object",{init:function(){$.ig.$op.init.call(this)},a:function(a,b,c,d,e,f,g,h,i,j,k){if(d==null){switch(b){case 1:d=$.ig.LeastSquaresFit.prototype.k(e,g,f);break;case 2:d=$.ig.LeastSquaresFit.prototype.o(e,g,f);break;case 3:d=$.ig.LeastSquaresFit.prototype.i(e,g,f);break;case 4:d=$.ig.LeastSquaresFit.prototype.p(e,g,f);break;case 5:d=$.ig.LeastSquaresFit.prototype.q(e,g,f);break;case 7:d=$.ig.LeastSquaresFit.prototype.j(e,g,f);break;case 6:d=$.ig.LeastSquaresFit.prototype.l(e,g,f);break;case 8:d=$.ig.LeastSquaresFit.prototype.n(e,g,f);break;default:throw new $$6.q(0)}}if(d==null){return null}for(var l=0;l<c._f.height();l+=2){var m=l/(c._f.height()-1);var n=j+m*(k-j);var o=NaN;switch(b){case 1:o=$.ig.LeastSquaresFit.prototype.ad(d,n);break;case 2:o=$.ig.LeastSquaresFit.prototype.ah(d,n);break;case 3:o=$.ig.LeastSquaresFit.prototype.ab(d,n);break;case 4:o=$.ig.LeastSquaresFit.prototype.ai(d,n);break;case 5:o=$.ig.LeastSquaresFit.prototype.aj(d,n);break;case 7:o=$.ig.LeastSquaresFit.prototype.ac(d,n);break;case 6:o=$.ig.LeastSquaresFit.prototype.ae(d,n);break;case 8:o=$.ig.LeastSquaresFit.prototype.ag(d,n);break;default:throw new $$6.q(0)}o=h(o);n=i(n);if(!$.ig.util.isNaN(o)&&!Number.isInfinity(o)){a.add({__x:o,__y:n+c._a,$type:$$a.$y.$type,getType:$.ig.$op.getType,getGetHashCode:$.ig.$op.getGetHashCode,typeName:$.ig.$op.typeName})}}return d},$type:new $.ig.Type("BarTrendFitCalculator",$.ig.$ot)},true);$c("BarTrendLineManager:d","CategoryTrendLineManager",{init:function(){$.ig.CategoryTrendLineManager.prototype.init.call(this)},prepareLineCore:function(a,b,c,d,e,f,g){var h=g._d*g._c;var i=g._e*g._c;var j=new $$4.x($$a.$y.$type,0);if(b==0){this._a=null;this.trendColumn().clear();return}if(this.c(b)){this.trendColumn().clear();this._a=$$t.$c.a(j,b,g,this._a,c.count(),function(k){return c.item(k)},function(k){return k+1},e,function(k){return f(k-1)},h+1,i+1)}if(this.b(b)){this._a=null;$.ig.TrendAverageCalculator.prototype.b(b,this.trendColumn(),c,d);for(var k=g._d;k<=g._e;k+=1){var l=k*g._c;if(l>=0&&l<this.trendColumn().count()){var m=e(this.trendColumn().__inner[l]);var n=f(l);j.add({__x:m,__y:n+g._a,$type:$$a.$y.$type,getType:$.ig.$op.getType,getGetHashCode:$.ig.$op.getGetHashCode,typeName:$.ig.$op.typeName})}}}this.m(j,g,a)},$type:new $.ig.Type("BarTrendLineManager",$.ig.CategoryTrendLineManager.prototype.$type)},true);$c("VerticalAnchoredCategorySeries:h","AnchoredCategorySeries",{init:function(){$.ig.AnchoredCategorySeries.prototype.init.call(this)},xAxis:function(a){if(arguments.length===1){this.h($$t.$h.xAxisProperty,a);return a}else{return this.c($$t.$h.xAxisProperty)}},yAxis:function(a){if(arguments.length===1){this.h($$t.$h.yAxisProperty,a);return a}else{return this.c($$t.$h.yAxisProperty)}},ht:function(){$.ig.AnchoredCategorySeries.prototype.ht.call(this);this.xAxis(null);this.yAxis(null)},pz:null,p0:function(){var $self=this;if(this.pz==null){this.pz=$.ig.DVContainer.prototype.instance().createInstance($.ig.IVerticalAnchoredCategorySeriesInteractionManager.prototype.$type,function(){return $self.b2().n()})}return this.pz},isVertical:function(){return true},m6:function(){return this.yAxis()},nq:function(){return this.xAxis()},getOffsetValue:function(){return this._nb.r(this.m6(),this.view().bs(),this.view().br(),this.getEffectiveViewport1(this.view()))},getCategoryWidth:function(){return this.yAxis().getCategorySize(this.view().bs(),this.view().br(),this.getEffectiveViewport1(this.view()))},getNextOrExactIndex:function(a,b){return this.fd(a,b,this.m6(),this.n5.runOn(this),this.valueColumn())},getPreviousOrExactIndex:function(a,b){return this.ff(a,b,this.m6(),this.n5.runOn(this),this.valueColumn())},d9:function(a,b,c,d,e){if(this.valueColumn()==null){return Number.POSITIVE_INFINITY}return this.ea(a,b,this.yAxis(),d,e,this.valueColumn().count(),this.n5.runOn(this))},bd:function(){if(this.hitTestMode()==0){return 1}else{return $.ig.AnchoredCategorySeries.prototype.bd.call(this)}},getSeriesValueMarkerBoundingBox:function(a){if(!this.hasMarkers()||!this.l3()){return $$a.$ae.empty()}return this.p0().getSeriesValueMarkerBoundingBox(this,this.m7.m,a,this.p8.runOn(this))},p8:function(a){return this._oy.c5(a)},testHit:function(a,b){if(this.dg(a,b)){return true}if(this.l4(a,b)){return true}return false},getSeriesValue:function(a,b,c){if(this.seriesViewer()==null){return NaN}var d=this.getEffectiveViewport1(this.view());var e=this.m6();var f=new $.ig.ScalerParams(0,this.seriesViewer().actualWindowRect(),this.view().br(),e.isInverted(),d);var g=this._nb.r(e,this.seriesViewer().actualWindowRect(),this.view().br(),d);return this.ep(this.valueColumn(),a,e,f,g,this.n5.runOn(this),b,c)},getSeriesValuePosition:function(a,b,c){var d=this.m6();return this.ln(a,b,c,this._nb.r(d,this.view().bs(),this.view().br(),this.getEffectiveViewport1(this.view())),this.nq(),d,null,null,null)},m4:function(){return this.xAxis()},m5:function(){return this.yAxis()},pg:function(a){this.xAxis($b($.ig.NumericXAxis.prototype.$type,a))},ph:function(a){this.yAxis($b($$t.$a.$type,a))},n1:function(){return this.xAxis()!=null&&this.xAxis().updateRange()},getCategoryItems:function(a,b){return this.ov(a,b,this.yAxis())},getExactItemIndex:function(a){return this.p0().getExactItemIndex(this,a)},n5:function(a){return this.ed(a,this.m6())},getItemIndex:function(a){return $.ig.truncate(Math.round(this.getExactItemIndex(a)))},getItem:function(a){var b=this.getItemIndex(a);return b>=0&&this.bz()!=null&&b<this.bz().count()?this.bz().item(b):null},iz:function(a,b,c,d){$.ig.AnchoredCategorySeries.prototype.iz.call(this,a,b,c,d);switch(b){case"XAxis":if(c!=d){this.hz($b($.ig.Axis.prototype.$type,c));this.i4($b($.ig.Axis.prototype.$type,d));this._nf._cn.g(this.resolution());this.renderSeries(false);this.ik()}break;case"YAxis":if(c!=d){this.hz($b($.ig.Axis.prototype.$type,c));this.i4($b($.ig.Axis.prototype.$type,d));this._nf._cn.g(this.resolution());this.n1();this.renderSeries(false);this.ik()}break;case"TrendLineType":var e=$g(d);if(e!=0){this._oy.cy($.ig.CategoryTrendLineManagerFactory.prototype.a(this._oy.cy(),this.yAxis(),this.rootCanvas(),this,this.b2()))}break}},canUseAsYAxis:function(a){if($b($$t.$a.$type,a)!==null){return true}return false},canUseAsXAxis:function(a){if($b($.ig.NumericXAxis.prototype.$type,a)!==null){return true}return false},$type:new $.ig.Type("VerticalAnchoredCategorySeries",$.ig.AnchoredCategorySeries.prototype.$type)},true);$c("IBarSeries:g","Object",{$type:new $.ig.Type("IBarSeries",null)},true);$c("BarSeries:e","VerticalAnchoredCategorySeries",{bf:function(){return new $$t.j(this)},ng:function(){return 1},getHostReferenceValue:function(){return this.eh()},iu:function(a){$$t.$h.iu.call(this,a);this._p9=a},_p9:null,nv:function(){return true},getSeriesValueBoundingBox:function(a){if(this.xAxis()==null||this.yAxis()==null||this.m7.f.count()==0){return $$a.$ae.empty()}var b=this.view().bs();var c=this.view().br();var d=this.getEffectiveViewport1(this.view());var e=new $.ig.ScalerParams(0,b,c,this.xAxis().isInverted(),d);var f=this.fromWorldPosition(a);var g=this.getPreviousOrExactIndex(a,true);var h=this.getNextOrExactIndex(a,true);var i=$.ig.truncate(Math.floor(g/this.n7(this.view())));var j=$.ig.truncate(Math.floor(h/this.n7(this.view())));var k=i-this.n8(this.view());var l=j-this.n8(this.view());if(k<0){k=0}if(k>this.m7.f.count()-1){k=this.m7.f.count()-1}if(l<0){l=0}if(l>this.m7.f.count()-1){l=this.m7.f.count()-1}var m=this.m7.f.__inner[k];var n=this.m7.f.__inner[l];var o=Math.abs(f.__y-m[0]);var p=Math.abs(f.__y-n[0]);var q=this.o7(this._nf);var r=this.yAxis().jr(b,c,d);if(o<p){var s=m[0]-.5*r;var t=m[1];var u=q;return new $$a.ae(0,Math.min(u,t),s,Math.max(u,t)-Math.min(u,t),r)}else{var v=n[0]-.5*r;var w=n[1];var x=q;return new $$a.ae(0,Math.min(x,w),v,Math.max(x,w)-Math.min(x,w),r)}},testHit:function(a,b){if(this.dk(a,b)){return true}if(this.l4(a,b)){return true}return false},init:function(){$$t.$h.init.call(this);this._ab=$$t.$e.$type;this._nb=new $$t.b(1,this,this._p9,this,this,this._p9._cn)},nc:function(a){var b=$b($.ig.CategorySeriesView.prototype.$type,a);if(b!=null&&b.isThumbnailView()){if(b.isAlternateView()){return new $$t.b(1,this,$b($.ig.ISupportsMarkers.prototype.$type,b),b,this,b._cn)}else{return new $$t.b(1,this,$b($.ig.ISupportsMarkers.prototype.$type,b),this.seriesViewer()._bn._m,this,b._cn)}}else{return this._nb}},ac:function(){$$t.$h.ac.call(this)},radiusX:function(a){if(arguments.length===1){this.h($$t.$e.radiusXProperty,a);return a}else{return this.c($$t.$e.radiusXProperty)}},radiusY:function(a){if(arguments.length===1){this.h($$t.$e.radiusYProperty,a);return a}else{return this.c($$t.$e.radiusYProperty)}},preferredCategoryMode:function(a){return 2},hv:function(a,b){$$t.$h.hv.call(this,a,b);var c=$b($$t.$j.$type,b);if(a&&c!=null&&c._c7!=null){c._c7.count(0)}},n9:function(){var a=0;var c=this.seriesViewer().series().getEnumerator();while(c.moveNext()){var b=c.current();if(b==this){return a}var d=$b($$t.$g.$type,b);if(d!=null&&d.yAxis()==this.yAxis()&&d.getPreferredCategoryMode()==2){a++}}return-1},o7:function(a){var b=0;var c=a.bs();var d=a.br();var e=this.getEffectiveViewport1(a);if(!c.isEmpty()&&!d.isEmpty()&&this.xAxis()!=null){var f=new $.ig.ScalerParams(0,c,d,this.xAxis().isInverted(),e);b=this.xAxis().getScaledValue(this.xAxis().referenceValue(),f)}return b},an:function(a){if(this.valueColumn()==null||this.valueColumn().count()==0){return null}if(a==this.yAxis()){return new $.ig.AxisRange(0,this.valueColumn().count()-1)}if(a==this.xAxis()){return new $.ig.AxisRange(this.valueColumn().minimum(),this.valueColumn().maximum())}return null},scrollIntoView:function(a){var b=this.view().bs();b=b.copy();var c=this.view().br();var d=new $$a.ae(0,0,0,1,1);var e=!b.isEmpty()&&!c.isEmpty()&&this.bz()!=null?this.bz().indexOf(a):-1;var f=this.ls(this.view());var g=new $.ig.ScalerParams(0,d,d,this.xAxis().isInverted(),f);var h=new $.ig.ScalerParams(0,d,d,this.yAxis().isInverted(),f);var i=this.yAxis()!=null?this.yAxis().getScaledValue(e,h):NaN;var j=this.yAxis()!=null?this._nb.r(this.yAxis(),d,d,f):0;i+=j;var k=this.xAxis()!=null&&this.valueColumn()!=null&&e<this.valueColumn().count()?this.xAxis().getScaledValue(this.valueColumn().item(e),g):NaN;if(!$.ig.util.isNaN(k)){if(k<b.left()+.1*b.width()){k=k+.4*b.width();b.x(k-.5*b.width())}if(k>b.right()-.1*b.width()){k=k-.4*b.width();b.x(k-.5*b.width())}}if(!$.ig.util.isNaN(i)){if(i<b.top()+.1*b.height()){i=i+.4*b.height();b.y(i-.5*b.height())}if(i>b.bottom()-.1*b.height()){i=i-.4*b.height();b.y(i-.5*b.height())}}if(this.syncLink()!=null){this.syncLink().ap(this.seriesViewer(),b,true)}return e>=0},getItemSpan:function(){return this.yAxis().jr(this.view().bs(),this.view().br(),this.getEffectiveViewport1(this.view()))},oo:function(a,b){$$t.$h.oo.call(this,a,b);var c=a.f;if(!b.l()){return}var d=b.bs();var e=b.br();var f=this.getEffectiveViewport1(b);var g=new $.ig.ScalerParams(0,d,e,this.xAxis().isInverted(),f);var h=this.yAxis();var i=new $.ig.ScalerParams(0,d,e,this.yAxis().isInverted(),f);var j=this.xAxis();var k=j.getScaledValue(j.referenceValue(),g);var l=this.yAxis().jr(d,e,f);var m=$b($$t.$j.$type,b);if($.ig.util.isNaN(l)||Number.isInfinity(l)||$.ig.util.isNaN(k)){m._c7.count(0);return}this.ne.x(this,this.nz(),this.yAxis(),this.getCategoryItems.runOn(this),this.n7(b),this.n8(b));this.ne.p=this.radiusX();this.ne.q=this.radiusY();this.ne.j=this.radiusX();this.ne.k=this.radiusY();var n=false;var o=this.ne._c;if(o!=null){n=true}var p=this.xAxis().isSorting();var q=this.valueColumn().count();for(var r=0;r<c.count();++r){var s=c.__inner[r][0]-.5*l;var t=c.__inner[r][1];var u=k;u=Math.max(u,-100);t=Math.min(t,e.right()+100);var v=m._c7.item(r);v.height(l);v.width(Math.abs(t-u));if(n){this.ok(c,r,q,h,i,b.isThumbnailView())}this.ne.ae(v,false,false,false,false);v.am(this.ne.j);v.an(this.ne.k);m.dc(v,Math.min(t,u),s)}m._c7.count(c.count());b.updateFrameVersion(a)},hy:function(a,b,c,d){switch(a){case 4:case 1:case 0:this._oy._cn.g(this.resolution());break}if(this._oy.cz()){this._oy.cy().dataUpdated(a,b,c,d)}switch(a){case 4:if(this.xAxis()!=null&&!this.xAxis().updateRange()){this.renderSeries(true)}break;case 1:if(this.xAxis()!=null&&!this.xAxis().updateRange()){this.renderSeries(true)}break;case 0:if(this.xAxis()!=null&&!this.xAxis().updateRange()){this.renderSeries(true)}break;case 2:if(this.valueMemberPath()!=null&&this._oy._cn.d>0){this.renderSeries(true)}break;case 3:if(d==this.valueMemberPath()){if(this.xAxis()!=null&&!this.xAxis().updateRange()){this.renderSeries(true)}}break}},iz:function(a,b,c,d){$$t.$h.iz.call(this,a,b,c,d);switch(b){case"XAxis":if(c!=null){c.deregisterSeries(this)}if(d!=null){d.registerSeries(this)}this._oy._cn.g(this.resolution());if(this.xAxis()!=null&&this.xAxis().updateRange()){this.renderSeries(false)}break;case"YAxis":if(c!=null){c.deregisterSeries(this)}if(d!=null){d.registerSeries(this)}if(this._oy.cz()){this._oy.cy($.ig.CategoryTrendLineManagerFactory.prototype.a(this._oy.cy(),this.yAxis(),this.rootCanvas(),this,this.b2()))}this._oy._cn.g(this.resolution());this.renderSeries(false);break;case"FastItemsSource":if(this.xAxis()!=null&&!this.xAxis().updateRange()){this._oy._cn.g(this.resolution());this.renderSeries(false)}break;case"ValueColumn":if(this.xAxis()!=null&&!this.xAxis().updateRange()){this._oy._cn.g(this.resolution());this.renderSeries(false)}break;case"SeriesViewer":if(c!=null&&d==null){this.hz(this.xAxis());this.hz(this.yAxis())}if(c==null&&d!=null){this.i4(this.xAxis());this.i4(this.yAxis())}this._oy._cn.g(this.resolution());this.renderSeries(false);break}},getPreferredCategoryMode:function(){return this.preferredCategoryMode(this.yAxis())},currentCategoryMode:function(){return this.preferredCategoryMode(this.yAxis())},scaler:function(){return this.yAxis()},yScaler:function(){return this.xAxis()},$type:new $.ig.Type("BarSeries",$$t.$h.$type,[$.ig.IIsCategoryBased.prototype.$type,$$t.$g.$type])},true);$c("BarBucketCalculator:f","CategoryBucketCalculator",{init:function(a){$.ig.CategoryBucketCalculator.prototype.init.call(this,a);this._i=a},_i:null,g:function(a){var b=this._c.bs();var c=this._c.br();var d=this._c._cp.bz();if(b.isEmpty()||c.isEmpty()||this._i._c6.yAxis()==null||d==null||d.count()==0){this.d=0;return}var e=$b($$t.$e.$type,this._c._cp);var f=e.lq(this._c);var g=e.getEffectiveViewport1(this._c);var h=new $.ig.ScalerParams(0,b,c,e.yAxis().isInverted(),g);var i=Math.floor(e.yAxis().d0(f.top(),h,0));var j=Math.ceil(e.yAxis().d0(f.bottom(),h,0));if(!e.yAxis().isInverted()){j=Math.ceil(e.yAxis().d0(f.top(),h,0));i=Math.floor(e.yAxis().d0(f.bottom(),h,0))}var k=Math.floor((j-i+1)*a/f.height());this.d=$.ig.truncate(Math.max(1,k));this.e=$.ig.truncate(Math.max(0,Math.floor(i/this.d)-1));this.f=$.ig.truncate(Math.ceil(j/this.d))},getBucketWithoutUnknowns:function(a){var b=this.h;var c=this.j;var d=a*this.d;var e=d+this.d-1;var f=c-1;d=d<f?d:f;e=e<f?e:f;var g=1.7976931348623157e308;var h=-1.7976931348623157e308;var i=true;for(var j=d;j<=e;++j){var k=b[j];g=g<k?g:k;h=h>k?h:k;Math.max(h,k);i=false}if(!i){return[.5*(d+e),g,h]}return[.5*(d+e),NaN,NaN]},getBucket:function(a){var b=this.h;var c=this.j;var d=a*this.d;var e=d+this.d-1;var f=c-1;d=d<f?d:f;e=e<f?e:f;var g=NaN;var h=NaN;for(var i=d;i<=e;++i){var j=b[i];if(!$.ig.util.isNaN(g)){if(!$.ig.util.isNaN(j)){g=Math.min(g,j);h=Math.max(h,j)}}else{g=j;h=j}}if(!$.ig.util.isNaN(g)){return[.5*(d+e),g,h]}return[.5*(d+e),NaN,NaN]},h:null,j:0,cacheValues:function(){this.j=this._i._c6.valueColumn().count();this.h=this._i._c6.valueColumn().asArray()},unCacheValues:function(){this.h=null},$type:new $.ig.Type("BarBucketCalculator",$.ig.CategoryBucketCalculator.prototype.$type)},true);$c("CategoryYAxisView:i","CategoryAxisBaseView",{_bg:null,init:function(a){$.ig.CategoryAxisBaseView.prototype.init.call(this,a);this._bg=a},$type:new $.ig.Type("CategoryYAxisView",$.ig.CategoryAxisBaseView.prototype.$type)},true);$c("BarSeriesView:j","AnchoredCategorySeriesView",{_c6:null,init:function(a){var $self=this;this.dd=new $$a.bz;$.ig.AnchoredCategorySeriesView.prototype.init.call(this,a);this._c6=a;this._c7=function(){var $ret=new $.ig.Pool$1($$a.$bz.$type);$ret.create($self.de.runOn($self));$ret.activate($self.c9.runOn($self));$ret.disactivate($self.db.runOn($self));$ret.destroy($self.da.runOn($self));return $ret}();this.cy(new $$t.d)},_c7:null,onInit:function(){$.ig.AnchoredCategorySeriesView.prototype.onInit.call(this);this._c8=new $$4.x($$a.$bz.$type,0);if(!this.isThumbnailView()){this._e.resolution(4);this._e._bj=1}},de:function(){var a=new $$a.bz;this._c8.add(a);a.__visibility=1;return a},_c8:null,c9:function(a){a.__visibility=0},db:function(a){a.__visibility=1},da:function(a){this._c8.remove(a)},dc:function(a,b,c){if(!this.isDirty()){this.an()}a._o=c;a._n=b},co:function(){return new $$t.f(this)},bc:function(a,b){$.ig.AnchoredCategorySeriesView.prototype.bc.call(this,a,b);var c=a;var d=this.bm(b);c.__fill=d;c.__stroke=d;c._ac=this._e.thickness()},z:function(a){return this._c8.__inner[a]},dd:null,y:function(a){var b=this._c8.__inner[a];this.dd._n=b._n;this.dd._o=b._o;this.dd.width(b.width());this.dd.height(b.height());var c=this.bm(a);this.dd.__fill=c;this.dd.__stroke=c;this.dd._ac=this._e.thickness()+3;return this.dd},a3:function(a,b){$.ig.AnchoredCategorySeriesView.prototype.a3.call(this,a,b);if(a.d()){for(var c=0;c<this._c8.count();c++){var d=this.x(c,b);this.ba(d,c,b);a.v(d)}}},ai:function(a){$.ig.AnchoredCategorySeriesView.prototype.ai.call(this,a);var b=0;var c=new $$4.x($$a.$bz.$type,0);var e=this._c7.active().getEnumerator();while(e.moveNext()){var d=e.current();c.add(d)}c.sort2(function(f,g){if(f._o>g._o){return-1}else if(f._o<g._o){return 1}else{return 0}});var g=c.getEnumerator();while(g.moveNext()){var f=g.current();this._e.a2().exportRectangleData(a,f,"column"+b,["Main","Fill"])}b++},ac:function(){var a=new $$a.ax;a.colorString("rgba(95,95,95,0.5)");this._e.shadowColor(a);this._e.shadowBlur(5);this._e.shadowOffsetX(5);this._e.shadowOffsetY(-5)},$type:new $.ig.Type("BarSeriesView",$.ig.AnchoredCategorySeriesView.prototype.$type)},true);$$t.$a.intervalProperty=$$a.$s.i("Interval",Number,$$t.$a.$type,new $$a.ac(2,NaN,function(a,b){a.g0("Interval",b.oldValue(),b.newValue());a.g6(false)}));$$t.$a.minorIntervalProperty=$$a.$s.i("MinorInterval",Number,$$t.$a.$type,new $$a.ac(2,NaN,function(a,b){$b($$t.$a.$type,a).g0("MinorInterval",b.oldValue(),b.newValue());$b($$t.$a.$type,a).g6(false)}));$$t.$h.xAxisProperty=$$a.$s.i("XAxis",$.ig.NumericXAxis.prototype.$type,$$t.$h.$type,new $$a.ac(2,null,function(a,b){a.raisePropertyChanged("XAxis",b.oldValue(),b.newValue())}));$$t.$h.yAxisProperty=$$a.$s.i("YAxis",$$t.$a.$type,$$t.$h.$type,new $$a.ac(2,null,function(a,b){a.raisePropertyChanged("YAxis",b.oldValue(),b.newValue())}));$$t.$e.radiusXProperty=$$a.$s.i("RadiusX",Number,$$t.$e.$type,new $$a.ac(2,2,function(a,b){a.raisePropertyChanged("RadiusX",b.oldValue(),b.newValue())}));$$t.$e.radiusYProperty=$$a.$s.i("RadiusY",Number,$$t.$e.$type,new $$a.ac(2,2,function(a,b){a.raisePropertyChanged("RadiusY",b.oldValue(),b.newValue())}))});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});
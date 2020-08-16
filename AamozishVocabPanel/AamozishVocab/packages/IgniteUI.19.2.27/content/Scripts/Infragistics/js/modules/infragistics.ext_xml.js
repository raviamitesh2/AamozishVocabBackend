/*!@license
* Infragistics.Web.ClientUI infragistics.ext_xml.js 19.2.20192.315
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
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections"],factory)}else{factory(igRoot)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$c=$$t;$$0=$.ig.globalDefs.$$0;$$1=$.ig.globalDefs.$$1;$$4=$.ig.globalDefs.$$4;$$6=$.ig.globalDefs.$$6;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine(["XContainer:f","XDocument:g","XElement:h"]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.defEnum,$e=$.ig.util.getBoxIfEnum,$f=$.ig.util.getDefaultValue,$g=$.ig.util.getEnumValue,$h=$.ig.util.getValue,$i=$.ig.util.intSToU,$j=$.ig.util.nullableEquals,$k=$.ig.util.nullableIsNull,$l=$.ig.util.nullableNotEquals,$m=$.ig.util.toNullable,$n=$.ig.util.toString$1,$o=$.ig.util.u32BitwiseAnd,$p=$.ig.util.u32BitwiseOr,$q=$.ig.util.u32BitwiseXor,$r=$.ig.util.u32LS,$s=$.ig.util.unwrapNullable,$t=$.ig.util.wrapNullable,$u=String.fromCharCode,$v=$.ig.util.castObjTo$t;$c("XObject:m","Object",{init:function(a){$.ig.$op.init.call(this);this.backingNode(a)},_backingNode:null,backingNode:function(a){if(arguments.length===1){this._backingNode=a;return a}else{return this._backingNode}},nodeType:function(){},toString:function(){if(this.backingNode()!=null){return $$t.$i.xmlNodeToString(this.backingNode())}else{return""}},$type:new $.ig.Type("XObject",$.ig.$ot)},true);$c("XAttribute:e","XObject",{init:function(a){$$t.$m.init.call(this,a)},e:function(a){this.backingNode(this.backingNode().cloneNode(true));a.setAttributeNode(this.backingNode())},nodeType:function(){return 2},value:function(){return $$t.$i.b(this.backingNode())},$type:new $.ig.Type("XAttribute",$$t.$m.$type)},true);$c("XNode:l","XObject",{init:function(a){$$t.$m.init.call(this,a)},$type:new $.ig.Type("XNode",$$t.$m.$type)},true);$c("XContainer:f","XNode",{init:function(a){$$t.$l.init.call(this,a)},element:function(a){var b=null;var c=this.backingNode();var d=c.childNodes;var e=d.length;var f=a.localName();var g=a.namespaceName();for(var h=0;h<e;h++){var i=d.item(h);if(i.namespaceURI==g&&i.nodeType==1&&$$t.$i.d(i)==f){b=i}}if(b==null){return null}else{return new $$t.h(0,b)}},elements:function(){return this.f(null)},elements1:function(a){return this.f(a)},f:function(a){var b=new $$4.x($$t.$h.$type,0);for(var c=0;c<this.backingNode().childNodes.length;c++){var d=this.backingNode().childNodes.item(c);if(d.nodeType==1){var e=false;if(a!=null){if($$t.$i.d(d)==a.localName()&&d.namespaceURI==a.namespaceName()){e=true}}else{e=true}if(e){b.add(new $$t.h(0,d))}}}return b},add:function(a){var b=this.backingNode();var c;if($b($$t.$g.$type,this)!==null){c=this.backingNode()}else{c=this.backingNode().ownerDocument}if($b($$t.$e.$type,a)!==null){a.e(b)}else if($b($$t.$h.$type,a)!==null){a.j(b,c)}},$type:new $.ig.Type("XContainer",$$t.$l.$type)},true);$c("XDocument:g","XContainer",{init:function(a,b){if(a>0){switch(a){case 1:this.init1.apply(this,arguments);break}return}$$t.$f.init.call(this,b)},init1:function(a){$$t.$f.init.call(this,$$t.$i.j())},nodeType:function(){return 9},parse:function(a){return new $$t.g(0,$$t.$i.n(a))},$type:new $.ig.Type("XDocument",$$t.$f.$type)},true);$c("XElement:h","XContainer",{init:function(a,b){if(a>0){switch(a){case 1:this.init1.apply(this,arguments);break;case 2:this.init2.apply(this,arguments);break}return}$$t.$f.init.call(this,b)},init1:function(a,b){$$t.$h.init2.call(this,2,b,null)},init2:function(a,b,c){$$t.$f.init.call(this,$$t.$i.o(b.localName(),b.namespaceName()));var d=c==null?"":c.toString();this.value(d)},value:function(a){if(arguments.length===1){$$t.$i.h(this.backingNode(),a);return a}else{return $$t.$i.c(this.backingNode())}},nodeType:function(){return 1},name:function(){return $$t.$j.get($$t.$i.d(this.backingNode()),this.backingNode().namespaceURI)},attribute:function(a){return new $$t.e($$t.$i.i(this.backingNode(),a.localName(),a.namespaceName()))},j:function(a,b){if(this.backingNode().ownerDocument!=b){this.backingNode($$t.$i.p(b,this.backingNode()))}a.appendChild(this.backingNode())},$type:new $.ig.Type("XElement",$$t.$f.$type)},true);$c("XmlUtils:i","Object",{init:function(){$.ig.$op.init.call(this)},a:function(){return!!window.DOMParser},m:function(a){var text_=a;return(new DOMParser).parseFromString(text_,"text/xml")},l:function(a){var text_=a;return function(xml){var xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;xmlDoc.loadXML(xml);return xmlDoc}(text_)},f:function(a){var node_=a;return(new XMLSerializer).serializeToString(node_)},e:function(a){var node_=a;return node_.xml},k:function(){return new ActiveXObject("Microsoft.XMLDOM")},n:function(a){if($$t.$i.a()){return $$t.$i.m(a)}else{return $$t.$i.l(a)}},xmlNodeToString:function(a){if($$t.$i.a()){return $$t.$i.f(a)}else{return $$t.$i.e(a)}},j:function(){var a;if($$t.$i.a()){a=$$t.$i.m("<dummy/>");a.removeChild(a.documentElement)}else{a=$$t.$i.k()}return a},o:function(a,b){var doc_=$$t.$i.j();if($$t.$i.a()){return doc_.createElementNS(b,a)}else{var name_=a;var namespaceURI_=b;return doc_.createNode(1,name_,namespaceURI_)}},c:function(a){if($$t.$i.a()){return a.textContent}else{var node_=a;return node_.text}},h:function(a,b){if($$t.$i.a()){a.textContent=b}else{var node_=a;var text_=b;node_.text=text_}},p:function(a,b){if($$t.$i.a()){return a.importNode(b,true)}else{return b}},d:function(a){if($$t.$i.a()){return a.localName}else{var node_=a;return node_.baseName}},i:function(a,b,c){if($$t.$i.a()){return a.getAttributeNodeNS(c,b)}else{var elem_=a;var ln_=b;var nn_=c;return elem_.attributes.getQualifiedItem(ln_,nn_)}},b:function(a){if($$t.$i.a()){return a.nodeValue}else{var attr_=a;return attr_.value}},$type:new $.ig.Type("XmlUtils",$.ig.$ot)},true);$c("XName:j","Object",{a:null,b:null,init:function(a,b){$.ig.$op.init.call(this);this.a=a;this.b=b},localName:function(){return this.a},namespaceName:function(){return this.b},namespace:function(){return $$t.$k.get(this.b)},get:function(a,b){return new $$t.j(a,b)},$type:new $.ig.Type("XName",$.ig.$ot)},true);$c("XNamespace:k","Object",{a:null,init:function(a){$.ig.$op.init.call(this);this.a=a},get:function(a){return new $$t.k(a)},xmlns:function(){return $$t.$k.get("http://www.w3.org/2000/xmlns/")},namespaceName:function(){return this.a},$type:new $.ig.Type("XNamespace",$.ig.$ot)},true);$c("FaultCode:a","Object",{init:function(a){$.ig.$op.init.call(this);this._a=a},_a:null,$type:new $.ig.Type("FaultCode",$.ig.$ot)},true);$c("FaultException:b","Error",{init:function(a,b,c){$$0.$n.init.call(this,0);this.reason(a);this.code(b);this.action(c)},_action:null,action:function(a){if(arguments.length===1){this._action=a;return a}else{return this._action}},_code:null,code:function(a){if(arguments.length===1){this._code=a;return a}else{return this._code}},_reason:null,reason:function(a){if(arguments.length===1){this._reason=a;return a}else{return this._reason}},$type:new $.ig.Type("FaultException",$$0.$n.$type)},true);$c("FaultException$1:c","FaultException",{$tDetail:null,init:function($tDetail,a,b,c,d){this.$tDetail=$tDetail;if(!this.hasOwnProperty("$type")){this.$type=this.$type.specialize(this.$tDetail)}$$t.$b.init.call(this,b,c,d);this.detail(a)},_detail:null,detail:function(a){if(arguments.length===1){this._detail=a;return a}else{return this._detail}},$type:new $.ig.Type("FaultException$1",$$t.$b.$type)},true);$c("FaultReason:d","Object",{a:null,init:function(a){$.ig.$op.init.call(this);this.a=a},toString:function(){return this.a},$type:new $.ig.Type("FaultReason",$.ig.$ot)},true)});(function(factory){if(typeof define==="function"&&define.amd){define("watermark",["jquery"],factory)}else{factory(jQuery)}})(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})});
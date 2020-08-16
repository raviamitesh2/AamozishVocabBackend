/*!@license
* Infragistics.Web.ClientUI infragistics.encoding_iso646-us.js 19.2.20192.315
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
*     infragistics.ext_text.js
*     infragistics.encoding.core.js
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections","./infragistics.ext_text","./infragistics.encoding.core"],factory)}else{factory(igRoot)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$bh=$$t;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine(["UsAsciiEncoding:a","SingleByteEncoding:b","Encoding:c","Object:d","Type:e","Boolean:f","ValueType:g","Void:h","IConvertible:i","IFormatProvider:j","Number:k","String:l","IComparable:m","Number:n","IComparable$1:o","IEquatable$1:p","Number:q","Number:r","Number:s","NumberStyles:t","Enum:u","Array:v","IList:w","ICollection:x","IEnumerable:y","IEnumerator:z","Error:aa","Error:ab","Number:ac","String:ad","StringComparison:ae","RegExp:af","CultureInfo:ag","DateTimeFormat:ah","Calendar:ai","Date:aj","Number:ak","DayOfWeek:al","DateTimeKind:am","CalendarWeekRule:an","NumberFormatInfo:ao","CompareInfo:ap","CompareOptions:aq","IEnumerable$1:ar","IEnumerator$1:as","IDisposable:at","StringSplitOptions:au","Number:av","Number:aw","Number:ax","Number:ay","Number:az","Number:a0","Assembly:a1","Stream:a2","SeekOrigin:a3","RuntimeTypeHandle:a4","MethodInfo:a5","MethodBase:a6","MemberInfo:a7","ParameterInfo:a8","TypeCode:a9","ConstructorInfo:ba","PropertyInfo:bb","UTF8Encoding:bc","InvalidOperationException:bd","NotImplementedException:be","Script:bf","Decoder:bg","UnicodeEncoding:bh","Math:bi","AsciiEncoding:bj","ArgumentNullException:bk","DefaultDecoder:bl","ArgumentException:bm","IEncoding:bn","Dictionary$2:bo","IDictionary$2:bp","ICollection$1:bq","KeyValuePair$2:br","IDictionary:bs","IEqualityComparer$1:bt","EqualityComparer$1:bu","IEqualityComparer:bv","DefaultEqualityComparer$1:bw","Thread:bx","ThreadStart:by","MulticastDelegate:bz","IntPtr:b0","StringBuilder:b1","Environment:b2","RuntimeHelpers:b3","RuntimeFieldHandle:b4","AbstractEnumerable:b5","Func$1:b6","AbstractEnumerator:b7","GenericEnumerable$1:b8","GenericEnumerator$1:b9"]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.defEnum,$e=$.ig.util.getBoxIfEnum,$f=$.ig.util.getDefaultValue,$g=$.ig.util.getEnumValue,$h=$.ig.util.getValue,$i=$.ig.util.intSToU,$j=$.ig.util.nullableEquals,$k=$.ig.util.nullableIsNull,$l=$.ig.util.nullableNotEquals,$m=$.ig.util.toNullable,$n=$.ig.util.toString$1,$o=$.ig.util.u32BitwiseAnd,$p=$.ig.util.u32BitwiseOr,$q=$.ig.util.u32BitwiseXor,$r=$.ig.util.u32LS,$s=$.ig.util.unwrapNullable,$t=$.ig.util.wrapNullable,$u=String.fromCharCode,$v=$.ig.util.castObjTo$t;$c("UsAsciiEncoding:a","SingleByteEncoding",{ai:null,ac:function(){return this.ai},init:function(){this.ai=["\0","\x01","\x02","\x03","\x04","\x05","\x06","\x07","\b","\t","\n","\x0B","\f","\r","\x0e","\x0f","\x10","\x11","\x12","\x13","\x14","\x15","\x16","\x17","\x18","\x19","\x1a","\x1b","\x1c","\x1d","\x1e","\x1f"," ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~","\x7f","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff","\uffff"];$$t.$b.init1.call(this,1,20127,"ISO646-US")},$type:new $.ig.Type("UsAsciiEncoding",$$t.$b.$type)},true)});
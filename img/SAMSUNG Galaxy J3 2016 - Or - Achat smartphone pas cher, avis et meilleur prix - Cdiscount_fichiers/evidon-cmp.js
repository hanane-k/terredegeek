(function(){var i=["bg","es","hr","cs","da","nl","et","fi","fr","de","el","hu","is","ga","it","lv","lt","mt","ro","no","pl","pt","sk","sl","sv"];var c=/^[a-z]{2}$/;var h=function(s,t){for(var r in t){if(t.hasOwnProperty(r)){s[r]=t[r]}}return s};var n=function(r,u){if(typeof u==="undefined"){u="0"}var t="";for(var s=0;s<r;s+=1){t+=u}return t};var m=function(s,r){return s+n(Math.max(0,r))};var l=function(s,r){return n(Math.max(0,r))+s};var a=function(s,v,u,r){if(window.XMLHttpRequest){var x=new XMLHttpRequest;if(s==="GET"){x.open(s,v);x.onload=function(){if(x.status===200){u(x.responseText)}else{r(x.status,x.responseText)}};x.send()}}else{if(window.XDomainRequest){var t=window.location.protocol;if(v.indexOf(t)!==0){v=t+v.split(":")[1]}var w=new XDomainRequest;if(s==="GET"){w.open(s,v);w.onload=function(){u(w.responseText)};w.onerror=function(y){r(w.status,w.responseText)};w.send()}}else{console.error("Unable to create ajax object")}}};var b=function(){var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var r=/[\t\n\f\r ]/g;this.decode=function(w){w=String(w).replace(r,"");var x=w.length;if(x%4==0){w=w.replace(/==?$/,"");x=w.length}if(x%4==1||/[^+a-zA-Z0-9/]/.test(w)){error("Invalid character: the string to be decoded is not correctly encoded.")}var t=0;var u;var v;var y="";var z=-1;while(++z<x){v=s.indexOf(w.charAt(z));u=t%4?u*64+v:v;if(t++%4){y+=String.fromCharCode(255&u>>(-2*t&6))}}return y};this.encode=function(y){y=String(y);if(/[^\0-\xFF]/.test(y)){error("The string to be encoded contains characters outside of the Latin1 range.")}var B=y.length%3;var A="";var C=-1;var t;var u;var w;var x;var v;var z=y.length-B;while(++C<z){t=y.charCodeAt(C)<<16;u=y.charCodeAt(++C)<<8;w=y.charCodeAt(++C);v=t+u+w;A+=(s.charAt(v>>18&63)+s.charAt(v>>12&63)+s.charAt(v>>6&63)+s.charAt(v&63))}if(B==2){t=y.charCodeAt(C)<<8;u=y.charCodeAt(++C);v=t+u;A+=(s.charAt(v>>10)+s.charAt((v>>4)&63)+s.charAt((v<<2)&63)+"=")}else{if(B==1){v=y.charCodeAt(C);A+=(s.charAt(v>>2)+s.charAt((v<<4)&63)+"==")}}return A}};var q=6;var p={1:{version:1,metadataFields:["version","created","lastUpdated","cmpId","cmpVersion","consentScreen","vendorListVersion"],fields:[{name:"version",type:"int",numBits:q},{name:"created",type:"date",numBits:36},{name:"lastUpdated",type:"date",numBits:36},{name:"cmpId",type:"int",numBits:12},{name:"cmpVersion",type:"int",numBits:12},{name:"consentScreen",type:"int",numBits:6},{name:"consentLanguage",type:"language",numBits:12},{name:"vendorListVersion",type:"int",numBits:12},{name:"purposeIdBitString",type:"bits",numBits:24},{name:"maxVendorId",type:"int",numBits:16},{name:"isRange",type:"bool",numBits:1},{name:"vendorIdBitString",type:"bits",numBits:function k(r){return r.maxVendorId},validator:function o(r){return!r.isRange}},{name:"defaultConsent",type:"bool",numBits:1,validator:function o(r){return r.isRange}},{name:"numEntries",numBits:12,type:"int",validator:function o(r){return r.isRange}},{name:"vendorRangeList",type:"list",listCount:function j(r){return r.numEntries},validator:function o(r){return r.isRange},fields:[{name:"isRange",type:"bool",numBits:1},{name:"startVendorId",type:"int",numBits:16},{name:"endVendorId",type:"int",numBits:16,validator:function o(r){return r.isRange}}]}]}};var e=function(){};e.decodeConsentString=function(r,v){if(typeof v==="undefined"){v=p}var t=e.decodeFromBase64(r,v);var y=t.vendorRangeList;var u=t.defaultConsent;var s={version:t.version,cmpId:t.cmpId,vendorListVersion:t.vendorListVersion,allowedPurposeIds:e.decodeBits(t.purposeIdBitString),maxVendorId:t.maxVendorId,created:t.created,lastUpdated:t.lastUpdated,cmpVersion:t.cmpVersion,consentScreen:t.consentScreen,consentLanguage:t.consentLanguage};if(t.isRange){var x=y.reduce(function(z,D){var C=D.startVendorId;var B=D.isRange?D.endVendorId:C;for(var A=C;A<=B;A++){z[A]=true}return z},{});s.allowedVendorIds=[];for(var w=1;w<=t.maxVendorId;w++){if((u&&!x[w])||(!u&&x[w])){if(s.allowedVendorIds.indexOf(w)===-1){s.allowedVendorIds.push(w)}}}}else{s.allowedVendorIds=e.decodeBits(t.vendorIdBitString)}return s};e.decodeFromBase64=function(t,u){var s=e.toByteArray(t);var w=e.decodeInt(s,0,q);if(typeof w!=="number"){throw new Error("ConsentString - missing version field");}else{if(!u[w]){throw new Error("ConsentString - no definition for version "+w);}}var v=u[w].fields;var r=e.decodeFields(s,v,0);return r.decodedObject};e.toByteArray=function(w){var x=w,r=new b;while(x.length%4!==0){x+="="}x=x.replace(/-/g,"+").replace(/_/g,"/");var t=r.decode(x);var v="";for(var u=0;u<t.length;u+=1){var s=t.charCodeAt(u).toString(2);v+=l(s,8-s.length)}return v};e.decodeFields=function(t,s,v){var u=v;var r=s.reduce(function(x,y){var A=y.name;var C=y.numBits;var w=e.decodeField(t,x,u,y);var z=w.fieldValue;var B=w.newPosition;if(z!==undefined){x[A]=z}if(B!==undefined){u=B}else{if(typeof C==="number"){u+=C}}return x},{});return{decodedObject:r,newPosition:u}};e.decodeField=function(u,y,A,t){var B=t.type,x=t.numBits,s=t.decoder,C=t.validator,v=t.listCount;var z={};if(typeof C==="function"){if(!C(y)){return{newPosition:A}}}if(typeof s==="function"){return s(u,y,A)}var r=typeof x==="function"?x(y):x;var w=0;if(typeof v==="function"){w=v(y)}else{if(typeof v==="number"){w=v}}switch(B){case"int":return{fieldValue:e.decodeInt(u,A,r)};case"bool":return{fieldValue:e.decodeBool(u,A)};case"date":return{fieldValue:e.decodeDate(u,A,r)};case"language":return{fieldValue:e.decodeLanguage(u,A,r)};case"list":return new Array(w).fill().reduce(function(E){var D=e.decodeFields(u,t.fields,E.newPosition);var F=D.decodedObject;var H=D.newPosition;var G=E.fieldValue;G.push(F);return{fieldValue:G,newPosition:H}},{fieldValue:[],newPosition:A});case"bits":return{fieldValue:u.substr(A,r)};default:throw new Error("ConsentString - Unknown field type "+B+" for decoding");}};e.decodeInt=function(r,t,s){return parseInt(r.substr(t,s),2)};e.decodeDate=function(r,u,t){var s=e.decodeInt(r,u,t)*100;return new Date(s)};e.decodeBool=function(r,s){return parseInt(r.substr(s,1),2)===1};e.decodeLetter=function(r){var s=e.decodeInt(r,0,r.length);return String.fromCharCode(s+65).toLowerCase()};e.decodeLanguage=function(r,u,t){var s=r.substr(u,t);return e.decodeLetter(s.slice(0,t/2))+e.decodeLetter(s.slice(t/2))};e.decodeBits=function(r){return r.split("").reduce(function(s,t,u){if(t==="1"){if(s.indexOf(u+1)===-1){s.push(u+1)}}return s},[])};var f=function(){};f.encodeConsentString=function(t){var u=t.maxVendorId;var y=t.vendorList||{};var r=t.allowedPurposeIds;var s=t.allowedVendorIds;var A=y.vendors||[];var w=y.purposes||[];if(!u){u=0;A.forEach(function(B){if(B.id>u){u=B.id}})}var v=f.encodeToBase64(h(t,{maxVendorId:u,purposeIdBitString:f.encodePurposeIds(w,r),isRange:false,vendorIdBitString:f.encodeVendorIds(u,s)}));var z=f.convertVendorsToRanges(A,s);var x=f.encodeToBase64(h(t,{maxVendorId:u,purposeIdBitString:f.encodePurposeIds(w,r),isRange:true,defaultConsent:false,numEntries:z.length,vendorRangeList:z}));return v.length<x.length?v:x};f.convertVendorsToRanges=function(u,r){var t=[];var s=u.map(function(v){return v.id});return u.reduce(function(v,A,y){var x=A.id;if(r.indexOf(x)!==-1){t.push(x)}if((r.indexOf(x)===-1||y===u.length-1||s.indexOf(x+1)===-1)&&t.length){var z=t.shift();var w=t.pop();t=[];v.push({isRange:typeof w==="number",startVendorId:z,endVendorId:w});return v}return v},[])};f.encodePurposeIds=function(v,r){if(typeof r==="undefined"){r=[]}var u=[0].concat(v.map(function(x){return x.id})).concat(r);var t=u.reduce(function(x,y){return Math.max(x,y)});var w="";for(var s=1;s<=t;s++){w+=(r.indexOf(s)!==-1?"1":"0")}return w};f.encodeVendorIds=function(t,r){if(typeof allowedPurposeIds==="undefined"){allowedPurposeIds=[]}var u="";for(var s=1;s<=t;s++){u+=(r.indexOf(s)!==-1?"1":"0")}return m(u,Math.max(0,t-u.length))};f.encodeToBase64=function(u,v){if(typeof v==="undefined"){v=p}var s=f.encodeData(u,v);if(s){var x=m(s,7-((s.length+7)%8));var t="";for(var w=0;w<x.length;w+=8){t+=String.fromCharCode(parseInt(x.substr(w,8),2))}var r=new b;return r.encode(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}return null};f.encodeData=function(r,s){var u=r.version;if(typeof u!=="number"){throw new Error("ConsentString - missing version field");}else{if(!s[u]){throw new Error("ConsentString - no definition for version "+u);}}var t=s[u].fields;return f.encodeFields(r,t)};f.encodeFields=function(s,r){return r.reduce(function(t,u){t+=f.encodeField(s,u);return t},"")};f.encodeField=function(v,t){var x=t.name;var z=t.type;var y=t.numBits;var s=t.encoder;var A=t.validator;if(typeof A==="function"){if(!A(v)){return""}}if(typeof s==="function"){return s(v)}var r=typeof y==="function"?y(v):y;var w=v[x];var u=w===null||w===undefined?"":w;switch(z){case"int":return f.encodeInt(u,r);case"bool":return f.encodeBool(u);case"date":return f.encodeDate(u,r);case"bits":return m(u,r-u.length).substring(0,r);case"list":return u.reduce(function(B,C){B+=f.encodeFields(C,t.fields);return B},"");case"language":return f.encodeLanguage(u,r);default:throw new Error("ConsentString - unknown field type "+z+" for encoding");}};f.encodeInt=function(t,s){var r="";if(typeof t==="number"&&!isNaN(t)){r=parseInt(t,10).toString(2)}if(s>=r.length){r=l(r,s-r.length)}if(r.length>s){r=r.substring(0,s)}return r};f.encodeBool=function(r){return f.encodeInt(r===true?1:0,1)};f.encodeDate=function(s,r){if(s instanceof Date){return f.encodeInt(s.getTime()/100,r)}return f.encodeInt(s,r)};f.encodeLetter=function(s,r){return f.encodeInt(s.toUpperCase().charCodeAt(0)-65,r)};f.encodeLanguage=function(s,r){if(typeof r==="undefined"){r=12}return f.encodeLetter(s.slice(0,1),r/2)+f.encodeLetter(s.slice(1),r/2)};var d=function(r){this.created=new Date;this.lastUpdated=new Date;this.version=1;this.vendorList=null;this.vendorListVersion=null;this.cmpId=null;this.cmpVersion=null;this.consentScreen=null;this.consentLanguage=null;this.allowedPurposeIds=[];this.allowedVendorIds=[];if(r){h(this,e.decodeConsentString(r))}};d.decodeMetadataString=function(s){var r=e.decodeConsentString(s);var t={};p[r.version].metadataFields.forEach(function(u){t[u]=r[u]});return t};d.prototype.getConsentString=function(r){if(typeof r==="undefined"){r=true}if(!this.vendorList){throw new Error("ConsentString - A vendor list is required to encode a consent string");}if(r===true){this.lastUpdated=new Date}return f.encodeConsentString({version:this.getVersion(),vendorList:this.vendorList,allowedPurposeIds:this.allowedPurposeIds,allowedVendorIds:this.allowedVendorIds,created:this.created,lastUpdated:this.lastUpdated,cmpId:this.cmpId,cmpVersion:this.cmpVersion,consentScreen:this.consentScreen,consentLanguage:this.consentLanguage,vendorListVersion:this.vendorListVersion})};d.prototype.getMetadataString=function(){return f.encodeConsentString({version:this.getVersion(),created:this.created,lastUpdated:this.lastUpdated,cmpId:this.cmpId,cmpVersion:this.cmpVersion,consentScreen:this.consentScreen,vendorListVersion:this.vendorListVersion})};d.prototype.getVersion=function(){return this.version};d.prototype.getVendorListVersion=function(){return this.vendorListVersion};d.prototype.useGlobalVendorList=function(){this.setGlobalVendorList(globalVendorList)};d.prototype.setGlobalVendorList=function(r){if(typeof r!=="object"){throw new Error("ConsentString - You must provide an object when setting the global vendor list");}if(!r.vendorListVersion||!Array.isArray(r.purposes)||!Array.isArray(r.vendors)){throw new Error("case 2");}this.vendorList={vendorListVersion:r.vendorListVersion,lastUpdated:r.lastUpdated,purposes:r.purposes,features:r.features,vendors:r.vendors.slice(0).sort(function(s,t){return s.id<t.id?-1:1})};this.vendorListVersion=r.vendorListVersion};d.prototype.setCmpId=function(r){this.cmpId=r};d.prototype.getCmpId=function(){return this.cmpId};d.prototype.setCmpVersion=function(r){this.cmpVersion=r};d.prototype.getCmpVersion=function(){return this.cmpVersion};d.prototype.setConsentScreen=function(r){this.consentScreen=r};d.prototype.getConsentScreen=function(){return this.consentScreen};d.prototype.setConsentLanguage=function(r){if(c.test(r)===false){throw new Error("ConsentString - The consent language must be a two-letter ISO639-1 code (en, fr, de, etc.)");}this.consentLanguage=r};d.prototype.getConsentLanguage=function(){return this.consentLanguage};d.prototype.setPurposesAllowed=function(r){this.allowedPurposeIds=r};d.prototype.getPurposesAllowed=function(){return this.allowedPurposeIds};d.prototype.setPurposeAllowed=function(r,t){var s=this.allowedPurposeIds.indexOf(r);if(t===true&&s===-1){this.allowedPurposeIds.push(r)}else{if(t===false&&s!==-1){this.allowedPurposeIds.splice(s,1)}}};d.prototype.isPurposeAllowed=function(r){return this.allowedPurposeIds.indexOf(r)!==-1};d.prototype.setVendorsAllowed=function(r){this.allowedVendorIds=r};d.prototype.getVendorsAllowed=function(){return this.allowedVendorIds};d.prototype.setVendorAllowed=function(s,r){var t=this.allowedVendorIds.indexOf(s);if(r===true&&t===-1){this.allowedVendorIds.push(s)}else{if(r===false&&t!==-1){this.allowedVendorIds.splice(t,1)}}};d.prototype.isVendorAllowed=function(r){return this.allowedVendorIds.indexOf(r)!==-1};var g=function(r){if(!r){r=-1}this.cookieExists=false;this.pubvendors=null;this.vendorListVersion=r;this.vendorList=null;this.vendorMapping=null;this.purposeList=null;this.consentString=null;this.callQueue=[];this.cmpId=18;this.cmpVersion=1;this.gdprApplies=false;this.hasGlobalScope=false;this.receivedConsentStatus=false;this._fetchPubVendors=function(){var s=this;var t="/.well-known/pubvendors.json";a("GET",t,function(u){s.pubvendors=JSON.parse(u)},function(v,u){s.pubvendors=false;console.log("pubvendors.json not found")})};this._fetchVendorList=function(u){if(typeof u==="undefined"){u=-1}var s=this;var t="https://vendorlist.consensu.org/vendorlist.json";if(u>0){t="https://vendorlist.consensu.org/v-"+u+"/vendorlist.json"}a("GET",t,function(v){s.vendorList=JSON.parse(v);s.vendorListVersion=s.vendorList.vendorListVersion;s.purposeList=s.vendorList.purposes.slice(0);s._init()},function(w,v){console.error("error pulling vendor list",w,v)})};this._fetchPurposes=function(s){if(!s||s.length!==2||i.indexOf(s)<0){return}var t=this;var u="https://vendorlist.consensu.org/purposes-"+s+".json";a("GET",u,function(v){var w=JSON.parse(v);t.purposeList=w.purposes},function(w,v){console.error("error pulling purposes list",w,v)})};this._fetchVendorMapping=function(){var s=this;var t="http://iabmap.evidon.com/iabevidonmapping.json";a("GET",t,function(u){s.vendorMapping=JSON.parse(u);s._init()},function(){s.vendorMapping=[]})};this._initCallMax=7;this._init=function(){var w=this;if(this.pubvendors===null){this._fetchPubVendors()}if(!this.vendorList){this._fetchVendorList();var v=window.evidon.notice;if(v&&v.languageRoot!=="en"){this._fetchPurposes(v.languageRoot)}return}if(!this.vendorMapping){if(window.evidon&&window.evidon.IABmap){this.vendorMapping=window.evidon.IABmap}else{return}}if(!window.evidon||!window.evidon.notice){return}var v=window.evidon.notice;if(v.consentIsGiven){this.receivedConsentStatus=true}this._initConsentCookie();this.hasGlobalScope=this.consentString.getCmpId()!==this.cmpId;var s=window.__cmp.a||[];var t=window.__cmp.msgHandler;var w=this;window.__cmp=function(y,z,x){w.__cmp(y,z,x)};window.__cmp.msgHandler=t;while(s.length>0){var u=s.pop();this.__cmp.apply(this,u)}};this._initConsentCookie=function(){var v=window.evidon.notice;var s=v._getCookie("euconsent");console.log("EvidonCMP._init consentCookie",s);if(s){this.cookieExists=true;this.consentString=new d(s.value)}var t=v._readLocalStorage("euconsent");console.log("EvidonCMP._init consentLS",t);if(t){this.cookieExists=true;this.consentString=new d(t)}if(!this.consentString){this.consentString=new d;this.consentString.setCmpId(this.cmpId);this.consentString.setCmpVersion(this.cmpVersion)}var u=v.activeSettings.defaultTranslation.code;if(u.indexOf("-")!==-1){u=u.substring(0,2)}this.consentString.setConsentLanguage(u);this.consentString.setGlobalVendorList(this.vendorList)};this._writeConsentCookie=function(u){if(typeof u==="undefined"){u=false}var t="."+window.location.host;if(u){t=".consensu.org"}var s=["euconsent="+this.consentString.getConsentString(),"max-age=33696000","path=/","domain="+t,];document.cookie=s.join("; ")};this._writeConsentLocalStorage=function(){var s=window.evidon.notice;var t=this.consentString.getConsentString();return s._writeLocalStorage("euconsent",t)};this._mapEvidonVendors=function(t){var w=[];if(!this.vendorMapping){return w}for(var u=0;u<t.length;u++){var s=t[u];var v=this._mapEvidonVendor(s);if(v){w.push(v)}}return w};this._mapEvidonVendor=function(u){for(var s=0;s<this.vendorMapping.length;s++){var v=this.vendorMapping[s];if(v[1]==u){var t=v[0];return t}}return null};this._init()};g.prototype.__cmp=function(s,t,r){if(s==="consentGiven"){this.consentGiven();return}else{if(s==="setGDPRApplies"){this.gdprApplies=(t==true);return}else{if(s==="setSuppression"){if(t){this.consentDeclined()}return}else{if(s==="ping"){this.ping(r);return}}}}console.log("__cmp",s,t,"receivedConsent:"+this.receivedConsentStatus);if(this.receivedConsentStatus===false){console.log("  storing call");this.callQueue.push([s,t,r]);return}console.log("  handling call");if(s==="getVendorConsents"||s==="getConsentData"){this[s](t,r)}else{console.error("Unknown IAB command "+s)}if(!this._checkCmpQueue){console.error("unable to find _checkCmpQueue",this);console.trace();return}this._checkCmpQueue()};g.prototype._checkCmpQueue=function(){while(this.callQueue.length>0){var r=this.callQueue.pop();this.__cmp.apply(this,r)}};g.prototype.ping=function(r){r({gdprAppliesGlobally:true,cmpLoaded:true},true)};g.prototype.getVendorConsents=function(u,s){console.log("EvidonCMP.getVendorConsents",u);function v(B){if(u===null||Array.isArray(u)===false||u.length===0){return false}return(u.indexOf(B)===-1)}var y={metadata:this.consentString.getMetadataString(),gdprApplies:this.gdprApplies,hasGlobalScope:this.hasGlobalScope};var w={};var x=this.consentString.vendorList.purposes.map(function(B){return B.id});for(var t=0;t<x.length;t++){w[x[t]]=false}for(var t=0;t<this.consentString.allowedPurposeIds.length;t++){var r=this.consentString.allowedPurposeIds[t];w[r]=true}y.purposeConsents=w;var z={};if(u&&Array.isArray(u)){for(var t=0;t<u.length;t++){var A=u[t];z[A]=false}}for(var t=0;t<this.consentString.allowedVendorIds.length;t++){var r=this.consentString.allowedVendorIds[t];if(v(r)){continue}z[r]=true}y.vendorConsents=z;s(y,true)};g.prototype.getConsentData=function(u,r){console.log("EvidonCMP.getConsentData","version:"+u);if(u&&isNaN(u)===false){this.consentString.version=u}var t=null;try{t={consentData:this.consentString.getConsentString(),gdprApplies:this.gdprApplies,hasGlobalScope:this.hasGlobalScope}}catch(s){}if(!t||t.hasOwnProperty("consentData")===false||t.consentData===null){t=null}r(t,t!==null)};g.prototype.newVendorCallback=function(t){var v=this._mapEvidonVendors(t);if(v.length===0){return}var r=this.consentString.getVendorsAllowed();for(var s=0;s<v.length;s++){var u=v[s];if(r.indexOf(u)===-1){this.consentString.setVendorAllowed(u,true)}}};g.prototype.consentGiven=function(){console.log("EvidonCMP.consentGiven");this.receivedConsentStatus=true;var t=window.evidon.notice;if(this.consentString===null){console.error("ConsentString should not be null");this.consentString=new d}if(!this.hasGlobalScope){this.consentString.setConsentScreen(0)}this.consentString.setPurposesAllowed(this.purposeList.map(function(v){return v.id}));var r=t.getActiveVendors();var u=this._mapEvidonVendors(r);for(var s=0;s<u.length;s++){this.consentString.setVendorAllowed(u[s],true)}this._checkCmpQueue()};g.prototype.consentClosed=function(){console.log("EvidonCMP.consentClosed",arguments);this.receivedConsentStatus=true;this._checkCmpQueue()};g.prototype.consentDeclined=function(){console.log("EvidonCMP.consentDeclined",arguments);this.receivedConsentStatus=true;var t=window.evidon.notice;if(this.consentString===null){console.error("ConsentString should not be null");this.consentString=new d}this.consentString.setConsentScreen(0);var r=t.getActiveVendors();var u=this._mapEvidonVendors(r);for(var s=0;s<u.length;s++){this.consentString.setVendorAllowed(u[s],false)}this._checkCmpQueue()};g.prototype.isPristine=function(){var v=this.pristineConsentData;var w=this.consentString.getConsentData();for(var u in v){if(!v.hasOwnProperty(u)){continue}if(!w.hasOwnProperty(u)){return false}var r=v[u],s=w[u];if(Array.isArray(r)&&Array.isArray(s)){if(r.length!==s.length){return false}for(var t=0;t<r.length;t++){if(r[t]!==s[t]){return false}}}else{if(r!==s){return false}}}return true};g.prototype.saveConsent=function(){console.log("EvidonCMP.saveConsent");this._writeConsentCookie();this._writeConsentLocalStorage()};g.prototype.resetConsent=function(){console.log("EvidonCMP.resetConsent");this._initConsentString()};g.prototype.getVendorData=function(t){if(!this.vendorList){return null}for(var r=0;r<this.vendorList.vendors.length;r++){var s=this.vendorList.vendors[r];if(s.id==t){return s}}return null};g.prototype.generatePubVendors=function(r){var u=this.pubvendors;if(!u){var v=[];var t=this._mapEvidonVendors(r);for(var s=0;s<t.length;s++){v.push({id:t[s]})}u={version:1,publisherVendorsVersion:1,globalVendorListVersion:this.vendorListVersion,updatedAt:(new Date).toISOString(),vendors:v}}return u};if(!window.evidon){window.evidon={}}if(!window.evidon.cmp){window.evidon.cmp=new g}if(!window.evidon.cmp.ConsentString){window.evidon.cmp.ConsentString=d}})()
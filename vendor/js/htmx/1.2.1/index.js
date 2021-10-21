(function(e,t){if(typeof define==="function"&&define.amd){define([],t)}else{e.htmx=t()}})(typeof self!=="undefined"?self:this,function(){return function(){"use strict";var v={onLoad:b,process:et,on:j,off:z,trigger:st,ajax:Wt,find:S,findAll:E,closest:D,remove:C,addClass:L,removeClass:A,toggleClass:O,takeClass:T,defineExtension:Gt,removeExtension:Yt,logAll:w,logger:null,config:{historyEnabled:true,historyCacheSize:10,refreshOnHistoryMiss:false,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:100,includeIndicatorStyles:true,indicatorClass:"htmx-indicator",requestClass:"htmx-request",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:true,attributesToSettle:["class","style","width","height"]},parseInterval:f,_:e,createEventSource:function(e){return new EventSource(e,{withCredentials:true})},createWebSocket:function(e){return new WebSocket(e,[])}};var t=["get","post","put","delete","patch"];var n=t.map(function(e){return"[hx-"+e+"], [data-hx-"+e+"]"}).join(", ");function f(e){if(e==undefined){return undefined}if(e.slice(-2)=="ms"){return parseFloat(e.slice(0,-2))||undefined}if(e.slice(-1)=="s"){return parseFloat(e.slice(0,-1))*1e3||undefined}return parseFloat(e)||undefined}function l(e,t){return e.getAttribute&&e.getAttribute(t)}function a(e,t){return e.hasAttribute&&(e.hasAttribute(t)||e.hasAttribute("data-"+t))}function R(e,t){return l(e,t)||l(e,"data-"+t)}function c(e){return e.parentElement}function H(){return document}function h(e,t){if(t(e)){return e}else if(c(e)){return h(c(e),t)}else{return null}}function q(e,t){var r=null;h(e,function(e){return r=R(e,t)});return r}function d(e,t){var r=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;return r&&r.call(e,t)}function r(e){var t=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i;var r=t.exec(e);if(r){return r[1].toLowerCase()}else{return""}}function i(e,t){var r=new DOMParser;var n=r.parseFromString(e,"text/html");var i=n.body;while(t>0){t--;i=i.firstChild}if(i==null){i=H().createDocumentFragment()}return i}function u(e){var t=r(e);switch(t){case"thead":case"tbody":case"tfoot":case"colgroup":case"caption":return i("<table>"+e+"</table>",1);case"col":return i("<table><colgroup>"+e+"</colgroup></table>",2);case"tr":return i("<table><tbody>"+e+"</tbody></table>",2);case"td":case"th":return i("<table><tbody><tr>"+e+"</tr></tbody></table>",3);case"script":return i("<div>"+e+"</div>",1);default:return i(e,0)}}function o(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"}function s(e){return o(e,"Function")}function g(e){return o(e,"Object")}function N(e){var t="htmx-internal-data";var r=e[t];if(!r){r=e[t]={}}return r}function p(e){var t=[];if(e){for(var r=0;r<e.length;r++){t.push(e[r])}}return t}function I(e,t){if(e){for(var r=0;r<e.length;r++){t(e[r])}}}function m(e){var t=e.getBoundingClientRect();var r=t.top;var n=t.bottom;return r<window.innerHeight&&n>=0}function M(e){return H().body.contains(e)}function y(e){return e.trim().split(/\s+/)}function k(e,t){for(var r in t){if(t.hasOwnProperty(r)){e[r]=t[r]}}return e}function x(e){try{return JSON.parse(e)}catch(e){at(e);return null}}function e(e){return Ft(H().body,function(){return eval(e)})}function b(t){var e=v.on("htmx:load",function(e){t(e.detail.elt)});return e}function w(){v.logger=function(e,t,r){if(console){console.log(t,e,r)}}}function S(e,t){if(t){return e.querySelector(t)}else{return S(H(),e)}}function E(e,t){if(t){return e.querySelectorAll(t)}else{return E(H(),e)}}function C(e,t){e=P(e);if(t){setTimeout(function(){C(e)},t)}else{e.parentElement.removeChild(e)}}function L(e,t,r){e=P(e);if(r){setTimeout(function(){L(e,t)},r)}else{e.classList.add(t)}}function A(e,t,r){e=P(e);if(r){setTimeout(function(){A(e,t)},r)}else{e.classList.remove(t)}}function O(e,t){e=P(e);e.classList.toggle(t)}function T(e,t){e=P(e);I(e.parentElement.children,function(e){A(e,t)});L(e,t)}function D(e,t){e=P(e);if(e.closest){return e.closest(t)}else{do{if(e==null||d(e,t)){return e}}while(e=e&&c(e))}}function X(e,t){if(t.indexOf("closest ")===0){return[D(e,t.substr(8))]}else if(t.indexOf("find ")===0){return[S(e,t.substr(5))]}else{return H().querySelectorAll(t)}}function F(e,t){return X(e,t)[0]}function P(e){if(o(e,"String")){return S(e)}else{return e}}function U(e,t,r){if(s(t)){return{target:H().body,event:e,listener:t}}else{return{target:P(e),event:t,listener:r}}}function j(t,r,n){Qt(function(){var e=U(t,r,n);e.target.addEventListener(e.event,e.listener)});var e=s(r);return e?r:n}function z(t,r,n){Qt(function(){var e=U(t,r,n);e.target.removeEventListener(e.event,e.listener)});return s(r)?r:n}function V(e){var t=h(e,function(e){return R(e,"hx-target")!==null});if(t){var r=R(t,"hx-target");if(r==="this"){return t}else{return F(e,r)}}else{var n=N(e);if(n.boosted){return H().body}else{return e}}}function _(e){var t=v.config.attributesToSettle;for(var r=0;r<t.length;r++){if(e===t[r]){return true}}return false}function W(t,r){I(t.attributes,function(e){if(!r.hasAttribute(e.name)&&_(e.name)){t.removeAttribute(e.name)}});I(r.attributes,function(e){if(_(e.name)){t.setAttribute(e.name,e.value)}})}function B(e,t){var r=Kt(t);for(var n=0;n<r.length;n++){var i=r[n];try{if(i.isInlineSwap(e)){return true}}catch(e){at(e)}}return e==="outerHTML"}function $(e,t,r){var n="#"+t.id;var i="outerHTML";if(e==="true"){}else if(e.indexOf(":")>0){i=e.substr(0,e.indexOf(":"));n=e.substr(e.indexOf(":")+1,e.length)}else{i=e}var o=H().querySelector(n);if(o){var a;a=H().createDocumentFragment();a.appendChild(t);if(!B(i,o)){a=t}ue(i,o,o,a,r)}else{t.parentNode.removeChild(t);nt(H().body,"htmx:oobErrorNoTarget",{content:t})}return e}function J(e,r){I(E(e,"[hx-swap-oob], [data-hx-swap-oob]"),function(e){var t=R(e,"hx-swap-oob");if(t!=null){$(t,e,r)}})}function Z(e){I(E(e,"[hx-preserve], [data-hx-preserve]"),function(e){var t=R(e,"id");var r=H().getElementById(t);if(r!=null){e.parentNode.replaceChild(r,e)}})}function G(n,e,i){I(e.querySelectorAll("[id]"),function(e){if(e.id&&e.id.length>0){var t=n.querySelector(e.tagName+"[id='"+e.id+"']");if(t&&t!==n){var r=e.cloneNode();W(e,t);i.tasks.push(function(){W(e,r)})}}})}function Y(e){return function(){et(e);Ge(e);K(e);st(e,"htmx:load")}}function K(e){var t="[autofocus]";var r=d(e,t)?e:e.querySelector(t);if(r!=null){r.focus()}}function Q(e,t,r,n){G(e,r,n);while(r.childNodes.length>0){var i=r.firstChild;e.insertBefore(i,t);if(i.nodeType!==Node.TEXT_NODE&&i.nodeType!==Node.COMMENT_NODE){n.tasks.push(Y(i))}}}function ee(t){var e=N(t);if(e.webSocket){e.webSocket.close()}if(e.sseEventSource){e.sseEventSource.close()}if(e.listenerInfos){I(e.listenerInfos,function(e){if(t!==e.on){e.on.removeEventListener(e.trigger,e.listener)}})}if(t.children){I(t.children,function(e){ee(e)})}}function te(e,t,r){if(e.tagName==="BODY"){return ae(e,t)}else{var n=e.previousSibling;Q(c(e),e,t,r);if(n==null){var i=c(e).firstChild}else{var i=n.nextSibling}N(e).replacedWith=i;r.elts=[];while(i&&i!==e){if(i.nodeType===Node.ELEMENT_NODE){r.elts.push(i)}i=i.nextElementSibling}ee(e);c(e).removeChild(e)}}function re(e,t,r){return Q(e,e.firstChild,t,r)}function ne(e,t,r){return Q(c(e),e,t,r)}function ie(e,t,r){return Q(e,null,t,r)}function oe(e,t,r){return Q(c(e),e.nextSibling,t,r)}function ae(e,t,r){var n=e.firstChild;Q(e,n,t,r);if(n){while(n.nextSibling){ee(n.nextSibling);e.removeChild(n.nextSibling)}ee(n);e.removeChild(n)}}function se(e,t){var r=q(e,"hx-select");if(r){var n=H().createDocumentFragment();I(t.querySelectorAll(r),function(e){n.appendChild(e)});t=n}return t}function ue(e,t,r,n,i){switch(e){case"none":return;case"outerHTML":te(r,n,i);return;case"afterbegin":re(r,n,i);return;case"beforebegin":ne(r,n,i);return;case"beforeend":ie(r,n,i);return;case"afterend":oe(r,n,i);return;default:var o=Kt(t);for(var a=0;a<o.length;a++){var s=o[a];try{var u=s.handleSwap(e,r,n,i);if(u){if(typeof u.length!=="undefined"){for(var l=0;l<u.length;l++){var f=u[l];if(f.nodeType!==Node.TEXT_NODE&&f.nodeType!==Node.COMMENT_NODE){i.tasks.push(Y(f))}}}return}}catch(e){at(e)}}ae(r,n,i)}}var le=/<title>([\s\S]+?)<\/title>/im;function fe(e){var t=le.exec(e);if(t){return t[1]}}function ce(e,t,r,n,i){var o=fe(n);if(o){var a=S("title");if(a){a.innerHTML=o}else{window.document.title=o}}var s=u(n);if(s){J(s,i);Z(s);s=se(r,s);return ue(e,r,t,s,i)}}function he(e,t,r){var n=e.getResponseHeader(t);if(n.indexOf("{")===0){var i=x(n);for(var o in i){if(i.hasOwnProperty(o)){var a=i[o];if(!g(a)){a={value:a}}st(r,o,a)}}}else{st(r,n,[])}}var ve=/\s/;var de=/[\s,]/;var ge=/[_$a-zA-Z]/;var pe=/[_$a-zA-Z0-9]/;var me=['"',"'","/"];var ye=/[^\s]/;function xe(e){var t=[];var r=0;while(r<e.length){if(ge.exec(e.charAt(r))){var n=r;while(pe.exec(e.charAt(r+1))){r++}t.push(e.substr(n,r-n+1))}else if(me.indexOf(e.charAt(r))!==-1){var i=e.charAt(r);var n=r;r++;while(r<e.length&&e.charAt(r)!==i){if(e.charAt(r)==="\\"){r++}r++}t.push(e.substr(n,r-n+1))}else{var o=e.charAt(r);t.push(o)}r++}return t}function be(e,t,r){return ge.exec(e.charAt(0))&&e!=="true"&&e!=="false"&&e!=="this"&&e!==r&&t!=="."}function we(e,t,r){if(t[0]==="["){t.shift();var n=1;var i=" return (function("+r+"){ return (";var o=null;while(t.length>0){var a=t[0];if(a==="]"){n--;if(n===0){if(o===null){i=i+"true"}t.shift();i+=")})";try{var s=Ft(e,function(){return Function(i)()},function(){return true});s.source=i;return s}catch(e){nt(H().body,"htmx:syntax:error",{error:e,source:i});return null}}}else if(a==="["){n++}if(be(a,o,r)){i+="(("+r+"."+a+") ? ("+r+"."+a+") : (window."+a+"))"}else{i=i+a}o=t.shift()}}}function Se(e,t){var r="";while(e.length>0&&!e[0].match(t)){r+=e.shift()}return r}var Ee="input, textarea, select";function Ce(e){var t=R(e,"hx-trigger");var r=[];if(t){var n=xe(t);do{Se(n,ye);var i=n.length;var o=Se(n,/[,\[\s]/);if(o!==""){if(o==="every"){var a={trigger:"every"};Se(n,ye);a.pollInterval=f(Se(n,ve));r.push(a)}else if(o.indexOf("sse:")===0){r.push({trigger:"sse",sseEvent:o.substr(4)})}else{var s={trigger:o};var u=we(e,n,"event");if(u){s.eventFilter=u}while(n.length>0&&n[0]!==","){Se(n,ye);var l=n.shift();if(l==="changed"){s.changed=true}else if(l==="once"){s.once=true}else if(l==="delay"&&n[0]===":"){n.shift();s.delay=f(Se(n,de))}else if(l==="from"&&n[0]===":"){n.shift();s.from=Se(n,de)}else if(l==="throttle"&&n[0]===":"){n.shift();s.throttle=f(Se(n,de))}else{nt(e,"htmx:syntax:error",{token:n.shift()})}}r.push(s)}}if(n.length===i){nt(e,"htmx:syntax:error",{token:n.shift()})}Se(n,ye)}while(n[0]===","&&n.shift())}if(r.length>0){return r}else if(d(e,"form")){return[{trigger:"submit"}]}else if(d(e,Ee)){return[{trigger:"change"}]}else{return[{trigger:"click"}]}}function Le(e){N(e).cancelled=true}function Ae(e,t,r,n){var i=N(e);i.timeout=setTimeout(function(){if(M(e)&&i.cancelled!==true){Bt(t,r,e);Ae(e,t,R(e,"hx-"+t),n)}},n)}function Oe(e){return location.hostname===e.hostname&&l(e,"href")&&l(e,"href").indexOf("#")!==0}function Te(t,r,e){if(t.tagName==="A"&&Oe(t)||t.tagName==="FORM"){r.boosted=true;var n,i;if(t.tagName==="A"){n="get";i=l(t,"href")}else{var o=l(t,"method");n=o?o.toLowerCase():"get";i=l(t,"action")}e.forEach(function(e){Ne(t,n,i,r,e,true)})}}function Re(e){return e.tagName==="FORM"||d(e,'input[type="submit"], button')&&D(e,"form")!==null||e.tagName==="A"&&e.href&&e.href.indexOf("#")!==0}function He(e,t){return N(e).boosted&&e.tagName==="A"&&t.type==="click"&&t.ctrlKey}function qe(e,t){var r=e.eventFilter;if(r){try{return r(t)!==true}catch(e){nt(H().body,"htmx:eventFilter:error",{error:e,source:r.source});return true}}return false}function Ne(n,i,o,e,a,s){var u=n;if(a.from){u=S(a.from)}var l=function(e){if(!M(n)){u.removeEventListener(a.trigger,l);return}if(He(n,e)){return}if(s||Re(n)){e.preventDefault()}if(qe(a,e)){return}var t=N(e);var r=N(n);if(!t.handled){t.handled=true;if(a.once){if(r.triggeredOnce){return}else{r.triggeredOnce=true}}if(a.changed){if(r.lastValue===n.value){return}else{r.lastValue=n.value}}if(r.delayed){clearTimeout(r.delayed)}if(r.throttle){return}if(a.throttle){r.throttle=setTimeout(function(){Bt(i,o,n,e);r.throttle=null},a.throttle)}else if(a.delay){r.delayed=setTimeout(function(){Bt(i,o,n,e)},a.delay)}else{Bt(i,o,n,e)}}};if(e.listenerInfos==null){e.listenerInfos=[]}e.listenerInfos.push({trigger:a.trigger,listener:l,on:u});u.addEventListener(a.trigger,l)}var Ie=false;var Me=null;function ke(){if(!Me){Me=function(){Ie=true};window.addEventListener("scroll",Me);setInterval(function(){if(Ie){Ie=false;I(H().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"),function(e){De(e)})}},200)}}function De(e){var t=N(e);if(!t.revealed&&m(e)){t.revealed=true;Bt(t.verb,t.path,e)}}function Xe(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){Fe(e,o[1])}if(o[0]==="send"){Ue(e)}}}function Fe(s,e){if(e.indexOf("ws:")!==0&&e.indexOf("wss:")!==0){e="wss:"+e}var t=v.createWebSocket(e);t.onerror=function(e){nt(s,"htmx:wsError",{error:e,socket:t});Pe(s)};N(s).webSocket=t;t.addEventListener("message",function(e){if(Pe(s)){return}var t=e.data;ot(s,function(e){t=e.transformResponse(t,null,s)});var r=kt(s);var n=u(t);var i=p(n.children);for(var o=0;o<i.length;o++){var a=i[o];$(R(a,"hx-swap-oob")||"true",a,r)}gt(r.tasks)})}function Pe(e){if(!M(e)){N(e).webSocket.close();return true}}function Ue(u){var l=h(u,function(e){return N(e).webSocket!=null});if(l){var f=N(l).webSocket;u.addEventListener(Ce(u)[0].trigger,function(e){var t=qt(u,l);var r=Ot(u,"post");var n=r.errors;var i=r.values;var o=jt(u);var a=k(i,o);var s=Nt(a,u);s["HEADERS"]=t;if(n&&n.length>0){st(u,"htmx:validation:halted",n);return}f.send(JSON.stringify(s));if(Re(u)){e.preventDefault()}})}else{nt(u,"htmx:noWebSocketSourceError")}}function je(e,t,r){var n=y(r);for(var i=0;i<n.length;i++){var o=n[i].split(/:(.+)/);if(o[0]==="connect"){ze(e,o[1])}if(o[0]==="swap"){Ve(e,o[1])}}}function ze(t,e){var r=v.createEventSource(e);r.onerror=function(e){nt(t,"htmx:sseError",{error:e,source:r});We(t)};N(t).sseEventSource=r}function Ve(o,a){var s=h(o,Be);if(s){var u=N(s).sseEventSource;var l=function(e){if(We(s)){u.removeEventListener(a,l);return}var t=e.data;ot(o,function(e){t=e.transformResponse(t,null,o)});var r=It(o);var n=V(o);var i=kt(o);ce(r.swapStyle,o,n,t,i);st(o,"htmx:sseMessage",e)};N(o).sseListener=l;u.addEventListener(a,l)}else{nt(o,"htmx:noSSESourceError")}}function _e(e,t,r,n){var i=h(e,Be);if(i){var o=N(i).sseEventSource;var a=function(){if(!We(i)){if(M(e)){Bt(t,r,e)}else{o.removeEventListener(n,a)}}};N(e).sseListener=a;o.addEventListener(n,a)}else{nt(e,"htmx:noSSESourceError")}}function We(e){if(!M(e)){N(e).sseEventSource.close();return true}}function Be(e){return N(e).sseEventSource!=null}function $e(e,t,r,n,i){var o=function(){if(!n.loaded){n.loaded=true;Bt(t,r,e)}};if(i){setTimeout(o,i)}else{o()}}function Je(n,i,e){var o=false;I(t,function(t){if(a(n,"hx-"+t)){var r=R(n,"hx-"+t);o=true;i.path=r;i.verb=t;e.forEach(function(e){if(e.sseEvent){_e(n,t,r,e.sseEvent)}else if(e.trigger==="revealed"){ke();De(n)}else if(e.trigger==="load"){$e(n,t,r,i,e.delay)}else if(e.pollInterval){i.polling=true;Ae(n,t,r,e.pollInterval)}else{Ne(n,t,r,i,e)}})}});return o}function Ze(e){if(e.type==="text/javascript"||e.type===""){try{Ft(e,function(){Function(e.innerText)()})}catch(e){at(e)}}}function Ge(e){if(d(e,"script")){Ze(e)}I(E(e,"script"),function(e){Ze(e)})}function Ye(){return document.querySelector("[hx-boost], [data-hx-boost]")}function Ke(e){if(e.querySelectorAll){var t=Ye()?", a, form":"";var r=e.querySelectorAll(n+t+", [hx-sse], [data-hx-sse], [hx-ws],"+" [data-hx-ws]");return r}else{return[]}}function Qe(e){var t=N(e);if(!t.initialized){t.initialized=true;st(e,"htmx:beforeProcessNode");if(e.value){t.lastValue=e.value}var r=Ce(e);var n=Je(e,t,r);if(!n&&q(e,"hx-boost")==="true"){Te(e,t,r)}var i=R(e,"hx-sse");if(i){je(e,t,i)}var o=R(e,"hx-ws");if(o){Xe(e,t,o)}st(e,"htmx:afterProcessNode")}}function et(e){e=P(e);Qe(e);I(Ke(e),function(e){Qe(e)})}function tt(e){return e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function rt(e,t){var r;if(window.CustomEvent&&typeof window.CustomEvent==="function"){r=new CustomEvent(e,{bubbles:true,cancelable:true,detail:t})}else{r=H().createEvent("CustomEvent");r.initCustomEvent(e,true,true,t)}return r}function nt(e,t,r){st(e,t,k({error:t},r))}function it(e){return e==="htmx:afterProcessNode"}function ot(e,t){I(Kt(e),function(e){try{t(e)}catch(e){at(e)}})}function at(e){if(console.error){console.error(e)}else if(console.log){console.log("ERROR: ",e)}}function st(e,t,r){e=P(e);if(r==null){r={}}r["elt"]=e;var n=rt(t,r);if(v.logger&&!it(t)){v.logger(e,t,r)}if(r.error){at(r.error);st(e,"htmx:error",{errorInfo:r})}var i=e.dispatchEvent(n);var o=tt(t);if(i&&o!==t){var a=rt(o,n.detail);i=i&&e.dispatchEvent(a)}ot(e,function(e){i=i&&e.onEvent(t,n)!==false});return i}var ut=null;function lt(){var e=H().querySelector("[hx-history-elt],[data-hx-history-elt]");return e||H().body}function ft(e,t,r,n){var i=x(localStorage.getItem("htmx-history-cache"))||[];for(var o=0;o<i.length;o++){if(i[o].url===e){i.splice(o,1);break}}i.push({url:e,content:t,title:r,scroll:n});while(i.length>v.config.historyCacheSize){i.shift()}while(i.length>0){try{localStorage.setItem("htmx-history-cache",JSON.stringify(i));return}catch(e){nt(H().body,"htmx:historyCacheError",{cause:e,cache:i});i.shift()}}}function ct(e){var t=x(localStorage.getItem("htmx-history-cache"))||[];for(var r=0;r<t.length;r++){if(t[r].url===e){return t[r]}}return null}function ht(e){var t=v.config.requestClass;var r=e.cloneNode(true);I(E(r,"."+t),function(e){A(e,t)});return r.innerHTML}function vt(){var e=lt();var t=ut||location.pathname+location.search;st(H().body,"htmx:beforeHistorySave",{path:t,historyElt:e});if(v.config.historyEnabled)history.replaceState({htmx:true},H().title,window.location.href);ft(t,ht(e),H().title,window.scrollY)}function dt(e){if(v.config.historyEnabled)history.pushState({htmx:true},"",e);ut=e}function gt(e){I(e,function(e){e.call()})}function pt(n){var e=new XMLHttpRequest;var i={path:n,xhr:e};st(H().body,"htmx:historyCacheMiss",i);e.open("GET",n,true);e.setRequestHeader("HX-History-Restore-Request","true");e.onload=function(){if(this.status>=200&&this.status<400){st(H().body,"htmx:historyCacheMissLoad",i);var e=u(this.response);e=e.querySelector("[hx-history-elt],[data-hx-history-elt]")||e;var t=lt();var r=kt(t);ae(t,e,r);gt(r.tasks);ut=n}else{nt(H().body,"htmx:historyCacheMissLoadError",i)}};e.send()}function mt(e){vt();e=e||location.pathname+location.search;st(H().body,"htmx:historyRestore",{path:e});var t=ct(e);if(t){var r=u(t.content);var n=lt();var i=kt(n);ae(n,r,i);gt(i.tasks);document.title=t.title;window.scrollTo(0,t.scroll);ut=e}else{if(v.config.refreshOnHistoryMiss){window.location.reload(true)}else{pt(e)}}}function yt(e){var t=q(e,"hx-push-url");return t&&t!=="false"||e.tagName==="A"&&N(e).boosted}function xt(e){var t=q(e,"hx-push-url");return t==="true"||t==="false"?null:t}function bt(e){St(e,"add")}function wt(e){St(e,"remove")}function St(e,t){var r=q(e,"hx-indicator");if(r){var n=X(e,r)}else{n=[e]}I(n,function(e){e.classList[t].call(e.classList,v.config.requestClass)})}function Et(e,t){for(var r=0;r<e.length;r++){var n=e[r];if(n.isSameNode(t)){return true}}return false}function Ct(e){if(e.name===""||e.name==null||e.disabled){return false}if(e.type==="button"||e.type==="submit"||e.tagName==="image"||e.tagName==="reset"||e.tagName==="file"){return false}if(e.type==="checkbox"||e.type==="radio"){return e.checked}return true}function Lt(t,r,n,e,i){if(e==null||Et(t,e)){return}else{t.push(e)}if(Ct(e)){var o=l(e,"name");var a=e.value;if(e.multiple){a=p(e.querySelectorAll("option:checked")).map(function(e){return e.value})}if(e.files){a=p(e.files)}if(o!=null&&a!=null){var s=r[o];if(s){if(Array.isArray(s)){if(Array.isArray(a)){r[o]=s.concat(a)}else{s.push(a)}}else{if(Array.isArray(a)){r[o]=[s].concat(a)}else{r[o]=[s,a]}}}else{r[o]=a}}if(i){At(e,n)}}if(d(e,"form")){var u=e.elements;I(u,function(e){Lt(t,r,n,e,i)})}}function At(e,t){if(e.willValidate){st(e,"htmx:validation:validate");if(!e.checkValidity()){t.push({elt:e,message:e.validationMessage,validity:e.validity});st(e,"htmx:validation:failed",{message:e.validationMessage,validity:e.validity})}}}function Ot(e,t){var r=[];var n={};var i={};var o=[];var a=d(e,"form")&&e.noValidate!==true;if(t!=="get"){Lt(r,i,o,D(e,"form"),a)}Lt(r,n,o,e,a);var s=q(e,"hx-include");if(s){var u=X(e,s);I(u,function(e){Lt(r,n,o,e,a);if(!d(e,"form")){I(e.querySelectorAll(Ee),function(e){Lt(r,n,o,e,a)})}})}n=k(n,i);return{errors:o,values:n}}function Tt(e,t,r){if(e!==""){e+="&"}e+=encodeURIComponent(t)+"="+encodeURIComponent(r);return e}function Rt(e){var t="";for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){I(n,function(e){t=Tt(t,r,e)})}else{t=Tt(t,r,n)}}}return t}function Ht(e){var t=new FormData;for(var r in e){if(e.hasOwnProperty(r)){var n=e[r];if(Array.isArray(n)){I(n,function(e){t.append(r,e)})}else{t.append(r,n)}}}return t}function qt(e,t,r){var n={"HX-Request":"true","HX-Trigger":l(e,"id"),"HX-Trigger-Name":l(e,"name"),"HX-Target":R(t,"id"),"HX-Current-URL":H().location.href};Xt(e,"hx-headers",false,n);if(r!==undefined){n["HX-Prompt"]=r}return n}function Nt(t,e){var r=q(e,"hx-params");if(r){if(r==="none"){return{}}else if(r==="*"){return t}else if(r.indexOf("not ")===0){I(r.substr(4).split(","),function(e){e=e.trim();delete t[e]});return t}else{var n={};I(r.split(","),function(e){e=e.trim();n[e]=t[e]});return n}}else{return t}}function It(e){var t=q(e,"hx-swap");var r={swapStyle:N(e).boosted?"innerHTML":v.config.defaultSwapStyle,swapDelay:v.config.defaultSwapDelay,settleDelay:v.config.defaultSettleDelay};if(t){var n=y(t);if(n.length>0){r["swapStyle"]=n[0];for(var i=1;i<n.length;i++){var o=n[i];if(o.indexOf("swap:")===0){r["swapDelay"]=f(o.substr(5))}if(o.indexOf("settle:")===0){r["settleDelay"]=f(o.substr(7))}if(o.indexOf("scroll:")===0){r["scroll"]=o.substr(7)}if(o.indexOf("show:")===0){r["show"]=o.substr(5)}}}}return r}function Mt(t,r,n){var i=null;ot(r,function(e){if(i==null){i=e.encodeParameters(t,n,r)}});if(i!=null){return i}else{if(q(r,"hx-encoding")==="multipart/form-data"){return Ht(n)}else{return Rt(n)}}}function kt(e){return{tasks:[],elts:[e]}}function Dt(e,t){var r=e[0];var n=e[e.length-1];if(t.scroll){if(t.scroll==="top"&&r){r.scrollTop=0}if(t.scroll==="bottom"&&n){n.scrollTop=n.scrollHeight}}if(t.show){if(t.show==="top"&&r){r.scrollIntoView(true)}if(t.show==="bottom"&&n){n.scrollIntoView(false)}}}function Xt(e,t,r,n){if(n==null){n={}}if(e==null){return n}var i=R(e,t);if(i){var o=i.trim();var a=r;if(o.indexOf("javascript:")===0){o=o.substr(11);a=true}if(o.indexOf("{")!==0){o="{"+o+"}"}var s;if(a){s=Ft(e,function(){return Function("return ("+o+")")()},{})}else{s=x(o)}for(var u in s){if(s.hasOwnProperty(u)){if(n[u]==null){n[u]=s[u]}}}}return Xt(c(e),t,r,n)}function Ft(e,t,r){if(v.config.allowEval){return t()}else{nt(e,"htmx:evalDisallowedError");return r}}function Pt(e,t){return Xt(e,"hx-vars",true,t)}function Ut(e,t){return Xt(e,"hx-vals",false,t)}function jt(e){return k(Pt(e),Ut(e))}function zt(t,r,n){if(n!==null){try{t.setRequestHeader(r,n)}catch(e){t.setRequestHeader(r,encodeURIComponent(n));t.setRequestHeader(r+"-URI-AutoEncoded","true")}}}function Vt(t){if(t.responseURL&&typeof URL!=="undefined"){try{var e=new URL(t.responseURL);return e.pathname+e.search}catch(e){nt(H().body,"htmx:badResponseUrl",{url:t.responseURL})}}}function _t(e,t){return e.getAllResponseHeaders().match(t)}function Wt(e,t,r){if(r){if(r instanceof Element||o(r,"String")){Bt(e,t,null,null,null,P(r))}else{Bt(e,t,P(r.source),r.event,r.handler,P(r.target))}}else{Bt(e,t)}}function Bt(e,t,r,n,i,o){if(r==null){r=H().body}if(i==null){i=$t}if(!M(r)){return}var a=o||V(r);if(a==null){nt(r,"htmx:targetError",{target:R(r,"hx-target")});return}var s=N(r);if(s.requestInFlight){s.queuedRequest=function(){Bt(e,t,r,n)};return}else{s.requestInFlight=true}var u=function(){s.requestInFlight=false;var e=s.queuedRequest;s.queuedRequest=null;if(e){e()}};var l=q(r,"hx-prompt");if(l){var f=prompt(l);if(f===null||!st(r,"htmx:prompt",{prompt:f,target:a}))return u()}var c=q(r,"hx-confirm");if(c){if(!confirm(c))return u()}var h=new XMLHttpRequest;var v=qt(r,a,f);var d=Ot(r,e);var g=d.errors;var p=d.values;var m=jt(r);var y=k(p,m);var x=Nt(y,r);if(e!=="get"&&q(r,"hx-encoding")==null){v["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8"}if(t==null||t===""){t=H().location.href}var b={parameters:x,unfilteredParameters:y,headers:v,target:a,verb:e,errors:g,path:t,triggeringEvent:n};if(!st(r,"htmx:configRequest",b))return u();t=b.path;e=b.verb;v=b.headers;x=b.parameters;g=b.errors;if(g&&g.length>0){st(r,"htmx:validation:halted",b);return u()}var w=t.split("#");var S=w[0];var E=w[1];if(e==="get"){var C=S;var L=Object.keys(x).length!==0;if(L){if(C.indexOf("?")<0){C+="?"}else{C+="&"}C+=Rt(x);if(E){C+="#"+E}}h.open("GET",C,true)}else{h.open(e.toUpperCase(),t,true)}h.overrideMimeType("text/html");for(var A in v){if(v.hasOwnProperty(A)){var O=v[A];zt(h,A,O)}}var T={xhr:h,target:a,requestConfig:b,pathInfo:{path:t,finalPath:C,anchor:E}};h.onload=function(){try{i(r,T)}catch(e){nt(r,"htmx:onLoadError",k({error:e},T));throw e}finally{wt(r);var e=N(r).replacedWith||r;st(e,"htmx:afterRequest",T);st(e,"htmx:afterOnLoad",T);u()}};h.onerror=function(){wt(r);nt(r,"htmx:afterRequest",T);nt(r,"htmx:sendError",T);u()};h.onabort=function(){wt(r);u()};if(!st(r,"htmx:beforeRequest",T))return u();bt(r);I(["loadstart","loadend","progress","abort"],function(t){I([h,h.upload],function(e){e.addEventListener(t,function(e){st(r,"htmx:xhr:"+t,{lengthComputable:e.lengthComputable,loaded:e.loaded,total:e.total})})})});h.send(e==="get"?null:Mt(h,r,x))}function $t(o,a){var s=a.xhr;var u=a.target;if(!st(o,"htmx:beforeOnLoad",a))return;if(_t(s,/HX-Trigger:/i)){he(s,"HX-Trigger",o)}if(_t(s,/HX-Push:/i)){var l=s.getResponseHeader("HX-Push")}if(_t(s,/HX-Redirect:/i)){window.location.href=s.getResponseHeader("HX-Redirect");return}if(_t(s,/HX-Refresh:/i)){if("true"===s.getResponseHeader("HX-Refresh")){location.reload();return}}var f=yt(o)||l;if(s.status>=200&&s.status<400){if(s.status===286){Le(o)}if(s.status!==204){if(!st(u,"htmx:beforeSwap",a))return;var c=s.response;ot(o,function(e){c=e.transformResponse(c,s,o)});if(f){vt()}var h=It(o);u.classList.add(v.config.swappingClass);var e=function(){try{var e=document.activeElement;var t={elt:e,start:e?e.selectionStart:null,end:e?e.selectionEnd:null};var r=kt(u);ce(h.swapStyle,u,o,c,r);if(t.elt&&!M(t.elt)&&t.elt.id){var n=document.getElementById(t.elt.id);if(n){if(t.start&&n.setSelectionRange){n.setSelectionRange(t.start,t.end)}n.focus()}}u.classList.remove(v.config.swappingClass);I(r.elts,function(e){if(e.classList){e.classList.add(v.config.settlingClass)}st(e,"htmx:afterSwap",a)});if(a.pathInfo.anchor){location.hash=a.pathInfo.anchor}if(_t(s,/HX-Trigger-After-Swap:/i)){he(s,"HX-Trigger-After-Swap",o)}var i=function(){I(r.tasks,function(e){e.call()});I(r.elts,function(e){if(e.classList){e.classList.remove(v.config.settlingClass)}st(e,"htmx:afterSettle",a)});if(f){var e=l||xt(o)||Vt(s)||a.pathInfo.finalPath||a.pathInfo.path;dt(e);st(H().body,"htmx:pushedIntoHistory",{path:e})}Dt(r.elts,h);if(_t(s,/HX-Trigger-After-Settle:/i)){he(s,"HX-Trigger-After-Settle",o)}};if(h.settleDelay>0){setTimeout(i,h.settleDelay)}else{i()}}catch(e){nt(o,"htmx:swapError",a);throw e}};if(h.swapDelay>0){setTimeout(e,h.swapDelay)}else{e()}}}else{nt(o,"htmx:responseError",k({error:"Response Status Error Code "+s.status+" from "+a.pathInfo.path},a))}}var Jt={};function Zt(){return{onEvent:function(e,t){return true},transformResponse:function(e,t,r){return e},isInlineSwap:function(e){return false},handleSwap:function(e,t,r,n){return false},encodeParameters:function(e,t,r){return null}}}function Gt(e,t){Jt[e]=k(Zt(),t)}function Yt(e){delete Jt[e]}function Kt(e,r,n){if(e==undefined){return r}if(r==undefined){r=[]}if(n==undefined){n=[]}var t=R(e,"hx-ext");if(t){I(t.split(","),function(e){e=e.replace(/ /g,"");if(e.slice(0,7)=="ignore:"){n.push(e.slice(7));return}if(n.indexOf(e)<0){var t=Jt[e];if(t&&r.indexOf(t)<0){r.push(t)}}})}return Kt(c(e),r,n)}function Qt(e){if(H().readyState!=="loading"){e()}else{H().addEventListener("DOMContentLoaded",e)}}function er(){if(v.config.includeIndicatorStyles!==false){H().head.insertAdjacentHTML("beforeend","<style>                      ."+v.config.indicatorClass+"{opacity:0;transition: opacity 200ms ease-in;}                      ."+v.config.requestClass+" ."+v.config.indicatorClass+"{opacity:1}                      ."+v.config.requestClass+"."+v.config.indicatorClass+"{opacity:1}                    </style>")}}function tr(){var e=H().querySelector('meta[name="htmx-config"]');if(e){return x(e.content)}else{return null}}function rr(){var e=tr();if(e){v.config=k(v.config,e)}}Qt(function(){rr();er();var e=H().body;et(e);window.onpopstate=function(e){if(e.state&&e.state.htmx){mt()}};setTimeout(function(){st(e,"htmx:load",{})},0)});return v}()});
var kt=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var V=(n,e,t,r)=>{for(var i=r>1?void 0:r?xt(e,t):e,o=n.length-1,s;o>=0;o--)(s=n[o])&&(i=(r?s(e,t,i):s(i))||i);return r&&i&&kt(e,t,i),i};var W=globalThis,Q=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ne=Symbol(),Ee=new WeakMap,R=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==ne)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Q&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=Ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Ee.set(t,e))}return e}toString(){return this.cssText}},Te=n=>new R(typeof n=="string"?n:n+"",void 0,ne),oe=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((r,i,o)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new R(t,n,ne)},Se=(n,e)=>{if(Q)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),i=W.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,n.appendChild(r)}},se=Q?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return Te(t)})(n):n;var{is:wt,defineProperty:vt,getOwnPropertyDescriptor:bt,getOwnPropertyNames:_t,getOwnPropertySymbols:Ct,getPrototypeOf:$t}=Object,Z=globalThis,Pe=Z.trustedTypes,At=Pe?Pe.emptyScript:"",Bt=Z.reactiveElementPolyfillSupport,M=(n,e)=>n,F={toAttribute(n,e){switch(e){case Boolean:n=n?At:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},K=(n,e)=>!wt(n,e),Ne={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&vt(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){let{get:i,set:o}=bt(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){let c=i?.call(this);o?.call(this,s),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ne}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let e=$t(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let t=this.properties,r=[..._t(t),...Ct(t)];for(let i of r)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)t.unshift(se(i))}else e!==void 0&&t.push(se(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Se(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:F).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let o=r.getPropertyOptions(i),s=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:F;this._$Em=i;let c=s.fromAttribute(t,o.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(e,t,r,i=!1,o){if(e!==void 0){let s=this.constructor;if(i===!1&&(o=this[e]),r??=s.getPropertyOptions(e),!((r.hasChanged??K)(o,t)||r.useDefault&&r.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:o},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),o!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,o]of r){let{wrapped:s}=o,c=this[i];s!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[M("elementProperties")]=new Map,x[M("finalized")]=new Map,Bt?.({ReactiveElement:x}),(Z.reactiveElementVersions??=[]).push("2.1.2");var ue=globalThis,Re=n=>n,G=ue.trustedTypes,Me=G?G.createPolicy("lit-html",{createHTML:n=>n}):void 0,He="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,De="?"+v,Et=`<${De}>`,$=document,U=()=>$.createComment(""),L=n=>n===null||typeof n!="object"&&typeof n!="function",me=Array.isArray,Tt=n=>me(n)||typeof n?.[Symbol.iterator]=="function",ae=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Fe=/-->/g,Oe=/>/g,_=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Le=/"/g,je=/^(?:script|style|textarea|title)$/i,ge=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),g=ge(1),ar=ge(2),cr=ge(3),w=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),qe=new WeakMap,C=$.createTreeWalker($,129);function Ie(n,e){if(!me(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Me!==void 0?Me.createHTML(e):e}var St=(n,e)=>{let t=n.length-1,r=[],i,o=e===2?"<svg>":e===3?"<math>":"",s=O;for(let c=0;c<t;c++){let a=n[c],l,u,h=-1,y=0;for(;y<a.length&&(s.lastIndex=y,u=s.exec(a),u!==null);)y=s.lastIndex,s===O?u[1]==="!--"?s=Fe:u[1]!==void 0?s=Oe:u[2]!==void 0?(je.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=_):u[3]!==void 0&&(s=_):s===_?u[0]===">"?(s=i??O,h=-1):u[1]===void 0?h=-2:(h=s.lastIndex-u[2].length,l=u[1],s=u[3]===void 0?_:u[3]==='"'?Le:Ue):s===Le||s===Ue?s=_:s===Fe||s===Oe?s=O:(s=_,i=void 0);let f=s===_&&n[c+1].startsWith("/>")?" ":"";o+=s===O?a+Et:h>=0?(r.push(l),a.slice(0,h)+He+a.slice(h)+v+f):a+v+(h===-2?c:f)}return[Ie(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},q=class n{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let o=0,s=0,c=e.length-1,a=this.parts,[l,u]=St(e,t);if(this.el=n.createElement(l,r),C.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=C.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(He)){let y=u[s++],f=i.getAttribute(h).split(v),k=/([.?@])?(.*)/.exec(y);a.push({type:1,index:o,name:k[2],strings:f,ctor:k[1]==="."?le:k[1]==="?"?de:k[1]==="@"?he:E}),i.removeAttribute(h)}else h.startsWith(v)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(je.test(i.tagName)){let h=i.textContent.split(v),y=h.length-1;if(y>0){i.textContent=G?G.emptyScript:"";for(let f=0;f<y;f++)i.append(h[f],U()),C.nextNode(),a.push({type:2,index:++o});i.append(h[y],U())}}}else if(i.nodeType===8)if(i.data===De)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:o}),h+=v.length-1}o++}}static createElement(e,t){let r=$.createElement("template");return r.innerHTML=e,r}};function B(n,e,t=n,r){if(e===w)return e;let i=r!==void 0?t._$Co?.[r]:t._$Cl,o=L(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,t,r)),r!==void 0?(t._$Co??=[])[r]=i:t._$Cl=i),i!==void 0&&(e=B(n,i._$AS(n,e.values),i,r)),e}var ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,i=(e?.creationScope??$).importNode(t,!0);C.currentNode=i;let o=C.nextNode(),s=0,c=0,a=r[0];for(;a!==void 0;){if(s===a.index){let l;a.type===2?l=new H(o,o.nextSibling,this,e):a.type===1?l=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(l=new pe(o,this,e)),this._$AV.push(l),a=r[++c]}s!==a?.index&&(o=C.nextNode(),s++)}return C.currentNode=$,i}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},H=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),L(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T($.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=q.createElement(Ie(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(t);else{let o=new ce(i,this),s=o.u(this.options);o.p(t),this.T(s),this._$AH=o}}_$AC(e){let t=qe.get(e.strings);return t===void 0&&qe.set(e.strings,t=new q(e)),t}k(e){me(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,i=0;for(let o of e)i===t.length?t.push(r=new n(this.O(U()),this.O(U()),this,this.options)):r=t[i],r._$AI(o),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=Re(e).nextSibling;Re(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(e,t=this,r,i){let o=this.strings,s=!1;if(o===void 0)e=B(this,e,t,0),s=!L(e)||e!==this._$AH&&e!==w,s&&(this._$AH=e);else{let c=e,a,l;for(e=o[0],a=0;a<o.length-1;a++)l=B(this,c[r+a],t,a),l===w&&(l=this._$AH[a]),s||=!L(l)||l!==this._$AH[a],l===p?e=p:e!==p&&(e+=(l??"")+o[a+1]),this._$AH[a]=l}s&&!i&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},le=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},de=class extends E{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},he=class extends E{constructor(e,t,r,i,o){super(e,t,r,i,o),this.type=5}_$AI(e,t=this){if((e=B(this,e,t,0)??p)===w)return;let r=this._$AH,i=e===p&&r!==p||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==p&&(r===p||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},pe=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}};var Pt=ue.litHtmlPolyfillSupport;Pt?.(q,H),(ue.litHtmlVersions??=[]).push("3.3.3");var ze=(n,e,t)=>{let r=t?.renderBefore??e,i=r._$litPart$;if(i===void 0){let o=t?.renderBefore??null;r._$litPart$=i=new H(e.insertBefore(U(),o),o,void 0,t??{})}return i._$AI(n),i};var fe=globalThis,b=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};b._$litElement$=!0,b.finalized=!0,fe.litElementHydrateSupport?.({LitElement:b});var Nt=fe.litElementPolyfillSupport;Nt?.({LitElement:b});(fe.litElementVersions??=[]).push("4.2.2");var Rt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:K},Mt=(n=Rt,e,t)=>{let{kind:r,metadata:i}=t,o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),r==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(t.name,n),r==="accessor"){let{name:s}=t;return{set(c){let a=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,a,n,!0,c)},init(c){return c!==void 0&&this.C(s,void 0,n,c),c}}}if(r==="setter"){let{name:s}=t;return function(c){let a=this[s];e.call(this,c),this.requestUpdate(s,a,n,!0,c)}}throw Error("Unsupported decorator location: "+r)};function J(n){return(e,t)=>typeof t=="object"?Mt(n,e,t):((r,i,o)=>{let s=i.hasOwnProperty(o);return i.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(i,o):void 0})(n,e,t)}function ye(n){return J({...n,state:!0,attribute:!1})}var Ve={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},We=n=>(...e)=>({_$litDirective$:n,values:e}),X=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,r){this._$Ct=e,this._$AM=t,this._$Ci=r}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var D=class extends X{constructor(e){if(super(e),this.it=p,e.type!==Ve.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===p||e==null)return this._t=void 0,this.it=e;if(e===w)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};D.directiveName="unsafeHTML",D.resultType=1;var Qe=We(D);var Ze=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<path d="M150,50 q-10,-10 0,-20 q10,-10 0,-20" fill="none" stroke="#55BBF8" stroke-width="7" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -12" dur="3s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="0s" repeatCount="indefinite"></animate></path><path d="M200,50 q-10,-10 0,-20 q10,-10 0,-20" fill="none" stroke="#55BBF8" stroke-width="7" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -12" dur="3s" begin="1s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite"></animate></path><path d="M250,50 q-10,-10 0,-20 q10,-10 0,-20" fill="none" stroke="#55BBF8" stroke-width="7" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -12" dur="3s" begin="2s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite"></animate></path><line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c5"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c5)"><g><animateTransform attributeName="transform" type="rotate" values="0 200 228;360 200 228" dur="5s" repeatCount="indefinite"></animateTransform><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var Ke=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;-5 0;5 0;-5 0;5 0;0 0;0 0" keyTimes="0;.05;.1;.15;.2;.25;1" dur="2s" repeatCount="indefinite"></animateTransform><line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="17" fill="#FB8C00"><animate attributeName="r" values="17;21;17" dur="1.2s" repeatCount="indefinite"></animate></circle><line x1="270" y1="76" x2="270" y2="88" stroke="#fff" stroke-width="6" stroke-linecap="round"></line><circle cx="270" cy="97" r="3.5" fill="#fff"></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c10"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c10)"><g><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path></g>
</svg>
`;var Ge=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"></circle><circle class="paper" cx="200" cy="228" r="76" stroke="currentColor" stroke-width="10"></circle><circle class="glass" cx="200" cy="228" r="60"></circle><rect x="170" y="244" width="60" height="14" rx="5" fill="#55BBF8" opacity="1"></rect><rect x="170" y="228" width="60" height="14" rx="5" fill="#55BBF8" opacity="0.7"></rect><rect x="170" y="212" width="60" height="14" rx="5" fill="#55BBF8" opacity="0.45"></rect><g transform="translate(106 0)"><g><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;.14;.28;.78;.90;1" values="1 1;1 1;-.55 1;-.55 1;1 1;1 1" calcMode="spline" keySplines="0 0 1 1;.45 0 .55 1;0 0 1 1;.45 0 .55 1;0 0 1 1"></animateTransform><g transform="translate(-106 0)"><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c11"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c11)"></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path></g></g></g><g transform="translate(262 168)"><path d="M0,-13 Q1.9,-1.9 13,0 Q1.9,1.9 0,13 Q-1.9,1.9 -13,0 Q-1.9,-1.9 0,-13Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.48;0.58;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.42;0.48;0.58;1" values="0;0;1.2;0;0"></animateTransform></path></g><g transform="translate(140 300)"><path d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.54;0.64;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.54;0.64;1" values="0;0;1.2;0;0"></animateTransform></path></g><g transform="translate(252 300)"><path d="M0,-9 Q1.3,-1.3 9,0 Q1.3,1.3 0,9 Q-1.3,1.3 -9,0 Q-1.3,-1.3 0,-9Z" fill="#55BBF8" opacity="0"><animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.59;0.69;1" values="0;0;1;0;0"></animate><animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite" keyTimes="0;0.53;0.59;0.69;1" values="0;0;1.2;0;0"></animateTransform></path></g>
</svg>
`;var Je=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c6"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c6)"><path d="M100,256 q15,-8 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V340 H100Z" fill="#55BBF8" opacity="0.5"><animateTransform attributeName="transform" type="translate" values="0 0;60 0" dur="2s" repeatCount="indefinite"></animateTransform></path><path d="M180,268 q-8,-10 0,-20 q8,-10 0,-20 q-8,-10 0,-20" fill="none" stroke="#FB8C00" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -10" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"></animate></path><path d="M200,268 q-8,-10 0,-20 q8,-10 0,-20 q-8,-10 0,-20" fill="none" stroke="#FB8C00" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -10" dur="2s" begin="0.7s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.7s" repeatCount="indefinite"></animate></path><path d="M220,268 q-8,-10 0,-20 q8,-10 0,-20 q-8,-10 0,-20" fill="none" stroke="#FB8C00" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 10;0 -10" dur="2s" begin="1.4s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.4s" repeatCount="indefinite"></animate></path></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var Ye=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g opacity=".45"><line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle class="knob-off" cx="270" cy="86" r="15"></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c0"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c0)"></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path></g>
</svg>
`;var Xe=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="18" fill="#55BBF8"></circle><line x1="264" y1="78" x2="264" y2="94" stroke="#fff" stroke-width="5" stroke-linecap="round"></line><line x1="276" y1="78" x2="276" y2="94" stroke="#fff" stroke-width="5" stroke-linecap="round"></line><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c8"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c8)"><g><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var et=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c1"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c1)"><g><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var tt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c3"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c3)"><g><animateTransform attributeName="transform" type="rotate" values="0 200 228;360 200 228" dur="4s" repeatCount="indefinite"></animateTransform><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g><line x1="172" y1="158" x2="172" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></line><line x1="190" y1="158" x2="190" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0.4s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.4s" repeatCount="indefinite"></animate></line><line x1="208" y1="158" x2="208" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0.15s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.15s" repeatCount="indefinite"></animate></line><line x1="226" y1="158" x2="226" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0.6s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.6s" repeatCount="indefinite"></animate></line><line x1="184" y1="158" x2="184" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0.8s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.8s" repeatCount="indefinite"></animate></line><line x1="216" y1="158" x2="216" y2="170" stroke="#55BBF8" stroke-width="5" stroke-linecap="round" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 0;0 130" dur="1.1s" begin="0.3s" repeatCount="indefinite"></animateTransform><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.8;1" dur="1s" begin="0.3s" repeatCount="indefinite"></animate></line></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var rt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="19" fill="#55BBF8"></circle><line x1="270" y1="86" x2="270" y2="75" stroke="#fff" stroke-width="4" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="0 270 86;360 270 86" dur="4s" repeatCount="indefinite"></animateTransform></line><line x1="270" y1="86" x2="277" y2="86" stroke="#fff" stroke-width="4" stroke-linecap="round"></line><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c9"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c9)"><g><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var it=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;-2 1;2 -1;0 0" keyTimes="0;.33;.66;1" dur=".25s" repeatCount="indefinite"></animateTransform><line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c4"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c4)"><g><animateTransform attributeName="transform" type="rotate" values="0 200 228;360 200 228" dur=".45s" repeatCount="indefinite"></animateTransform><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path><path d="M200,144 A84,84 0 0 1 259,169" fill="none" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="1"><animateTransform attributeName="transform" type="rotate" values="0 200 228;360 200 228" dur=".6s" repeatCount="indefinite"></animateTransform></path><path d="M200,144 A84,84 0 0 1 259,169" fill="none" stroke="#55BBF8" stroke-width="6" stroke-linecap="round" opacity="0.6"><animateTransform attributeName="transform" type="rotate" values="180 200 228;540 200 228" dur=".6s" repeatCount="indefinite"></animateTransform></path></g>
</svg>
`;var nt=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c2"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c2)"><path d="M100,236 q15,-8 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V340 H100Z" fill="#55BBF8" opacity="0.35"><animateTransform attributeName="transform" type="translate" values="0 0;60 0" dur="1.4s" repeatCount="indefinite"></animateTransform></path><g><animateTransform attributeName="transform" type="rotate" values="0 200 228;360 200 228" dur="3s" repeatCount="indefinite"></animateTransform><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g><path d="M100,248 q15,-8 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 V340 H100Z" fill="#55BBF8" opacity="0.8"><animateTransform attributeName="transform" type="translate" values="0 0;60 0" dur="2s" repeatCount="indefinite"></animateTransform></path><circle class="paper" cx="178" cy="278" r="6" stroke="#55BBF8" stroke-width="3" opacity="0"><animate attributeName="cy" values="278;188" dur="2.2s" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.2s" begin="0s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="212" cy="278" r="8" stroke="#55BBF8" stroke-width="3" opacity="0"><animate attributeName="cy" values="278;188" dur="2.2s" begin="0.8s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.2s" begin="0.8s" repeatCount="indefinite"></animate></circle><circle class="paper" cx="232" cy="278" r="5" stroke="#55BBF8" stroke-width="3" opacity="0"><animate attributeName="cy" values="278;188" dur="2.2s" begin="1.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.2s" begin="1.5s" repeatCount="indefinite"></animate></circle></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path>
</svg>
`;var ot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" aria-hidden="true">
<g><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 4;0 0;0 0" keyTimes="0;.3;.36;.45;1" dur="2s" repeatCount="indefinite"></animateTransform><line x1="104" y1="354" x2="104" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<line x1="296" y1="354" x2="296" y2="360" stroke="currentColor" stroke-width="8" stroke-linecap="round"></line>
<rect class="paper" x="80" y="58" width="240" height="294" rx="18" stroke="currentColor" stroke-width="10"></rect>
<line x1="80" y1="114" x2="320" y2="114" stroke="currentColor" stroke-width="10" stroke-linecap="round"></line>
<rect x="98" y="74" width="50" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="7"></rect>
<rect x="170" y="76" width="54" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="6"></rect>
<line x1="186" y1="85" x2="208" y2="85" stroke="#55BBF8" stroke-width="5" stroke-linecap="round"></line>
<circle cx="294" cy="328" r="11" fill="none" stroke="currentColor" stroke-width="6"></circle>
<circle cx="270" cy="86" r="15" fill="#55BBF8"></circle><circle class="paper" cx="200" cy="228" r="94" stroke="currentColor" stroke-width="10"></circle><clipPath id="c7"><circle cx="200" cy="228" r="70"></circle></clipPath><circle class="glass" cx="200" cy="228" r="70"></circle><g clip-path="url(#c7)"><g><animateTransform attributeName="transform" type="translate" values="0 -70;0 0;0 -8;0 0;0 0" keyTimes="0;.3;.4;.5;1" dur="2s" repeatCount="indefinite"></animateTransform><g><rect x="170" y="238" width="34" height="18" rx="9" fill="#55BBF8"></rect><circle cx="222" cy="250" r="17" fill="#55BBF8" opacity=".7"></circle><rect x="204" y="190" width="24" height="16" rx="8" fill="#55BBF8" opacity=".55"></rect></g></g></g><circle cx="200" cy="228" r="72" fill="none" stroke="currentColor" stroke-width="7"></circle><path d="M250,174 q22,22 12,62" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"></path><path class="paper-stroke" d="M154,200 A54,54 0 0 1 180,178" fill="none" stroke-width="6" stroke-linecap="round" opacity=".9"></path></g>
</svg>
`;var j={phase:{domain:"sensor",match:/_program_phase$/},program:{domain:"sensor",match:/_program_name$/},error:{domain:"sensor",match:/_error$/},remaining:{domain:"sensor",match:/_remaining_time$/},start_time:{domain:"sensor",match:/_start_time$/},end_time:{domain:"sensor",match:/_end_time$/},temperature:{domain:"sensor",match:/_temperature$/},spin_speed:{domain:"sensor",match:/_spin_speed$/},rinses:{domain:"sensor",match:/_remaining_rinse_iterations$/},weight:{domain:"sensor",match:/_estimated_weight$/},energy:{domain:"sensor",match:/_current_electricity_used$/},water:{domain:"sensor",match:/_current_water_used$/},door:{domain:"binary_sensor",match:/_door_status$/},door_lock:{domain:"binary_sensor",match:/_door_lock$/},child_lock:{domain:"binary_sensor",match:/_child_lock$/},detergent:{domain:"sensor",match:/_detergent_level$/},energy_saving:{domain:"binary_sensor",match:/_energy_saving$/},night_wash:{domain:"binary_sensor",match:/_night_wash$/},steam:{domain:"binary_sensor",match:/_steam$/},cycle:{domain:"sensor",match:/_current_wash_cycle$/},mean_water:{domain:"sensor",match:/_mean_water_consumption$/}},Qt={entity:"Washing machine mode sensor (hOn)",name:"Name",phase:"Program phase",program:"Program name",error:"Error",remaining:"Remaining time",start_time:"Start time",end_time:"End time",temperature:"Temperature",spin_speed:"Spin speed",rinses:"Remaining rinses",weight:"Estimated weight",energy:"Electricity used this cycle",water:"Water used this cycle",door:"Door",door_lock:"Door lock",child_lock:"Child lock",detergent:"Detergent level",energy_saving:"Energy saving",night_wash:"Night wash",steam:"Steam",cycle:"Current wash cycle",mean_water:"Mean water consumption"},Zt={0:"disconnected",1:"ready",2:"running",3:"paused",4:"scheduled",5:"scheduled",6:"error",7:"finished",8:"running",9:"ending"},Kt={0:"ready",1:"washing",2:"washing",3:"spin",4:"rinse",5:"rinse",6:"rinse",7:"drying",8:"drying",9:"steam",10:"ready",11:"spin",12:"weighing",13:"weighing",14:"washing",15:"washing",16:"washing",17:"rinse",18:"rinse",19:"scheduled",20:"tumbling",24:"refresh",25:"washing",26:"heating",27:"washing"};function Gt(n,e){return n==="3"?1:n==="11"||n==="10"?2:e==="rinse"?1:e==="spin"||e==="drying"?2:0}var Jt={"100000000000":"E2","8000000000000":"E4","400000000000000":"Unb"},st=new Set(["00","0","","None","unknown","unavailable"]),Yt=new Set(["","None","unknown","unavailable"]),Xt={off:Ye,ready:et,weighing:ot,heating:Je,washing:nt,rinse:tt,spin:it,drying:Ze,paused:Xe,scheduled:rt,error:Ke,finished:Ge},er={weighing:"weighing",heating:"heating",rinse:"rinse",spin:"spin",drying:"drying",steam:"drying",scheduled:"scheduled"},tr={disconnected:"grey",ready:"grey",running:"blue",paused:"amber",scheduled:"purple",error:"orange",finished:"green",ending:"blue"},at=n=>n>=60?`${Math.floor(n/60)} h${n%60?` ${n%60} min`:""}`:`${n} min`,ct={en:{title:"Washing machine",modes:{disconnected:"Disconnected",ready:"Ready",running:"Running",paused:"Paused",scheduled:"Scheduled",error:"Error",finished:"Finished",ending:"Ending"},phases:{ready:"Ready",weighing:"Weighing",heating:"Heating",washing:"Washing",tumbling:"Tumbling",refresh:"Refresh",rinse:"Rinse",spin:"Spin",drying:"Drying",steam:"Steam",scheduled:"Scheduled"},errorLabel:n=>`Error ${n}`,errors:{E2:"Check if the door is closed",E4:"Check the water supply",Unb:"The machine might be overloaded"},offline:"Machine powered off or offline",noProgram:"No program running",noProgramRow:"No program",program:"Program",phase:"Phase",remaining:"Remaining",endsAt:"Ends at",startsAt:"Starts at",finishedRow:"Finished",door:"Door",open:"Open",closed:"Closed",duration:at,ago:n=>`${n} ago`,steps:["Wash","Rinse","Spin"],rinsesLeft:n=>`Rinse \xB7 ${n} left`,energy:"Energy",water:"Water",load:"Load",energySaving:"Energy saving",nightWash:"Night wash",steam:"Steam",doorLocked:"Door locked",doorUnlocked:"Door unlocked",detergent:n=>`Detergent ${n}%`,detergentEmpty:"Detergent empty",childLock:"Child lock on",footer:(n,e)=>[n&&`Cycle ${n}`,e&&`${e} L average per cycle`].filter(Boolean).join(" \xB7 "),missing:"Entity not found"},it:{title:"Lavatrice",modes:{disconnected:"Disconnessa",ready:"Pronta",running:"In funzione",paused:"In pausa",scheduled:"Programmata",error:"Errore",finished:"Finita",ending:"In chiusura"},phases:{ready:"Pronta",weighing:"Pesatura",heating:"Riscaldamento",washing:"Lavaggio",tumbling:"Rotazione",refresh:"Rinfresco",rinse:"Risciacquo",spin:"Centrifuga",drying:"Asciugatura",steam:"Vapore",scheduled:"Programmata"},errorLabel:n=>`Errore ${n}`,errors:{E2:"Controlla che l'obl\xF2 sia chiuso",E4:"Controlla l'alimentazione dell'acqua",Unb:"La lavatrice potrebbe essere sovraccarica"},offline:"Lavatrice spenta o non raggiungibile",noProgram:"Nessun programma in corso",noProgramRow:"Nessuno",program:"Programma",phase:"Fase",remaining:"Mancano",endsAt:"Fine alle",startsAt:"Parte alle",finishedRow:"Finita",door:"Obl\xF2",open:"Aperto",closed:"Chiuso",duration:at,ago:n=>`${n} fa`,steps:["Lavaggio","Risciacquo","Centrifuga"],rinsesLeft:n=>`Risciacquo \xB7 ${n}`,energy:"Energia",water:"Acqua",load:"Carico",energySaving:"Risparmio energetico",nightWash:"Lavaggio notturno",steam:"Vapore",doorLocked:"Obl\xF2 bloccato",doorUnlocked:"Obl\xF2 sbloccato",detergent:n=>`Detersivo ${n}%`,detergentEmpty:"Detersivo finito",childLock:"Blocco bambini attivo",footer:(n,e)=>[n&&`Ciclo ${n}`,e&&`${e} L in media per ciclo`].filter(Boolean).join(" \xB7 "),missing:"Entit\xE0 non trovata"}},T=class extends b{constructor(){super(...arguments);this.tick=0;this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");this.onMotionChange=()=>this.requestUpdate()}static getConfigForm(){let t=(r,i)=>({name:r,selector:{entity:{filter:{domain:i}}}});return{schema:[{name:"entity",required:!0,selector:{entity:{filter:{domain:"sensor",integration:"hon"}}}},{name:"name",selector:{text:{}}},{type:"expandable",name:"",title:"Entities (found automatically on the washing machine's device)",schema:Object.keys(j).map(r=>t(r,j[r].domain))}],computeLabel:r=>Qt[r.name]}}static getStubConfig(t){return{entity:Object.values(t.entities).find(i=>i.platform==="hon"&&i.translation_key==="wash_mode")?.entity_id??"sensor.washing_machine_mode"}}setConfig(t){if(!t.entity)throw new Error("entity is required: the hOn washing machine mode sensor");this.config=t}getCardSize(){return 7}connectedCallback(){super.connectedCallback(),this.clock=window.setInterval(()=>this.tick++,6e4),this.reducedMotion.addEventListener("change",this.onMotionChange)}disconnectedCallback(){super.disconnectedCallback(),window.clearInterval(this.clock),this.reducedMotion.removeEventListener("change",this.onMotionChange)}get t(){return(this.hass?.locale.language.split("-")[0]??"en")==="it"?ct.it:ct.en}entities(){let t=this.hass,r=this.config,i=t.entities[r.entity]?.device_id,o=i?Object.values(t.entities).filter(c=>c.device_id===i&&c.platform==="hon"):[],s={};for(let c of Object.keys(j)){let{domain:a,match:l}=j[c],u=r[c]??o.find(h=>h.entity_id.startsWith(`${a}.`)&&l.test(h.entity_id))?.entity_id;u&&t.states[u]&&(s[c]=t.states[u])}return s}shouldUpdate(t){if(!t.has("hass")||t.size>1)return!0;let r=t.get("hass");if(!r||!this.hass||!this.config||r.locale!==this.hass.locale||r.entities!==this.hass.entities)return!0;let i=this.config;return[i.entity,...Object.keys(j).map(s=>i[s]),...Object.values(this.entities()).map(s=>s.entity_id)].filter(s=>!!s).some(s=>r.states[s]!==this.hass.states[s])}updated(){let t=this.renderRoot.querySelector(".art svg");t&&(this.reducedMotion.matches?(t.pauseAnimations(),t.setCurrentTime(0)):t.unpauseAnimations())}time(t){return t.toLocaleTimeString(this.hass?.locale.language,{hour:"2-digit",minute:"2-digit"})}since(t){let r=Math.max(0,Math.round((Date.now()-new Date(t).getTime())/6e4));return r<2880?this.t.duration(r):`${Math.round(r/1440)} d`}moreInfo(t,r){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:r},bubbles:!0,composed:!0}))}pill(t){let r=t.entity?g`<ha-state-icon .hass=${this.hass} .stateObj=${t.entity}></ha-state-icon>`:g`<ha-icon icon=${t.icon}></ha-icon>`;return g`<span
      class="pill ${t.kind} ${t.entity?"link":""}"
      @click=${t.entity?i=>this.moreInfo(i,t.entity.entity_id):void 0}
      >${r}${t.text}</span
    >`}render(){if(!this.hass||!this.config)return p;this.tick;let t=this.t,r=this.config,i=this.hass.states[r.entity];if(!i)return g`<ha-card><div class="missing">${t.missing}: ${r.entity}</div></ha-card>`;let o=this.entities(),s=d=>{let m=o[d]?.state;return m===void 0||Yt.has(m)?void 0:m},c=d=>{let m=Number(s(d));return s(d)===void 0||Number.isNaN(m)?void 0:m},a=d=>o[d]?.state==="on",l=Zt[i.state]??"disconnected",u=l==="disconnected",h=l==="running"||l==="paused"||l==="ending"||l==="error",y=s("phase")??"0",f=Kt[y],k=s("error")??"00",S=!u&&(!st.has(k)||l==="error"),P=Jt[k],ke=P?t.errors[P]:S&&!st.has(k)?this.hass.formatEntityState?.(o.error)??k:"",ee=o.program&&s("program")&&s("program")!=="No program"?o.program:void 0,te=ee?this.hass.formatEntityState?.(ee)??ee.state:"",xe=c("temperature"),we=c("spin_speed"),lt=[te,xe?`${xe}\xB0`:"",we?`${we} rpm`:""].filter(Boolean).join(" \xB7 "),dt=S?t.errorLabel(P??"").trim():t.modes[l],ht=S?"orange":tr[l],pt=u?t.offline:l==="ready"?t.noProgram:lt||t.modes[l],ut=S?"error":l==="disconnected"?"off":l==="ready"?"ready":l==="paused"?"paused":l==="scheduled"?"scheduled":l==="finished"?"finished":l==="ending"?"spin":(f&&er[f])??"washing",I=c("remaining")??0,ve=s("end_time"),mt=ve?this.time(new Date(ve)):I>0?this.time(new Date(Date.now()+I*6e4)):"\u2014",be=s("start_time"),A;if(u)A=[[t.program,"\u2014"],[t.remaining,"\u2014"]];else if(l==="ready")A=[[t.program,t.noProgramRow],[t.door,a("door")?t.open:t.closed]];else if(l==="scheduled")A=[[t.program,te||"\u2014"],[t.startsAt,be?this.time(new Date(be)):"\u2014"]];else if(l==="finished"){let d=i.last_changed;A=[[t.program,te||"\u2014"],[t.finishedRow,`${this.time(new Date(d))} \xB7 ${t.ago(this.since(d))}`]]}else A=[[t.phase,f?t.phases[f]:"\u2014"],[t.remaining,I>0?t.duration(I):"\u2014"],[t.endsAt,mt]];let _e=u?[]:[a("energy_saving")&&t.energySaving,a("night_wash")&&t.nightWash,a("steam")&&t.steam].filter(d=>!!d),z=l==="finished"?3:l==="ending"?2:h?Gt(y,f):-1,Ce=c("rinses")??0,gt=t.steps.map((d,m)=>{let ie=m===1&&Ce>0&&z>=0&&z<=1?t.rinsesLeft(Ce):d,yt=m<z?l==="finished"?"complete":"done":m===z?`current ${S?"error":l==="paused"?"paused":""}`:"";return g`<div class="step ${yt}"><span></span><label>${ie}</label></div>`}),re=(d,m,ie)=>d===void 0?"\u2014":`${d.toFixed(m)} ${ie}`,$e=h||l==="finished"?[[t.energy,re(c("energy"),2,"kWh")],[t.water,re(c("water"),0,"L")],[t.load,re(c("weight"),0,"kg")]]:[],N=[];if(!u){o.door_lock&&N.push({text:a("door_lock")?t.doorLocked:t.doorUnlocked,entity:o.door_lock,icon:"mdi:lock",kind:"neutral"});let d=c("detergent");d!==void 0&&N.push({text:d<=0?t.detergentEmpty:t.detergent(Math.round(d)),entity:o.detergent,icon:"mdi:bottle-tonic-outline",kind:d<=10?"bad":"ok"}),a("child_lock")&&N.push({text:t.childLock,entity:o.child_lock,icon:"mdi:lock",kind:"neutral"})}let ft=s("cycle")??"",Ae=c("mean_water"),Be=t.footer(ft,Ae===void 0?"":String(Math.round(Ae)));return g`
      <ha-card class="tone-${ht}" @click=${d=>this.moreInfo(d,r.entity)}>
        <div class="head">
          <div class="titles">
            <div class="name">${r.name??t.title}</div>
            <div class="muted">${pt}</div>
          </div>
          <span class="chip">${dt}</span>
        </div>
        ${ke?g`<div class="alert">
              ${P?g`<strong>${P}</strong>`:p}<span>${ke}</span>
            </div>`:p}
        <div class="body">
          <div class="art">${Qe(Xt[ut])}</div>
          <div class="facts">
            ${A.map(([d,m])=>g`<div class="fact"><span class="muted">${d}</span><span>${m}</span></div>`)}
            ${_e.length?g`<div class="options">${_e.map(d=>g`<span>${d}</span>`)}</div>`:p}
          </div>
        </div>
        <div class="steps">${gt}</div>
        ${$e.length?g`<div class="stats">
              ${$e.map(([d,m])=>g`<div class="stat"><span class="muted">${d}</span><span>${m}</span></div>`)}
            </div>`:p}
        ${N.length?g`<div class="pills">${N.map(d=>this.pill(d))}</div>`:p}
        ${Be?g`<div class="footer muted">${Be}</div>`:p}
      </ha-card>`}static{this.styles=oe`
    ha-card {
      --hwc-blue: var(--blue-color, #2196f3);
      --hwc-ok: var(--success-color, #43a047);
      --hwc-warn: var(--warning-color, #fb8c00);
      --hwc-amber: var(--amber-color, #ffc107);
      --hwc-tone: var(--secondary-text-color);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .tone-blue {
      --hwc-tone: var(--hwc-blue);
    }
    .tone-amber {
      --hwc-tone: var(--hwc-amber);
    }
    .tone-purple {
      --hwc-tone: var(--deep-purple-color, #673ab7);
    }
    .tone-orange {
      --hwc-tone: var(--hwc-warn);
    }
    .tone-green {
      --hwc-tone: var(--hwc-ok);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .titles {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .muted,
    .missing {
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .chip {
      padding: 5px 12px;
      border-radius: 16px;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
      /* Pulled toward the text color so light tones stay readable on light themes. */
      color: color-mix(in srgb, var(--hwc-tone) 65%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-tone) 16%, transparent);
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: color-mix(in srgb, var(--hwc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-warn) 16%, transparent);
    }
    .alert strong {
      font-weight: 500;
    }
    .body {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .art {
      width: 136px;
      height: 136px;
      flex: none;
      color: var(--primary-text-color);
    }
    .art svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .art .paper {
      fill: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .paper-stroke {
      stroke: var(--card-background-color, var(--ha-card-background, #fff));
    }
    .art .glass {
      fill: color-mix(in srgb, var(--hwc-blue) 12%, var(--card-background-color, #fff));
    }
    .art .knob-off {
      fill: var(--disabled-text-color, #bdbdbd);
    }
    .facts {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fact {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .fact .muted {
      font-size: 14px;
    }
    .fact span:last-child {
      font-weight: 500;
      text-align: right;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
    }
    .options span {
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      color: color-mix(in srgb, var(--hwc-blue) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-blue) 16%, transparent);
    }
    .steps,
    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px;
    }
    .stats {
      gap: 8px;
    }
    .step span {
      display: block;
      height: 6px;
      border-radius: 3px;
      background: var(--divider-color);
    }
    .step.done span {
      background: color-mix(in srgb, var(--primary-color) 45%, transparent);
    }
    .step.current span {
      background: var(--primary-color);
    }
    .step.current.paused span {
      background: var(--hwc-amber);
    }
    .step.current.error span {
      background: var(--hwc-warn);
    }
    .step.complete span {
      background: var(--hwc-ok);
    }
    .step label {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .step.current label {
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    }
    .stat .muted {
      font-size: 12px;
    }
    .stat span:last-child {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      --mdc-icon-size: 16px;
    }
    .pill ha-state-icon,
    .pill ha-icon {
      --state-icon-color: currentColor;
      color: var(--secondary-text-color);
    }
    .pill.ok ha-state-icon,
    .pill.ok ha-icon {
      color: var(--hwc-ok);
    }
    .pill.bad {
      color: color-mix(in srgb, var(--hwc-warn) 70%, var(--primary-text-color));
      background: color-mix(in srgb, var(--hwc-warn) 16%, transparent);
    }
    .pill.bad ha-state-icon,
    .pill.bad ha-icon {
      color: inherit;
    }
    .pill.link {
      cursor: pointer;
    }
    .footer {
      font-size: 12px;
    }
  `}};V([J({attribute:!1})],T.prototype,"hass",2),V([ye()],T.prototype,"config",2),V([ye()],T.prototype,"tick",2);customElements.get("hon-washer-card")||customElements.define("hon-washer-card",T);window.customCards=window.customCards??[];window.customCards.some(n=>n.type==="hon-washer-card")||window.customCards.push({type:"hon-washer-card",name:"hOn Washer Card",description:"Cycle steps, end time, consumption and status for an hOn (Haier, Candy, Hoover) washing machine.",preview:!0,documentationURL:"https://github.com/enricodeleo/hon-washer-card"});console.info("%c hon-washer-card 0.1.0 ","background:#55bbf8;color:#111");export{T as HonWasherCard};

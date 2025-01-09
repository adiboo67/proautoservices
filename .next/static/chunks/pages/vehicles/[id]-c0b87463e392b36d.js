(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{8813:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/vehicles/[id]",function(){return s(6957)}])},6530:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var a=s(5893),r=s(7294),i=s(1163),n=s(9008);function o(e){let{children:t,allowedRoles:s}=e,o=(0,i.useRouter)(),[l,c]=(0,r.useState)(!0);async function d(){try{let{data:{session:e}}=await n.O.auth.getSession();if(!e){o.push("/auth/login");return}if(s){let{data:t}=await n.O.from("users").select("role").eq("id",e.user.id).single();if(!t||!s.includes(t.role)){o.push("/");return}}}catch(e){console.error("Error checking auth:",e),o.push("/auth/login")}finally{c(!1)}}return((0,r.useEffect)(()=>{d()},[]),l)?(0,a.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"})}):(0,a.jsx)(a.Fragment,{children:t})}},4645:function(e,t,s){"use strict";s.d(t,{Z:function(){return c}});var a=s(5893),r=s(7294),i=s(1163),n=s(9008),o=s(2920);function l(){return(0,a.jsx)("div",{className:"flex justify-center items-center p-4",children:(0,a.jsx)("img",{src:"/images/mechanic-duck.png.png",alt:"M\xe9canicien",className:"w-48 h-48 object-contain",style:{maxWidth:"100%",height:"auto"}})})}function c(e){let{children:t,title:s}=e,c=(0,i.useRouter)(),[d,u]=(0,r.useState)(!1),[m,p]=(0,r.useState)(null);(0,r.useEffect)(()=>{(async()=>{let{data:{user:e}}=await n.O.auth.getUser();if(e){let{data:t,error:s}=await n.O.from("users").select("full_name").eq("id",e.id).single();t&&t.full_name?p(t.full_name):p(e.email||null)}})()},[]);let x=async()=>{try{let{error:e}=await n.O.auth.signOut();if(e)throw e;c.push("/auth/login"),o.Am.success("D\xe9connexion r\xe9ussie")}catch(e){o.Am.error("Erreur lors de la d\xe9connexion"),console.error("Error:",e)}};return(0,a.jsxs)("div",{className:"min-h-screen bg-gray-100",children:[(0,a.jsx)("div",{className:"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ".concat(d?"translate-x-0":"-translate-x-full"," lg:translate-x-0 transition-transform duration-200 ease-in-out"),children:(0,a.jsxs)("div",{className:"flex flex-col h-full",children:[(0,a.jsx)("div",{className:"flex items-center justify-center h-16 px-4 bg-blue-600",children:(0,a.jsx)("h2",{className:"text-xl font-semibold text-white",children:"ProAutoServices"})}),(0,a.jsx)("div",{className:"px-4 py-3 bg-gray-50",children:(0,a.jsxs)("p",{className:"text-sm font-medium text-gray-900",children:["Bonjour ",m]})}),(0,a.jsx)("div",{className:"flex-shrink-0",children:(0,a.jsx)(l,{})}),(0,a.jsx)("nav",{className:"flex-1 px-4 py-4 space-y-1"}),(0,a.jsx)("div",{className:"p-4 border-t",children:(0,a.jsx)("button",{onClick:x,className:"w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"D\xe9connexion"})})]})}),(0,a.jsxs)("div",{className:"lg:pl-64",children:[(0,a.jsxs)("div",{className:"sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm",children:[(0,a.jsx)("button",{onClick:()=>u(!d),className:"p-2 text-gray-500 lg:hidden",children:(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),(0,a.jsx)("h1",{className:"text-xl font-semibold text-gray-900",children:s}),(0,a.jsx)("div",{className:"w-6 lg:hidden"})," "]}),(0,a.jsx)("main",{className:"p-4",children:t})]})]})}},7318:function(e,t,s){"use strict";s.d(t,{Z:function(){return l}});var a=s(5893),r=s(7294),i=s(8877),n=s.n(i),o=s(6501);function l(e){let{onSave:t=()=>{},existingSignature:s}=e,i=(0,r.useRef)(null),[l,c]=(0,r.useState)(!!s);return(0,a.jsx)("div",{className:"space-y-4",children:l&&s?(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("img",{src:s,alt:"Signature existante",className:"border rounded-lg p-2 bg-white"}),(0,a.jsx)("button",{onClick:()=>c(!1),className:"text-sm text-blue-600 hover:text-blue-800",children:"Modifier la signature"})]}):(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("div",{className:"border rounded-lg bg-white",children:(0,a.jsx)(n(),{ref:i,canvasProps:{className:"signature-canvas w-full h-40"}})}),(0,a.jsxs)("div",{className:"flex justify-end space-x-2",children:[(0,a.jsx)("button",{onClick:()=>{var e;null===(e=i.current)||void 0===e||e.clear()},className:"px-3 py-1 text-sm text-gray-600 hover:text-gray-800",children:"Effacer"}),(0,a.jsx)("button",{onClick:()=>{var e,s;if(null===(e=i.current)||void 0===e?void 0:e.isEmpty()){o.ZP.error("Veuillez signer avant de sauvegarder");return}let a=null===(s=i.current)||void 0===s?void 0:s.toDataURL();a&&t&&(t(a),o.ZP.success("Signature enregistr\xe9e"))},className:"px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700",children:"Sauvegarder"})]})]})})}},9008:function(e,t,s){"use strict";s.d(t,{O:function(){return a}});let a=(0,s(6490).eI)("https://pjxtjkmqgkbisgfleaps.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHRqa21xZ2tiaXNnZmxlYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTAzMzAsImV4cCI6MjA1MTc2NjMzMH0.UjKK4kSJDapIRx0iJvdHiJZzMbi99tDx52FmSq4qyfE",{auth:{persistSession:!0,autoRefreshToken:!0}})},6957:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var a=s(5893),r=s(7294),i=s(1163),n=s(9008),o=s(4645),l=s(6530),c=s(7318),d=s(6501);function u(){let{id:e}=(0,i.useRouter)().query,[t,s]=(0,r.useState)(null);(0,r.useEffect)(()=>{e&&u()},[e]);let u=async()=>{try{let{data:t,error:a}=await n.O.from("vehicles").select("*").eq("id",e).single();if(a)throw a;s(t)}catch(e){d.ZP.error(e.message)}},m=async t=>{try{if(!e)return;let{error:s}=await n.O.from("vehicles").update({client_signature:t}).eq("id",e);if(s)throw s;d.ZP.success("Signature enregistr\xe9e")}catch(e){d.ZP.error(e.message)}};return t?(0,a.jsx)(l.Z,{allowedRoles:["secretary"],children:(0,a.jsx)(o.Z,{title:"V\xe9hicule - ".concat(t.brand_model),children:(0,a.jsx)("div",{className:"py-6",children:(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,a.jsx)("div",{className:"bg-white shadow rounded-lg",children:(0,a.jsxs)("div",{className:"px-4 py-5 sm:p-6",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Informations client"}),(0,a.jsxs)("dl",{className:"mt-2 text-sm text-gray-500",children:[(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Nom"}),(0,a.jsx)("dd",{children:t.client_name})]}),(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Adresse"}),(0,a.jsx)("dd",{children:t.client_address})]}),(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"T\xe9l\xe9phone"}),(0,a.jsx)("dd",{children:t.phone})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Informations v\xe9hicule"}),(0,a.jsxs)("dl",{className:"mt-2 text-sm text-gray-500",children:[(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Marque et mod\xe8le"}),(0,a.jsx)("dd",{children:t.brand_model})]}),(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Kilom\xe9trage"}),(0,a.jsxs)("dd",{children:[t.mileage," km"]})]}),(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Date d'entr\xe9e"}),(0,a.jsx)("dd",{children:new Date(t.entry_date).toLocaleDateString()})]}),(0,a.jsxs)("div",{className:"mt-1",children:[(0,a.jsx)("dt",{className:"font-medium",children:"Statut"}),(0,a.jsx)("dd",{className:"capitalize",children:t.status.replace("_"," ")})]})]})]})]}),(0,a.jsxs)("div",{className:"mt-6",children:[(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:"Description des travaux"}),(0,a.jsx)("p",{className:"mt-2 text-sm text-gray-500",children:t.work_description})]}),(0,a.jsxs)("div",{className:"mt-6",children:[(0,a.jsx)("h3",{className:"text-lg font-medium text-gray-900 mb-4",children:"Signature du client"}),(0,a.jsx)(c.Z,{onSave:m,existingSignature:t.signature})]})]})})})})})}):null}},6501:function(e,t,s){"use strict";let a,r;s.d(t,{ZP:function(){return Q},Am:function(){return C}});var i,n=s(7294);let o={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||o,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",a="",r="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":a+="f"==i[1]?m(n,i):i+"{"+m(n,"k"==i[1]?"":t)+"}":"object"==typeof n?a+=m(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),r+=m.p?m.p(i,n):i+":"+n+";")}return s+(t&&r?t+"{"+r+"}":r)+a},p={},x=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+x(e[s]);return t}return e},h=(e,t,s,a,r)=>{var i;let n=x(e),o=p[n]||(p[n]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(n));if(!p[o]){let t=n!==e?e:(e=>{let t,s,a=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?a.shift():t[3]?(s=t[3].replace(u," ").trim(),a.unshift(a[0][s]=a[0][s]||{})):a[0][t[1]]=t[2].replace(u," ").trim();return a[0]})(e);p[o]=m(r?{["@keyframes "+o]:t}:t,s?"":"."+o)}let l=s&&p.g?p.g:null;return s&&(p.g=p[o]),i=p[o],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),o},f=(e,t,s)=>e.reduce((e,a,r)=>{let i=t[r];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"");function g(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}g.bind({g:1});let y,b,v,j=g.bind({k:1});function N(e,t){let s=this||{};return function(){let a=arguments;function r(i,n){let o=Object.assign({},i),l=o.className||r.className;s.p=Object.assign({theme:b&&b()},o),s.o=/ *go\d+/.test(l),o.className=g.apply(s,a)+(l?" "+l:""),t&&(o.ref=n);let c=e;return e[0]&&(c=o.as||e,delete o.as),v&&c[0]&&v(o),y(c,o)}return t?t(r):r}}var w=e=>"function"==typeof e,k=(e,t)=>w(e)?e(t):e,E=(a=0,()=>(++a).toString()),_=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return I(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+r}))}}},S=[],z={toasts:[],pausedAt:void 0},O=e=>{z=I(z,e),S.forEach(e=>{e(z)})},Z=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||E()}),$=e=>(t,s)=>{let a=Z(t,e,s);return O({type:2,toast:a}),a.id},C=(e,t)=>$("blank")(e,t);C.error=$("error"),C.success=$("success"),C.loading=$("loading"),C.custom=$("custom"),C.dismiss=e=>{O({type:3,toastId:e})},C.remove=e=>O({type:4,toastId:e}),C.promise=(e,t,s)=>{let a=C.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let r=t.success?k(t.success,e):void 0;return r?C.success(r,{id:a,...s,...null==s?void 0:s.success}):C.dismiss(a),e}).catch(e=>{let r=t.error?k(t.error,e):void 0;r?C.error(r,{id:a,...s,...null==s?void 0:s.error}):C.dismiss(a)}),e};var M=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,A=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,D=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,q=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${A} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,P=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,R=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,T=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,L=N("div")`
  position: absolute;
`,X=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:s,iconTheme:a}=e;return void 0!==t?"string"==typeof t?n.createElement(H,null,t):t:"blank"===s?null:n.createElement(X,null,n.createElement(J,{...a}),"loading"!==s&&n.createElement(L,null,"error"===s?n.createElement(q,{...a}):n.createElement(T,{...a})))},V=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Y=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,K=N("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=(e,t)=>{let s=e.includes("top")?1:-1,[a,r]=_()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[V(s),Y(s)];return{animation:t?`${j(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:e,position:t,style:s,children:a})=>{let r=e.height?G(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(U,{toast:e}),o=n.createElement(W,{...e.ariaProps},k(e.message,e));return n.createElement(K,{className:e.className,style:{...r,...s,...e.style}},"function"==typeof a?a({icon:i,message:o}):n.createElement(n.Fragment,null,i,o))}),i=n.createElement,m.p=void 0,y=i,b=void 0,v=void 0,g`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Q=C}},function(e){e.O(0,[574,877,774,888,179],function(){return e(e.s=8813)}),_N_E=e.O()}]);
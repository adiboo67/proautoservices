(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[590],{1826:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/vehicles",function(){return r(6350)}])},6530:function(e,t,r){"use strict";r.d(t,{Z:function(){return n}});var s=r(5893),i=r(7294),a=r(1163),o=r(9008);function n(e){let{children:t,allowedRoles:r}=e,n=(0,a.useRouter)(),[l,c]=(0,i.useState)(!0);async function d(){try{let{data:{session:e}}=await o.O.auth.getSession();if(!e){n.push("/auth/login");return}if(r){let{data:t}=await o.O.from("users").select("role").eq("id",e.user.id).single();if(!t||!r.includes(t.role)){n.push("/");return}}}catch(e){console.error("Error checking auth:",e),n.push("/auth/login")}finally{c(!1)}}return((0,i.useEffect)(()=>{d()},[]),l)?(0,s.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,s.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"})}):(0,s.jsx)(s.Fragment,{children:t})}},4645:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var s=r(5893),i=r(7294),a=r(1163),o=r(9008),n=r(2920);function l(){return(0,s.jsx)("div",{className:"flex justify-center items-center p-4",children:(0,s.jsx)("img",{src:"/images/mechanic-duck.png.png",alt:"M\xe9canicien",className:"w-48 h-48 object-contain",style:{maxWidth:"100%",height:"auto"}})})}function c(e){let{children:t,title:r}=e,c=(0,a.useRouter)(),[d,u]=(0,i.useState)(!1),[m,p]=(0,i.useState)(null);(0,i.useEffect)(()=>{(async()=>{let{data:{user:e}}=await o.O.auth.getUser();if(e){let{data:t,error:r}=await o.O.from("users").select("full_name").eq("id",e.id).single();t&&t.full_name?p(t.full_name):p(e.email||null)}})()},[]);let f=async()=>{try{let{error:e}=await o.O.auth.signOut();if(e)throw e;c.push("/auth/login"),n.Am.success("D\xe9connexion r\xe9ussie")}catch(e){n.Am.error("Erreur lors de la d\xe9connexion"),console.error("Error:",e)}};return(0,s.jsxs)("div",{className:"min-h-screen bg-gray-100",children:[(0,s.jsx)("div",{className:"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ".concat(d?"translate-x-0":"-translate-x-full"," lg:translate-x-0 transition-transform duration-200 ease-in-out"),children:(0,s.jsxs)("div",{className:"flex flex-col h-full",children:[(0,s.jsx)("div",{className:"flex items-center justify-center h-16 px-4 bg-blue-600",children:(0,s.jsx)("h2",{className:"text-xl font-semibold text-white",children:"ProAutoServices"})}),(0,s.jsx)("div",{className:"px-4 py-3 bg-gray-50",children:(0,s.jsxs)("p",{className:"text-sm font-medium text-gray-900",children:["Bonjour ",m]})}),(0,s.jsx)("div",{className:"flex-shrink-0",children:(0,s.jsx)(l,{})}),(0,s.jsx)("nav",{className:"flex-1 px-4 py-4 space-y-1"}),(0,s.jsx)("div",{className:"p-4 border-t",children:(0,s.jsx)("button",{onClick:f,className:"w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"D\xe9connexion"})})]})}),(0,s.jsxs)("div",{className:"lg:pl-64",children:[(0,s.jsxs)("div",{className:"sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm",children:[(0,s.jsx)("button",{onClick:()=>u(!d),className:"p-2 text-gray-500 lg:hidden",children:(0,s.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),(0,s.jsx)("h1",{className:"text-xl font-semibold text-gray-900",children:r}),(0,s.jsx)("div",{className:"w-6 lg:hidden"})," "]}),(0,s.jsx)("main",{className:"p-4",children:t})]})]})}},1915:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var s=r(5893),i=r(7294),a=r(5675),o=r.n(a),n=r(9008),l=r(2920);function c(e){let{imageUrl:t,onUpload:r,onDelete:a,index:c}=e,[d,u]=(0,i.useState)(!1),[m,p]=(0,i.useState)(null);(0,i.useEffect)(()=>{t&&p(null)},[t]);let f=async e=>{try{var t;if(u(!0),!e.target.files||0===e.target.files.length)throw Error("Veuillez s\xe9lectionner une image");let s=e.target.files[0],i=(null===(t=s.name.split(".").pop())||void 0===t?void 0:t.toLowerCase())||"";if(!["jpg","jpeg","png","gif"].includes(i))throw Error("Format de fichier non support\xe9. Utilisez JPG, PNG ou GIF");if(s.size>5242880)throw Error("La taille du fichier ne doit pas d\xe9passer 5MB");let a="".concat(Date.now(),"-").concat(Math.random().toString(36).substr(2,9),".").concat(i),o=new FileReader;o.onloadend=()=>{p(o.result)},o.readAsDataURL(s);let{error:l,data:c}=await n.O.storage.from("vehicle-photos").upload(a,s,{cacheControl:"3600",upsert:!1,contentType:"image/".concat("jpg"===i?"jpeg":i)});if(l)throw console.error("Upload error details:",l),Error(l.message);if(null==c?void 0:c.path){let{data:e}=n.O.storage.from("vehicle-photos").getPublicUrl(a);if(null==e?void 0:e.publicUrl)r(e.publicUrl);else throw Error("Erreur lors de la r\xe9cup\xe9ration de l'URL publique")}else throw Error("Erreur lors du t\xe9l\xe9chargement du fichier")}catch(e){console.error("Upload error:",e),l.Am.error(e.message||"Erreur lors du t\xe9l\xe9chargement"),p(null)}finally{u(!1)}},h=async()=>{if(a)try{if(t){let e=t.split("/").pop();if(e){let{error:t}=await n.O.storage.from("vehicle-photos").remove([e]);if(t)throw console.error("Error deleting file:",t),Error("Erreur lors de la suppression du fichier")}}p(null),a()}catch(e){console.error("Error in handleDelete:",e),l.Am.error(e.message||"Erreur lors de la suppression de l'image")}},g=t||m;return(0,s.jsx)("div",{className:"relative w-full h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors",children:g?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o(),{src:g,alt:"Photo ".concat(c+1),fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain p-2 rounded-lg",unoptimized:null!==m,priority:0===c}),(0,s.jsx)("button",{onClick:h,className:"absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10",type:"button",title:"Supprimer la photo",children:"\xd7"})]}):(0,s.jsxs)("label",{className:"flex flex-col items-center justify-center w-full h-full cursor-pointer",children:[(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[(0,s.jsx)("svg",{className:"w-8 h-8 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),(0,s.jsxs)("p",{className:"text-sm text-gray-500",children:["Photo ",c+1]}),d&&(0,s.jsx)("div",{className:"mt-2 text-sm text-blue-500",children:"Chargement..."})]}),(0,s.jsx)("input",{type:"file",className:"hidden",accept:"image/jpeg,image/png,image/gif",onChange:f,disabled:d})]})})}},9008:function(e,t,r){"use strict";r.d(t,{O:function(){return s}});let s=(0,r(6490).eI)("https://pjxtjkmqgkbisgfleaps.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHRqa21xZ2tiaXNnZmxlYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTAzMzAsImV4cCI6MjA1MTc2NjMzMH0.UjKK4kSJDapIRx0iJvdHiJZzMbi99tDx52FmSq4qyfE",{auth:{persistSession:!0,autoRefreshToken:!0}})},6350:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return n}});var s=r(5893),i=r(4645),a=r(6530),o=r(5823);function n(){return(0,s.jsx)(a.Z,{allowedRoles:["secretary","admin"],children:(0,s.jsx)(i.Z,{title:"Fiches V\xe9hicules",children:(0,s.jsxs)("div",{className:"space-y-6",children:[(0,s.jsxs)("div",{className:"sm:flex sm:items-center",children:[(0,s.jsxs)("div",{className:"sm:flex-auto",children:[(0,s.jsx)("h1",{className:"text-xl font-semibold text-gray-900",children:"Fiches V\xe9hicules"}),(0,s.jsx)("p",{className:"mt-2 text-sm text-gray-700",children:"Liste de tous les v\xe9hicules enregistr\xe9s dans le syst\xe8me."})]}),(0,s.jsx)("div",{className:"mt-4 sm:mt-0 sm:ml-16 sm:flex-none",children:(0,s.jsx)("button",{type:"button",className:"inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto",children:"Ajouter un v\xe9hicule"})})]}),(0,s.jsx)(o.Z,{})]})})})}},6501:function(e,t,r){"use strict";let s,i;r.d(t,{ZP:function(){return Q},Am:function(){return M}});var a,o=r(7294);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let r="",s="",i="";for(let a in e){let o=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+o+";":s+="f"==a[1]?m(o,a):a+"{"+m(o,"k"==a[1]?"":t)+"}":"object"==typeof o?s+=m(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=o&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=m.p?m.p(a,o):a+":"+o+";")}return r+(t&&i?t+"{"+i+"}":i)+s},p={},f=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+f(e[r]);return t}return e},h=(e,t,r,s,i)=>{var a;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,r,s=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?s.shift():t[3]?(r=t[3].replace(u," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(u," ").trim();return s[0]})(e);p[n]=m(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&p.g?p.g:null;return r&&(p.g=p[n]),a=p[n],l?t.data=t.data.replace(l,a):-1===t.data.indexOf(a)&&(t.data=s?a+t.data:t.data+a),n},g=(e,t,r)=>e.reduce((e,s,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+s+(null==a?"":a)},"");function x(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}x.bind({g:1});let b,y,v,w=x.bind({k:1});function j(e,t){let r=this||{};return function(){let s=arguments;function i(a,o){let n=Object.assign({},a),l=n.className||i.className;r.p=Object.assign({theme:y&&y()},n),r.o=/ *go\d+/.test(l),n.className=x.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),b(c,n)}return t?t(i):i}}var N=e=>"function"==typeof e,E=(e,t)=>N(e)?e(t):e,k=(s=0,()=>(++s).toString()),z=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return I(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},O=[],C={toasts:[],pausedAt:void 0},A=e=>{C=I(C,e),O.forEach(e=>{e(C)})},$=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),_=e=>(t,r)=>{let s=$(t,e,r);return A({type:2,toast:s}),s.id},M=(e,t)=>_("blank")(e,t);M.error=_("error"),M.success=_("success"),M.loading=_("loading"),M.custom=_("custom"),M.dismiss=e=>{A({type:3,toastId:e})},M.remove=e=>A({type:4,toastId:e}),M.promise=(e,t,r)=>{let s=M.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let i=t.success?E(t.success,e):void 0;return i?M.success(i,{id:s,...r,...null==r?void 0:r.success}):M.dismiss(s),e}).catch(e=>{let i=t.error?E(t.error,e):void 0;i?M.error(i,{id:s,...r,...null==r?void 0:r.error}):M.dismiss(s)}),e};var S=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,F=w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Z=w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,L=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${F} 0.15s ease-out forwards;
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
    animation: ${Z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,D=w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${D} 1s linear infinite;
`,P=w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=w`
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
}`,R=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${P} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
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
`,q=j("div")`
  position: absolute;
`,T=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,H=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?o.createElement(X,null,t):t:"blank"===r?null:o.createElement(T,null,o.createElement(J,{...s}),"loading"!==r&&o.createElement(q,null,"error"===r?o.createElement(L,{...s}):o.createElement(R,{...s})))},V=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,G=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,Y=j("div")`
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
`,W=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,K=(e,t)=>{let r=e.includes("top")?1:-1,[s,i]=z()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[V(r),G(r)];return{animation:t?`${w(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};o.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?K(e.position||t||"top-center",e.visible):{opacity:0},a=o.createElement(H,{toast:e}),n=o.createElement(W,{...e.ariaProps},E(e.message,e));return o.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:a,message:n}):o.createElement(o.Fragment,null,a,n))}),a=o.createElement,m.p=void 0,b=a,y=void 0,v=void 0,x`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Q=M}},function(e){e.O(0,[574,536,675,877,823,774,888,179],function(){return e(e.s=1826)}),_N_E=e.O()}]);
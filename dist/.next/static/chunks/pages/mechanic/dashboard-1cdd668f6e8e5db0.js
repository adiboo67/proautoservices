(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[191],{8170:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/mechanic/dashboard",function(){return t(4758)}])},6530:function(e,s,t){"use strict";t.d(s,{Z:function(){return l}});var r=t(5893),a=t(7294),i=t(1163),n=t(9008);function l(e){let{children:s,allowedRoles:t}=e,l=(0,i.useRouter)(),[c,o]=(0,a.useState)(!0);async function d(){try{let{data:{session:e}}=await n.O.auth.getSession();if(!e){l.push("/auth/login");return}if(t){let{data:s}=await n.O.from("users").select("role").eq("id",e.user.id).single();if(!s||!t.includes(s.role)){l.push("/");return}}}catch(e){console.error("Error checking auth:",e),l.push("/auth/login")}finally{o(!1)}}return((0,a.useEffect)(()=>{d()},[]),c)?(0,r.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"})}):(0,r.jsx)(r.Fragment,{children:s})}},4645:function(e,s,t){"use strict";t.d(s,{Z:function(){return o}});var r=t(5893),a=t(7294),i=t(1163),n=t(9008),l=t(2920);function c(){return(0,r.jsx)("div",{className:"flex justify-center items-center p-4",children:(0,r.jsx)("img",{src:"/images/mechanic-duck.png.png",alt:"M\xe9canicien",className:"w-48 h-48 object-contain",style:{maxWidth:"100%",height:"auto"}})})}function o(e){let{children:s,title:t}=e,o=(0,i.useRouter)(),[d,u]=(0,a.useState)(!1),[m,h]=(0,a.useState)(null);(0,a.useEffect)(()=>{(async()=>{let{data:{user:e}}=await n.O.auth.getUser();if(e){let{data:s,error:t}=await n.O.from("users").select("full_name").eq("id",e.id).single();s&&s.full_name?h(s.full_name):h(e.email||null)}})()},[]);let x=async()=>{try{let{error:e}=await n.O.auth.signOut();if(e)throw e;o.push("/auth/login"),l.Am.success("D\xe9connexion r\xe9ussie")}catch(e){l.Am.error("Erreur lors de la d\xe9connexion"),console.error("Error:",e)}};return(0,r.jsxs)("div",{className:"min-h-screen bg-gray-100",children:[(0,r.jsx)("div",{className:"fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ".concat(d?"translate-x-0":"-translate-x-full"," lg:translate-x-0 transition-transform duration-200 ease-in-out"),children:(0,r.jsxs)("div",{className:"flex flex-col h-full",children:[(0,r.jsx)("div",{className:"flex items-center justify-center h-16 px-4 bg-blue-600",children:(0,r.jsx)("h2",{className:"text-xl font-semibold text-white",children:"ProAutoServices"})}),(0,r.jsx)("div",{className:"px-4 py-3 bg-gray-50",children:(0,r.jsxs)("p",{className:"text-sm font-medium text-gray-900",children:["Bonjour ",m]})}),(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)(c,{})}),(0,r.jsx)("nav",{className:"flex-1 px-4 py-4 space-y-1"}),(0,r.jsx)("div",{className:"p-4 border-t",children:(0,r.jsx)("button",{onClick:x,className:"w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"D\xe9connexion"})})]})}),(0,r.jsxs)("div",{className:"lg:pl-64",children:[(0,r.jsxs)("div",{className:"sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm",children:[(0,r.jsx)("button",{onClick:()=>u(!d),className:"p-2 text-gray-500 lg:hidden",children:(0,r.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),(0,r.jsx)("h1",{className:"text-xl font-semibold text-gray-900",children:t}),(0,r.jsx)("div",{className:"w-6 lg:hidden"})," "]}),(0,r.jsx)("main",{className:"p-4",children:s})]})]})}},9008:function(e,s,t){"use strict";t.d(s,{O:function(){return r}});let r=(0,t(6490).eI)("https://pjxtjkmqgkbisgfleaps.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHRqa21xZ2tiaXNnZmxlYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTAzMzAsImV4cCI6MjA1MTc2NjMzMH0.UjKK4kSJDapIRx0iJvdHiJZzMbi99tDx52FmSq4qyfE",{auth:{persistSession:!0,autoRefreshToken:!0}})},4758:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return o}});var r=t(5893),a=t(7294),i=t(4645),n=t(6530),l=t(9008),c=t(2920);function o(){let[e,s]=(0,a.useState)([]),[t,o]=(0,a.useState)(!0),[d,u]=(0,a.useState)(null),[m,h]=(0,a.useState)({}),[x,f]=(0,a.useState)({});(0,a.useEffect)(()=>{g()},[]),(0,a.useEffect)(()=>{d&&j()},[d]);let g=async()=>{try{let{data:{session:e}}=await l.O.auth.getSession();e&&u(e.user.id)}catch(e){console.error("Error getting current user:",e)}},j=async()=>{try{let{data:e,error:t}=await l.O.from("vehicles").select("*").eq("status","in_progress").order("entry_date",{ascending:!1});if(t)throw t;let r=e||[];s(r);let a={...m},i={...x};r.forEach(e=>{e.id in a||(a[e.id]=e.mileage),e.id in i||(i[e.id]=e.observations||"")}),h(a),f(i)}catch(e){console.error("Error fetching vehicles:",e),c.Am.error("Erreur lors du chargement des v\xe9hicules")}finally{o(!1)}},p=async(e,s)=>{try{let{error:t}=await l.O.from("vehicles").update({status:s}).eq("id",e);if(t)throw t;c.Am.success("Statut mis \xe0 jour avec succ\xe8s"),j()}catch(e){console.error("Error updating status:",e),c.Am.error("Erreur lors de la mise \xe0 jour du statut")}},b=async t=>{try{let r=m[t],{error:a}=await l.O.from("vehicles").update({mileage:r}).eq("id",t);if(a)throw a;s(e.map(e=>e.id===t?{...e,mileage:r}:e)),c.Am.success("Kilom\xe9trage mis \xe0 jour avec succ\xe8s")}catch(e){console.error("Error updating mileage:",e),c.Am.error("Erreur lors de la mise \xe0 jour du kilom\xe9trage")}},v=async t=>{try{let r=x[t],{error:a}=await l.O.from("vehicles").update({observations:r}).eq("id",t);if(a)throw a;s(e.map(e=>e.id===t?{...e,observations:r}:e)),c.Am.success("Observations mises \xe0 jour avec succ\xe8s")}catch(e){console.error("Error updating observations:",e),c.Am.error("Erreur lors de la mise \xe0 jour des observations")}};return(0,r.jsx)(n.Z,{allowedRoles:["mechanic"],children:(0,r.jsx)(i.Z,{title:"Dashboard M\xe9canicien",children:(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold text-gray-900",children:"V\xe9hicules en cours"}),t?(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"})}):0===e.length?(0,r.jsx)("div",{className:"text-center py-12",children:(0,r.jsx)("p",{className:"text-gray-500",children:"Aucun v\xe9hicule en cours"})}):(0,r.jsx)("div",{className:"grid gap-6 md:grid-cols-2 lg:grid-cols-3",children:e.map(e=>(0,r.jsx)("div",{className:"bg-white rounded-lg shadow overflow-hidden",children:(0,r.jsxs)("div",{className:"p-6",children:[(0,r.jsxs)("div",{className:"flex justify-between items-start",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:e.client_name}),(0,r.jsx)("p",{className:"text-sm text-gray-500",children:e.phone})]}),(0,r.jsx)("button",{onClick:()=>p(e.id,"done"),className:"px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700",children:"Terminer"})]}),(0,r.jsxs)("div",{className:"mt-4 space-y-2",children:[(0,r.jsxs)("p",{className:"text-sm",children:[(0,r.jsx)("span",{className:"font-medium",children:"V\xe9hicule:"})," ",e.brand_model]}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsx)("span",{className:"text-sm font-medium",children:"Kilom\xe9trage:"}),(0,r.jsx)("input",{type:"number",value:m[e.id],onChange:s=>{let t=""===s.target.value?0:parseInt(s.target.value);h({...m,[e.id]:t})},className:"mt-1 block w-32 rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm",min:"0"}),(0,r.jsx)("button",{onClick:()=>b(e.id),className:"px-2 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700",children:"Enregistrer"})]}),(0,r.jsxs)("p",{className:"text-sm",children:[(0,r.jsx)("span",{className:"font-medium",children:"Travaux:"})," ",e.work_type]}),(0,r.jsxs)("p",{className:"text-sm",children:[(0,r.jsx)("span",{className:"font-medium",children:"Date d'entr\xe9e:"})," ",new Date(e.entry_date).toLocaleDateString()]})]}),(0,r.jsxs)("div",{className:"mt-4",children:[(0,r.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"Observations"}),(0,r.jsxs)("div",{className:"flex items-start space-x-2",children:[(0,r.jsx)("textarea",{rows:3,value:x[e.id]||"",onChange:s=>f({...x,[e.id]:s.target.value}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"}),(0,r.jsx)("button",{onClick:()=>v(e.id),className:"mt-1 px-2 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700",children:"Enregistrer"})]})]})]})},e.id))})]})})})}}},function(e){e.O(0,[574,774,888,179],function(){return e(e.s=8170)}),_N_E=e.O()}]);
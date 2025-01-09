(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[189],{2599:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/dashboard",function(){return s(6975)}])},4613:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(5893),a=s(5378),i=s.n(a);function n(e){let{children:t,title:s="ProAutoServices"}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(i(),{children:[(0,r.jsx)("title",{children:s}),(0,r.jsx)("meta",{name:"description",content:"Application de gestion de garage automobile"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,r.jsx)("main",{children:t})]})}},9008:function(e,t,s){"use strict";s.d(t,{O:function(){return r}});let r=(0,s(6490).eI)("https://pjxtjkmqgkbisgfleaps.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHRqa21xZ2tiaXNnZmxlYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTAzMzAsImV4cCI6MjA1MTc2NjMzMH0.UjKK4kSJDapIRx0iJvdHiJZzMbi99tDx52FmSq4qyfE",{auth:{persistSession:!0,autoRefreshToken:!0}})},6975:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var r=s(5893),a=s(7294),i=s(1163),n=s(4613),l=s(9008),o=s(6501);function d(){let[e,t]=(0,a.useState)([]),[s,d]=(0,a.useState)([]),[c,m]=(0,a.useState)(!0),[u,x]=(0,a.useState)(!1),[h,p]=(0,a.useState)(!1),[f,b]=(0,a.useState)(!1),[g,v]=(0,a.useState)({full_name:"",email:"",password:"",role:"secretary"}),[y,j]=(0,a.useState)({name:""}),[w,N]=(0,a.useState)(null),[k,_]=(0,a.useState)(""),E=(0,i.useRouter)();(0,a.useEffect)(()=>{C(),A()},[]);let C=async()=>{let{data:{session:e}}=await l.O.auth.getSession();if(!e){E.push("/auth/login");return}let{data:t}=await l.O.from("users").select("role").eq("id",e.user.id).single();(null==t?void 0:t.role)!=="admin"&&E.push("/")},A=async()=>{try{let{data:e,error:s}=await l.O.from("users").select("*").order("created_at",{ascending:!1});if(s)throw s;t(e||[]);let{data:r,error:a}=await l.O.from("mechanics").select("*").order("name");if(a)throw a;d(r||[])}catch(e){console.error("Error fetching data:",e)}finally{m(!1)}},L=()=>g.full_name.trim()?g.email.trim()?!!g.password.trim()&&!(g.password.length<6)||(_("Le mot de passe doit contenir au moins 6 caract\xe8res"),!1):(_("L'email est requis"),!1):(_("Le nom est requis"),!1),S=async e=>{if(e.preventDefault(),_(""),L())try{let{data:e,error:t}=await l.O.auth.signUp({email:g.email,password:g.password});if(t)throw t;if(!e.user)throw Error("No user returned from auth signup");let{error:s}=await l.O.from("users").insert([{id:e.user.id,email:g.email,full_name:g.full_name,role:g.role}]);if(s)throw s;A(),x(!1),v({full_name:"",email:"",password:"",role:"secretary"})}catch(e){console.error("Error adding user:",e),_(e.message||"Erreur lors de la cr\xe9ation de l'utilisateur")}},z=async e=>{if(e.preventDefault(),_(""),!y.name.trim()){_("Le nom est requis");return}try{let{error:e}=await l.O.from("mechanics").insert([{name:y.name}]);if(e)throw e;A(),p(!1),j({name:""})}catch(e){console.error("Error adding mechanic:",e),_(e.message||"Erreur lors de la cr\xe9ation du m\xe9canicien")}},M=async()=>{await l.O.auth.signOut(),E.push("/auth/login")},O=async e=>{N(e),b(!0)},I=async e=>{if(e.preventDefault(),w)try{console.log("Attempting to update user:",w);let{data:e,error:t}=await l.O.from("profiles").update({full_name:w.full_name,role:w.role}).eq("id",w.id).select();if(console.log("Update response:",{data:e,error:t}),t)throw console.error("Profile update error:",t),t;o.ZP.success("Utilisateur mis \xe0 jour avec succ\xe8s"),b(!1),N(null),A()}catch(e){console.error("Error updating user:",e),o.ZP.error("Erreur lors de la mise \xe0 jour de l'utilisateur")}},q=async e=>{if(window.confirm("\xcates-vous s\xfbr de vouloir supprimer cet utilisateur ?"))try{let{error:t}=await l.O.from("users").delete().eq("id",e);if(t)throw t;o.ZP.success("Utilisateur supprim\xe9 avec succ\xe8s"),A()}catch(e){console.error("Error deleting user:",e),o.ZP.error("Erreur lors de la suppression de l'utilisateur")}};return c?(0,r.jsx)(n.Z,{title:"Dashboard Admin - ProAutoServices",children:(0,r.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:(0,r.jsx)("div",{className:"animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"})})}):(0,r.jsxs)(n.Z,{title:"Dashboard Admin - ProAutoServices",children:[(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,r.jsx)("nav",{className:"bg-white shadow",children:(0,r.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"flex justify-between h-16",children:[(0,r.jsx)("div",{className:"flex",children:(0,r.jsx)("div",{className:"flex-shrink-0 flex items-center",children:(0,r.jsx)("h1",{className:"text-2xl font-bold text-gray-900",children:"ProAutoServices"})})}),(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("button",{onClick:()=>x(!0),className:"px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700",children:"Ajouter un utilisateur"}),(0,r.jsx)("button",{onClick:()=>p(!0),className:"px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700",children:"Ajouter un m\xe9canicien"}),(0,r.jsx)("button",{onClick:M,className:"px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700",children:"D\xe9connexion"})]})]})})}),(0,r.jsxs)("div",{className:"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8",children:[(0,r.jsx)("div",{className:"px-4 py-6 sm:px-0",children:(0,r.jsxs)("div",{className:"bg-white shadow overflow-hidden sm:rounded-lg",children:[(0,r.jsx)("div",{className:"px-4 py-5 sm:px-6",children:(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900",children:"Liste des utilisateurs"})}),(0,r.jsx)("div",{className:"border-t border-gray-200",children:(0,r.jsx)("ul",{className:"divide-y divide-gray-200",children:e.map(e=>(0,r.jsx)("li",{className:"px-4 py-4",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.full_name}),(0,r.jsx)("p",{className:"text-sm text-gray-500",children:e.email})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("span",{className:"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800",children:e.role}),(0,r.jsx)("button",{onClick:()=>O(e),className:"text-blue-600 hover:text-blue-800",children:(0,r.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,r.jsx)("button",{onClick:()=>q(e.id),className:"text-red-600 hover:text-red-800",children:(0,r.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]})},e.id))})})]})}),(0,r.jsx)("div",{className:"mt-8 px-4 py-6 sm:px-0",children:(0,r.jsxs)("div",{className:"bg-white shadow overflow-hidden sm:rounded-lg",children:[(0,r.jsx)("div",{className:"px-4 py-5 sm:px-6",children:(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900",children:"Liste des m\xe9caniciens"})}),(0,r.jsx)("div",{className:"border-t border-gray-200",children:(0,r.jsx)("ul",{className:"divide-y divide-gray-200",children:s.map(e=>(0,r.jsx)("li",{className:"px-4 py-4",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900",children:e.name}),(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("button",{onClick:()=>O({id:e.id.toString(),email:"",full_name:e.name,role:"mechanic"}),className:"text-blue-600 hover:text-blue-800",children:(0,r.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,r.jsx)("button",{onClick:()=>q(e.id.toString()),className:"text-red-600 hover:text-red-800",children:(0,r.jsx)("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]})},e.id))})})]})})]})]}),u&&(0,r.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto",children:(0,r.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,r.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:(0,r.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,r.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"​"}),(0,r.jsx)("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,r.jsx)("h3",{className:"text-lg leading-6 font-medium text-gray-900",children:"Ajouter un utilisateur"}),(0,r.jsxs)("div",{className:"mt-2",children:[k&&(0,r.jsx)("div",{className:"rounded-md bg-red-50 p-4 mb-4",children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)("svg",{className:"h-5 w-5 text-red-400",viewBox:"0 0 20 20",fill:"currentColor",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),(0,r.jsxs)("div",{className:"ml-3",children:[(0,r.jsx)("h3",{className:"text-sm font-medium text-red-800",children:"Erreur"}),(0,r.jsx)("div",{className:"mt-2 text-sm text-red-700",children:(0,r.jsx)("p",{children:k})})]})]})}),(0,r.jsxs)("form",{onSubmit:S,className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"full_name",className:"block text-sm font-medium text-gray-700",children:"Nom complet"}),(0,r.jsx)("input",{type:"text",id:"full_name",value:g.full_name,onChange:e=>v({...g,full_name:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,r.jsx)("input",{type:"email",id:"email",value:g.email,onChange:e=>v({...g,email:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Mot de passe"}),(0,r.jsx)("input",{type:"password",id:"password",value:g.password,onChange:e=>v({...g,password:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0,minLength:6})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"role",className:"block text-sm font-medium text-gray-700",children:"R\xf4le"}),(0,r.jsxs)("select",{id:"role",value:g.role,onChange:e=>v({...g,role:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",children:[(0,r.jsx)("option",{value:"secretary",children:"Secr\xe9taire"}),(0,r.jsx)("option",{value:"admin",children:"Administrateur"}),(0,r.jsx)("option",{value:"mechanic",children:"M\xe9canicien"})]})]}),(0,r.jsxs)("div",{className:"mt-5 sm:mt-6 space-x-2",children:[(0,r.jsx)("button",{type:"submit",className:"inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm",children:"Ajouter"}),(0,r.jsx)("button",{type:"button",onClick:()=>{x(!1),v({full_name:"",email:"",password:"",role:"secretary"}),_("")},className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm",children:"Annuler"})]})]})]})]})})})]})}),h&&(0,r.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto",children:(0,r.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,r.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:(0,r.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,r.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"​"}),(0,r.jsx)("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,r.jsx)("h3",{className:"text-lg leading-6 font-medium text-gray-900",children:"Ajouter un m\xe9canicien"}),(0,r.jsxs)("div",{className:"mt-2",children:[k&&(0,r.jsx)("div",{className:"rounded-md bg-red-50 p-4 mb-4",children:(0,r.jsxs)("div",{className:"flex",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)("svg",{className:"h-5 w-5 text-red-400",viewBox:"0 0 20 20",fill:"currentColor",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",clipRule:"evenodd"})})}),(0,r.jsxs)("div",{className:"ml-3",children:[(0,r.jsx)("h3",{className:"text-sm font-medium text-red-800",children:"Erreur"}),(0,r.jsx)("div",{className:"mt-2 text-sm text-red-700",children:(0,r.jsx)("p",{children:k})})]})]})}),(0,r.jsxs)("form",{onSubmit:z,className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"mechanic_name",className:"block text-sm font-medium text-gray-700",children:"Nom du m\xe9canicien"}),(0,r.jsx)("input",{type:"text",id:"mechanic_name",value:y.name,onChange:e=>j({name:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0})]}),(0,r.jsxs)("div",{className:"mt-5 sm:mt-6 space-x-2",children:[(0,r.jsx)("button",{type:"submit",className:"inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm",children:"Ajouter"}),(0,r.jsx)("button",{type:"button",onClick:()=>{p(!1),j({name:""}),_("")},className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm",children:"Annuler"})]})]})]})]})})})]})}),f&&w&&(0,r.jsx)("div",{className:"fixed z-10 inset-0 overflow-y-auto",children:(0,r.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[(0,r.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:(0,r.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75"})}),(0,r.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"​"}),(0,r.jsx)("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",children:(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"mt-3 text-center sm:mt-5",children:[(0,r.jsx)("h3",{className:"text-lg leading-6 font-medium text-gray-900",children:"Modifier l'utilisateur"}),(0,r.jsx)("div",{className:"mt-2",children:(0,r.jsxs)("form",{onSubmit:I,className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"edit_full_name",className:"block text-sm font-medium text-gray-700",children:"Nom complet"}),(0,r.jsx)("input",{type:"text",id:"edit_full_name",value:w.full_name,onChange:e=>N({...w,full_name:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"edit_email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,r.jsx)("input",{type:"email",id:"edit_email",value:w.email,onChange:e=>N({...w,email:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",required:!0})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"edit_role",className:"block text-sm font-medium text-gray-700",children:"R\xf4le"}),(0,r.jsxs)("select",{id:"edit_role",value:w.role,onChange:e=>N({...w,role:e.target.value}),className:"mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",children:[(0,r.jsx)("option",{value:"secretary",children:"Secr\xe9taire"}),(0,r.jsx)("option",{value:"admin",children:"Administrateur"}),(0,r.jsx)("option",{value:"mechanic",children:"M\xe9canicien"})]})]}),(0,r.jsxs)("div",{className:"mt-5 sm:mt-6 space-x-2",children:[(0,r.jsx)("button",{type:"submit",className:"inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm",children:"Mettre \xe0 jour"}),(0,r.jsx)("button",{type:"button",onClick:()=>{b(!1),N(null)},className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm",children:"Annuler"})]})]})})]})})})]})})]})}},5378:function(e,t,s){e.exports=s(4764)},6501:function(e,t,s){"use strict";let r,a;s.d(t,{ZP:function(){return Q},Am:function(){return O}});var i,n=s(7294);let l={data:""},o=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||l,d=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,m=/\n+/g,u=(e,t)=>{let s="",r="",a="";for(let i in e){let n=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+n+";":r+="f"==i[1]?u(n,i):i+"{"+u(n,"k"==i[1]?"":t)+"}":"object"==typeof n?r+=u(n,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=n&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=u.p?u.p(i,n):i+":"+n+";")}return s+(t&&a?t+"{"+a+"}":a)+r},x={},h=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+h(e[s]);return t}return e},p=(e,t,s,r,a)=>{var i;let n=h(e),l=x[n]||(x[n]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(n));if(!x[l]){let t=n!==e?e:(e=>{let t,s,r=[{}];for(;t=d.exec(e.replace(c,""));)t[4]?r.shift():t[3]?(s=t[3].replace(m," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(m," ").trim();return r[0]})(e);x[l]=u(a?{["@keyframes "+l]:t}:t,s?"":"."+l)}let o=s&&x.g?x.g:null;return s&&(x.g=x[l]),i=x[l],o?t.data=t.data.replace(o,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),l},f=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":u(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function b(e){let t=this||{},s=e.call?e(t.p):e;return p(s.unshift?s.raw?f(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,o(t.target),t.g,t.o,t.k)}b.bind({g:1});let g,v,y,j=b.bind({k:1});function w(e,t){let s=this||{};return function(){let r=arguments;function a(i,n){let l=Object.assign({},i),o=l.className||a.className;s.p=Object.assign({theme:v&&v()},l),s.o=/ *go\d+/.test(o),l.className=b.apply(s,r)+(o?" "+o:""),t&&(l.ref=n);let d=e;return e[0]&&(d=l.as||e,delete l.as),y&&d[0]&&y(l),g(d,l)}return t?t(a):a}}var N=e=>"function"==typeof e,k=(e,t)=>N(e)?e(t):e,_=(r=0,()=>(++r).toString()),E=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},C=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return C(e,{type:e.toasts.find(e=>e.id===s.id)?1:0,toast:s});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map(e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},A=[],L={toasts:[],pausedAt:void 0},S=e=>{L=C(L,e),A.forEach(e=>{e(L)})},z=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||_()}),M=e=>(t,s)=>{let r=z(t,e,s);return S({type:2,toast:r}),r.id},O=(e,t)=>M("blank")(e,t);O.error=M("error"),O.success=M("success"),O.loading=M("loading"),O.custom=M("custom"),O.dismiss=e=>{S({type:3,toastId:e})},O.remove=e=>S({type:4,toastId:e}),O.promise=(e,t,s)=>{let r=O.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?k(t.success,e):void 0;return a?O.success(a,{id:r,...s,...null==s?void 0:s.success}):O.dismiss(r),e}).catch(e=>{let a=t.error?k(t.error,e):void 0;a?O.error(a,{id:r,...s,...null==s?void 0:s.error}):O.dismiss(r)}),e};var I=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,q=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,$=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${q} 0.15s ease-out forwards;
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
    animation: ${$} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,D=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=j`
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
}`,H=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
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
`,J=w("div")`
  position: absolute;
`,B=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,T=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,X=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${T} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,U=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?n.createElement(X,null,t):t:"blank"===s?null:n.createElement(B,null,n.createElement(P,{...r}),"loading"!==s&&n.createElement(J,null,"error"===s?n.createElement(F,{...r}):n.createElement(H,{...r})))},V=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,W=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,Y=w("div")`
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
`,K=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[V(s),W(s)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};n.memo(({toast:e,position:t,style:s,children:r})=>{let a=e.height?G(e.position||t||"top-center",e.visible):{opacity:0},i=n.createElement(U,{toast:e}),l=n.createElement(K,{...e.ariaProps},k(e.message,e));return n.createElement(Y,{className:e.className,style:{...a,...s,...e.style}},"function"==typeof r?r({icon:i,message:l}):n.createElement(n.Fragment,null,i,l))}),i=n.createElement,u.p=void 0,g=i,v=void 0,y=void 0,b`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;var Q=O}},function(e){e.O(0,[574,774,888,179],function(){return e(e.s=2599)}),_N_E=e.O()}]);
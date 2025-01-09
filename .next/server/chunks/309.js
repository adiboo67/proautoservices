exports.id=309,exports.ids=[309],exports.modules={4494:(e,t,s)=>{"use strict";s.d(t,{Z:()=>a});var r=s(997);function a(){return r.jsx("div",{className:"flex justify-center items-center p-4",children:r.jsx("img",{src:"/images/mechanic-duck.png.png",alt:"M\xe9canicien",className:"w-48 h-48 object-contain",style:{maxWidth:"100%",height:"auto"}})})}},6530:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(997),a=s(6689),n=s(1163),o=s(9008);function i({children:e,allowedRoles:t}){let s=(0,n.useRouter)(),[i,l]=(0,a.useState)(!0);async function c(){try{let{data:{session:e}}=await o.O.auth.getSession();if(!e){s.push("/auth/login");return}if(t){let{data:r}=await o.O.from("users").select("role").eq("id",e.user.id).single();if(!r||!t.includes(r.role)){s.push("/");return}}}catch(e){console.error("Error checking auth:",e),s.push("/auth/login")}finally{l(!1)}}return((0,a.useEffect)(()=>{c()},[]),i)?r.jsx("div",{className:"flex items-center justify-center min-h-screen",children:r.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"})}):r.jsx(r.Fragment,{children:e})}},34:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>u});var a=s(997),n=s(6689),o=s(1163),i=s(9008),l=s(3590),c=s(4494),d=e([l]);function u({children:e,title:t}){let s=(0,o.useRouter)(),[r,d]=(0,n.useState)(!1),[u,m]=(0,n.useState)(null);(0,n.useEffect)(()=>{(async()=>{let{data:{user:e}}=await i.O.auth.getUser();if(e){let{data:t,error:s}=await i.O.from("users").select("full_name").eq("id",e.id).single();t&&t.full_name?m(t.full_name):m(e.email||null)}})()},[]);let h=async()=>{try{let{error:e}=await i.O.auth.signOut();if(e)throw e;s.push("/auth/login"),l.toast.success("D\xe9connexion r\xe9ussie")}catch(e){l.toast.error("Erreur lors de la d\xe9connexion"),console.error("Error:",e)}};return(0,a.jsxs)("div",{className:"min-h-screen bg-gray-100",children:[a.jsx("div",{className:`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${r?"translate-x-0":"-translate-x-full"} lg:translate-x-0 transition-transform duration-200 ease-in-out`,children:(0,a.jsxs)("div",{className:"flex flex-col h-full",children:[a.jsx("div",{className:"flex items-center justify-center h-16 px-4 bg-blue-600",children:a.jsx("h2",{className:"text-xl font-semibold text-white",children:"ProAutoServices"})}),a.jsx("div",{className:"px-4 py-3 bg-gray-50",children:(0,a.jsxs)("p",{className:"text-sm font-medium text-gray-900",children:["Bonjour ",u]})}),a.jsx("div",{className:"flex-shrink-0",children:a.jsx(c.Z,{})}),a.jsx("nav",{className:"flex-1 px-4 py-4 space-y-1"}),a.jsx("div",{className:"p-4 border-t",children:a.jsx("button",{onClick:h,className:"w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"D\xe9connexion"})})]})}),(0,a.jsxs)("div",{className:"lg:pl-64",children:[(0,a.jsxs)("div",{className:"sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white shadow-sm",children:[a.jsx("button",{onClick:()=>d(!r),className:"p-2 text-gray-500 lg:hidden",children:a.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),a.jsx("h1",{className:"text-xl font-semibold text-gray-900",children:t}),a.jsx("div",{className:"w-6 lg:hidden"})," "]}),a.jsx("main",{className:"p-4",children:e})]})]})}l=(d.then?(await d)():d)[0],r()}catch(e){r(e)}})},7702:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>x});var a=s(997),n=s(6689),o=s(9870),i=s(5503),l=s(476),c=s(1103),d=s(9008),u=s(3590),m=s(2460),h=e([o,i,l,c,u,m]);function x(){let[e,t]=(0,n.useState)([]),[s,r]=(0,n.useState)(null),[h,x]=(0,n.useState)(!1),[p,f]=(0,n.useState)(null);(0,n.useEffect)(()=>{b()},[]);let b=async()=>{try{let{data:e,error:s}=await d.O.from("appointments").select("*").gte("start_time",new Date(Date.now()-6048e5).toISOString());if(s)throw s;let r=e.map(e=>({...e,title:`${e.client_name} - ${e.service}`,start:e.start_time,end:e.end_time}));t(r)}catch(e){console.error("Error fetching appointments:",e),u.toast.error("Erreur lors du chargement des rendez-vous")}},g=async t=>{try{let s=e.find(e=>e.id===t.event.extendedProps.id);if(!s)return;let r=new Date(s.start_time),a=(new Date(s.end_time).getTime()-r.getTime())/6e4,n=new Date(t.event.start),o=new Date(n.getTime()+6e4*a),i=n.toISOString(),l=o.toISOString(),{data:c,error:m}=await d.O.from("appointments").update({start_time:i,end_time:l}).eq("id",s.id).select();if(m)throw m;p?.id===s.id&&f({id:p.id,title:p.title,client_name:p.client_name,phone:p.phone,vehicle:p.vehicle,service:p.service,notes:p.notes,start_time:i,end_time:l}),u.toast.success("Rendez-vous d\xe9plac\xe9 avec succ\xe8s"),await b()}catch(e){console.error("Error updating appointment:",e),u.toast.error("Erreur lors du d\xe9placement du rendez-vous"),t.revert()}},y=async e=>{try{let{error:t}=await d.O.from("appointments").delete().eq("id",e);if(t)throw t;u.toast.success("Rendez-vous supprim\xe9 avec succ\xe8s"),x(!1),b()}catch(e){console.error("Error deleting appointment:",e),u.toast.error("Erreur lors de la suppression du rendez-vous")}},v=e=>{switch(e.toLowerCase()){case"vidange":return"#4CAF50";case"r\xe9paration":return"#F44336";case"d\xe9pannage":return"#FF9800";case"diagnostic":return"#2196F3";case"pneumatique":return"#9C27B0";case"climatisation":return"#00BCD4";default:return"#607D8B"}};return(0,a.jsxs)("div",{className:"space-y-4",children:[a.jsx("div",{className:"bg-white p-4 rounded-lg shadow",children:a.jsx(o.default,{plugins:[i.default,l.default,c.default],initialView:"dayGridMonth",headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek"},editable:!0,droppable:!0,eventDrop:g,dateClick:e=>{r(e.date),document.querySelectorAll(".fc-day-selected").forEach(e=>{e.classList.remove("fc-day-selected")}),e.dayEl.classList.add("fc-day-selected"),f(null),x(!0)},eventClick:t=>{let s=e.find(e=>e.id===t.event.extendedProps.id);s&&(f(s),x(!0))},events:e.map(e=>({...e,backgroundColor:v(e.service),extendedProps:{id:e.id}})),height:"auto",locale:"fr",buttonText:{today:"Aujourd'hui",month:"Mois",week:"Semaine"}})}),h&&a.jsx(m.Z,{appointment:p,selectedDate:s,onClose:()=>{x(!1),f(null)},onSuccess:()=>{x(!1),f(null),b()},onDelete:y})]})}[o,i,l,c,u,m]=h.then?(await h)():h,r()}catch(e){r(e)}})},2460:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>m});var a=s(997),n=s(6689),o=s(5641),i=s(1163),l=s(9008),c=s(3590),d=s(900),u=e([o,c,d]);function m({appointment:e,selectedDate:t,onClose:s,onSuccess:r,onDelete:u}){let[m,h]=(0,n.useState)(!1),[x,p]=(0,n.useState)(!1);(0,i.useRouter)();let{register:f,handleSubmit:b,formState:{errors:g},reset:y}=(0,o.useForm)({defaultValues:e?{client_name:e.client_name,phone:e.phone,vehicle:e.vehicle,service:e.service,notes:e.notes}:{service:"Vidange"}});(0,n.useEffect)(()=>{e&&y({client_name:e.client_name,phone:e.phone,vehicle:e.vehicle,service:e.service,notes:e.notes})},[e,y]);let v=async s=>{try{h(!0);let a=e?new Date(e.start_time):t||new Date,n=new Date(a.getTime()+36e5),o={client_name:s.client_name,phone:s.phone,vehicle:s.vehicle,service:s.service,start_time:a.toISOString(),end_time:n.toISOString(),notes:s.notes||null};if(e){let{error:t}=await l.O.from("appointments").update(o).eq("id",e.id);if(t)throw t}else{let{error:e}=await l.O.from("appointments").insert([o]);if(e)throw e}c.toast.success(e?"Rendez-vous modifi\xe9":"Rendez-vous cr\xe9\xe9"),r()}catch(e){console.error("Error saving appointment:",e),c.toast.error("Erreur lors de l'enregistrement du rendez-vous")}finally{h(!1)}};return(0,a.jsxs)("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50",children:[(0,a.jsxs)("div",{className:"bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto",children:[a.jsx("h2",{className:"text-lg font-medium mb-4",children:e?"Modifier le rendez-vous":"Nouveau rendez-vous"}),(0,a.jsxs)("form",{onSubmit:b(v),className:"space-y-4",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"client_name",className:"block text-sm font-medium text-gray-700",children:"Nom du client"}),a.jsx("input",{type:"text",id:"client_name",...f("client_name",{required:!0}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.client_name&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700",children:"T\xe9l\xe9phone"}),a.jsx("input",{type:"tel",id:"phone",...f("phone",{required:!0}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.phone&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"vehicle",className:"block text-sm font-medium text-gray-700",children:"V\xe9hicule"}),a.jsx("input",{type:"text",id:"vehicle",...f("vehicle",{required:!0}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.vehicle&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"service",className:"block text-sm font-medium text-gray-700",children:"Type de travaux"}),a.jsx("textarea",{id:"service",...f("service",{required:!0}),rows:6,className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2 min-h-[200px]"}),g.service&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"notes",className:"block text-sm font-medium text-gray-700",children:"Notes"}),a.jsx("textarea",{id:"notes",...f("notes"),rows:3,className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[e&&(0,a.jsxs)(a.Fragment,{children:[a.jsx("button",{type:"button",onClick:()=>p(!0),className:"px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",children:"Cr\xe9er une fiche"}),a.jsx("button",{type:"button",onClick:()=>{window.confirm("\xcates-vous s\xfbr de vouloir supprimer ce rendez-vous ?")&&u(e.id)},className:"px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"Supprimer"})]}),a.jsx("button",{type:"button",onClick:s,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Annuler"}),a.jsx("button",{type:"submit",disabled:m,className:"px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:e?"Modifier":"Cr\xe9er"})]})]})]}),x&&a.jsx(d.Z,{isOpen:x,onClose:()=>p(!1),appointment:e})]})}[o,c,d]=u.then?(await u)():u,r()}catch(e){r(e)}})},1915:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>u});var a=s(997),n=s(6689),o=s(5675),i=s.n(o),l=s(9008),c=s(3590),d=e([c]);function u({imageUrl:e,onUpload:t,onDelete:s,index:r}){let[o,d]=(0,n.useState)(!1),[u,m]=(0,n.useState)(null);(0,n.useEffect)(()=>{e&&m(null)},[e]);let h=async e=>{try{if(d(!0),!e.target.files||0===e.target.files.length)throw Error("Veuillez s\xe9lectionner une image");let s=e.target.files[0],r=s.name.split(".").pop()?.toLowerCase()||"";if(!["jpg","jpeg","png","gif"].includes(r))throw Error("Format de fichier non support\xe9. Utilisez JPG, PNG ou GIF");if(s.size>5242880)throw Error("La taille du fichier ne doit pas d\xe9passer 5MB");let a=`${Date.now()}-${Math.random().toString(36).substr(2,9)}.${r}`,n=new FileReader;n.onloadend=()=>{m(n.result)},n.readAsDataURL(s);let{error:o,data:i}=await l.O.storage.from("vehicle-photos").upload(a,s,{cacheControl:"3600",upsert:!1,contentType:`image/${"jpg"===r?"jpeg":r}`});if(o)throw console.error("Upload error details:",o),Error(o.message);if(i?.path){let{data:e}=l.O.storage.from("vehicle-photos").getPublicUrl(a);if(e?.publicUrl)t(e.publicUrl);else throw Error("Erreur lors de la r\xe9cup\xe9ration de l'URL publique")}else throw Error("Erreur lors du t\xe9l\xe9chargement du fichier")}catch(e){console.error("Upload error:",e),c.toast.error(e.message||"Erreur lors du t\xe9l\xe9chargement"),m(null)}finally{d(!1)}},x=async()=>{if(s)try{if(e){let t=e.split("/").pop();if(t){let{error:e}=await l.O.storage.from("vehicle-photos").remove([t]);if(e)throw console.error("Error deleting file:",e),Error("Erreur lors de la suppression du fichier")}}m(null),s()}catch(e){console.error("Error in handleDelete:",e),c.toast.error(e.message||"Erreur lors de la suppression de l'image")}},p=e||u;return a.jsx("div",{className:"relative w-full h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors",children:p?(0,a.jsxs)(a.Fragment,{children:[a.jsx(i(),{src:p,alt:`Photo ${r+1}`,fill:!0,sizes:"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",className:"object-contain p-2 rounded-lg",unoptimized:null!==u,priority:0===r}),a.jsx("button",{onClick:x,className:"absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-10",type:"button",title:"Supprimer la photo",children:"\xd7"})]}):(0,a.jsxs)("label",{className:"flex flex-col items-center justify-center w-full h-full cursor-pointer",children:[(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[a.jsx("svg",{className:"w-8 h-8 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),(0,a.jsxs)("p",{className:"text-sm text-gray-500",children:["Photo ",r+1]}),o&&a.jsx("div",{className:"mt-2 text-sm text-blue-500",children:"Chargement..."})]}),a.jsx("input",{type:"file",className:"hidden",accept:"image/jpeg,image/png,image/gif",onChange:h,disabled:o})]})})}c=(d.then?(await d)():d)[0],r()}catch(e){r(e)}})},900:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>h});var a=s(997),n=s(6689),o=s(5641),i=s(9008),l=s(3590),c=s(1915),d=s(8784),u=s.n(d),m=e([o,l,c]);function h({isOpen:e,onClose:t,appointment:s}){let[r,d]=(0,n.useState)(!1),[m,h]=(0,n.useState)(["","","",""]),[x,p]=(0,n.useState)(""),[f,b]=(0,n.useState)(null),[g,y]=(0,n.useState)([]),{register:v,handleSubmit:j,formState:{errors:w}}=(0,o.useForm)({defaultValues:{client_name:s?.client_name||"",phone:s?.phone||"",address:"",brand_model:s?.vehicle||"",registration_number:"",mileage:0,work_type:s?.service||"",entry_date:s?new Date(s.start_time).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],exit_date:"",mechanics:[],status:"pending",parts_supplies:"",observations:""}});(0,n.useEffect)(()=>{let t=async()=>{try{let{data:e,error:t}=await i.O.from("mechanics").select("id, name").order("name");if(t)throw t;y(e||[])}catch(e){console.error("Error fetching mechanics:",e),l.toast.error("Erreur lors du chargement des m\xe9caniciens")}};e&&t()},[e]);let N=(e,t)=>{let s=[...m];s[e]=t,h(s)},k=e=>{let t=[...m];t[e]="",h(t)},_=async e=>{try{d(!0);let{data:s,error:r}=await i.O.auth.getUser();if(r||!s.user)throw Error("Non authentifi\xe9");let a={client_name:e.client_name,phone:e.phone,address:e.address,brand_model:e.brand_model,registration_number:e.registration_number,mileage:e.mileage||0,work_type:e.work_type,entry_date:e.entry_date,exit_date:e.exit_date,mechanics:e.mechanics,status:e.status,parts_supplies:e.parts_supplies,observations:e.observations,photos:m.filter(Boolean),client_signature:x||null,created_by:s.user.id,updated_by:s.user.id};console.log("Donn\xe9es \xe0 ins\xe9rer:",a);let{error:n}=await i.O.from("vehicles").insert([a]);if(n)throw console.error("Erreur Supabase d\xe9taill\xe9e:",n),n;l.toast.success("Fiche v\xe9hicule cr\xe9\xe9e avec succ\xe8s"),t()}catch(e){console.error("Error creating vehicle:",e),l.toast.error("Erreur lors de la cr\xe9ation de la fiche v\xe9hicule")}finally{d(!1)}};return e?a.jsx("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50",children:(0,a.jsxs)("div",{className:"bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[a.jsx("h2",{className:"text-xl font-semibold",children:"Nouvelle fiche v\xe9hicule"}),(0,a.jsxs)("button",{onClick:t,className:"text-gray-400 hover:text-gray-500",children:[a.jsx("span",{className:"sr-only",children:"Fermer"}),a.jsx("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]})]}),(0,a.jsxs)("form",{onSubmit:j(_),className:"space-y-6",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2",children:[(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"client_name",className:"block text-sm font-medium text-gray-700",children:"Nom du client"}),a.jsx("input",{type:"text",id:"client_name",...v("client_name",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"}),w.client_name&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700",children:"T\xe9l\xe9phone"}),a.jsx("input",{type:"tel",id:"phone",...v("phone",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"}),w.phone&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{className:"sm:col-span-2",children:[a.jsx("label",{htmlFor:"address",className:"block text-sm font-medium text-gray-700",children:"Adresse"}),a.jsx("input",{type:"text",id:"address",...v("address"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"brand_model",className:"block text-sm font-medium text-gray-700",children:"Marque et mod\xe8le"}),a.jsx("input",{type:"text",id:"brand_model",...v("brand_model",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"}),w.brand_model&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"registration_number",className:"block text-sm font-medium text-gray-700",children:"Immatriculation"}),a.jsx("input",{type:"text",id:"registration_number",...v("registration_number"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"mileage",className:"block text-sm font-medium text-gray-700",children:"Kilom\xe9trage"}),a.jsx("input",{type:"number",id:"mileage",...v("mileage",{valueAsNumber:!0,setValueAs:e=>""===e?0:parseInt(e)}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"entry_date",className:"block text-sm font-medium text-gray-700",children:"Date d'entr\xe9e"}),a.jsx("input",{type:"date",id:"entry_date",...v("entry_date",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"}),w.entry_date&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"exit_date",className:"block text-sm font-medium text-gray-700",children:"Date de sortie pr\xe9vue"}),a.jsx("input",{type:"date",id:"exit_date",...v("exit_date"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"mechanics",className:"block text-sm font-medium text-gray-700",children:"M\xe9caniciens"}),a.jsx("select",{multiple:!0,id:"mechanics",...v("mechanics"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm",children:g.map(e=>a.jsx("option",{value:e.id,children:e.name},e.id))}),a.jsx("p",{className:"mt-1 text-sm text-gray-500",children:"Maintenez Ctrl (ou Cmd sur Mac) pour s\xe9lectionner plusieurs m\xe9caniciens"})]}),(0,a.jsxs)("div",{children:[a.jsx("label",{htmlFor:"status",className:"block text-sm font-medium text-gray-700",children:"Statut"}),(0,a.jsxs)("select",{id:"status",...v("status",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm",children:[a.jsx("option",{value:"pending",children:"En attente"}),a.jsx("option",{value:"in_progress",children:"En cours"}),a.jsx("option",{value:"completed",children:"Termin\xe9"}),a.jsx("option",{value:"cancelled",children:"Annul\xe9"})]}),w.status&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{className:"sm:col-span-2",children:[a.jsx("label",{htmlFor:"work_type",className:"block text-sm font-medium text-gray-700",children:"Type de travaux"}),a.jsx("textarea",{id:"work_type",rows:4,...v("work_type",{required:!0}),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"}),w.work_type&&a.jsx("span",{className:"text-red-500 text-sm",children:"Ce champ est requis"})]}),(0,a.jsxs)("div",{className:"sm:col-span-2",children:[a.jsx("label",{htmlFor:"parts_supplies",className:"block text-sm font-medium text-gray-700",children:"Pi\xe8ces et fournitures"}),a.jsx("textarea",{id:"parts_supplies",rows:4,...v("parts_supplies"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,a.jsxs)("div",{className:"sm:col-span-2",children:[a.jsx("label",{htmlFor:"observations",className:"block text-sm font-medium text-gray-700",children:"Observations"}),a.jsx("textarea",{id:"observations",rows:4,...v("observations"),className:"mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Photos du v\xe9hicule"}),a.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:m.map((e,t)=>a.jsx(c.Z,{index:t,imageUrl:e,onUpload:e=>N(t,e),onDelete:()=>k(t)},t))})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Signature du client"}),(0,a.jsxs)("div",{className:"border-2 border-gray-300 rounded-md",children:[a.jsx(u(),{ref:e=>b(e),canvasProps:{className:"signature-canvas",style:{width:"100%",height:"160px"},width:500,height:160},minWidth:1,maxWidth:2.5,velocityFilterWeight:.7}),(0,a.jsxs)("div",{className:"mt-2 flex justify-end space-x-2",children:[a.jsx("button",{type:"button",onClick:()=>{f?.clear(),p("")},className:"px-3 py-1 text-sm text-gray-600 hover:text-gray-900",children:"Effacer"}),a.jsx("button",{type:"button",onClick:()=>{if(!f||f.isEmpty()){l.toast.error("Veuillez signer avant de sauvegarder");return}p(f.getTrimmedCanvas().toDataURL("image/png"))},className:"px-3 py-1 text-sm text-blue-600 hover:text-blue-900",children:"Sauvegarder"})]})]})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-3",children:[a.jsx("button",{type:"button",onClick:t,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Annuler"}),a.jsx("button",{type:"submit",disabled:r,className:"px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:r?"Cr\xe9ation...":"Cr\xe9er la fiche"})]})]})]})}):null}[o,l,c]=m.then?(await m)():m,r()}catch(e){r(e)}})},9008:(e,t,s)=>{"use strict";s.d(t,{O:()=>r});let r=(0,s(2885).createClient)("https://pjxtjkmqgkbisgfleaps.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqeHRqa21xZ2tiaXNnZmxlYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTAzMzAsImV4cCI6MjA1MTc2NjMzMH0.UjKK4kSJDapIRx0iJvdHiJZzMbi99tDx52FmSq4qyfE",{auth:{persistSession:!0,autoRefreshToken:!0}})},3900:(e,t,s)=>{"use strict";s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{default:()=>i});var a=s(997);s(108);var n=s(3590);s(8819);var o=e([n]);function i({Component:e,pageProps:t}){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(e,{...t}),a.jsx(n.ToastContainer,{})]})}n=(o.then?(await o)():o)[0],r()}catch(e){r(e)}})},108:()=>{}};
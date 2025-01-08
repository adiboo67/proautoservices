"use strict";exports.id=702,exports.ids=[702],exports.modules={7702:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>p});var n=r(997),o=r(6689),a=r(9870),i=r(5503),l=r(476),d=r(1103),c=r(9008),u=r(3590),m=r(2460),h=e([a,i,l,d,u,m]);function p(){let[e,t]=(0,o.useState)([]),[r,s]=(0,o.useState)(null),[h,p]=(0,o.useState)(!1),[f,b]=(0,o.useState)(null);(0,o.useEffect)(()=>{g()},[]);let g=async()=>{try{let{data:e,error:r}=await c.O.from("appointments").select("*").gte("start_time",new Date(Date.now()-6048e5).toISOString());if(r)throw r;let s=e.map(e=>({...e,title:`${e.client_name} - ${e.service}`,start:e.start_time,end:e.end_time}));t(s)}catch(e){console.error("Error fetching appointments:",e),u.toast.error("Erreur lors du chargement des rendez-vous")}},x=async t=>{try{let r=e.find(e=>e.id===t.event.extendedProps.id);if(!r)return;let s=new Date(r.start).toTimeString().substring(0,8),n=new Date(t.event.start),[o,a,i]=s.split(":");n.setHours(parseInt(o),parseInt(a),parseInt(i));let l=new Date(n.getTime()+36e5),{error:d}=await c.O.from("appointments").update({start_time:n.toISOString(),end_time:l.toISOString()}).eq("id",r.id);if(d)throw d;u.toast.success("Rendez-vous d\xe9plac\xe9 avec succ\xe8s"),g()}catch(e){console.error("Error updating appointment:",e),u.toast.error("Erreur lors du d\xe9placement du rendez-vous"),t.revert()}},v=async e=>{try{let{error:t}=await c.O.from("appointments").delete().eq("id",e);if(t)throw t;u.toast.success("Rendez-vous supprim\xe9 avec succ\xe8s"),p(!1),g()}catch(e){console.error("Error deleting appointment:",e),u.toast.error("Erreur lors de la suppression du rendez-vous")}},y=e=>{switch(e.toLowerCase()){case"vidange":return"#4CAF50";case"r\xe9paration":return"#F44336";case"d\xe9pannage":return"#FF9800";case"diagnostic":return"#2196F3";case"pneumatique":return"#9C27B0";case"climatisation":return"#00BCD4";default:return"#607D8B"}};return(0,n.jsxs)("div",{className:"space-y-4",children:[n.jsx("div",{className:"bg-white p-4 rounded-lg shadow",children:n.jsx(a.default,{plugins:[i.default,l.default,d.default],initialView:"dayGridMonth",headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek"},editable:!0,droppable:!0,eventDrop:x,dateClick:e=>{s(e.date),document.querySelectorAll(".fc-day-selected").forEach(e=>{e.classList.remove("fc-day-selected")}),e.dayEl.classList.add("fc-day-selected"),b(null),p(!0)},eventClick:t=>{let r=e.find(e=>e.id===t.event.extendedProps.id);r&&(b(r),p(!0))},events:e.map(e=>({...e,backgroundColor:y(e.service),extendedProps:{id:e.id}})),height:"auto",locale:"fr",buttonText:{today:"Aujourd'hui",month:"Mois",week:"Semaine"}})}),h&&n.jsx(m.Z,{appointment:f,selectedDate:r,onClose:()=>{p(!1),b(null)},onSuccess:g,onDelete:v})]})}[a,i,l,d,u,m]=h.then?(await h)():h,s()}catch(e){s(e)}})},2460:(e,t,r)=>{r.a(e,async(e,s)=>{try{r.d(t,{Z:()=>u});var n=r(997),o=r(6689),a=r(5641),i=r(9008),l=r(3590),d=r(1163),c=e([a,l]);[a,l]=c.then?(await c)():c;let m=["Vidange","R\xe9paration","D\xe9pannage","Diagnostic","Pneumatique","Climatisation","Autres"];function u({appointment:e,selectedDate:t,onClose:r,onSuccess:s,onDelete:c}){let[u,h]=(0,o.useState)(!1),{register:p,handleSubmit:f,formState:{errors:b}}=(0,a.useForm)({defaultValues:e?{client_name:e.client_name,phone:e.phone,vehicle:e.vehicle,service:e.service,start:e.start.split("T")[0],time:e.start.split("T")[1].substring(0,5),notes:e.notes}:{start:t?.toISOString().split("T")[0],service:"Vidange"}}),g=(0,d.useRouter)(),x=async t=>{try{h(!0);let n=new Date(t.start+"T"+t.time),o=new Date(n.getTime()+36e5),a={client_name:t.client_name,phone:t.phone,vehicle:t.vehicle,service:t.service,start_time:n.toISOString(),end_time:o.toISOString(),notes:t.notes||null};if(e?.id){let{error:t}=await i.O.from("appointments").update(a).eq("id",e.id);if(t)throw t;l.toast.success("Rendez-vous mis \xe0 jour avec succ\xe8s")}else{let{error:e}=await i.O.from("appointments").insert([a]);if(e)throw e;l.toast.success("Rendez-vous cr\xe9\xe9 avec succ\xe8s")}s(),r()}catch(e){console.error("Error saving appointment:",e),l.toast.error(e.message||"Erreur lors de l'enregistrement")}finally{h(!1)}};return n.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50",children:(0,n.jsxs)("div",{className:"relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white",children:[(0,n.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[n.jsx("h3",{className:"text-lg font-medium text-gray-900",children:e?"Modifier le rendez-vous":"Nouveau rendez-vous"}),(0,n.jsxs)("button",{onClick:r,className:"text-gray-400 hover:text-gray-500",children:[n.jsx("span",{className:"sr-only",children:"Fermer"}),n.jsx("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]})]}),(0,n.jsxs)("form",{onSubmit:f(x),className:"space-y-4",children:[(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"client_name",className:"block text-sm font-medium text-gray-700",children:"Nom du client"}),n.jsx("input",{id:"client_name",type:"text",...p("client_name",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),b.client_name&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.client_name.message||"")})]}),(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700",children:"T\xe9l\xe9phone"}),n.jsx("input",{id:"phone",type:"tel",...p("phone",{required:"Ce champ est requis",pattern:{value:/^[0-9+\s-]+$/,message:"Num\xe9ro de t\xe9l\xe9phone invalide"}}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),b.phone&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.phone.message||"")})]}),(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"vehicle",className:"block text-sm font-medium text-gray-700",children:"V\xe9hicule"}),n.jsx("input",{id:"vehicle",type:"text",...p("vehicle",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),b.vehicle&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.vehicle.message||"")})]}),(0,n.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"start",className:"block text-sm font-medium text-gray-700",children:"Date"}),n.jsx("input",{id:"start",type:"date",...p("start",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),b.start&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.start.message||"")})]}),(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"time",className:"block text-sm font-medium text-gray-700",children:"Heure"}),n.jsx("input",{id:"time",type:"time",...p("time",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),b.time&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.time.message||"")})]})]}),(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"service",className:"block text-sm font-medium text-gray-700",children:"Service"}),n.jsx("select",{id:"service",...p("service",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2",children:m.map(e=>n.jsx("option",{value:e,children:e},e))}),b.service&&n.jsx("p",{className:"mt-1 text-sm text-red-600",children:String(b.service.message||"")})]}),(0,n.jsxs)("div",{children:[n.jsx("label",{htmlFor:"notes",className:"block text-sm font-medium text-gray-700",children:"Notes"}),n.jsx("textarea",{id:"notes",...p("notes"),rows:3,className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"})]}),(0,n.jsxs)("div",{className:"flex justify-end space-x-3",children:[e&&(0,n.jsxs)(n.Fragment,{children:[n.jsx("button",{type:"button",onClick:()=>{g.push({pathname:"/vehicles/new",query:{client_name:e.client_name,phone:e.phone,brand_model:e.vehicle,work_type:e.service,entry_date:new Date(e.start).toISOString().split("T")[0]}})},className:"px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",children:"Cr\xe9er une fiche"}),n.jsx("button",{type:"button",onClick:()=>{window.confirm("\xcates-vous s\xfbr de vouloir supprimer ce rendez-vous ?")&&c(e.id)},className:"px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"Supprimer"})]}),n.jsx("button",{type:"button",onClick:r,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Annuler"}),n.jsx("button",{type:"submit",disabled:u,className:"px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:u?"Enregistrement...":e?"Modifier":"Cr\xe9er"})]})]})]})})}s()}catch(e){s(e)}})}};
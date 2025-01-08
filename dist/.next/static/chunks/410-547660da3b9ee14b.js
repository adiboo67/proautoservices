"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[410],{8410:function(e,t,r){r.d(t,{Z:function(){return f}});var s=r(5893),n=r(7294),o=r(3907),i=r(6993),a=r(4745),l=r(9897),d=r(9008),c=r(2920),u=r(7536),m=r(1163);let h=["Vidange","R\xe9paration","D\xe9pannage","Diagnostic","Pneumatique","Climatisation","Autres"];function p(e){let{appointment:t,selectedDate:r,onClose:o,onSuccess:i,onDelete:a}=e,[l,p]=(0,n.useState)(!1),{register:f,handleSubmit:b,formState:{errors:g}}=(0,u.cI)({defaultValues:t?{client_name:t.client_name,phone:t.phone,vehicle:t.vehicle,service:t.service,start:t.start.split("T")[0],time:t.start.split("T")[1].substring(0,5),notes:t.notes}:{start:null==r?void 0:r.toISOString().split("T")[0],service:"Vidange"}}),x=(0,m.useRouter)(),v=async e=>{try{p(!0);let r=new Date(e.start+"T"+e.time),s=new Date(r.getTime()+36e5),n={client_name:e.client_name,phone:e.phone,vehicle:e.vehicle,service:e.service,start_time:r.toISOString(),end_time:s.toISOString(),notes:e.notes||null};if(null==t?void 0:t.id){let{error:e}=await d.O.from("appointments").update(n).eq("id",t.id);if(e)throw e;c.Am.success("Rendez-vous mis \xe0 jour avec succ\xe8s")}else{let{error:e}=await d.O.from("appointments").insert([n]);if(e)throw e;c.Am.success("Rendez-vous cr\xe9\xe9 avec succ\xe8s")}i(),o()}catch(e){console.error("Error saving appointment:",e),c.Am.error(e.message||"Erreur lors de l'enregistrement")}finally{p(!1)}};return(0,s.jsx)("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50",children:(0,s.jsxs)("div",{className:"relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white",children:[(0,s.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,s.jsx)("h3",{className:"text-lg font-medium text-gray-900",children:t?"Modifier le rendez-vous":"Nouveau rendez-vous"}),(0,s.jsxs)("button",{onClick:o,className:"text-gray-400 hover:text-gray-500",children:[(0,s.jsx)("span",{className:"sr-only",children:"Fermer"}),(0,s.jsx)("svg",{className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})]})]}),(0,s.jsxs)("form",{onSubmit:b(v),className:"space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"client_name",className:"block text-sm font-medium text-gray-700",children:"Nom du client"}),(0,s.jsx)("input",{id:"client_name",type:"text",...f("client_name",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.client_name&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.client_name.message||"")})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"phone",className:"block text-sm font-medium text-gray-700",children:"T\xe9l\xe9phone"}),(0,s.jsx)("input",{id:"phone",type:"tel",...f("phone",{required:"Ce champ est requis",pattern:{value:/^[0-9+\s-]+$/,message:"Num\xe9ro de t\xe9l\xe9phone invalide"}}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.phone&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.phone.message||"")})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"vehicle",className:"block text-sm font-medium text-gray-700",children:"V\xe9hicule"}),(0,s.jsx)("input",{id:"vehicle",type:"text",...f("vehicle",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.vehicle&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.vehicle.message||"")})]}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"start",className:"block text-sm font-medium text-gray-700",children:"Date"}),(0,s.jsx)("input",{id:"start",type:"date",...f("start",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.start&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.start.message||"")})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"time",className:"block text-sm font-medium text-gray-700",children:"Heure"}),(0,s.jsx)("input",{id:"time",type:"time",...f("time",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"}),g.time&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.time.message||"")})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"service",className:"block text-sm font-medium text-gray-700",children:"Service"}),(0,s.jsx)("select",{id:"service",...f("service",{required:"Ce champ est requis"}),className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2",children:h.map(e=>(0,s.jsx)("option",{value:e,children:e},e))}),g.service&&(0,s.jsx)("p",{className:"mt-1 text-sm text-red-600",children:String(g.service.message||"")})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"notes",className:"block text-sm font-medium text-gray-700",children:"Notes"}),(0,s.jsx)("textarea",{id:"notes",...f("notes"),rows:3,className:"mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:border-2"})]}),(0,s.jsxs)("div",{className:"flex justify-end space-x-3",children:[t&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("button",{type:"button",onClick:()=>{x.push({pathname:"/vehicles/new",query:{client_name:t.client_name,phone:t.phone,brand_model:t.vehicle,work_type:t.service,entry_date:new Date(t.start).toISOString().split("T")[0]}})},className:"px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",children:"Cr\xe9er une fiche"}),(0,s.jsx)("button",{type:"button",onClick:()=>{window.confirm("\xcates-vous s\xfbr de vouloir supprimer ce rendez-vous ?")&&a(t.id)},className:"px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",children:"Supprimer"})]}),(0,s.jsx)("button",{type:"button",onClick:o,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Annuler"}),(0,s.jsx)("button",{type:"submit",disabled:l,className:"px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:l?"Enregistrement...":t?"Modifier":"Cr\xe9er"})]})]})]})})}function f(){let[e,t]=(0,n.useState)([]),[r,u]=(0,n.useState)(null),[m,h]=(0,n.useState)(!1),[f,b]=(0,n.useState)(null);(0,n.useEffect)(()=>{g()},[]);let g=async()=>{try{let{data:e,error:r}=await d.O.from("appointments").select("*").gte("start_time",new Date(Date.now()-6048e5).toISOString());if(r)throw r;let s=e.map(e=>({...e,title:"".concat(e.client_name," - ").concat(e.service),start:e.start_time,end:e.end_time}));t(s)}catch(e){console.error("Error fetching appointments:",e),c.Am.error("Erreur lors du chargement des rendez-vous")}},x=async t=>{try{let r=e.find(e=>e.id===t.event.extendedProps.id);if(!r)return;let s=new Date(r.start).toTimeString().substring(0,8),n=new Date(t.event.start),[o,i,a]=s.split(":");n.setHours(parseInt(o),parseInt(i),parseInt(a));let l=new Date(n.getTime()+36e5),{error:u}=await d.O.from("appointments").update({start_time:n.toISOString(),end_time:l.toISOString()}).eq("id",r.id);if(u)throw u;c.Am.success("Rendez-vous d\xe9plac\xe9 avec succ\xe8s"),g()}catch(e){console.error("Error updating appointment:",e),c.Am.error("Erreur lors du d\xe9placement du rendez-vous"),t.revert()}},v=async e=>{try{let{error:t}=await d.O.from("appointments").delete().eq("id",e);if(t)throw t;c.Am.success("Rendez-vous supprim\xe9 avec succ\xe8s"),h(!1),g()}catch(e){console.error("Error deleting appointment:",e),c.Am.error("Erreur lors de la suppression du rendez-vous")}},w=e=>{switch(e.toLowerCase()){case"vidange":return"#4CAF50";case"r\xe9paration":return"#F44336";case"d\xe9pannage":return"#FF9800";case"diagnostic":return"#2196F3";case"pneumatique":return"#9C27B0";case"climatisation":return"#00BCD4";default:return"#607D8B"}};return(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsx)("div",{className:"bg-white p-4 rounded-lg shadow",children:(0,s.jsx)(o.Z,{plugins:[i.Z,a.Z,l.ZP],initialView:"dayGridMonth",headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek"},editable:!0,droppable:!0,eventDrop:x,dateClick:e=>{u(e.date),document.querySelectorAll(".fc-day-selected").forEach(e=>{e.classList.remove("fc-day-selected")}),e.dayEl.classList.add("fc-day-selected"),b(null),h(!0)},eventClick:t=>{let r=e.find(e=>e.id===t.event.extendedProps.id);r&&(b(r),h(!0))},events:e.map(e=>({...e,backgroundColor:w(e.service),extendedProps:{id:e.id}})),height:"auto",locale:"fr",buttonText:{today:"Aujourd'hui",month:"Mois",week:"Semaine"}})}),m&&(0,s.jsx)(p,{appointment:f,selectedDate:r,onClose:()=>{h(!1),b(null)},onSuccess:g,onDelete:v})]})}}}]);
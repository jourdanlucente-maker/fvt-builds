export const HOME=new URL('../../',import.meta.url).href;
export const VERSIONS=Object.freeze([
 {id:'chile-812',country:'chile',label:'Chile · V8.12',short:'V8.12',missions:10,latest:true,detail:'Cataclismo con indicaciones grandes y centradas.',url:HOME+'play/chile-812/'},
 {id:'chile-811',country:'chile',label:'Chile · V8.11',short:'V8.11',missions:10,detail:'Campaña de diez misiones con progresión más suave.',url:HOME+'play/chile-811/'},
 {id:'chile-810',country:'chile',label:'Chile · V8.10',short:'V8.10',missions:12,detail:'Campaña de doce misiones y entrada gradual a la misión 8.',url:HOME+'play/chile-810/'},
 {id:'france-lucien',country:'france',label:'Francia · V9.2 · Lucien nuevo',short:'LUCIEN NUEVO',missions:10,latest:true,detail:'Nuevo Lucien 3D y guía visible del Cataclysme.',url:HOME+'play/france-lucien/'},
 {id:'france-92',country:'france',label:'Francia · V9.2 original',short:'V9.2 ORIGINAL',missions:10,detail:'Lucien original, guía visible y partida de este enlace.',url:HOME+'play/france-92/'},
 {id:'france-91',country:'france',label:'Francia · V9.1',short:'V9.1',missions:10,detail:'Campaña de diez misiones, anterior a la nueva guía.',url:HOME+'play/france-91/'}
].map(v=>Object.freeze(v)));
export const findVersion=id=>VERSIONS.find(v=>v.id===id);
export function readPreferences(raw){try{const x=JSON.parse(raw);return {country:['chile','france'].includes(x?.country)?x.country:'chile',chile:findVersion(x?.chile)?.country==='chile'?x.chile:'chile-812',france:findVersion(x?.france)?.country==='france'?x.france:'france-lucien',last:findVersion(x?.last)?.id||null};}catch{return {country:'chile',chile:'chile-812',france:'france-lucien',last:null};}}

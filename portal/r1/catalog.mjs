const HOME=new URL('../../',import.meta.url).href;
// One current edition per country. Historical choices never override these links.
export const COUNTRIES=Object.freeze({
 chile:Object.freeze({label:'Chile',url:HOME+'play/chile-812/?ui=chile-loop-r5'}),
 france:Object.freeze({label:'Francia',url:HOME+'play/france-lucien/?ui=arsenal-v1'})
});
export function readPreferences(raw){try{const x=JSON.parse(raw);return {country:['chile','france'].includes(x?.country)?x.country:'chile'};}catch{return {country:'chile'};}}

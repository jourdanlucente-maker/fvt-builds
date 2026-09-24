import {COUNTRIES,readPreferences} from './catalog.mjs?ui=chile-screen-r4';
const KEY='fvt-landing-r1',track=document.getElementById('campaigns'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 740px)');
let raw=null;try{raw=localStorage.getItem(KEY);}catch{}const prefs=readPreferences(raw);
function save(){try{localStorage.setItem(KEY,JSON.stringify(prefs));}catch{}}
function country(id,scroll=false){
 if(!Object.hasOwn(COUNTRIES,id))return;
 prefs.country=id;document.querySelectorAll('[data-country]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.country===id)));document.querySelectorAll('.campaign').forEach(c=>c.dataset.active=String(c.id===id));document.querySelectorAll('[data-dot]').forEach(d=>d.classList.toggle('active',d.dataset.dot===id));
 if(scroll&&mobile.matches){const card=document.getElementById(id);track.scrollTo({left:card.offsetLeft-track.offsetLeft-16,behavior:reduced.matches?'instant':'smooth'});}save();
}
for(const [id,campaign]of Object.entries(COUNTRIES)){
 const link=document.getElementById('play-'+id);link.href=campaign.url;link.setAttribute('aria-label','Jugar '+campaign.label+', 10 misiones');link.addEventListener('click',()=>country(id));
}
document.querySelectorAll('[data-country]').forEach(b=>b.addEventListener('click',()=>country(b.dataset.country,true)));
document.querySelector('.country-switch').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const id=e.key==='ArrowLeft'?'chile':'france';country(id,true);document.querySelector('[data-country='+id+']').focus({preventScroll:true});});
let queued=false;track.addEventListener('scroll',()=>{if(!mobile.matches||queued)return;queued=true;requestAnimationFrame(()=>{queued=false;const center=track.getBoundingClientRect().left+track.clientWidth/2;const closest=[...track.children].sort((a,b)=>Math.abs((a.getBoundingClientRect().left+a.getBoundingClientRect().right)/2-center)-Math.abs((b.getBoundingClientRect().left+b.getBoundingClientRect().right)/2-center))[0];country(closest.id);});},{passive:true});
country(prefs.country);
function align(){if(mobile.matches){const card=document.getElementById(prefs.country);track.scrollTo({left:card.offsetLeft-track.offsetLeft-16,behavior:'instant'});}}
requestAnimationFrame(align);addEventListener('pageshow',align);mobile.addEventListener('change',align);document.documentElement.dataset.ready='true';

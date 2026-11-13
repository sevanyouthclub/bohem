/* Подписи к фото и кнопка закрытия — добавляются к переводам из i18n.js */
const CAP={
 hy:{g1:"Կենդանի երաժշտություն երեկոյան",g2:"Սրինգ, թմբուկներ և կիթառ",g3:"Արևածաղիկներ մուտքի մոտ",g4:"Մուտքը արվեստանոց",g5:"Հուշանվերներ և մանրուքներ",g6:"Սիրասունկ կավե կճուճներում",g7:"Զրույց սեղանի շուրջ",g8:"Սրահը հայելու մեջ",close:"Փակել"},
 ru:{g1:"Живая музыка по вечерам",g2:"Флейта, барабаны и гитара",g3:"Подсолнухи у входа",g4:"Вход в арт-студию",g5:"Сувениры и безделушки",g6:"Сирасунк в глиняных горшочках",g7:"Разговоры за столом",g8:"Зал в зеркале",close:"Закрыть"},
 en:{g1:"Live music in the evening",g2:"Flute, drums and guitar",g3:"Sunflowers by the entrance",g4:"The studio entrance",g5:"Souvenirs and trinkets",g6:"Sirasunk in clay pots",g7:"Conversation around the table",g8:"The room in the mirror",close:"Close"},
 fr:{g1:"Musique live le soir",g2:"Flûte, batterie et guitare",g3:"Tournesols à l’entrée",g4:"L’entrée de l’atelier",g5:"Souvenirs et bibelots",g6:"Sirasunk en pots d’argile",g7:"Discussion autour de la table",g8:"La salle dans le miroir",close:"Fermer"}
};
for(const l in CAP)Object.assign(T[l],CAP[l]);

let lang="hy",cat=0;
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
function qty(q,i){if(!q)return[];const t=q.match(/^[a-z]+/)[0];return q.slice(t.length).split(",").map(n=>n+" "+U[t][i]);}
function renderMenu(){
  const i=L.indexOf(lang),tabs=document.getElementById("tabs");
  tabs.innerHTML=MENU.map((c,k)=>'<button type="button" class="k'+(k%5+1)+'" data-k="'+k+'" aria-pressed="'+(k===cat)+'">'+esc(c.t[i])+'</button>').join("");
  tabs.querySelectorAll("button").forEach(b=>b.onclick=()=>{cat=+b.dataset.k;renderMenu()});
  const c=MENU[cat];
  document.getElementById("sheet").innerHTML='<h3>'+esc(c.t[i])+'</h3>'+c.i.map(d=>{
    const q=qty(d[1],i),p=Array.isArray(d[0])?d[0]:[d[0]];
    const right=p.length>1?p.map((x,n)=>'<span class="qt">'+q[n]+'</span><span class="pr">'+x+' <span class="dr">֏</span></span>').join(""):'<span class="pr">'+p[0]+' <span class="dr">֏</span></span>'+(q[0]?'<span class="qt">'+q[0]+'</span>':'');
    return '<div class="dish"><div><b>'+esc(d[2][i])+'</b>'+(d[3]?'<small>'+esc(d[3][i])+'</small>':'')+'</div><div class="r">'+right+'</div></div>';
  }).join("")+(c.n?'<p class="note">'+esc(c.n[i])+'</p>':'');
}
function setTheme(m){
  document.documentElement.dataset.theme=m;
  const b=document.getElementById("theme");b.textContent=m==="dark"?"☀":"☾";
  b.setAttribute("aria-label",T[lang][m==="dark"?"theme_to_light":"theme_to_dark"]);
  try{localStorage.setItem("bohem-theme",m)}catch(e){}
}
function setLang(l){
  lang=l;document.documentElement.lang=l;document.title=T[l].title;
  document.querySelectorAll("[data-t]").forEach(e=>e.textContent=T[l][e.dataset.t]);
  document.querySelectorAll("[data-alt]").forEach(e=>e.alt=T[l][e.dataset.alt]);
  document.querySelectorAll(".langs button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.l===l));
  renderMenu();setTheme(document.documentElement.dataset.theme);
  try{localStorage.setItem("bohem-lang",l)}catch(e){}
}
document.querySelectorAll(".langs button").forEach(b=>b.onclick=()=>setLang(b.dataset.l));
document.getElementById("theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");

let sl="hy",st="";
try{sl=localStorage.getItem("bohem-lang")||"hy";st=localStorage.getItem("bohem-theme")||""}catch(e){}
if(!T[sl])sl="hy";
document.documentElement.dataset.theme=st||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
setLang(sl);

/* плавное появление блоков при скролле + активный пункт меню */
const revEls=[...document.querySelectorAll(".offer li,.paper,.inserts .ph,.menu-head .ph,.map,.hero-text,.hero-pic")];
revEls.forEach(el=>{el.classList.add("rev");el.style.setProperty("--d",(Array.prototype.indexOf.call(el.parentNode.children,el)%5)*80+"ms")});
if("IntersectionObserver"in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  revEls.forEach(el=>io.observe(el));
  const links=[...document.querySelectorAll("nav a")];
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.toggleAttribute("aria-current",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
  document.querySelectorAll("main section[id]").forEach(s=>so.observe(s));
}else revEls.forEach(el=>el.classList.add("in"));

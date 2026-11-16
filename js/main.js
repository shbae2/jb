/* ---------- RENDER ---------- */
const $ = s => document.querySelector(s);
const boldMe = a => a.replace(/Bae, J\.([*†]?)/g,'<b>Bae, J.$1</b>');
function pubHTML(p){
  return `<div class="pub"><span class="a">${boldMe(p.a)}</span><span class="t">${p.t}</span>
  <span class="j"><i>${p.j}</i>${p.v?`, ${p.v}`:""}.</span>
  ${(p.doi||p.pdf)?`<div class="acts">${p.doi?`<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI</a>`:""}${p.pdf?`<a href="${p.pdf}" target="_blank" rel="noopener">PDF</a>`:""}</div>`:""}</div>`;
}
function pubBlock(list,fn=pubHTML){
  const order = []; list.forEach(p=>{ if(!order.includes(p.y)) order.push(p.y); });
  order.sort((a,b)=> (b==="Forthcoming")-(a==="Forthcoming") || b-a);
  return order.map(y=>`<div class="year">${y}</div>`+list.filter(p=>p.y===y).map(fn).join("")).join("");
}
function renderPubs(f){
  const list = pubs.filter(p=>f==="all"||p.f.includes(f));
  const intl = list.filter(p=>p.c!=="kr"), kr = list.filter(p=>p.c==="kr");
  $("#pubList").innerHTML =
    `<h3 class="pub-group">International Journals <span>${intl.length}</span></h3>` + pubBlock(intl) +
    (kr.length ? `<h3 class="pub-group">Korean Journals <span>${kr.length}</span></h3>` + pubBlock(kr) : "");
}
renderPubs("all");
document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#filters button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); renderPubs(b.dataset.f);
});
document.querySelectorAll("#pubTabs button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#pubTabs button").forEach(x=>x.classList.remove("on")); b.classList.add("on");
  document.querySelectorAll("#v-publications .pane").forEach(x=>x.classList.remove("on")); $("#p-"+b.dataset.p).classList.add("on");
});
const wipHTML=w=>`<div class="wip"><span class="status">${w.s}</span><span class="t" style="font-family:var(--serif);font-size:18px;display:block;margin:6px 0 2px">${w.t}</span><span class="a" style="color:var(--muted);font-size:14.5px">${boldMe(w.a)}</span>${w.j?`<span class="j" style="display:block;font-style:italic;color:var(--muted);font-size:14px;margin-top:2px">${w.j}</span>`:""}</div>`;
const wR=wip.filter(w=>w.g==="review"), wP=wip.filter(w=>w.g==="progress");
$("#wipList").innerHTML = `<h3 class="pub-group">Under Review <span>${wR.length}</span></h3>`+wR.map(wipHTML).join("")+`<h3 class="pub-group">In Progress <span>${wP.length}</span></h3>`+wP.map(wipHTML).join("");
$("#confList").innerHTML = pubBlock(conf.map(c=>({y:+c[0],a:c[1],t:c[2],j:c[3],f:[]})), c=>`<div class="pub"><span class="a">${boldMe(c.a)}</span><span class="t">${c.t}</span><span class="j">${c.j}</span></div>`);
$("#grantRows").innerHTML = grants.map(g=>`<tr><td class="amt">${g[0]}</td><td>${g[1]}</td><td class="amt">${g[2]}</td><td><span class="tag ${g[3]==="PI"?"":"co"}">${g[3]}</span></td></tr>`).join("");
$("#courses").innerHTML = courses.map(c=>`<div class="inst ${c.cur?"current":""}"><h3>${c.i}</h3><div class="yrs">${c.y}${c.cur?" · Current":""}</div><ul>${c.c.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("");
const pics = list => list.length===1 ? single(list[0]) : `<div class="pic-row">${list.map(single).join("")}</div>`;
const single = g => `<button class="zoom one" data-src="${g[0]}" data-cap="${g[1]}"><img src="${g[0]}" alt="${g[1]}" loading="lazy"></button>`;
$("#awards").innerHTML = awards.map(a=>`<div class="aw"><div class="yr">${a[0]}</div><div>${a[1]}<div class="org">${a[2]}</div>${a[3]?pics(a[3]):""}</div></div>`).join("");
const gallery = imgs => `<div class="gallery">${imgs.map((g,i)=>`<button class="g g${i}" data-src="${g[0]}" data-cap="${g[1]}"><img src="${g[0]}" alt="${g[1]}" loading="lazy"></button>`).join("")}</div>`;
$("#newsList").innerHTML = news.map(n=>`<div class="news-item"><div class="d">${n.d}</div><div><div class="k">${n.k}${n.isNew?'<span class="new">NEW</span>':''}</div>${n.x}${n.imgs?gallery(n.imgs):""}${n.img?single(n.img):""}${n.pics?pics(n.pics):""}</div></div>`).join("");
document.querySelectorAll(".gallery .g, .zoom").forEach(b=>b.onclick=()=>{ $("#lbImg").src=b.dataset.src; $("#lbCap").innerHTML=b.dataset.cap; $("#lightbox").classList.add("on"); });
$("#lightbox").onclick=()=>$("#lightbox").classList.remove("on");
document.addEventListener("keydown",e=>{ if(e.key==="Escape") $("#lightbox").classList.remove("on"); });
$("#homeNews").innerHTML = news.slice(0,4).map(n=>`<li><span class="when">${n.d} · ${n.k}${n.isNew?'<span class="new">NEW</span>':''}</span>${n.short||n.x}</li>`).join("");
$("#homePubs").innerHTML = pubs.slice(0,4).map((p,i)=>`<li><span class="when">${i===0?'<span class="new" style="margin:0 8px 0 0">NEW</span>':''}${p.y} · ${p.j}</span><span style="font-family:var(--serif);font-size:16.5px">${p.t}</span></li>`).join("");


$("#collabList").innerHTML = collaborators.map(c=>`<article class="collab">
  <img src="${c.img}" alt="Portrait of ${c.n}" loading="lazy">
  <div><h3>${c.n}</h3><div class="c-role">${c.role}</div><div class="c-aff">${c.aff}</div><p>${c.bio}</p>
  ${c.links.length?`<div class="c-links">${c.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join("")}</div>`:""}</div></article>`).join("");

/* ---------- ROUTER ---------- */
const views = ["home","about","research","collaborators","publications","teaching","honors","news","contact"];
function show(){
  let h = (location.hash||"#home").slice(1); if(!views.includes(h)) h="home";
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("show"));
  $("#v-"+h).classList.add("show");
  document.querySelectorAll("nav a:not(.cv)").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+h));
  $("#nav").classList.remove("open");$("#menuBtn").setAttribute("aria-expanded",false);$("#menuBtn").textContent="Menu";
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",show); show();
$("#menuBtn").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",o);$("#menuBtn").textContent=o?"Close":"Menu";};

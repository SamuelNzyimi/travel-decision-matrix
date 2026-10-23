const C=["Scenery & nature","Culture & history","Relaxation & luxury","Cost / value","Ease from Nairobi","Safety & health","Microfinance relevance"];
const D0={"India":[8,10,6,9,8,6,9],"South Africa":[9,7,8,8,10,5,5],"Egypt":[7,10,6,8,9,6,5],"Japan":[9,10,7,6,5,10,4],"Greece":[9,9,9,6,6,8,3],"Nepal":[10,8,5,9,6,7,7],"Italy":[8,10,8,5,6,8,5],"Morocco":[8,9,7,8,5,7,6],"Spain":[8,9,8,6,6,8,3],"France":[8,9,8,4,7,7,6],"Switzerland":[10,6,9,2,6,10,8],"Scotland":[9,7,6,5,5,9,3],"Bahamas":[8,4,10,3,3,6,2]};
const W0=[20,20,15,15,15,10,5];
const P={lux:[15,10,35,10,10,15,5],cul:[15,40,5,10,10,15,5],val:[15,15,5,40,15,5,5],work:[10,10,5,10,20,10,35]};
let W=[...W0],D=JSON.parse(JSON.stringify(D0));
const $=id=>document.getElementById(id);
function buildW(){$("ws").innerHTML=C.map((c,i)=>`<div class="w"><label>${c}<b id="v${i}">${W[i]}</b></label><input type="range" min="0" max="50" value="${W[i]}" data-i="${i}"></div>`).join("");
 $("ws").querySelectorAll("input").forEach(el=>el.oninput=e=>{W[+el.dataset.i]=+el.value;$("v"+el.dataset.i).textContent=el.value;draw()})}
function score(s){const t=W.reduce((a,b)=>a+b,0)||1;return s.reduce((a,v,i)=>a+v*W[i],0)/t}
function draw(){const r=Object.entries(D).map(([n,s])=>[n,score(s)]).sort((a,b)=>b[1]-a[1]);
 $("rank").innerHTML=r.map(([n,s],i)=>`<div class="row ${i<3?"top":""}"><span class="rk">${i+1}</span><span>${n}</span><div class="track"><div class="fill" style="width:${s*10}%"></div></div><span class="sc">${s.toFixed(2)}</span></div>`).join("")}
function buildT(){$("tbl").innerHTML="<tr><th>Country</th>"+C.map(c=>`<th>${c}</th>`).join("")+"</tr>"+Object.entries(D).map(([n,s])=>`<tr><td>${n}</td>`+s.map((v,i)=>`<td><input type="number" min="1" max="10" value="${v}" data-n="${n}" data-i="${i}"></td>`).join("")+"</tr>").join("");
 $("tbl").querySelectorAll("input").forEach(el=>el.oninput=()=>{let v=Math.min(10,Math.max(1,+el.value||1));D[el.dataset.n][+el.dataset.i]=v;draw()})}
$("reset").onclick=()=>{W=[...W0];D=JSON.parse(JSON.stringify(D0));buildW();buildT();draw()};
document.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{W=[...P[b.dataset.p]];buildW();draw()});
buildW();buildT();draw();

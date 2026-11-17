(function(){
'use strict';
var HB=window.HB, CAT=HB.catalog;
var $=function(s,r){return (r||document).querySelector(s)};
var root=document.documentElement;

/* ---------- icons ---------- */
var P={
 home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
 lib:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M13 4h5.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H13z"/>',
 marker:'<path d="m9 11-5 5v4h4l5-5"/><path d="m14 6 4 4"/><path d="m12.5 7.5 4 4 3.5-3.5-4-4z"/>',
 set:'<path d="M4 7h9"/><path d="M17 7h3"/><circle cx="15" cy="7" r="2"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="9" cy="17" r="2"/>',
 play:'<path d="M8 5.5v13l11-6.5z"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
 back:'<path d="m15 5-7 7 7 7"/>',
 chev:'<path d="m9 5 7 7-7 7"/>',
 down:'<path d="m6 9 6 6 6-6"/>',
 aa:'<path d="M3 19 8 6l5 13"/><path d="M4.8 14.5h6.4"/><path d="M15 19l3-8 3 8"/><path d="M15.9 16.6h4.2"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/>',
 bm:'<path d="M6.5 4h11v16.5L12 16.5l-5.5 4z"/>',
 heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10C19.5 15.4 12 20 12 20z"/>',
 left:'<path d="m14 6-6 6 6 6"/>',
 right:'<path d="m10 6 6 6-6 6"/>',
 copy:'<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
 trash:'<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6.5 7l1 13h9l1-13"/>',
 note:'<path d="M5 4h14v12l-5 5H5z"/><path d="M14 21v-5h5"/>',
 share:'<circle cx="6" cy="12" r="2.2"/><circle cx="17" cy="6" r="2.2"/><circle cx="17" cy="18" r="2.2"/><path d="m8 11 7-4M8 13l7 4"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 font:'<path d="M4 20 11 4l7 16"/><path d="M6.5 14.5h9"/>',
 num:'<path d="M5 8h14M5 16h14M9 4 7 20M17 4l-2 16"/>',
 vib:'<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M4 8v8M20 8v8"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.2"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/>',
 backup:'<path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 19h14"/>',
 restore:'<path d="M12 20V9"/><path d="m7.5 13.5 4.5-4.5 4.5 4.5"/><path d="M5 5h14"/>',
 target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>',
 moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
 resume:'<path d="M5 12a7 7 0 1 0 2.2-5.1"/><path d="M5 4v4h4"/><path d="M12 8v4l3 2"/>',
 screen:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M9 21h6M12 17v4"/>',
 anim:'<path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/>',
 ext:'<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5H5V6h5"/>',
 clear:'<path d="M18 6 6 18M6 6l12 12"/>',
 find:'<circle cx="10.5" cy="10.5" r="5.5"/><path d="m20 20-5.2-5.2"/><path d="M8.5 10.5h4"/>'
};
function ic(n){return '<svg viewBox="0 0 24 24">'+P[n]+'</svg>'}
function h(tag,props){
  var e=document.createElement(tag);props=props||{};
  for(var k in props){var v=props[k];if(k==='class')e.className=v;else if(k==='html')e.innerHTML=v;else if(k==='text')e.textContent=v;else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else if(k==='style')e.style.cssText=v;else e.setAttribute(k,v)}
  for(var i=2;i<arguments.length;i++){var c=arguments[i];if(c==null)continue;e.appendChild(typeof c==='string'?document.createTextNode(c):c)}
  return e;
}

/* ---------- state ---------- */
var KEY='hb.v1';
var DEF={name:'Rahat',mode:'system',accent:'cream',amoled:0,anim:1,haptic:1,digits:'bn',font:'Solaiman',size:22,lh:1.9,para:.7,align:'left',margin:22,rtheme:'app',dim:0,resume:0,keepOn:0,goal:0,hiddenCats:[],pos:{},hl:{},bm:[],fav:[],read:{},stats:{},fin:{},recent:[],last:null,hometab:'reading'};
var S;
function load(){var o={};try{o=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}S={};for(var k in DEF)S[k]=(o[k]!==undefined)?o[k]:JSON.parse(JSON.stringify(DEF[k]))}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
load();

/* ---------- utils ---------- */
var BN='০১২৩৪৫৬৭৮৯';
function nb(x){x=String(x);if(S.digits==='en')return x;return x.replace(/[0-9]/g,function(d){return BN[d]})}
var WD=['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
var MO=['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
function greet(){var H=new Date().getHours();return H<4?'শুভ রাত্রি':H<6?'শুভ ভোর':H<12?'শুভ সকাল':H<15?'শুভ দুপুর':H<18?'শুভ বিকাল':H<20?'শুভ সন্ধ্যা':'শুভ রাত্রি'}
function dkey(d){d=d||new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
function fmtMin(m){m=Math.round(m);if(m>=60){var hh=Math.floor(m/60),mm=m%60;return nb(hh)+' ঘণ্টা'+(mm?' '+nb(mm)+' মিনিট':'')}return nb(m)+' মিনিট'}
function buzz(){if(!S.haptic)return;try{if(window.Android&&Android.vibrate)Android.vibrate(10);else if(navigator.vibrate)navigator.vibrate(10)}catch(e){}}
var toastT;function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toastT);toastT=setTimeout(function(){e.classList.remove('on')},1900)}
function hue(id){var n=parseInt(String(id).replace(/\D/g,''),10);if(isNaN(n)){n=0;for(var i=0;i<id.length;i++)n+=id.charCodeAt(i)*7}return (n*137.5)%360|0}
function cover(id,t,cls){var hu=hue(id);return h('div',{class:'cover'+(cls?' '+cls:''),style:'background:linear-gradient(145deg,hsl('+hu+',48%,38%),hsl('+((hu+40)%360)+',55%,24%))',text:(t||'ব').trim().charAt(0)})}
var BOOKS=CAT.books;
function bookCats(id){var r=[];CAT.cats.forEach(function(c){if(c.books.indexOf(id)>=0)r.push(c.name)});return r}
function bookProg(id){var p=S.pos[id],n=BOOKS[id].c.length;if(!p)return 0;var done=Object.keys(S.read[id]||{}).length;var f=Math.max(done,p.c+p.p)/n;return Math.min(1,f)}
function isFinished(id){return Object.keys(S.read[id]||{}).length>=BOOKS[id].c.length}

/* ---------- theme ---------- */
var mq=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
function resolved(){return S.mode==='system'?((mq&&mq.matches)?'dark':'light'):S.mode}
function applyTheme(){
  root.setAttribute('data-resolved',resolved());root.setAttribute('data-accent',S.accent);root.setAttribute('data-amoled',S.amoled?'1':'0');root.setAttribute('data-anim',S.anim?'1':'0');
  var m=document.querySelector('meta[name=theme-color]');if(m)m.content=resolved()==='dark'?'#0b0e18':'#f5efe3';
  try{if(window.Android&&Android.setBars)Android.setBars(resolved()==='dark')}catch(e){}
  applyReader();
}
if(mq&&mq.addEventListener)mq.addEventListener('change',function(){if(S.mode==='system')applyTheme()});
var FONTS={Solaiman:{n:'সলিমানলিপি',f:"'Solaiman','Hind',sans-serif"},Hind:{n:'হিন্দ শিলিগুড়ি',f:"'Hind','Solaiman',sans-serif"},system:{n:'সিস্টেম ফন্ট',f:"'Noto Sans Bengali','Siyam Rupali',system-ui,sans-serif"}};
var RT={app:'অ্যাপ থিম',white:'সাদা',paper:'পেপার',sepia:'সেপিয়া',dark:'ডার্ক',black:'কালো'};
function applyReader(){
  var r=$('#reader');r.style.setProperty('--rfont',(FONTS[S.font]||FONTS.Solaiman).f);
  r.style.setProperty('--rsize',S.size+'px');r.style.setProperty('--rlh',S.lh);r.style.setProperty('--rpara',S.para+'em');
  r.style.setProperty('--ralign',S.align);r.style.setProperty('--rmargin',S.margin+'px');
  r.setAttribute('data-rt',S.rtheme);$('#dim').style.opacity=S.dim/100;
}

/* ---------- navigation ---------- */
var view='home';
var NAV=[['home','home','হোম'],['lib','lib','বইঘর'],['notes','marker','নোট'],['settings','set','সেটিংস']];
function buildNav(){
  var n=$('#nav');n.innerHTML='';
  NAV.forEach(function(x){
    var b=h('button',{class:x[0]===view?'on':'','aria-label':x[2],onclick:function(){go(x[0])}});b.innerHTML=ic(x[1])+'<span>'+x[2]+'</span>';n.appendChild(b);
  });
  var showFab=(view==='home'||view==='lib');
  n.classList.toggle('full',!showFab);$('#fab').classList.toggle('hidden',!showFab);
}
function go(v){
  if(v===view&&$('#v-'+v).classList.contains('on'))return;buzz();view=v;
  ['home','lib','notes','settings'].forEach(function(k){$('#v-'+k).classList.toggle('on',k===v)});
  buildNav();render(v);$('#v-'+v).scrollTop=0;
}
function render(v){({home:renderHome,lib:renderLib,notes:renderNotes,settings:renderSettings})[v]()}

/* ---------- stats ---------- */
function monthStats(){
  var now=new Date(),y=now.getFullYear(),m=now.getMonth(),total=0,weeks=[0,0,0,0,0],fw=[0,0,0,0,0];
  var dim=new Date(y,m+1,0).getDate();
  for(var d=1;d<=dim;d++){var k=y+'-'+('0'+(m+1)).slice(-2)+'-'+('0'+d).slice(-2);var w=Math.min(4,Math.floor((d-1)/7));var s=(S.stats[k]||0)/60;total+=s;weeks[w]+=s;fw[w]+=(S.fin[k]||0)}
  return {total:total,weeks:weeks,fin:fw,avg:total/Math.max(1,now.getDate())};
}
function todayMin(){return (S.stats[dkey()]||0)/60}

/* ---------- home ---------- */
function bookRow(id,sub,onclick){
  var b=BOOKS[id],p=bookProg(id);
  return h('button',{class:'book',onclick:onclick||function(){openBook(id)}},
    cover(id,b.t),
    h('div',{class:'m'},h('div',{class:'t',text:b.t}),h('div',{class:'s',text:sub||(b.y?nb(b.y)+' · ':'')+nb(b.c.length)+' অধ্যায়'}),
      p>0?h('div',{class:'prog'},h('i',{style:'width:'+Math.round(p*100)+'%'})):null),
    h('span',{class:'chev',html:ic('chev')}));
}
function renderHome(){
  var v=$('#v-home');v.innerHTML='';var now=new Date(),ms=monthStats();
  var top=h('div',{class:'top'},h('div',{},h('small',{text:WD[now.getDay()]+', '+nb(now.getDate())+' '+MO[now.getMonth()]}),h('h1',{text:greet()+', '+S.name})),
    h('div',{class:'avatar',text:(S.name||'R').trim().charAt(0).toUpperCase(),onclick:function(){go('settings')}}));
  v.appendChild(top);
  var tabs=h('div',{class:'pills'});
  [['reading','পড়ছি'],['fav','প্রিয়'],['done','শেষ']].forEach(function(t){tabs.appendChild(h('button',{class:'pill'+(S.hometab===t[0]?' on':''),text:t[1],onclick:function(){S.hometab=t[0];save();renderHome()}}))});
  v.appendChild(tabs);
  v.appendChild(h('div',{class:'row'},h('div',{class:'label',text:MO[now.getMonth()]+' মাসে পড়েছি'}),h('div',{class:'drop',html:'সব'+ic('down')})));
  var big=h('div',{class:'big'});var tm=Math.round(ms.total);
  big.innerHTML=tm>=60?nb(Math.floor(tm/60))+'<small>ঘণ্টা</small> '+nb(tm%60)+'<small>মিনিট</small>':nb(tm)+'<small>মিনিট</small>';
  v.appendChild(big);
  var tdm=todayMin(),goal=S.goal;
  var ban=h('button',{class:'banner',onclick:goalPop});
  if(goal){ban.appendChild(h('div',{class:'fill',style:'width:'+Math.min(100,tdm/goal*100)+'%'}));ban.appendChild(h('span',{text:'আজ '+nb(Math.floor(tdm))+' / '+nb(goal)+' মিনিট'}));ban.appendChild(h('b',{text:tdm>=goal?'পূর্ণ ✓':'লক্ষ্য ›'}))}
  else{ban.appendChild(h('span',{text:'দৈনিক লক্ষ্য নেই'}));ban.appendChild(h('b',{text:'লক্ষ্য ঠিক করুন ›'}))}
  v.appendChild(ban);
  v.appendChild(h('div',{class:'card'},h('p',{class:'cap',text:'দৈনিক গড়'}),h('div',{class:'num',text:fmtMin(ms.avg)})));
  var panel=h('div',{class:'panel'});
  var mx=Math.max.apply(null,ms.weeks),mf=Math.max.apply(null,ms.fin);
  panel.appendChild(h('div',{class:'row'},h('h2',{text:'পড়ার ধারা'}),h('div',{class:'legend',html:'<span><i></i>সময়</span><span><i class="o"></i>শেষ অধ্যায়</span>'})));
  var bars=h('div',{class:'bars'});
  for(var i=0;i<5;i++){
    var a=ms.weeks[i],b=ms.fin[i];
    bars.appendChild(h('div',{class:'bar'},h('div',{class:'col'},
      h('span',{class:a?'':'z',style:'height:'+(a&&mx?Math.max(10,a/mx*150):10)+'px'}),
      h('span',{class:b?'o':'z',style:'height:'+(b&&mf?Math.max(10,b/mf*150):10)+'px'})),h('em',{text:'সপ্তাহ '+nb(i+1)})));
  }
  panel.appendChild(bars);
  panel.appendChild(h('div',{class:'sec'},h('h2',{text:S.hometab==='reading'?'চলমান বই':S.hometab==='fav'?'প্রিয় বই':'পড়া শেষ'}),
    h('button',{class:'icbtn','aria-label':'বইঘর',html:ic('lib'),onclick:function(){go('lib')}})));
  var ids=[];
  if(S.hometab==='reading')ids=S.recent.filter(function(id){return BOOKS[id]&&!isFinished(id)});
  else if(S.hometab==='fav')ids=S.fav.filter(function(id){return BOOKS[id]});
  else ids=Object.keys(S.pos).filter(function(id){return BOOKS[id]&&isFinished(id)});
  if(!ids.length){panel.appendChild(h('div',{class:'dash',text:S.hometab==='reading'?'এখনো কোনো বই পড়া শুরু হয়নি':S.hometab==='fav'?'প্রিয় তালিকায় কোনো বই নেই':'এখনো কোনো বই শেষ হয়নি'}))}
  else{var l=h('div',{class:'list'});ids.slice(0,40).forEach(function(id){var p=S.pos[id];l.appendChild(bookRow(id,p?('অধ্যায় '+nb(p.c+1)+'/'+nb(BOOKS[id].c.length)+' · '+nb(Math.round(bookProg(id)*100))+'%'):null,function(){continueBook(id)}))});panel.appendChild(l)}
  v.appendChild(panel);
}
function goalPop(){
  var g=S.goal||20;
  var inp=h('input',{type:'range',min:5,max:180,step:5,value:g});var out=h('b',{text:fmtMin(g)});
  inp.addEventListener('input',function(){g=+inp.value;out.textContent=fmtMin(g)});
  popup('দৈনিক পড়ার লক্ষ্য',h('div',{class:'ctrl'},h('div',{class:'cl'},h('span',{text:'প্রতিদিন'}),out),inp),[['লক্ষ্য বাদ',function(){S.goal=0;save();renderHome()}],['সেভ',function(){S.goal=g;save();renderHome()},1]]);
}

/* ---------- library ---------- */
var libCat=0,libQ='';
function renderLib(){
  var v=$('#v-lib');v.innerHTML='';
  v.appendChild(h('div',{class:'top'},h('div',{},h('small',{text:nb(Object.keys(BOOKS).length)+'টি বই · সম্পূর্ণ অফলাইন'}),h('h1',{text:'বইঘর'})),h('div',{class:'avatar',text:(S.name||'R').trim().charAt(0).toUpperCase(),onclick:function(){go('settings')}})));
  var sb=h('div',{class:'search',html:ic('search')});var inp=h('input',{placeholder:'বই বা অধ্যায় খুঁজুন…',value:libQ});sb.appendChild(inp);v.appendChild(sb);
  var chips=h('div',{class:'pills'});
  var vis=CAT.cats.filter(function(c){return S.hiddenCats.indexOf(c.id)<0});
  [{id:0,name:'সব'}].concat(vis).forEach(function(c){chips.appendChild(h('button',{class:'pill coral'+(libCat===c.id?' on':''),text:c.name,onclick:function(){libCat=c.id;libQ='';renderLib()}}))});
  v.appendChild(chips);
  var list=h('div',{class:'list',style:'margin-top:14px'});v.appendChild(list);
  function fill(){
    list.innerHTML='';var q=inp.value.trim();libQ=q;
    var cat=CAT.cats.filter(function(c){return c.id===libCat})[0];
    if(cat&&cat.pdfs){
      list.appendChild(h('div',{class:'note',text:'এই তালিকার পিডিএফগুলো ইন্টারনেট ছাড়া খোলে না (মূল অ্যাপে এগুলো Google Drive লিংক ছিল)।'}));
      cat.pdfs.forEach(function(p){if(q&&p.t.indexOf(q)<0)return;list.appendChild(h('button',{class:'book',onclick:function(){var u='https://drive.google.com/file/d/'+p.d+'/view';if(window.Android&&Android.openUrl)Android.openUrl(u);else window.open(u,'_blank')}},cover(p.d,p.t),h('div',{class:'m'},h('div',{class:'t',text:p.t}),h('div',{class:'s',text:'পিডিএফ · অনলাইন'})),h('span',{class:'chev',html:ic('ext')})))});return;
    }
    var ids;
    if(libCat===0){ids=[];var seen={};vis.forEach(function(c){c.books.forEach(function(b){if(!seen[b]){seen[b]=1;ids.push(b)}})})}
    else ids=cat.books.slice();
    var n=0;
    ids.forEach(function(id){var b=BOOKS[id];if(q){var hit=b.t.indexOf(q)>=0;if(!hit)return}if(n++>=300)return;list.appendChild(bookRow(id))});
    if(q){ // chapter hits
      var cnt=0;ids.forEach(function(id){BOOKS[id].c.forEach(function(ct,i){if(cnt<40&&ct.indexOf(q)>=0&&BOOKS[id].t.indexOf(q)<0){cnt++;list.appendChild(h('button',{class:'book',onclick:function(){openReader(id,i,0)}},cover(id,BOOKS[id].t),h('div',{class:'m'},h('div',{class:'t',text:ct}),h('div',{class:'s',text:BOOKS[id].t+' · অধ্যায় '+nb(i+1)})),h('span',{class:'chev',html:ic('chev')})))}})})
    }
    if(!list.children.length)list.appendChild(h('div',{class:'empty',text:'কিছু পাওয়া যায়নি'}));
  }
  inp.addEventListener('input',fill);fill();
}

/* ---------- sheets / popups ---------- */
var sheetOpen=false,popOpen=false;
function showSheet(title,node,onclose,peek){
  $('#sheet').classList.toggle('peek',!!peek);$('#scrim').classList.toggle('peek',!!peek);
  $('#sheet-t').textContent=title||'';var b=$('#sheet-b');b.innerHTML='';b.appendChild(node);b.scrollTop=0;
  $('#sheet').classList.add('on');$('#scrim').classList.add('on');sheetOpen=true;sheetClose=onclose||null;
}
var sheetClose=null;
function hideSheet(){$('#sheet').classList.remove('on');$('#scrim').classList.remove('on');sheetOpen=false;if(sheetClose){var f=sheetClose;sheetClose=null;f()}}
$('#scrim').addEventListener('click',hideSheet);
function popup(title,node,acts){
  var b=$('#pop-b');b.innerHTML='';b.appendChild(h('h4',{text:title}));b.appendChild(node);
  var a=h('div',{class:'acts'});
  (acts||[['ঠিক আছে',null,1]]).forEach(function(x){a.appendChild(h('button',{class:x[2]?'pri':'',text:x[0],onclick:function(){hidePop();if(x[1])x[1]()}}))});
  b.appendChild(a);$('#pop').classList.add('on');popOpen=true;
}
function hidePop(){$('#pop').classList.remove('on');popOpen=false}
$('#pop').addEventListener('click',function(e){if(e.target===this)hidePop()});

/* ---------- book detail ---------- */
function toggleFav(id){var i=S.fav.indexOf(id);if(i>=0)S.fav.splice(i,1);else S.fav.unshift(id);save()}
function openBook(id){
  var b=BOOKS[id],p=S.pos[id],box=h('div',{});
  box.appendChild(h('div',{class:'dhead'},cover(id,b.t),h('div',{},h('h2',{text:b.t}),h('p',{text:(b.y?nb(b.y)+' · ':'')+nb(b.c.length)+' অধ্যায়'}),h('p',{text:'আনুমানিক '+fmtMin(b.w/1000)+' · '+bookCats(id).join(', ')}))));
  var fav=h('button',{class:'btn sec2'+(S.fav.indexOf(id)>=0?' on':''),'aria-label':'প্রিয়',html:ic('heart'),onclick:function(){toggleFav(id);fav.classList.toggle('on')}});
  box.appendChild(h('div',{class:'btnrow'},h('button',{class:'btn',text:p?'পড়া চালিয়ে যান':'পড়া শুরু করুন',onclick:function(){hideSheet();continueBook(id)}}),fav));
  var done=S.read[id]||{};
  var l=h('div',{class:'cplist'});
  b.c.forEach(function(ct,i){l.appendChild(h('button',{class:'it'+(p&&p.c===i?' cur':''),onclick:function(){hideSheet();openReader(id,i,0)}},h('span',{class:'n',text:nb(i+1)}),h('span',{text:ct}),done[i]?h('span',{class:'ok',html:ic('check')}):null))});
  box.appendChild(l);
  showSheet('',box,function(){if(view==='home'&&!readerOpen())renderHome()});
}
function continueBook(id){var p=S.pos[id];if(p)openReader(id,p.c,p.p);else openReader(id,0,0)}

/* ---------- reader ---------- */
var R={bid:null,ci:0,p:0,target:null,hlIdx:-1};
var loading={};
function loadBook(id){
  return new Promise(function(res,rej){
    if(HB._b[id])return res();
    (HB._w[id]=HB._w[id]||[]).push(res);
    if(loading[id])return;
    var s=document.createElement('script');loading[id]=s;s.src='data/'+id+'.js';
    s.onerror=function(){delete loading[id];delete HB._w[id];if(s.parentNode)s.parentNode.removeChild(s);toast('বইটি লোড করা যায়নি');rej(new Error('load'))};
    document.head.appendChild(s);
  });
}
/* মেমরি বাঁচাতে: শুধু চলতি ও সাম্প্রতিক ২টি বই মেমরিতে রাখি */
function evictBooks(){
  var keep={};keep[R.bid]=1;S.recent.slice(0,3).forEach(function(b){keep[b]=1});
  Object.keys(HB._b).forEach(function(b){
    if(keep[b])return;delete HB._b[b];
    var sc=loading[b];if(sc&&sc.parentNode)sc.parentNode.removeChild(sc);delete loading[b];
  });
}
function openReader(id,ci,p,target){
  buzz();hideSheet();
  loadBook(id).then(function(){
    R.bid=id;R.ci=Math.max(0,Math.min(ci,BOOKS[id].c.length-1));R.p=p||0;R.target=target==null?null:target;
    var i=S.recent.indexOf(id);if(i>=0)S.recent.splice(i,1);S.recent.unshift(id);S.recent=S.recent.slice(0,50);S.last=id;save();
    $('#reader').classList.add('on');$('#reader').classList.remove('immersive');applyReader();renderChapter();keepOn(true);
    evictBooks();
  }).catch(function(){});
}
function closeReader(){clearTimeout(saveT);savePos();$('#reader').classList.remove('on');hideHl();keepOn(false);if(view==='home')renderHome();else if(view==='lib')renderLib();else if(view==='notes')renderNotes()}
function readerOpen(){return $('#reader').classList.contains('on')}
function keepOn(on){try{if(window.Android&&Android.keepScreenOn)Android.keepScreenOn(!!(on&&S.keepOn))}catch(e){}}
var scroller=$('#rscroll'),rtext=$('#rtext');
function chapterHls(){return (S.hl[R.bid]||[]).map(function(x,i){return {h:x,i:i}}).filter(function(o){return o.h.c===R.ci}).sort(function(a,b){return a.h.s-b.h.s})}
function renderChapter(keep){
  var row=HB._b[R.bid][R.ci],title=row[0],txt=row[1],bk=BOOKS[R.bid];
  var top=keep?scroller.scrollTop:0;
  rtext.innerHTML='';rtext.appendChild(h('h1',{text:title}));
  var hls=chapterHls(),off=0,frag=document.createDocumentFragment();
  txt.split('\n').forEach(function(line){
    var len=line.length;
    if(line.trim()){
      var p=h('p',{'data-o':off}),pos=0,end=off+len;
      hls.forEach(function(o){
        var s=Math.max(o.h.s,off),e=Math.min(o.h.e,end);if(e<=s||s<off+pos)return;
        if(s-off>pos)p.appendChild(document.createTextNode(line.slice(pos,s-off)));
        var m=h('mark',{class:'c'+o.h.col+(o.h.note?' hasnote':''),'data-i':o.i,text:line.slice(s-off,e-off)});p.appendChild(m);pos=e-off;
      });
      if(pos<len)p.appendChild(document.createTextNode(line.slice(pos)));
      frag.appendChild(p);
    }
    off+=len+1;
  });
  rtext.appendChild(frag);
  var nx=R.ci<bk.c.length-1;
  rtext.appendChild(h('div',{style:'text-align:center;margin:38px 0 10px;font-family:var(--font)'},
    nx?h('button',{class:'btn',style:'display:inline-block;padding:14px 34px;font-size:19px',text:'পরের অধ্যায় ›',onclick:function(){gotoChapter(R.ci+1)}}):h('div',{style:'color:var(--rmuted);font-size:18px',text:'— বই শেষ —'})));
  $('#r-title').textContent=bk.t;$('#r-sub').textContent=title;
  var bmOn=S.bm.some(function(b){return b.b===R.bid&&b.c===R.ci});$('#r-bm').classList.toggle('on',bmOn);
  $('#r-prev').disabled=R.ci===0;$('#r-next').disabled=!nx;
  requestAnimationFrame(function(){requestAnimationFrame(function(){
    if(keep){scroller.scrollTop=top}
    else if(R.target!=null){var ms=rtext.querySelectorAll('p'),t=null;ms.forEach(function(pp){if(+pp.dataset.o<=R.target)t=pp});if(t)scroller.scrollTop=Math.max(0,t.offsetTop-120);R.target=null}
    else scroller.scrollTop=R.p*Math.max(0,scroller.scrollHeight-scroller.clientHeight);
    updProg();
  })});
}
function gotoChapter(i){if(i<0||i>=BOOKS[R.bid].c.length)return;savePos();R.ci=i;R.p=0;renderChapter();scroller.scrollTop=0;buzz()}
var saveT,lastAct=Date.now();
function curP(){var m=scroller.scrollHeight-scroller.clientHeight;return m>0?Math.min(1,scroller.scrollTop/m):1}
function updProg(){
  var p=curP(),n=BOOKS[R.bid].c.length;$('#rprog').style.width=(p*100)+'%';
  $('#r-mid').innerHTML='অধ্যায় '+nb(R.ci+1)+'/'+nb(n)+'<small>এই অধ্যায় '+nb(Math.round(p*100))+'% · বই '+nb(Math.round(((R.ci+p)/n)*100))+'%</small>';
}
function savePos(){if(!R.bid||!readerOpen())return;var p=curP();S.pos[R.bid]={c:R.ci,p:p,t:Date.now()};
  if(p>.92){var r=(S.read[R.bid]=S.read[R.bid]||{});if(!r[R.ci]){r[R.ci]=1;var k=dkey();S.fin[k]=(S.fin[k]||0)+1}}
  save()}
scroller.addEventListener('scroll',function(){lastAct=Date.now();updProg();clearTimeout(saveT);saveT=setTimeout(savePos,500)},{passive:true});
['touchstart','mousedown','keydown'].forEach(function(ev){document.addEventListener(ev,function(){lastAct=Date.now()},{passive:true})});
setInterval(function(){if(readerOpen()&&!document.hidden&&Date.now()-lastAct<90000){var k=dkey();S.stats[k]=(S.stats[k]||0)+5;save()}},5000);
document.addEventListener('visibilitychange',function(){if(document.hidden&&readerOpen())savePos()});
window.addEventListener('pagehide',function(){if(readerOpen())savePos()});
window.__save=function(){if(readerOpen())savePos();else save()};

/* tap handling */
var downX=0,downY=0;
rtext.addEventListener('pointerdown',function(e){downX=e.clientX;downY=e.clientY});
rtext.addEventListener('click',function(e){
  if(Math.abs(e.clientX-downX)>8||Math.abs(e.clientY-downY)>8)return;
  if(e.target.closest&&e.target.closest('button'))return;
  var sel=window.getSelection();if(sel&&!sel.isCollapsed)return;
  var m=e.target.closest&&e.target.closest('mark');
  if(m){markMenu(+m.dataset.i);return}
  $('#reader').classList.toggle('immersive');hideHl();
});
/* selection -> highlight bar */
var selT,curSel=null;
document.addEventListener('selectionchange',function(){clearTimeout(selT);selT=setTimeout(onSel,180)});
function offsetIn(node,off){
  var el=node.nodeType===3?node.parentElement:node;var p=el&&el.closest?el.closest('#rtext p'):null;
  if(!p)return null;var r=document.createRange();r.setStart(p,0);try{r.setEnd(node,off)}catch(e){return null}
  return +p.dataset.o+r.toString().length;
}
function onSel(){
  if(!readerOpen())return;var sel=window.getSelection();
  if(!sel||sel.isCollapsed||!sel.rangeCount){hideHl();return}
  var r=sel.getRangeAt(0);if(!rtext.contains(r.commonAncestorContainer)){hideHl();return}
  var s=offsetIn(r.startContainer,r.startOffset),e=offsetIn(r.endContainer,r.endOffset);
  if(s==null||e==null){
    // boundary on a non-paragraph node: try to approximate
    hideHl();return}
  if(e<s){var t=s;s=e;e=t}
  var txt=HB._b[R.bid][R.ci][1];while(s<e&&/\s/.test(txt[s]))s++;while(e>s&&/\s/.test(txt[e-1]))e--;
  if(e<=s){hideHl();return}
  curSel={s:s,e:e};showHl();
}
function hlButtons(extra){
  var b=$('#hlbar');b.innerHTML='';
  for(var c=1;c<=4;c++)(function(c){b.appendChild(h('button',{class:'dot','aria-label':'হাইলাইট',style:'background:var(--hl'+c+')',onclick:function(){addHl(c)}}))})(c);
  b.appendChild(h('span',{class:'sep'}));
  return b;
}
function showHl(){
  var b=hlButtons();
  b.appendChild(h('button',{class:'ic','aria-label':'নোট',html:ic('note'),onclick:function(){addHl(1,true)}}));
  b.appendChild(h('button',{class:'ic','aria-label':'কপি',html:ic('copy'),onclick:function(){copyText(HB._b[R.bid][R.ci][1].slice(curSel.s,curSel.e));hideHl();clearSel()}}));
  b.appendChild(h('button',{class:'ic','aria-label':'শেয়ার',html:ic('share'),onclick:function(){shareText(HB._b[R.bid][R.ci][1].slice(curSel.s,curSel.e))}}));
  b.classList.add('on');
}
function hideHl(){$('#hlbar').classList.remove('on');curSel=null}
function clearSel(){var s=window.getSelection();if(s)s.removeAllRanges()}
function addHl(col,withNote){
  if(!curSel)return;var s=curSel.s,e=curSel.e,txt=HB._b[R.bid][R.ci][1].slice(s,e);
  var arr=(S.hl[R.bid]=S.hl[R.bid]||[]);
  S.hl[R.bid]=arr=arr.filter(function(x){return !(x.c===R.ci&&x.s<e&&x.e>s)});
  var item={c:R.ci,s:s,e:e,col:col,txt:txt.slice(0,600),note:'',ts:Date.now()};arr.push(item);save();
  hideHl();clearSel();renderChapter(true);buzz();
  if(withNote){var i=S.hl[R.bid].indexOf(item);noteEdit(i)}else toast('হাইলাইট সেভ হয়েছে');
}
function noteEdit(i){
  var it=S.hl[R.bid][i];if(!it)return;var ta=h('textarea',{class:'sbox',placeholder:'আপনার নোট লিখুন…'});ta.value=it.note||'';
  popup('নোট',ta,[['বাতিল',null],['সেভ',function(){it.note=ta.value.trim();save();renderChapter(true)},1]]);setTimeout(function(){ta.focus()},250);
}
function markMenu(i){
  var it=(S.hl[R.bid]||[])[i];if(!it)return;
  var box=h('div',{});
  var cols=h('div',{class:'seg',style:'margin-bottom:14px'});
  for(var c=1;c<=4;c++)(function(c){cols.appendChild(h('button',{class:'dot',style:'width:40px;height:40px;border-radius:50%;background:var(--hl'+c+');border:3px solid '+(it.col===c?'var(--text)':'transparent'),onclick:function(){it.col=c;save();hidePop();renderChapter(true)}}))})(c);
  box.appendChild(cols);
  box.appendChild(h('div',{style:'color:var(--muted);font-size:17px;line-height:1.6;max-height:110px;overflow:auto',text:(it.note?'নোট: '+it.note:'“'+it.txt.slice(0,160)+'”')}));
  popup('হাইলাইট',box,[['কপি',function(){copyText(it.txt)}],['নোট',function(){noteEdit(i)}],['মুছুন',function(){S.hl[R.bid].splice(i,1);save();renderChapter(true)}]]);
}
function copyText(t){
  try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){toast('কপি হয়েছে')},fb);return}}catch(e){}
  fb();function fb(){var ta=h('textarea',{style:'position:fixed;opacity:0'});ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast('কপি হয়েছে')}catch(e){}ta.remove()}
}
function shareText(t){
  var full='“'+t+'”\n— হুমায়ূন আহমেদ, '+BOOKS[R.bid].t;
  try{if(window.Android&&Android.share){Android.share(full);return}if(navigator.share){navigator.share({text:full});return}}catch(e){}copyText(full);
}

/* reader buttons */
function setIcons(){
  $('#r-back').innerHTML=ic('back');$('#r-find').innerHTML=ic('find');$('#r-bm').innerHTML=ic('bm');$('#r-chap').innerHTML=ic('list');$('#r-aa').innerHTML=ic('aa');
  $('#r-prev').innerHTML=ic('left');$('#r-next').innerHTML=ic('right');$('#fab').innerHTML=ic('play');
}
$('#r-back').addEventListener('click',closeReader);
$('#r-prev').addEventListener('click',function(){gotoChapter(R.ci-1)});
$('#r-next').addEventListener('click',function(){gotoChapter(R.ci+1)});
$('#r-bm').addEventListener('click',function(){
  var i=-1;S.bm.forEach(function(b,k){if(b.b===R.bid&&b.c===R.ci)i=k});
  if(i>=0){S.bm.splice(i,1);toast('বুকমার্ক সরানো হয়েছে')}else{S.bm.unshift({b:R.bid,c:R.ci,p:curP(),ts:Date.now()});toast('বুকমার্ক করা হয়েছে')}
  save();$('#r-bm').classList.toggle('on',i<0);buzz();
});
$('#r-find').addEventListener('click',function(){
  var inp=h('input',{class:'sbox',style:'min-height:0;height:54px',placeholder:'এই অধ্যায়ে শব্দ খুঁজুন'});
  function go(){var q=inp.value.trim();if(!q)return;hidePop();$('#reader').classList.add('immersive');var ok=false;try{ok=window.find(q,false,false,true,false,false,false)}catch(e){}if(!ok)toast('শব্দটি পাওয়া যায়নি')}
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')go()});
  popup('খুঁজুন',inp,[['বাতিল',null],['খুঁজুন',go,1]]);setTimeout(function(){inp.focus()},250);
});
$('#r-chap').addEventListener('click',function(){
  var bk=BOOKS[R.bid],done=S.read[R.bid]||{},l=h('div',{class:'cplist'});
  bk.c.forEach(function(ct,i){l.appendChild(h('button',{class:'it'+(i===R.ci?' cur':''),'data-cur':i===R.ci?1:0,onclick:function(){hideSheet();savePos();R.ci=i;R.p=0;renderChapter()}},h('span',{class:'n',text:nb(i+1)}),h('span',{text:ct}),done[i]?h('span',{class:'ok',html:ic('check')}):null))});
  showSheet(bk.t,l);setTimeout(function(){var c=$('#sheet-b .it[data-cur="1"]');if(c)c.scrollIntoView({block:'center'})},350);
});
$('#r-aa').addEventListener('click',displaySheet);
$('#fab').addEventListener('click',function(){buzz();var id=S.last&&BOOKS[S.last]?S.last:null;if(id)continueBook(id);else{go('lib');toast('একটি বই বেছে নিন')}});

/* display settings sheet */
function ctrlRange(label,key,min,max,step,fmt){
  var inp=h('input',{type:'range',min:min,max:max,step:step,value:S[key]}),out=h('b',{text:fmt(S[key])});
  inp.addEventListener('input',function(){S[key]=+inp.value;out.textContent=fmt(S[key]);applyReader();if(key==='size'||key==='lh'||key==='para')keepScroll()});
  inp.addEventListener('change',save);
  return h('div',{class:'ctrl'},h('div',{class:'cl'},h('span',{text:label}),out),inp);
}
function keepScroll(){var p=curP();requestAnimationFrame(function(){scroller.scrollTop=p*(scroller.scrollHeight-scroller.clientHeight);updProg()})}
function segCtrl(label,opts,key,after){
  var seg=h('div',{class:'seg'});
  Object.keys(opts).forEach(function(k){seg.appendChild(h('button',{class:'pill'+(S[key]==k?' on':''),text:opts[k],onclick:function(){S[key]=isNaN(+k)?k:+k;save();[].forEach.call(seg.children,function(c){c.classList.remove('on')});this.classList.add('on');applyReader();if(after)after()}}))});
  return h('div',{class:'ctrl'},h('div',{class:'cl'},h('span',{text:label})),seg);
}
function displaySheet(){
  var box=h('div',{});
  var sz=h('div',{class:'ctrl'});var out=h('b',{text:nb(S.size)}),inp=h('input',{type:'range',min:14,max:44,step:1,value:S.size});
  function setS(v){S.size=Math.max(14,Math.min(44,v));inp.value=S.size;out.textContent=nb(S.size);applyReader();keepScroll();save()}
  inp.addEventListener('input',function(){setS(+inp.value)});
  sz.appendChild(h('div',{class:'cl'},h('span',{text:'লেখার আকার'}),out));
  sz.appendChild(h('div',{class:'stepper'},h('button',{text:'A−',onclick:function(){setS(S.size-1)}}),inp,h('button',{text:'A+',style:'font-size:24px',onclick:function(){setS(S.size+1)}})));
  box.appendChild(sz);
  var fo={};Object.keys(FONTS).forEach(function(k){fo[k]=FONTS[k].n});
  box.appendChild(segCtrl('ফন্ট',fo,'font',keepScroll));
  box.appendChild(ctrlRange('লাইনের ব্যবধান','lh',1.3,2.8,.1,function(v){return nb((+v).toFixed(1))}));
  box.appendChild(ctrlRange('অনুচ্ছেদের ফাঁক','para',0,2,.1,function(v){return nb((+v).toFixed(1))}));
  box.appendChild(ctrlRange('পাশের মার্জিন','margin',8,56,2,function(v){return nb(v)}));
  box.appendChild(segCtrl('লেখা সাজানো',{left:'বামে',justify:'জাস্টিফাই'},'align',keepScroll));
  box.appendChild(segCtrl('পড়ার থিম',RT,'rtheme'));
  box.appendChild(ctrlRange('ব্রাইটনেস ঢাকনা (ডিম)','dim',0,70,5,function(v){return nb(v)+'%'}));
  showSheet('পড়ার সেটিং',box,null,true);
}

/* ---------- highlights / notes view ---------- */
var notesTab='hl';
function renderNotes(){
  var v=$('#v-notes');v.innerHTML='';
  v.appendChild(h('div',{class:'top'},h('div',{},h('small',{text:'আপনার সংগ্রহ'}),h('h1',{text:'হাইলাইট'})),h('div',{class:'avatar',text:(S.name||'R').trim().charAt(0).toUpperCase(),onclick:function(){go('settings')}})));
  var tabs=h('div',{class:'pills'});
  [['hl','হাইলাইট ও নোট'],['bm','বুকমার্ক']].forEach(function(t){tabs.appendChild(h('button',{class:'pill'+(notesTab===t[0]?' on':''),text:t[1],onclick:function(){notesTab=t[0];renderNotes()}}))});
  v.appendChild(tabs);var l=h('div',{class:'list',style:'margin-top:12px'});v.appendChild(l);
  if(notesTab==='hl'){
    var all=[];Object.keys(S.hl).forEach(function(b){if(!BOOKS[b])return;S.hl[b].forEach(function(x,i){all.push({b:b,i:i,x:x})})});
    all.sort(function(a,b){return b.x.ts-a.x.ts});
    if(!all.length)l.appendChild(h('div',{class:'empty',html:'এখনো কোনো হাইলাইট নেই।<br>পড়ার সময় যেকোনো লেখা চেপে ধরে সিলেক্ট করুন,<br>তারপর রং বেছে নিন।'}));
    all.forEach(function(o){
      var x=o.x,card=h('button',{class:'hcard',onclick:function(){hlAction(o)}},
        h('div',{class:'q',style:'border-color:var(--hl'+x.col+')',text:x.txt.length>260?x.txt.slice(0,260)+'…':x.txt}),
        x.note?h('div',{class:'nt',text:'✎ '+x.note}):null,
        h('div',{class:'src'},h('span',{text:BOOKS[o.b].t+' · '+BOOKS[o.b].c[x.c]}),h('span',{text:nb(new Date(x.ts).getDate())+' '+MO[new Date(x.ts).getMonth()]})));
      l.appendChild(card);
    });
  }else{
    if(!S.bm.length)l.appendChild(h('div',{class:'empty',html:'এখনো কোনো বুকমার্ক নেই।<br>পড়ার পাতার ওপরের বুকমার্ক আইকনে চাপ দিন।'}));
    S.bm.forEach(function(b,i){if(!BOOKS[b.b])return;l.appendChild(h('button',{class:'book',onclick:function(){bmAction(i)}},cover(b.b,BOOKS[b.b].t),h('div',{class:'m'},h('div',{class:'t',text:BOOKS[b.b].c[b.c]}),h('div',{class:'s',text:BOOKS[b.b].t+' · অধ্যায় '+nb(b.c+1)})),h('span',{class:'chev',html:ic('bm')})))});
  }
}
function hlAction(o){
  popup('হাইলাইট',h('div',{style:'color:var(--muted);line-height:1.6;max-height:140px;overflow:auto;font-size:17px',text:'“'+o.x.txt.slice(0,220)+'”'}),
   [['মুছুন',function(){S.hl[o.b].splice(o.i,1);save();renderNotes()}],['কপি',function(){copyText(o.x.txt)}],['খুলুন',function(){openReader(o.b,o.x.c,0,o.x.s)},1]]);
}
function bmAction(i){var b=S.bm[i];popup('বুকমার্ক',h('div',{style:'color:var(--muted);font-size:18px',text:BOOKS[b.b].t+' · '+BOOKS[b.b].c[b.c]}),[['মুছুন',function(){S.bm.splice(i,1);save();renderNotes()}],['খুলুন',function(){openReader(b.b,b.c,b.p)},1]])}

/* ---------- settings ---------- */
function toggleRow(icon,title,sub,key,after){
  var sw=h('div',{class:'sw'+(S[key]?' on':'')});
  var r=h('button',{class:'srow',onclick:function(){S[key]=S[key]?0:1;sw.classList.toggle('on',!!S[key]);save();buzz();if(after)after()}},h('div',{class:'sic',html:ic(icon)}),h('div',{class:'tx'},h('b',{text:title}),sub?h('small',{text:sub}):null),sw);
  return r;
}
function navRow(icon,title,val,fn){return h('button',{class:'srow',onclick:fn},h('div',{class:'sic',html:ic(icon)}),h('div',{class:'tx'},h('b',{text:title})),h('div',{class:'val',html:(val?'<span>'+val+'</span>':'')+ic('chev')}))}
function renderSettings(){
  var v=$('#v-settings');v.innerHTML='';
  v.appendChild(h('div',{class:'top'},h('div',{},h('small',{text:S.name}),h('h1',{text:'সেটিংস'})),h('div',{class:'avatar',text:(S.name||'R').trim().charAt(0).toUpperCase(),onclick:renamePop})));
  v.appendChild(h('div',{class:'label',style:'margin-top:26px',text:'অ্যাপিয়ারেন্স'}));
  var pills=h('div',{class:'pills',style:'margin-top:12px'});
  [['light','লাইট'],['dark','ডার্ক'],['system','সিস্টেম']].forEach(function(m){pills.appendChild(h('button',{class:'pill'+(S.mode===m[0]?' on':''),text:m[1],onclick:function(){S.mode=m[0];save();applyTheme();renderSettings()}}))});
  v.appendChild(pills);
  var sw=h('div',{class:'swatches'});
  var AC={cream:'#f1e3c8',coral:'#f2694a',teal:'#3cc6b4',violet:'#a77bf3',green:'#7ccf6a',blue:'#5aa7ff',rose:'#ff8fb1'};
  Object.keys(AC).forEach(function(k){sw.appendChild(h('button',{class:'swatch'+(S.accent===k?' on':''),'aria-label':k,style:'background:'+AC[k],onclick:function(){S.accent=k;save();applyTheme();renderSettings()}}))});
  v.appendChild(sw);
  var pan=h('div',{class:'panel',style:'margin-top:26px;padding-top:6px;min-height:0'});v.appendChild(pan);
  pan.appendChild(h('div',{class:'sethead',text:'সাধারণ'}));
  pan.appendChild(h('div',{class:'gcard'},
    navRow('font','ফন্ট',FONTS[S.font].n,function(){fontPop()}),
    navRow('num','সংখ্যা',S.digits==='bn'?'বাংলা':'English',function(){S.digits=S.digits==='bn'?'en':'bn';save();renderSettings();toast(S.digits==='bn'?'বাংলা সংখ্যা':'English digits')}),
    toggleRow('vib','হ্যাপটিক','ট্যাপ করলে হালকা কাঁপবে','haptic'),
    toggleRow('moon','AMOLED কালো','ডার্ক মোডে গাঢ় কালো ব্যাকগ্রাউন্ড','amoled',applyTheme),
    toggleRow('anim','অ্যানিমেশন','পেজ ও শিটের স্মুথ ট্রানজিশন','anim',applyTheme)));
  pan.appendChild(h('div',{class:'sethead',text:'পড়া'}));
  pan.appendChild(h('div',{class:'gcard'},
    navRow('aa','পড়ার ডিফল্ট সেটিং','আকার, ফন্ট, থিম',function(){displaySheet()}),
    navRow('target','দৈনিক লক্ষ্য',S.goal?fmtMin(S.goal):'নেই',goalPop),
    toggleRow('resume','শেষ বই খুলুন','অ্যাপ চালু করলেই শেষ পড়া জায়গা থেকে','resume'),
    toggleRow('screen','স্ক্রিন জাগিয়ে রাখুন','পড়ার সময় স্ক্রিন বন্ধ হবে না','keepOn')));
  pan.appendChild(h('div',{class:'note',text:'এগুলো শুধু পড়ার অভিজ্ঞতা বদলায়। আপনার হাইলাইট ও বুকমার্ক একই থাকে।'}));
  pan.appendChild(h('div',{class:'sethead',text:'ম্যানেজ'}));
  pan.appendChild(h('div',{class:'gcard'},
    navRow('tag','ক্যাটাগরি',nb(CAT.cats.length-S.hiddenCats.length)+'/'+nb(CAT.cats.length),catPop),
    navRow('backup','ব্যাকআপ কপি করুন','',backupCopy),
    navRow('restore','ব্যাকআপ রিস্টোর','',backupRestore),
    navRow('clear','সব পড়ার তথ্য মুছুন','',function(){popup('নিশ্চিত?',h('div',{style:'color:var(--muted);line-height:1.6',text:'অগ্রগতি, হাইলাইট, নোট ও বুকমার্ক মুছে যাবে। বইয়ের লেখা মুছবে না।'}),[['বাতিল',null],['মুছুন',function(){var keep={};['name','mode','accent','amoled','anim','haptic','digits','font','size','lh','para','align','margin','rtheme','dim','resume','keepOn','hiddenCats'].forEach(function(k){keep[k]=S[k]});load();for(var k in keep)S[k]=keep[k];S.pos={};S.hl={};S.bm=[];S.fav=[];S.read={};S.stats={};S.fin={};S.recent=[];S.last=null;save();toast('মুছে ফেলা হয়েছে');renderSettings()},1]])})));
  pan.appendChild(h('div',{class:'sethead',text:'সম্পর্কে'}));
  var tot=0;Object.keys(BOOKS).forEach(function(k){tot+=BOOKS[k].c.length});
  pan.appendChild(h('div',{class:'gcard'},h('div',{class:'srow'},h('div',{class:'sic',html:ic('info')}),h('div',{class:'tx'},h('b',{text:'হুমায়ূন সমগ্র'}),h('small',{text:nb(Object.keys(BOOKS).length)+'টি বই · '+nb(tot)+'টি অধ্যায় · সম্পূর্ণ অফলাইন · সংস্করণ ১.০'})))));
}
function renamePop(){
  var inp=h('input',{class:'sbox',style:'min-height:0;height:54px',value:S.name});
  popup('আপনার নাম',inp,[['বাতিল',null],['সেভ',function(){S.name=inp.value.trim()||'Rahat';save();renderSettings()},1]]);
}
function fontPop(){
  var box=h('div',{class:'seg',style:'flex-direction:column;align-items:stretch'});
  Object.keys(FONTS).forEach(function(k){box.appendChild(h('button',{class:'pill'+(S.font===k?' on':''),style:'text-align:left;font-family:'+FONTS[k].f,text:FONTS[k].n+' — আমার সোনার বাংলা',onclick:function(){S.font=k;save();applyReader();hidePop();renderSettings()}}))});
  popup('পড়ার ফন্ট',box,[['বন্ধ',null]]);
}
function catPop(){
  var box=h('div',{});
  CAT.cats.forEach(function(c){var on=S.hiddenCats.indexOf(c.id)<0;var sw=h('div',{class:'sw'+(on?' on':'')});
    box.appendChild(h('button',{class:'srow',style:'padding:12px 4px',onclick:function(){var i=S.hiddenCats.indexOf(c.id);if(i>=0)S.hiddenCats.splice(i,1);else S.hiddenCats.push(c.id);sw.classList.toggle('on');save()}},h('div',{class:'tx'},h('b',{style:'font-size:20px',text:c.name})),sw))});
  popup('ক্যাটাগরি দেখান',h('div',{style:'max-height:50vh;overflow:auto'},box),[['ঠিক আছে',function(){libCat=0;renderSettings()},1]]);
}
function backupCopy(){
  var d=JSON.stringify({v:1,pos:S.pos,hl:S.hl,bm:S.bm,fav:S.fav,read:S.read,stats:S.stats,fin:S.fin,recent:S.recent,last:S.last});
  try{if(window.Android&&Android.copy){Android.copy(d);toast('ব্যাকআপ কপি হয়েছে — কোথাও পেস্ট করে সেভ করুন');return}}catch(e){}
  copyText(d);
}
function backupRestore(){
  var ta=h('textarea',{class:'sbox',placeholder:'এখানে ব্যাকআপ টেক্সট পেস্ট করুন'});
  popup('ব্যাকআপ রিস্টোর',ta,[['বাতিল',null],['রিস্টোর',function(){try{var o=JSON.parse(ta.value);if(!o||o.v!==1)throw 0;
    var isO=function(x){return x&&typeof x==='object'&&!Array.isArray(x)};
    ['pos','hl','read','stats','fin'].forEach(function(k){if(o[k]!==undefined&&!isO(o[k]))throw 0});
    ['bm','fav','recent'].forEach(function(k){if(o[k]!==undefined&&!Array.isArray(o[k]))throw 0});
    if(o.last!==undefined&&o.last!==null&&typeof o.last!=='string')throw 0;
    Object.keys(o.hl||{}).forEach(function(b){if(!Array.isArray(o.hl[b]))throw 0});
    ['pos','hl','bm','fav','read','stats','fin','recent','last'].forEach(function(k){if(o[k]!==undefined)S[k]=o[k]});save();toast('রিস্টোর সম্পন্ন');renderSettings()}catch(e){toast('ব্যাকআপটি সঠিক নয়')}},1]]);
}

/* ---------- back button (Android) & keys ---------- */
window.__back=function(){
  if(popOpen){hidePop();return true}
  if(sheetOpen){hideSheet();return true}
  if($('#hlbar').classList.contains('on')){hideHl();clearSel();return true}
  if(readerOpen()){closeReader();return true}
  if(view!=='home'){go('home');return true}
  return false;
};
document.addEventListener('keydown',function(e){if(e.key==='Escape')window.__back()});
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('button'))buzz()},true);

/* ---------- init ---------- */
setIcons();applyTheme();buildNav();
$('#v-home').classList.add('on');renderHome();
if(S.resume&&S.last&&BOOKS[S.last]&&S.pos[S.last])setTimeout(function(){continueBook(S.last)},200);
window.__HB={S:S,go:go,openReader:openReader,openBook:openBook,displaySheet:displaySheet};
})();

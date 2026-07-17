/* ============================================================
   STATE ENGINE
   ============================================================ */
const PLAYER_NAME='Parker'; // change this to reuse the academy for a different trainee
const KEY='physicsQuest_parker_v1';
const XP_PER_LEVEL=300;
const defaultState=()=>({
  xp:0, completed:{}, scores:{}, stars:{}, badges:[],
  correct:0, total:0, topicStats:{}, timeSpent:0,
  streak:0, lastDay:null, soundOn:true, finalRank:null, seenHome:false,
  labChallenges:{}
});
const LAB_CHALLENGE_TOTAL=8;
let S=load();
function load(){try{const r=JSON.parse(localStorage.getItem(KEY));return r?Object.assign(defaultState(),r):defaultState();}catch(e){return defaultState();}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function resetAll(){if(confirm(`Reset all of ${PLAYER_NAME}’s progress? This cannot be undone.`)){S=defaultState();save();go('home');}}
/* Progress lives in one browser's localStorage only — export/import lets it
   survive a cleared cache or move to another browser/device. */
function exportProgress(){
  const blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`physics-quest-progress-${PLAYER_NAME.toLowerCase()}.json`;
  document.body.appendChild(a);a.click();a.remove();
  URL.revokeObjectURL(url);
  toast('Progress file saved','scroll');
}
function importProgress(file){
  if(!file)return;
  if(!confirm(`Load progress from this file? It will replace ${PLAYER_NAME}'s current progress on this device.`))return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const parsed=JSON.parse(reader.result);
      if(typeof parsed!=='object'||parsed===null)throw new Error('not an object');
      S=Object.assign(defaultState(),parsed);save();
      refreshHud();syncBadges();go('dashboard');
      toast('Progress loaded!','check');
    }catch(e){toast('That file doesn\'t look like a valid progress file','warning');}
  };
  reader.onerror=()=>toast('Could not read that file','warning');
  reader.readAsText(file);
}

function level(){return Math.floor(S.xp/XP_PER_LEVEL)+1;}
function levelProgress(){return (S.xp%XP_PER_LEVEL)/XP_PER_LEVEL*100;}
function accuracy(){return S.total? Math.round(S.correct/S.total*100):0;}
function completedCount(){return Object.keys(S.completed).filter(k=>S.completed[k]).length;}
function overallPct(){return Math.round(completedCount()/MISSIONS.length*100);}

function checkDailyStreak(){
  const today=new Date().toDateString();
  if(S.lastDay!==today){
    const yst=new Date(Date.now()-864e5).toDateString();
    S.streak = (S.lastDay===yst)? S.streak+1 : 1;
    S.lastDay=today; save();
  }
}
/* ============================================================
   AUDIO (WebAudio beeps — no external files)
   ============================================================ */
let AC=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function beep(freq,dur,type,vol){
  if(!S.soundOn)return; const c=ac(); if(!c)return;
  try{const o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=freq;
  g.gain.value=vol||.08;o.connect(g);g.connect(c.destination);const t=c.currentTime;
  o.start(t);g.gain.exponentialRampToValueAtTime(.0001,t+(dur||.15));o.stop(t+(dur||.15));}catch(e){}
}
const SFX={
  click:()=>beep(320,.06,'triangle',.05),
  right:()=>{beep(660,.1,'sine',.09);setTimeout(()=>beep(880,.16,'sine',.09),90);},
  wrong:()=>beep(300,.12,'sine',.06),
  reward:()=>{[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,.16,'triangle',.08),i*90));},
  pop:()=>beep(520,.08,'square',.05),
  unlock:()=>{[392,523,659,784].forEach((f,i)=>setTimeout(()=>beep(f,.2,'sine',.09),i*110));}
};
function toggleSound(){S.soundOn=!S.soundOn;save();document.getElementById('soundBtn').innerHTML=icon(S.soundOn?'sound':'mute');toast(S.soundOn?'Sound on':'Sound off',S.soundOn?'sound':'mute');if(S.soundOn)SFX.pop();}

let toastT;
function toast(msg,ic){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=msg;
  t.querySelector('.emo').innerHTML=icon(ic&&ICONS[ic]?ic:'spark','ic-lg');
  t.classList.add('show');clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),2600);
}
function confetti(){
  const cv=document.getElementById('confetti');const ctx=cv.getContext('2d');
  cv.width=innerWidth;cv.height=innerHeight;
  const cols=['#2D9CFF','#2EC4B6','#6EEB83','#FFB84D','#E63946','#fff'];
  const P=[];for(let i=0;i<140;i++)P.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*.4,
    r:4+Math.random()*7,c:cols[i%cols.length],vy:2+Math.random()*4,vx:-2+Math.random()*4,
    a:Math.random()*Math.PI,va:-.2+Math.random()*.4});
  let frames=0;
  (function run(){frames++;ctx.clearRect(0,0,cv.width,cv.height);
    P.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.a+=p.va;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);ctx.restore();});
    if(frames<160)requestAnimationFrame(run);else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}
/* ===AUDIO=== */
/* ============================================================
   ICON SYSTEM (inline SVG — replaces all emoji)
   ============================================================ */
const ICONS={
  home:'<path d="M3 10.8 12 3l9 7.8"/><path d="M5 9.6V21h5v-6h4v6h5V9.6"/>',
  chart:'<path d="M4 20h16"/><path d="M7 20v-6M12 20V6M17 20v-9"/>',
  map:'<path d="M9 4 3 6.2V20l6-2.2 6 2.2 6-2.2V4l-6 2.2z"/><path d="M9 4v13.8M15 6.2V20"/>',
  medal:'<circle cx="12" cy="14" r="5.6"/><path d="M9 9 6.6 3M15 9l2.4-6"/><path d="M12 11.4l1 2 2.2.2-1.7 1.5.5 2.2-2-1.2-2 1.2.5-2.2-1.7-1.5 2.2-.2z" class="fill"/>',
  flask:'<path d="M9 3h6M10 3v5.5L5.4 17A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.7 14.5h8.6"/>',
  target:'<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" class="fill"/>',
  scroll:'<path d="M7 4h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V4z"/><path d="M9.5 8.5h6M9.5 12h6M9.5 15.5h4"/>',
  sound:'<path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4z"/><path d="M16 9.5a4 4 0 0 1 0 5"/><path d="M18.4 7.5a7 7 0 0 1 0 9"/>',
  mute:'<path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4z"/><path d="M17 10l4 4M21 10l-4 4"/>',
  rocket:'<path d="M12 3c3 2.2 4.6 5.2 4.6 9.2L12 16.6l-4.6-4.4C7.4 8.2 9 5.2 12 3z"/><circle cx="12" cy="9.4" r="1.7"/><path d="M8 15.2 5.4 20l4.2-2M16 15.2 18.6 20l-4.2-2"/>',
  star:'<path d="M12 3l2.5 6.1 6.6.5-5 4.3 1.6 6.4L12 17.4 5.7 20.8l1.6-6.4-5-4.3 6.6-.5z" class="fill"/>',
  flame:'<path d="M12 3c3.2 3.8 5 6 5 9.6a5 5 0 0 1-10 0c0-2 .9-3.2 2-4.2.4 2.2 2 2.6 3 1.2-1.2-2.2 0-4.4 0-6.6z" class="fill"/>',
  magnet:'<path d="M6 4H9.5v8a2.5 2.5 0 0 0 5 0V4H18v8a6 6 0 0 1-12 0V4z"/><path d="M6 8h3.5M14.5 8H18"/>',
  climb:'<path d="M12 20V5"/><path d="M6 11l6-6 6 6"/>',
  trophy:'<path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v1.2A3 3 0 0 0 7 10.2M17 6h3v1.2a3 3 0 0 1-3 3"/><path d="M12 12.8V17M9 20h6M9.8 17h4.4"/>',
  bolt:'<path d="M13 2 4.5 13.5H10l-1 8.5L19.5 10H14l1-8z" class="fill"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.4l2.6 2.6L16 8.8"/>',
  question:'<circle cx="12" cy="12" r="9"/><path d="M9.4 9.4a2.6 2.6 0 1 1 3.6 2.4c-.9.4-1.2.9-1.2 1.9"/><path d="M12 16.6h.01"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  refresh:'<path d="M20.5 11a8.5 8.5 0 1 0-.6 4.2"/><path d="M20.5 5v6h-6"/>',
  lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  unlock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2.6"/>',
  bulb:'<path d="M9.5 18.5h5M10.5 21.5h3"/><path d="M12 2.5a6 6 0 0 0-3.8 10.7c.8.7 1.1 1.3 1.1 2.3h5.4c0-1 .3-1.6 1.1-2.3A6 6 0 0 0 12 2.5z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M16.2 16.2 21 21"/>',
  pencil:'<path d="M4 20h4.2L20 8.2 15.8 4 4 15.8V20z"/><path d="M14.2 5.6 18.4 9.8"/>',
  car:'<path d="M4 13.5 6 8.5h12l2 5v4.5H4z"/><path d="M4 15.5h16"/><circle cx="8" cy="17.6" r="2"/><circle cx="16" cy="17.6" r="2"/>',
  force:'<rect x="12.5" y="8" width="8" height="8" rx="1.2"/><path d="M3 12h7.5M7 8.5 10.5 12 7 15.5"/>',
  ball:'<circle cx="12" cy="12" r="8"/><circle cx="9.4" cy="9.4" r="2.1" class="fill"/>',
  wave:'<path d="M3 12c1.6-5.5 3.2-5.5 4.8 0s3.2 5.5 4.8 0 3.2-5.5 4.8 0"/>',
  prism:'<path d="M11 4 3 19h16z"/><path d="M19 11.5h3.5M19 9l3.3-1M19 14l3.3 1"/>',
  plug:'<path d="M9 3v4.5M15 3v4.5"/><path d="M7 7.5h10v2.5a5 5 0 0 1-10 0V7.5z"/><path d="M12 15v6"/>',
  toolbox:'<rect x="3" y="8" width="18" height="11" rx="2"/><path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2M3 12.5h18M10 12.5v2h4v-2"/>',
  cards:'<rect x="3.5" y="7" width="9.5" height="12.5" rx="1.5" transform="rotate(-9 8 13)"/><rect x="10" y="5" width="9.5" height="12.5" rx="1.5" transform="rotate(9 15 11)"/>',
  cap:'<path d="M2 8.2 12 4l10 4.2-10 4.2z"/><path d="M6.5 10.4v3.8c0 1.5 2.8 3 5.5 3s5.5-1.5 5.5-3v-3.8"/><path d="M22 8.2v5.4"/>',
  atom:'<circle cx="12" cy="12" r="1.7" class="fill"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>',
  print:'<path d="M7 8.5V3.5h10v5"/><rect x="3.5" y="8.5" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/><circle cx="17" cy="11.4" r="0.9" class="fill"/>',
  warning:'<path d="M12 3 2 20.5h20z"/><path d="M12 9.5v5M12 17.6h.01"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4 10.8 10.8 8.4 15.6 13.2 13.2z" class="fill"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 7.6h.01"/>',
  slider:'<path d="M4 8h16M4 16h16"/><circle cx="9" cy="8" r="2.4" class="fill"/><circle cx="15" cy="16" r="2.4" class="fill"/>',
  gear:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/>',
  wrench:'<path d="M15.5 6.2a4 4 0 0 0-5.2 5.2l-6.1 6.1 3 3 6.1-6.1a4 4 0 0 0 5.2-5.2l-3 3-2.6-.4-.4-2.6z"/>',
  crown:'<path d="M4 8.5 7 17h10l3-8.5-5 4-3-6.2-3 6.2z" class="fill"/>',
  spark:'<path d="M12 3l1.6 6.8L20.5 12l-6.9 2.2L12 21l-1.6-6.8L3.5 12l6.9-2.2z" class="fill"/>',
  flag:'<path d="M6 21V4"/><path d="M6 5h11l-2.2 3.2L17 11.5H6"/>',
  scientist:'<circle cx="12" cy="9" r="4.4"/><path d="M7.6 8a4.4 4.4 0 0 1 8.8 0" class="fill"/><path d="M5 21v-3a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v3"/>'
};
function icon(name,cls){const p=ICONS[name];if(!p)return '';return `<svg class="ic-svg${cls?' '+cls:''}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${p}</svg>`;}

/* ============================================================
   SHOWMANSHIP HELPERS (host, challenge, reveal, burst, shake)
   ============================================================ */
function hostAvatar(){return `<span class="avatar">${icon('scientist')}</span>`;}
function hostBlock(id,line){return `<div class="host">${hostAvatar()}<div class="bubble"><div class="who">Dr. Nova · Lab Host</div><div class="line" id="${id}">${line}</div></div></div>`;}
function hostSay(id,line){const el=document.getElementById(id);if(!el)return;el.textContent=line;el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse');}
function challengeBlock(id,goalHtml){return `<div class="challenge" id="${id}"><span class="badge-ic">${icon('target')}</span><div class="goal"><div class="k">Challenge</div><div class="v" id="${id}-v">${goalHtml}</div></div></div>`;}
function howto(html){return `<div class="howto"><span class="ic">${icon('info')}</span><div><b>How to play:</b> ${html}</div></div>`;}
function challengeWin(id,goalHtml){const el=document.getElementById(id);if(!el)return;el.classList.add('win');const bi=el.querySelector('.badge-ic');if(bi)bi.innerHTML=icon('check');const v=document.getElementById(id+'-v');if(v)v.innerHTML=goalHtml;}
/* revert a challenge banner to its un-won "goal" state */
function challengeReset(id,goalHtml){const el=document.getElementById(id);if(!el)return;el.classList.remove('win');const bi=el.querySelector('.badge-ic');if(bi)bi.innerHTML=icon('target');const v=document.getElementById(id+'-v');if(v&&goalHtml!=null)v.innerHTML=goalHtml;}
/* remove a lingering celebration reveal block that sits right after an element */
function clearReveal(afterSel){const r=document.querySelector(afterSel+' + .reveal');if(r)r.remove();}
function revealBlock(title,html){return `<div class="reveal">${''}<div class="rt">${icon('spark')} ${title}</div><p>${html}</p></div>`;}
function sparkBurst(el,colors){
  if(!el||document.body.classList.contains('reduce-motion'))return;
  const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;
  const cols=colors||['#2D9CFF','#2EC4B6','#6EEB83','#FFB84D','#fff'];
  for(let i=0;i<26;i++){
    const p=document.createElement('span');p.className='spark-p';
    p.style.background=cols[i%cols.length];p.style.left=cx+'px';p.style.top=cy+'px';
    document.body.appendChild(p);
    const ang=Math.random()*Math.PI*2,dist=40+Math.random()*90;
    const dx=Math.cos(ang)*dist,dy=Math.sin(ang)*dist-30;
    p.animate([{transform:'translate(0,0) scale(1)',opacity:1},
      {transform:`translate(${dx}px,${dy+90}px) rotate(${Math.random()*360}deg) scale(.3)`,opacity:0}],
      {duration:750+Math.random()*350,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>p.remove();
  }
}
function shakeEl(el){if(!el||document.body.classList.contains('reduce-motion'))return;el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake');}
function stageFlash(el){if(!el||document.body.classList.contains('reduce-motion'))return;el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');}
/* Celebrate a solved lab challenge: burst + flash + host cheer + sound */
function labCelebrate(stageEl,hostId,line){
  SFX.reward();if(stageEl){stageFlash(stageEl);sparkBurst(stageEl);}
  if(hostId&&line)hostSay(hostId,line);
}
/* Reward the FIRST time each lab challenge is beaten: bonus XP + badge check */
const LAB_CHALLENGE_XP=40;
function awardLabChallenge(key){
  if(!S.labChallenges)S.labChallenges={};
  if(S.labChallenges[key])return;              // already earned — no repeat XP
  S.labChallenges[key]=true;S.xp+=LAB_CHALLENGE_XP;save();
  const done=Object.keys(S.labChallenges).length;
  setTimeout(()=>toast(`Challenge cleared!  +${LAB_CHALLENGE_XP} XP  ·  ${done}/${LAB_CHALLENGE_TOTAL} labs`,'trophy'),400);
  refreshHud();syncBadges();
}

/* ============================================================
   ROUTER & NAV
   ============================================================ */
const NAV=[
  ['home','Home','home'],['dashboard','Dashboard','chart'],['missions','Missions','map'],
  ['achievements','Achievements','medal'],['lab','Physics Lab','flask'],
  ['final','Final Challenge','target'],['certificate','Certificate','scroll']
];
let CURRENT='home';
function renderNav(){
  document.getElementById('nav').innerHTML=NAV.map(([id,label,ic])=>
    `<button onclick="go('${id}')" ${CURRENT===id?'aria-current="true"':''}>${icon(ic)} ${label}</button>`).join('');
}
function refreshHud(){
  document.getElementById('xpMiniBar').style.width=levelProgress()+'%';
  document.getElementById('lvlChip').textContent='Lv '+level();
  document.getElementById('soundBtn').innerHTML=icon(S.soundOn?'sound':'mute');
}
function go(route,arg){
  CURRENT=(route.startsWith('mission-'))?'missions':route;
  document.querySelector('nav.mainnav').classList.remove('open');
  renderNav();refreshHud();
  const app=document.getElementById('app');
  app.classList.remove('screen');void app.offsetWidth;app.classList.add('screen');
  window.scrollTo({top:0,behavior:'instant'});
  if(route.startsWith('mission-'))renderMission(parseInt(route.split('-')[1]));
  else ({home:renderHome,dashboard:renderDashboard,missions:renderMissions,achievements:renderAchievements,
    lab:renderLab,final:renderFinal,certificate:renderCertificate}[route]||renderHome)();
  focusMainHeading();
}
/* Move focus to the new screen's heading on every route change, so screen
   readers announce it — replaces a blanket aria-live on #app, which would
   otherwise read out the entire new page as one large blob on every nav. */
function focusMainHeading(){
  const h=document.querySelector('#app h1, #app h2');
  if(!h)return;
  if(!h.hasAttribute('tabindex'))h.setAttribute('tabindex','-1');
  h.focus({preventScroll:true});
}

/* ============================================================ HOME ============================================================ */
function renderHome(){
  S.seenHome=true;save();
  const pct=overallPct();
  document.getElementById('app').innerHTML=`
  <section class="hero">
    <div class="art">${art('lab')}</div>
    <div class="inner">
      <span class="pill">Elite Science Academy · Trainee: ${PLAYER_NAME}</span>
      <h1>Physics<br>Quest</h1>
      <p class="sub">Master the science before school even begins.</p>
      <div class="cta-row">
        <button class="btn btn-primary btn-lg" onclick="startNext()">${icon('rocket')} ${completedCount()?'Continue Training':'Start Mission 1'}</button>
        <button class="btn btn-ghost" onclick="go('missions')">${icon('map')} Mission Select</button>
      </div>
      <div class="prog">
        <div class="lbl"><span>Level ${level()} · ${S.xp} XP</span><span>${pct}% Complete</span></div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </div>
    </div>
  </section>
  <div class="grid g4 mt2">
    ${statTile('flask','Missions',completedCount()+'/'+MISSIONS.length,'#2D9CFF')}
    ${statTile('target','Accuracy',accuracy()+'%','#2EC4B6')}
    ${statTile('star','Level',level(),'#6EEB83')}
    ${statTile('flame','Day Streak',S.streak,'#FFB84D')}
  </div>
  <div class="grid g3 mt2">
    ${homeCard('magnet','Learn by doing','Every mission blends animations, real diagrams, and hands-on simulators — launch objects, build circuits, and ride waves.')}
    ${homeCard('climb','Support + stretch','Stuck? Open a worked example. Cruising? Every lesson has an Extension Challenge to push you further.')}
    ${homeCard('trophy','Earn your rank','Collect XP, badges, and stars. Finish strong in the Final Challenge to become a Master Physicist.')}
  </div>
  <div class="center mt2"><button class="btn btn-green btn-lg" onclick="startNext()">Enter the Academy →</button></div>`;
}
function statTile(ic,k,v,c){return `<div class="glass"><div class="stat"><div class="ic" style="background:${c}22;color:${c}">${icon(ic)}</div><div><div class="v">${v}</div><div class="k">${k}</div></div></div></div>`;}
function homeCard(ic,t,d){return `<div class="glass"><div style="color:var(--teal);font-size:2rem">${icon(ic)}</div><h3 style="color:#fff;margin:.4em 0 .2em">${t}</h3><p style="color:#b9cbe6;font-size:.95rem;line-height:1.6">${d}</p></div>`;}
function startNext(){const next=MISSIONS.find(m=>!S.completed[m.id]);go('mission-'+(next?next.id:1));}

/* ============================================================ DASHBOARD ============================================================ */
function renderDashboard(){
  const cur=MISSIONS.find(m=>!S.completed[m.id]);
  const stats=S.topicStats||{};
  const entries=Object.entries(stats).map(([k,v])=>[k,v.correct,v.total,v.total?v.correct/v.total:0]);
  entries.sort((a,b)=>b[3]-a[3]);
  const strong=entries.filter(e=>e[2]>=2).slice(0,3);
  const weak=entries.filter(e=>e[2]>=2).slice(-3).reverse();
  document.getElementById('app').innerHTML=`
  <div class="section-head"><span class="eyebrow">Trainee Report</span><h1>Progress Dashboard</h1><p>Everything ${PLAYER_NAME} has achieved so far, saved automatically to this device.</p></div>
  <div class="grid g4">
    ${statTile('medal','Level',level(),'#2D9CFF')}${statTile('bolt','Total XP',S.xp,'#2EC4B6')}
    ${statTile('check','Missions',completedCount()+'/'+MISSIONS.length,'#6EEB83')}${statTile('target','Accuracy',accuracy()+'%','#FFB84D')}
    ${statTile('question','Questions',S.total,'#c58bff')}${statTile('medal','Badges',S.badges.length+'/'+BADGES.length,'#2D9CFF')}
    ${statTile('flame','Streak',S.streak+' days','#E63946')}${statTile('clock','Time',Math.round(S.timeSpent/60)+' min','#2EC4B6')}
  </div>
  <div class="grid g2 mt2">
    <div class="glass"><h3 style="color:#fff">${icon('target')} Current Mission</h3>
      ${cur?`<p style="color:#b9cbe6">You're up to:</p><h2 style="color:var(--teal);margin:.2em 0">${cur.id}. ${cur.title}</h2><p style="color:#b9cbe6">${cur.sub}</p><button class="btn btn-primary mt" onclick="go('mission-${cur.id}')">Resume →</button>`:`<p style="color:var(--green);font-weight:700">${icon('trophy')} All missions complete! Head to the Final Challenge.</p><button class="btn btn-green mt" onclick="go('final')">Final Challenge →</button>`}
    </div>
    <div class="glass"><h3 style="color:#fff">${icon('chart')} Level Progress</h3>
      <p style="color:#b9cbe6">${XP_PER_LEVEL-(S.xp%XP_PER_LEVEL)} XP until Level ${level()+1}</p>
      <div style="height:16px;background:rgba(255,255,255,.12);border-radius:12px;overflow:hidden;margin:12px 0"><i style="display:block;height:100%;width:${levelProgress()}%;background:linear-gradient(90deg,var(--green),var(--teal))"></i></div>
      <div class="streak-flame">${icon('flame')} ${S.streak}-day training streak</div>
    </div>
  </div>
  <div class="grid g2 mt2">
    <div class="glass"><h3 style="color:#fff">${icon('bolt')} Strongest Topics</h3>${strong.length?strong.map(e=>topicBar(e,'#6EEB83')).join(''):'<p class="tiny">Answer a few quizzes to see your strengths.</p>'}</div>
    <div class="glass"><h3 style="color:#fff">${icon('target')} Topics to Review</h3>${weak.length&&weak.some(e=>e[3]<1)?weak.filter(e=>e[3]<1).map(e=>topicBar(e,'#FFB84D')).join(''):'<p class="tiny">No weak spots yet — excellent work!</p>'}</div>
  </div>
  <div class="flex center mt2 no-print" style="justify-content:center;flex-wrap:wrap">
    <button class="btn btn-ghost" onclick="exportProgress()">${icon('scroll')} Save Progress to File</button>
    <button class="btn btn-ghost" onclick="document.getElementById('importFile').click()">${icon('unlock')} Load Progress from File</button>
    <input type="file" id="importFile" accept="application/json" style="display:none" onchange="importProgress(this.files[0]);this.value=''">
    <button class="btn btn-ghost" onclick="resetAll()">↺ Reset Progress</button>
  </div>`;
}
function topicBar(e,c){const pct=Math.round(e[3]*100);return `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between;font-size:.85rem;color:#cfe0f7"><span>${e[0]}</span><span>${pct}%</span></div><div style="height:9px;background:rgba(255,255,255,.12);border-radius:8px;overflow:hidden;margin-top:4px"><i style="display:block;height:100%;width:${pct}%;background:${c}"></i></div></div>`;}

/* ============================================================ MISSION SELECT ============================================================ */
/* ---------- Mission journey path ---------- */
const ZONE_TEKS={
  'Foundations':'§112.39(c)(1)–(3) · Scientific Processes',
  'Motion & Forces':'§112.39(c)(4) · Motion',
  'Energy & Heat':'§112.39(c)(6) · Energy, Momentum & Thermodynamics',
  'Waves & Light':'§112.39(c)(7) · Waves',
  'Electricity':'§112.39(c)(5) · Forces',
  'Modern Physics':'§112.39(c)(8) · Atomic, Nuclear & Quantum',
  'Capstone':'Review & Synthesis'
};
const THUMB_ICON={scientist:'scientist',ruler:'slider',motion:'car',forces:'force',energy:'bolt',momentum:'ball',thermo:'flame',waves:'wave',optics:'prism',circuit:'plug',atomic:'atom',escape:'unlock'};
let jSelected=null;
function smoothPath(pts){
  if(pts.length<2)return '';
  let d=`M ${pts[0][0]} ${pts[0][1]}`;
  for(let i=1;i<pts.length-1;i++){
    const mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;
    d+=` Q ${pts[i][0]} ${pts[i][1]} ${mx} ${my}`;
  }
  const last=pts[pts.length-1];d+=` L ${last[0]} ${last[1]}`;
  return d;
}
function renderMissions(){
  const items=[];let lastZone=null;
  MISSIONS.forEach(m=>{
    if(m.zone&&m.zone!==lastZone){items.push({type:'zone',zone:m.zone});lastZone=m.zone;}
    items.push({type:'mission',m});
  });
  const W=400;const zoneGap=84,missionGap=168;
  let y=90;const pts=[],nodeItems=[],zoneItems=[];
  items.forEach((it,i)=>{
    const x=200+Math.sin(i*0.95)*130;
    pts.push([x,y]);
    if(it.type==='mission')nodeItems.push({m:it.m,x,y});else zoneItems.push({zone:it.zone,x,y});
    y+=it.type==='zone'?zoneGap:missionGap;
  });
  const totalH=y-missionGap+70;
  const pathD=smoothPath(pts);
  const next=MISSIONS.find(m=>!S.completed[m.id]);
  if(jSelected==null||!mission(jSelected))jSelected=next?next.id:MISSIONS[MISSIONS.length-1].id;
  document.getElementById('app').innerHTML=`
  <div class="section-head"><span class="eyebrow">Training Path</span><h1>Mission Select</h1><p>A guided path through every Texas Physics TEKS strand — motion, forces, energy, waves, electricity and beyond. Complete missions in order; each stop shows exactly which state standards it covers. Every mission's lab and quiz also builds TEKS §112.39(c)(1)–(3) process skills: safe practice, data analysis and quantitative problem solving.</p></div>
  <div class="journey" style="height:${totalH}px">
    <svg class="journey-line" viewBox="0 0 ${W} ${totalH}" preserveAspectRatio="none">
      <defs><linearGradient id="jgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--green)"/><stop offset="1" stop-color="var(--blue)"/></linearGradient></defs>
      <path class="bg" d="${pathD}"/>
      <path class="fg" id="jFgPath" d="${pathD}"/>
    </svg>
    ${zoneItems.map(z=>`<div class="jzone" style="left:calc(${z.x}/${W}*100%);top:${z.y}px"><span class="jz-pill">${z.zone}</span><span class="jz-teks">${ZONE_TEKS[z.zone]||''}</span></div>`).join('')}
    ${nodeItems.map(n=>{const m=n.m;const done=S.completed[m.id],open=isUnlocked(m.id);
      const stateClass=done?'done':(open?'current':'locked');
      return `<button class="jnode ${stateClass} ${jSelected===m.id?'selected':''}" data-id="${m.id}" style="--n-color:${m.color};left:calc(${n.x}/${W}*100%);top:${n.y}px" onclick="jSelect(${m.id})" aria-label="Mission ${m.id}: ${m.title}">
        <span class="jn-num">${m.id}</span><span class="jn-ic">${icon(THUMB_ICON[m.thumb]||'flask')}</span>
        ${done?`<span class="jn-check">${icon('check')}</span>`:(!open?`<span class="jn-check" style="background:#4a5568">${icon('lock')}</span>`:'')}
      </button>`;}).join('')}
  </div>
  <div id="jbriefing"></div>`;
  renderBriefing(jSelected);
  requestAnimationFrame(()=>{
    const p=document.getElementById('jFgPath');if(!p)return;
    const len=p.getTotalLength();
    const curIdx=nodeItems.findIndex(n=>n.m.id===(next?next.id:-1));
    const doneCount=nodeItems.filter(n=>S.completed[n.m.id]).length;
    const progressIdx=curIdx>=0?curIdx:doneCount-1;
    const frac=nodeItems.length>1?Math.max(0,progressIdx)/(nodeItems.length-1):0;
    p.style.strokeDasharray=len;p.style.strokeDashoffset=len*(1-frac);
  });
}
function jSelect(id){
  jSelected=id;
  document.querySelectorAll('.jnode').forEach(b=>b.classList.toggle('selected',b.dataset.id===String(id)));
  renderBriefing(id);
}
function renderBriefing(id){
  const m=mission(id);if(!m)return;
  const done=S.completed[m.id],open=isUnlocked(m.id),stars=S.stars[m.id]||0;
  const statusChip=done?`<span class="status st-done">${icon('check')} Complete</span>`:open?`<span class="status st-open">▶ ${m.xp} XP</span>`:`<span class="status st-lock">Locked</span>`;
  document.getElementById('jbriefing').innerHTML=`
  <div class="glass jbriefing">
    <div class="jb-top">
      <span class="jb-num" style="background:${m.color}">Mission ${m.id}</span>
      <span class="jb-zone">${m.zone||''}</span>
      ${m.teks?`<span class="jb-teks">${m.teks}</span>`:''}
    </div>
    <h2>${m.title}</h2>
    <p class="jb-sub">${m.sub}</p>
    ${m.tekslabel?`<p class="jb-teks-label">${icon('compass')} Covers: ${m.tekslabel}</p>`:''}
    <div class="jb-meta"><span class="mstars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</span>${statusChip}</div>
    <button class="btn btn-primary btn-lg" ${open?`onclick="go('mission-${m.id}')"`:'disabled'}>${open?(done?'Review Mission →':'Start Mission →'):icon('lock')+' Complete the previous mission first'}</button>
  </div>`;
}

/* ============================================================ ACHIEVEMENTS ============================================================ */
function renderAchievements(){
  document.getElementById('app').innerHTML=`
  <div class="section-head"><span class="eyebrow">Trophy Room</span><h1>Achievements</h1><p>You've unlocked ${S.badges.length} of ${BADGES.length} badges. Keep training to collect them all.</p></div>
  <div class="grid g4">${BADGES.map(b=>{const got=S.badges.includes(b.id);
      return `<div class="badge ${got?'':'locked'}"><div style="position:relative">${badgeSVG(b.id)}${got?'':`<span class="lock-tag">${icon('lock')}</span>`}</div><b>${b.name}</b><small>${b.desc}</small><span class="status ${got?'st-done':'st-lock'}" style="margin-top:4px">${got?'Unlocked':'Locked'}</span></div>`;}).join('')}</div>`;
}

/* ============================================================ PHYSICS LAB ============================================================ */
const LAB_VIEWPORTS={
  motion:c=>({kicker:'Motion Bay',readout:'d = v · t',svg:`<path d="M20 100 Q120 20 280 40" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="2 7" stroke-linecap="round" opacity=".55"/><circle cx="280" cy="40" r="6" fill="${c}"/><circle cx="20" cy="100" r="4" fill="${c}" opacity=".6"/><path d="M0 112h300M0 122h300" stroke="#12233b" stroke-width="1"/>`}),
  forces:c=>({kicker:'Force Bay',readout:'F = m · a',svg:`<rect x="40" y="52" width="46" height="30" rx="4" fill="none" stroke="${c}" stroke-width="2"/><path d="M86 67h30" stroke="${c}" stroke-width="2"/><path d="M116 67l-10-8M116 67l-10 8" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M150 30 q10 20 0 40 q-10 20 0 40" fill="none" stroke="${c}" stroke-width="1.6" opacity=".45"/><path d="M180 30 q10 20 0 40 q-10 20 0 40" fill="none" stroke="${c}" stroke-width="1.6" opacity=".3"/>`}),
  energy:c=>({kicker:'Energy Bay',readout:'KE + PE = const',svg:`<path d="M110 18v34M190 18v34" stroke="#4a5f7d" stroke-width="2"/><path d="M110 52 Q150 110 190 52" fill="none" stroke="${c}" stroke-width="1.6" stroke-dasharray="3 5" opacity=".5"/><circle cx="150" cy="98" r="9" fill="${c}"/><line x1="150" y1="52" x2="150" y2="98" stroke="${c}" stroke-width="2"/>`}),
  collision:c=>({kicker:'Impact Bay',readout:'p = m · v',svg:`<circle cx="120" cy="66" r="16" fill="${c}" opacity=".85"/><circle cx="185" cy="66" r="16" fill="#4a5f7d"/><path d="M136 66h34" stroke="${c}" stroke-width="2" stroke-dasharray="1 5"/><path d="M195 40l14-10M199 66h18M195 92l14 10" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/>`}),
  waves:c=>({kicker:'Wave Studio',readout:'v = f · λ',svg:`<path d="M0 66h300" stroke="#12233b" stroke-width="1"/><path d="M0 66 C 30 20,60 20,90 66 C 120 112,150 112,180 66 C 210 20,240 20,270 66 C 285 90,295 90,300 66" fill="none" stroke="${c}" stroke-width="2.4"/>`}),
  optics:c=>({kicker:'Optics Bay',readout:'θᵢ = θᵣ',svg:`<path d="M60 40 L100 40 L80 90 Z" fill="none" stroke="${c}" stroke-width="2"/><path d="M30 60h30" stroke="${c}" stroke-width="2"/><path d="M100 55 L160 45" stroke="#E63946" stroke-width="1.8"/><path d="M100 58 L165 55" stroke="#FFB84D" stroke-width="1.8"/><path d="M100 61 L170 65" stroke="#6EEB83" stroke-width="1.8"/><path d="M100 64 L165 75" stroke="#2D9CFF" stroke-width="1.8"/><path d="M100 67 L160 85" stroke="${c}" stroke-width="1.8"/>`}),
  circuit:c=>({kicker:'Circuit Bay',readout:'V = I · R',svg:`<path d="M40 90 L40 40 L110 40" fill="none" stroke="${c}" stroke-width="2"/><path d="M110 40 l14 -8 v16 l-14 -8" fill="${c}"/><path d="M124 40h20 M144 40 l6 -10 6 20 6 -20 6 20 6 -10 h20" fill="none" stroke="${c}" stroke-width="2"/><circle cx="230" cy="40" r="10" fill="none" stroke="${c}" stroke-width="2"/><path d="M230 30v-10M230 60v-10M220 40h-10M250 40h10" stroke="${c}" stroke-width="2" opacity=".55"/>`}),
  toolkit:c=>({kicker:'Toolkit Bay',readout:'Σ quantities',svg:`<rect x="50" y="30" width="26" height="26" rx="4" fill="none" stroke="${c}" stroke-width="2"/><rect x="90" y="60" width="26" height="26" rx="4" fill="none" stroke="${c}" stroke-width="2" opacity=".7"/><rect x="130" y="34" width="26" height="26" rx="4" fill="none" stroke="${c}" stroke-width="2" opacity=".5"/><path d="M180 45 l40 0 M220 45 l-8 -6 M220 45 l-8 6" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M235 30 v30" stroke="${c}" stroke-width="2"/><path d="M235 30 h14 M235 45 h10 M235 60 h14" stroke="${c}" stroke-width="2"/>`}),
  units:c=>({kicker:'Units Bay',readout:'match pairs',svg:`<rect x="60" y="46" width="60" height="40" rx="6" fill="none" stroke="${c}" stroke-width="2" transform="rotate(-6 90 66)"/><text x="90" y="72" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="${c}" transform="rotate(-6 90 66)">m</text><rect x="170" y="46" width="60" height="40" rx="6" fill="none" stroke="${c}" stroke-width="2" transform="rotate(5 200 66)"/><text x="200" y="72" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="${c}" transform="rotate(5 200 66)">kg</text><path d="M124 66h42" stroke="${c}" stroke-width="1.6" stroke-dasharray="3 5"/>`})
};
function renderLab(){
  const games=[
    ['motion','Motion Lab','Velocity, distance & time','car','#2D9CFF',3],
    ['forces','Force Simulator','Net force & Newton\'s laws','force','#6EEB83',4],
    ['energy','Energy Pendulum','Watch KE and PE trade off','bolt','#FFB84D',5],
    ['collision','Collision Lab','Momentum in impacts','ball','#E63946',6],
    ['waves','Wave Studio','Amplitude, frequency, wavelength','wave','#2EC4B6',8],
    ['optics','Light & Color Lab','Reflection & mixing light','prism','#c58bff',9],
    ['circuit','Circuit Builder','Ohm\'s law: V = I × R','plug','#FFB84D',10],
    ['toolkit','Physics Toolkit','Quantities, units & formulas','toolbox','#2D9CFF',2],
    ['units','Unit Match','Match quantities to their units','cards','#6EEB83',2]
  ];
  const solved=S.labChallenges||{};const nSolved=Object.keys(solved).length;
  const seenMid={};
  const gaugeLen=(nSolved/LAB_CHALLENGE_TOTAL*138.2).toFixed(1);
  document.getElementById('app').innerHTML=`
  <div class="section-head"><span class="eyebrow">Free Play</span><h1>Physics Lab</h1><p>Every interactive simulator in one place. Experiment freely — or take on each lab's challenge to earn bonus XP.</p></div>
  <div class="glass lab-console" style="margin-bottom:18px">
    <svg class="gauge" viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="5"/><circle cx="26" cy="26" r="22" fill="none" stroke="var(--green)" stroke-width="5" stroke-dasharray="${gaugeLen} 138.2" stroke-linecap="round" transform="rotate(-90 26 26)"/><text x="26" y="31" text-anchor="middle" font-family="ui-monospace,monospace" font-size="13" fill="#fff" font-weight="700">${nSolved}</text></svg>
    <div class="meter">
      <div class="row"><span>Lab Challenges beaten</span><b>${nSolved} / ${LAB_CHALLENGE_TOTAL}</b></div>
      <div class="track"><i style="width:${Math.round(nSolved/LAB_CHALLENGE_TOTAL*100)}%"></i></div>
    </div>
    <div class="note">${nSolved>=LAB_CHALLENGE_TOTAL?'Lab Legend — every challenge cleared!':`+${LAB_CHALLENGE_XP} XP each · beat them all for a badge`}</div>
  </div>
  <div class="grid g3">${games.map(([g,t,d,ic,c,mid])=>{
      const vp=LAB_VIEWPORTS[g](c);
      const dupe=seenMid[mid];seenMid[mid]=true;
      const aid=`${String(mid).padStart(2,'0')}-${dupe?'B':'A'}`;
      return `<button class="appcard" style="--accent:${c}" onclick="openLabGame('${g}')">
      <div class="rivet tl"></div><div class="rivet tr"></div><div class="rivet bl"></div><div class="rivet br"></div>
      <div class="viewport"><div class="scanline"></div><svg viewBox="0 0 300 132" preserveAspectRatio="none">${vp.svg}</svg><span class="vtag">MISSION ${String(mid).padStart(2,'0')}</span><span class="readout">${vp.readout}</span></div>
      <div class="plate"><div class="kicker"><span class="dot"></span>${vp.kicker}</div><h3>${t}</h3><p>${d}</p></div>
      <div class="serial"><span class="id">APPARATUS ${aid}</span><span class="lab-status ${solved[g]?'done':'open'}"><span class="led"></span>${solved[g]?'Cleared':'Ready'}</span></div>
    </button>`;}).join('')}</div>
  <div id="labStage" class="mt2"></div>`;
}
function openLabGame(g){
  const stage=document.getElementById('labStage');
  stage.innerHTML=`<div class="card" style="background:linear-gradient(180deg,#123a63,#0d2846);color:#eaf2ff;border:1px solid var(--line)"><div id="game-${g}"></div></div>`;
  const init={motion:initMotion,forces:initForces,energy:initEnergy,collision:initCollision,waves:initWaves,optics:initOptics,circuit:initCircuit,toolkit:initToolkit,units:initUnits}[g];
  if(init)init('game-'+g,true);
  stage.scrollIntoView({behavior:'smooth',block:'start'});
}

/* ============================================================ CERTIFICATE ============================================================ */
function renderCertificate(){
  const app=document.getElementById('app');
  const done=completedCount()>=MISSIONS.length;
  const rank=S.finalRank||'Trainee';
  const date=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const scorePct=Math.round((S.xp/(MISSIONS.reduce((a,m)=>a+m.xp,0)))*100);
  if(!done){app.innerHTML=`<div class="section-head"><span class="eyebrow">Graduation</span><h1>Certificate</h1></div>
    <div class="locked-note"><div style="font-size:3rem;color:var(--muted)">${icon('lock')}</div><h2 style="color:#fff">Complete all ${MISSIONS.length} missions to unlock your certificate</h2><p>You've finished ${completedCount()} so far. Keep going, ${PLAYER_NAME}!</p><button class="btn btn-primary mt" onclick="go('missions')">Continue Training →</button></div>`;return;}
  app.innerHTML=`
  <div class="section-head no-print"><span class="eyebrow">Graduation</span><h1>Your Certificate</h1><p>Congratulations, ${PLAYER_NAME} — you've completed Physics Quest!</p></div>
  <div class="cert" id="cert"><div class="cert-inner">
      <div style="font-size:2.4rem;color:#2D9CFF;display:flex;gap:14px;justify-content:center">${icon('flask')}${icon('cap')}${icon('atom')}</div>
      <div style="font-family:var(--f-btn);font-weight:800;letter-spacing:3px;color:#2EC4B6;text-transform:uppercase;font-size:.8rem">Elite Science Academy</div>
      <h1>Certificate of Achievement</h1>
      <p style="color:#4a5568">This certifies that</p>
      <div class="name">${PLAYER_NAME}</div>
      <p style="color:#4a5568;max-width:52ch;margin:0 auto">has successfully completed the Physics Quest foundations program, demonstrating mastery of motion, forces, energy, momentum, waves, optics, and electricity.</p>
      <div style="margin:18px 0"><span style="font-family:var(--f-head);color:#4a5568">Rank Earned</span><div class="rank" style="display:flex;align-items:center;gap:8px;justify-content:center">${icon('trophy')} ${rank}</div></div>
      <div class="row">
        <div class="sig">${date}<br><span style="color:#8593a6">Date Completed</span></div>
        <div class="sig">Score: ${scorePct}%<br><span style="color:#8593a6">Overall Performance</span></div>
        <div class="sig" style="font-family:'Poppins';font-style:italic;color:#2D9CFF">Dr. A. Nova<br><span style="color:#8593a6;font-style:normal;font-family:var(--f-body)">Academy Instructor</span></div>
      </div>
  </div></div>
  <div class="center mt2 no-print"><button class="btn btn-primary btn-lg" onclick="window.print()">${icon('print')} Print / Save as PDF</button></div>`;
  setTimeout(confetti,300);SFX.reward();
}
/* ===RENDER=== */
/* ============================================================
   MISSION LESSON + QUIZ ENGINE
   ============================================================ */
let Q={mid:null,i:0,attempts:0,correct:0,answered:false,startedAt:0};
function renderMission(id){
  const m=mission(id);if(!m)return go('missions');
  if(!isUnlocked(id)){toast('Complete the previous mission first!','lock');return go('missions');}
  Q.startedAt=Date.now();
  document.getElementById('app').innerHTML=`
  <div class="flex no-print" style="margin-bottom:6px">
    <button class="btn btn-ghost" onclick="go('missions')">← Missions</button>
    <div class="spacer"></div><span class="pill" style="margin:0">Mission ${m.id} of ${MISSIONS.length}</span>
  </div>
  <div class="card" style="background:linear-gradient(180deg,#0f3159,#0b2340);color:#eaf2ff;border:1px solid var(--line)">${m.content()}</div>
  <div id="quizMount" class="mt2"></div>`;
  if(m.game){
    const init={motion:initMotion,forces:initForces,energy:initEnergy,collision:initCollision,waves:initWaves,optics:initOptics,circuit:initCircuit,toolkit:initToolkit,units:initUnits,thermo:initThermo,atomic:initAtomic,escape:initEscape}[m.game];
    if(init)setTimeout(()=>init('game-'+m.game,false,id),60);
  }
  if(m.quiz&&m.quiz.length){Q={mid:id,i:0,attempts:0,correct:0,answered:false,startedAt:Q.startedAt};renderQuizButton();}
}
function renderQuizButton(){
  document.getElementById('quizMount').innerHTML=`
  <div class="glass center"><h3 style="color:#fff">${icon('bulb')} Knowledge Check</h3>
    <p style="color:#b9cbe6">${mission(Q.mid).quiz.length} questions across every level of thinking — from recall to creativity. Hints guide you if you get stuck.</p>
    <button class="btn btn-green btn-lg" onclick="startQuiz()">Begin Knowledge Check →</button></div>`;
}
function startQuiz(){Q.i=0;Q.attempts=0;Q.correct=0;renderQuestion();}
function renderQuestion(){
  const m=mission(Q.mid),q=m.quiz[Q.i];Q.answered=false;Q.attempts=0;
  const c=bloomColors[q.bloom];
  let body='';
  if(q.type==='mc'){body=`<div class="opts" id="opts">${q.opts.map((o,i)=>`<button class="opt" onclick="answerMC(${i})"><span class="k">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join('')}</div>`;}
  else if(q.type==='fill'){body=`<div class="flex"><input class="fill-in" id="fillIn" placeholder="Type your answer..." onkeydown="if(event.key==='Enter')answerFill()" autocomplete="off"><button class="btn btn-primary" onclick="answerFill()">Check</button></div>`;}
  else if(q.type==='short'){body=`<textarea class="fill-in" id="shortIn" style="max-width:100%;min-height:90px;font-family:var(--f-body)" placeholder="Write your response — there's no single right answer here."></textarea><button class="btn btn-primary mt" onclick="answerShort()">Submit Response</button>`;}
  document.getElementById('quizMount').innerHTML=`
  <div class="quiz-wrap">
    <div class="quiz-top"><span class="bloom-tag" style="background:${c}">${q.bloom}</span><span class="qprog">Question ${Q.i+1} of ${m.quiz.length}</span></div>
    <div class="qbar"><i style="width:${(Q.i)/m.quiz.length*100}%"></i></div>
    <div class="qtext">${q.q}</div>${body}
    <div class="feedback" id="fb" aria-live="polite"></div><div class="quiz-actions" id="qact"></div>
  </div>`;
  document.getElementById('quizMount').scrollIntoView({behavior:'smooth',block:'start'});
}
function fb(cls,html){const f=document.getElementById('fb');f.className='feedback show '+cls;f.innerHTML=html;}
function recordAnswer(correct){
  const m=mission(Q.mid);S.total++;if(correct)S.correct++;
  const t=S.topicStats[m.title]||(S.topicStats[m.title]={correct:0,total:0});t.total++;if(correct)t.correct++;save();
}
function nextBtn(){const m=mission(Q.mid);const last=Q.i>=m.quiz.length-1;
  document.getElementById('qact').innerHTML=`<button class="btn btn-green" onclick="${last?'finishMission()':'advanceQ()'}">${last?'Finish Mission ✓':'Next Question →'}</button>`;}
function advanceQ(){Q.i++;renderQuestion();}
function answerMC(i){
  if(Q.answered)return;const m=mission(Q.mid),q=m.quiz[Q.i];const opts=document.querySelectorAll('#opts .opt');
  if(i===q.answer){Q.answered=true;opts[i].classList.add('correct');opts.forEach(o=>o.disabled=true);
    recordAnswer(Q.attempts===0);SFX.right();fb('good',`<b>${icon('check')} Excellent observation!</b> ${q.why}`);if(Q.attempts===0)Q.correct++;nextBtn();}
  else{Q.attempts++;opts[i].classList.add('wrong');opts[i].disabled=true;SFX.wrong();
    if(Q.attempts===1){fb('hint',`<b>${icon('bulb')} Not quite — try again.</b> ${q.hint}`);}
    else{fb('explain',`<b>${icon('search')} Let's break it down:</b> ${q.explain} <br><br>Give it one more try with this in mind.`);}}
}
/* Accepts an exact (trimmed/case-insensitive) string match, or — since every
   fill-in answer in this app is numeric — a numeric match that tolerates
   commas, stray spaces, and trailing ".0" (e.g. "3,000" or "3000.0" both
   match an accepted answer of "3000"). */
function answerMatches(val,answers){
  const clean=v=>String(v).trim().toLowerCase();
  const v=clean(val);
  if(answers.map(clean).includes(v))return true;
  const num=parseFloat(v.replace(/,/g,''));
  if(isNaN(num))return false;
  return answers.some(a=>{const an=parseFloat(String(a).replace(/,/g,''));return !isNaN(an)&&Math.abs(an-num)<1e-9;});
}
function answerFill(){
  if(Q.answered)return;const m=mission(Q.mid),q=m.quiz[Q.i];const val=(document.getElementById('fillIn').value||'').trim();
  if(!val)return;const ok=answerMatches(val,q.answers);
  if(ok){Q.answered=true;recordAnswer(Q.attempts===0);SFX.right();if(Q.attempts===0)Q.correct++;
    document.getElementById('fillIn').style.borderColor='#6EEB83';fb('good',`<b>${icon('check')} Experiment successful!</b> ${q.why}`);nextBtn();}
  else{Q.attempts++;document.getElementById('fillIn').style.borderColor='#E63946';SFX.wrong();
    if(Q.attempts===1)fb('hint',`<b>${icon('bulb')} Close — try again.</b> ${q.hint}`);
    else fb('explain',`<b>${icon('search')} Here's the concept:</b> ${q.explain} <br><br>Now enter the value.`);}
}
function answerShort(){
  if(Q.answered)return;const m=mission(Q.mid),q=m.quiz[Q.i];const val=(document.getElementById('shortIn').value||'').trim();
  if(val.length<8){toast('Write a little more to earn your XP!','pencil');return;}
  Q.answered=true;const hit=(q.keywords||[]).some(k=>val.toLowerCase().includes(k));
  recordAnswer(true);Q.correct++;SFX.right();document.getElementById('shortIn').disabled=true;
  fb('good',`<b>${icon('star')} ${hit?'You\'re thinking like a scientist!':'Great hypothesis — creative thinking counts!'}</b> ${q.model}`);nextBtn();
}
function finishMission(){
  const m=mission(Q.mid);const pct=m.quiz.length?Q.correct/m.quiz.length:1;
  const stars=pct>=0.9?3:pct>=0.6?2:1;const already=S.completed[m.id];
  S.stars[m.id]=Math.max(S.stars[m.id]||0,stars);S.scores[m.id]=Math.round(pct*100);
  const xpGain=already?Math.round(m.xp*0.25):m.xp;S.xp+=xpGain;S.completed[m.id]=true;
  S.timeSpent+=Math.round((Date.now()-Q.startedAt)/1000);save();
  showMissionComplete(m,stars,xpGain,syncBadges());
}
function showMissionComplete(m,stars,xp,badges){
  SFX.reward();confetti();const next=MISSIONS.find(x=>!S.completed[x.id]);
  document.getElementById('modalBox').innerHTML=`
    <div class="medal">${starMedal(stars)}</div><h2>Mission Complete!</h2>
    <p style="color:#cfe0f7">${['Solid work — every physicist starts here.','Experiment successful! You\'re getting sharper.','Flawless! You\'re thinking like a true physicist.'][stars-1]}</p>
    <div style="font-size:1.8rem;letter-spacing:4px;color:#FFB84D;margin:8px 0">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div>
    <div class="reward-row"><div class="reward"><div class="v">+${xp}</div><div class="k">XP</div></div><div class="reward"><div class="v">Lv ${level()}</div><div class="k">Level</div></div><div class="reward"><div class="v">${S.scores[m.id]}%</div><div class="k">Score</div></div></div>
    ${badges.length?`<div style="margin:6px 0 2px">${badges.map(b=>`<span style="display:inline-block;width:46px;height:46px;vertical-align:middle;margin:0 2px">${badgeSVG(b.id)}</span>`).join('')}</div><p style="color:var(--green);margin-top:2px">New badge${badges.length>1?'s':''}: ${badges.map(b=>b.name).join(', ')}</p>`:''}
    <div class="flex" style="justify-content:center;margin-top:10px">
      ${next?`<button class="btn btn-green" onclick="closeModal();go('mission-${next.id}')">Next Mission →</button>`:`<button class="btn btn-green" onclick="closeModal();go('final')">Final Challenge →</button>`}
      <button class="btn btn-ghost" onclick="closeModal();go('missions')">Mission Map</button></div>`;
  document.getElementById('overlay').classList.add('show');
}
function starMedal(stars){const c=stars>=3?'#FFB84D':stars>=2?'#2EC4B6':'#2D9CFF';
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="46" r="30" fill="${c}"/><circle cx="50" cy="46" r="30" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/><path d="M50 30l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="#fff"/><path d="M35 70l-6 24 21-12 21 12-6-24" fill="${c}" opacity=".8"/></svg>`;}
function closeModal(){document.getElementById('overlay').classList.remove('show');refreshHud();}
function modalMsg(ic,title,html){
  const glyph=ICONS[ic]?`<span style="font-size:3.4rem;color:var(--green);display:inline-block">${icon(ic)}</span>`:`<div style="font-size:3.4rem">${ic}</div>`;
  document.getElementById('modalBox').innerHTML=`<div style="animation:pop .5s">${glyph}</div><h2>${title}</h2><p style="color:#cfe0f7">${html}</p><button class="btn btn-green mt" onclick="closeModal()">Continue →</button>`;
  document.getElementById('overlay').classList.add('show');
}
/* ===QUIZ=== */
/* ============================================================
   ANIMATION CONTROLLER
   ============================================================ */
let animId=null;
function stopAnim(){if(animId){cancelAnimationFrame(animId);animId=null;}}
function loop(id,step){
  stopAnim();let last=performance.now();
  (function frame(now){
    if(!document.getElementById(id)){animId=null;return;} // element gone → stop
    const dt=Math.min((now-last)/1000,0.05);last=now;
    step(dt);animId=requestAnimationFrame(frame);
  })(last);
}
function slider(id,label,min,max,val,step,oninput,unit){
  // escape inner double-quotes so the whole handler survives HTML attribute parsing
  const h=String(oninput).replace(/"/g,'&quot;');
  return `<div class="ctrl-row"><label>${label}<b id="${id}v" style="color:#fff">${val}${unit||''}</b></label><input type="range" class="sl" id="${id}" min="${min}" max="${max}" step="${step||1}" value="${val}" oninput="${h}"></div>`;
}

/* ============================================================
   FINAL CHALLENGE
   ============================================================ */
const FINAL_Q=[
  {exp:'Experiment 1 · Motion Bay',q:'A runner covers 90 m in 15 s. What is their speed?',type:'fill',answers:['6'],why:'Speed = distance ÷ time = 90 ÷ 15 = 6 m/s.'},
  {exp:'Experiment 1 · Motion Bay',q:'Which quantity includes a direction?',opts:['Speed','Velocity','Distance','Time'],a:1,why:'Velocity is speed with a direction; the others are directionless.'},
  {exp:'Experiment 2 · Force Bay',q:'A 15 N net force acts on a 3 kg cart. Its acceleration is ___ m/s².',type:'fill',answers:['5'],why:'a = F ÷ m = 15 ÷ 3 = 5 m/s².'},
  {exp:'Experiment 2 · Force Bay',q:'A rocket pushes gas down and rises up. This is Newton\'s:',opts:['1st law','2nd law','3rd law','no law'],a:2,why:'Action–reaction pairs are the 3rd law.'},
  {exp:'Experiment 3 · Energy Lab',q:'You push with 20 N over 5 m. Work done = ___ joules.',type:'fill',answers:['100'],why:'W = F × d = 20 × 5 = 100 J.'},
  {exp:'Experiment 3 · Energy Lab',q:'At the top of a hill a slow coaster car mostly has:',opts:['Kinetic energy','Potential energy','No energy','Sound energy'],a:1,why:'High and slow = maximum potential energy.'},
  {exp:'Experiment 4 · Wave Studio',q:'A wave has f = 5 Hz and λ = 4 m. Its speed = ___ m/s.',type:'fill',answers:['20'],why:'v = f × λ = 5 × 4 = 20 m/s.'},
  {exp:'Experiment 4 · Wave Studio',q:'To make a sound louder without changing pitch, increase its:',opts:['Frequency','Amplitude','Wavelength','Speed'],a:1,why:'Amplitude controls energy/loudness.'},
  {exp:'Experiment 5 · Circuit Bay',q:'A 20 V battery drives a 5 Ω resistor. Current = ___ A.',type:'fill',answers:['4'],why:'I = V ÷ R = 20 ÷ 5 = 4 A.'},
  {exp:'Experiment 5 · Circuit Bay',q:'Why is house wiring parallel, not series?',opts:['Cheaper','Each device gets full voltage and works independently','Uses less wire','Series is illegal'],a:1,why:'Parallel branches each get full voltage and run independently.'},
  {exp:'Experiment 6 · Momentum Bay',q:'A 4 kg cart moving at 6 m/s collides with a stationary 4 kg cart and they stick together. Combined velocity = ___ m/s.',type:'fill',answers:['3'],why:'Momentum conserved: (4×6) ÷ (4+4) = 24 ÷ 8 = 3 m/s.'},
  {exp:'Experiment 6 · Momentum Bay',q:'In any collision (no outside forces), what quantity is always conserved?',opts:['Speed','Momentum','Force','Volume'],a:1,why:'Total momentum before a collision always equals total momentum after.'},
  {exp:'Experiment 7 · Heat Lab',q:'Two equal blocks touch — one at 70°C, one at 30°C. Ignoring losses, final temperature = ___ °C.',type:'fill',answers:['50'],why:'They meet at the average: (70 + 30) ÷ 2 = 50°C.'},
  {exp:'Experiment 7 · Heat Lab',q:'Left alone, heat always flows from:',opts:['Cold to hot','Hot to cold','It doesn\'t flow','Both ways equally'],a:1,why:'Heat spreads from hot to cold until thermal equilibrium — never the reverse.'},
  {exp:'Experiment 8 · Optics Bay',q:'Light hits a mirror at 25° from the normal. It reflects at:',opts:['15°','25°','50°','65°'],a:1,why:'Law of reflection: angle of incidence = angle of reflection = 25°.'},
  {exp:'Experiment 8 · Optics Bay',q:'Red, green, and blue light overlap on a screen. The result is:',opts:['Black','Brown','White','Red'],a:2,why:'Additive color mixing: red + green + blue light combine to white.'},
  {exp:'Experiment 9 · Quantum Bay',q:'A radioactive sample has a half-life of 5 days. After 10 days (2 half-lives), ___ % remains.',type:'fill',answers:['25'],why:'(½)² = ¼ of the original remains, which is 25%.'},
  {exp:'Experiment 9 · Quantum Bay',q:'The photoelectric effect shows that light behaves as:',opts:['A pure wave only','Packets of energy called photons','Sound','Nothing — it\'s a myth'],a:1,why:'Einstein explained the photoelectric effect using photons — particle-like packets of light energy.'}
];
let FINAL={i:0,correct:0,answered:false};
function renderFinal(){
  const ready=completedCount()>=MISSIONS.length;
  document.getElementById('app').innerHTML=`
  <div class="section-head"><span class="eyebrow">Certification Exam</span><h1>Final Challenge</h1><p>Nine experiment stations combining everything you've trained on. Your score determines your rank — from Lab Assistant up to Master Physicist.</p></div>
  ${!ready?`<div class="callout warn" style="color:#eaf2ff"><b>${icon('warning')} Recommended:</b> You've completed ${completedCount()}/${MISSIONS.length} missions. You can attempt the Final Challenge now, but finishing every mission first will prepare you best.</div>`:''}
  <div class="card" style="background:linear-gradient(180deg,#0f3159,#0b2340);color:#eaf2ff;border:1px solid var(--line)">
    <div class="lesson-hero" style="margin:0">
      <div class="lesson-body"><h2 style="color:#fff">The Master Lab awaits</h2><p>Eighteen challenges across nine stations. No hints this time — trust your training. Ready, ${PLAYER_NAME}?</p>
      <button class="btn btn-green btn-lg mt" onclick="startFinal()">${icon('target')} Begin Final Challenge</button></div>
      <div class="art">${art('lab')}</div>
    </div></div>
  ${S.finalRank?`<div class="glass mt2 center"><h3 style="color:#fff">Your current rank</h3><div style="font-size:2rem;font-family:var(--f-title);font-weight:800;color:var(--green);display:flex;align-items:center;gap:10px;justify-content:center">${icon('trophy')} ${S.finalRank}</div></div>`:''}
  <div id="finalMount" class="mt2"></div>`;
}
function startFinal(){FINAL={i:0,correct:0,answered:false};renderFinalQ();}
function renderFinalQ(){
  const q=FINAL_Q[FINAL.i];FINAL.answered=false;let body;
  if(q.type==='fill'){body=`<div class="flex"><input class="fill-in" id="fFill" placeholder="Answer..." onkeydown="if(event.key==='Enter')ansFinalFill()"><button class="btn btn-primary" onclick="ansFinalFill()">Submit</button></div>`;}
  else{body=`<div class="opts" id="fOpts">${q.opts.map((o,i)=>`<button class="opt" onclick="ansFinal(${i})"><span class="k">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join('')}</div>`;}
  document.getElementById('finalMount').innerHTML=`<div class="quiz-wrap">
    <div class="quiz-top"><span class="bloom-tag" style="background:#2D9CFF">${q.exp}</span><span class="qprog">Challenge ${FINAL.i+1} of ${FINAL_Q.length} · Score ${FINAL.correct}</span></div>
    <div class="qbar"><i style="width:${FINAL.i/FINAL_Q.length*100}%"></i></div>
    <div class="qtext">${q.q}</div>${body}<div class="feedback" id="fFb" aria-live="polite"></div><div class="quiz-actions" id="fAct"></div></div>`;
  document.getElementById('finalMount').scrollIntoView({behavior:'smooth',block:'start'});
}
function finalFb(cls,html){const f=document.getElementById('fFb');f.className='feedback show '+cls;f.innerHTML=html;}
function finalNext(){const last=FINAL.i>=FINAL_Q.length-1;
  document.getElementById('fAct').innerHTML=`<button class="btn btn-green" onclick="${last?'finishFinal()':'finalAdvance()'}">${last?'See My Rank '+icon('trophy'):'Next →'}</button>`;}
function finalAdvance(){FINAL.i++;renderFinalQ();}
function ansFinal(i){
  if(FINAL.answered)return;const q=FINAL_Q[FINAL.i];const opts=document.querySelectorAll('#fOpts .opt');
  FINAL.answered=true;opts.forEach(o=>o.disabled=true);
  if(i===q.a){opts[i].classList.add('correct');FINAL.correct++;SFX.right();finalFb('good',`<b>${icon('check')} Correct!</b> ${q.why}`);}
  else{opts[i].classList.add('wrong');opts[q.a].classList.add('correct');SFX.wrong();finalFb('explain',`<b>The answer was ${String.fromCharCode(65+q.a)}.</b> ${q.why}`);}
  finalNext();
}
function ansFinalFill(){
  if(FINAL.answered)return;const q=FINAL_Q[FINAL.i];const val=(document.getElementById('fFill').value||'').trim();
  if(!val)return;FINAL.answered=true;
  if(answerMatches(val,q.answers)){FINAL.correct++;SFX.right();finalFb('good',`<b>${icon('check')} Correct!</b> ${q.why}`);}
  else{SFX.wrong();finalFb('explain',`<b>The answer was ${q.answers[0]}.</b> ${q.why}`);}
  finalNext();
}
function finishFinal(){
  const pct=FINAL.correct/FINAL_Q.length;let rank;
  if(pct>=0.95)rank='Master Physicist';
  else if(pct>=0.8)rank='Lead Scientist';
  else if(pct>=0.6)rank='Research Physicist';
  else if(pct>=0.4)rank='Junior Physicist';
  else rank='Lab Assistant';
  S.finalRank=rank;S.xp+=Math.round(FINAL.correct*30);save();const nb=syncBadges();
  SFX.reward();confetti();
  const emo={'Master Physicist':'crown','Lead Scientist':'medal','Research Physicist':'flask','Junior Physicist':'gear','Lab Assistant':'wrench'}[rank];
  document.getElementById('modalBox').innerHTML=`
    <div style="font-size:3.6rem;color:var(--green);animation:pop .5s">${icon(emo)}</div><h2>Rank Achieved!</h2>
    <div style="font-family:var(--f-title);font-weight:800;font-size:1.8rem;color:var(--green);margin:6px 0">${rank}</div>
    <p style="color:#cfe0f7">You scored <b>${FINAL.correct}/${FINAL_Q.length}</b> (${Math.round(pct*100)}%). ${pct>=0.8?'Outstanding — you\'re thinking like a real physicist!':pct>=0.6?'Strong work! Review your weak topics and climb higher.':'Good effort — revisit a few missions and try again to rank up!'}</p>
    <div class="reward-row"><div class="reward"><div class="v">+${Math.round(FINAL.correct*30)}</div><div class="k">XP</div></div><div class="reward"><div class="v">${Math.round(pct*100)}%</div><div class="k">Score</div></div></div>
    ${nb.length?`<div style="margin:6px 0 2px">${nb.map(b=>`<span style="display:inline-block;width:46px;height:46px;vertical-align:middle;margin:0 2px">${badgeSVG(b.id)}</span>`).join('')}</div><p style="color:var(--green);margin-top:2px">${nb.map(b=>b.name).join(', ')}</p>`:''}
    <div class="flex" style="justify-content:center;margin-top:8px">
      <button class="btn btn-green" onclick="closeModal();go('certificate')">Get Certificate ${icon('scroll')}</button>
      <button class="btn btn-ghost" onclick="closeModal();startFinal()">Try Again ↺</button></div>`;
  document.getElementById('overlay').classList.add('show');
}
/* ===FINAL=== */
/* ============================================================ BOOT ============================================================ */
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('reduce-motion');}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
document.addEventListener('pointerdown',()=>{const c=ac();if(c&&c.state==='suspended')c.resume();},{once:true});
window.addEventListener('resize',()=>{const cv=document.getElementById('confetti');cv.width=innerWidth;cv.height=innerHeight;});
setInterval(()=>{S.timeSpent=(S.timeSpent||0)+15;save();},15000);
checkDailyStreak();syncBadges();renderNav();refreshHud();go('home');
console.log(`%cPhysics Quest ready — welcome, ${PLAYER_NAME}!`,'color:#2EC4B6;font-weight:bold');
/* ===BOOT=== */

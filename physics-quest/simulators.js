/* ============================================================
   PHYSICS TOOLKIT (clickable quantities)
   ============================================================ */
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function initToolkit(mountId){
  const el=document.getElementById(mountId);
  const cats=[...new Set(TOOLKIT.map(t=>t[4]))];
  el.innerHTML=`
  ${hostBlock('tkHost','Pick any tile on the board and I\'ll give you the story behind it. Fair warning: physics is contagious.')}
  ${howto('Click any colored tile to see its symbol, SI unit, formula, and a fun fact. Hit <b>Surprise me</b> for a random one.')}
  <div class="legend">${cats.map(c=>`<span><i style="background:${TKCAT[c]}"></i>${TKCATNAME[c]}</span>`).join('')}</div>
  <div class="tkgrid">${TOOLKIT.map((t,i)=>`<div class="tk-cell" style="background:${TKCAT[t[4]]}" onclick="showTK(${i})" title="${t[1]}"><div class="sym">${t[0]}</div><div class="nm">${t[2]}</div></div>`).join('')}</div>
  <div class="flex" style="margin-top:12px"><button class="btn btn-ghost" onclick="showTK(Math.floor(Math.random()*TOOLKIT.length))">${icon('spark')} Surprise me</button></div>
  <div id="tkDetail" class="mt"></div>`;
  showTK(4);
}
function showTK(i){
  const t=TOOLKIT[i];if(!t)return;SFX.click();const col=TKCAT[t[4]];
  const intro=['Now THIS is a good one.','Consider the following!','Here\'s the beautiful part —','Ooh, great pick.','Watch closely, science fan —'];
  hostSay('tkHost',`${pick(intro)} ${t[1]} is measured in ${t[3]}${t[5]!=='—'?', and it follows '+t[5]:''}.`);
  document.getElementById('tkDetail').innerHTML=`
  <div class="card" style="display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center">
    <div style="width:120px;height:120px;border-radius:18px;background:${col};display:flex;flex-direction:column;align-items:center;justify-content:center;color:#081B33">
      <div style="font-family:var(--f-title);font-weight:800;font-size:2.6rem;line-height:1">${t[0]}</div><div style="font-size:.85rem;font-weight:700">${t[2]}</div></div>
    <div>
      <h3 style="color:var(--ink);margin:0">${t[1]} <span style="color:${col==='#6EEB83'||col==='#FFB84D'?'#4a5568':col};font-size:.9rem;font-weight:600">· ${TKCATNAME[t[4]]}</span></h3>
      <p style="color:#4a5568;margin:6px 0"><b>SI unit:</b> ${t[3]} (${t[2]}) ${t[5]!=='—'?`&nbsp;·&nbsp; <b>Formula:</b> <span style="font-family:var(--f-head);color:#2D9CFF">${t[5]}</span>`:''}</p>
      <p style="color:#2D9CFF;margin:6px 0"><b>${icon('bulb')} Did you know?</b> ${t[6]}</p>
    </div></div>`;
}

/* ============================================================
   UNIT MATCH (memory / matching)
   ============================================================ */
let mem={first:null,lock:false,found:0,total:0,moves:0};
function initUnits(mountId){
  const picks=[['Force','newton (N)'],['Energy','joule (J)'],['Power','watt (W)'],['Velocity','m/s'],['Frequency','hertz (Hz)'],['Resistance','ohm (Ω)']];
  mem={first:null,lock:false,found:0,total:picks.length,moves:0};
  let cards=[];picks.forEach(([q,u],i)=>{cards.push({pair:i,face:q});cards.push({pair:i,face:u});});
  cards.sort(()=>Math.random()-0.5);window._memCards=cards;
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('umHost','Memory time! Flip two cards to pair each quantity with its unit. Fewer flips = bragging rights.')}
  ${howto('Click a card to flip it, then click a second card. If the quantity and its unit match, they stay up. Clear all 6 pairs.')}
  ${challengeBlock('umCh','Match all 6 pairs — see if you can do it in under 10 flips.')}
  <div class="grid" style="grid-template-columns:repeat(4,1fr);gap:10px" id="memGrid">
    ${cards.map((c,idx)=>`<button class="match-item" id="mc-${idx}" style="min-height:66px;font-size:.86rem" onclick="flipMem(${idx})"><span style="visibility:hidden">${c.face}</span></button>`).join('')}
  </div><div id="memMsg" class="mt"></div>`;
}
function flipMem(idx){
  if(mem.lock)return;const cards=window._memCards;const btn=document.getElementById('mc-'+idx);
  if(btn.classList.contains('paired')||btn===mem.firstBtn)return;
  btn.querySelector('span').style.visibility='visible';btn.classList.add('sel');SFX.click();
  if(mem.first==null){mem.first=cards[idx].pair;mem.firstBtn=btn;return;}
  mem.lock=true;mem.moves++;
  if(cards[idx].pair===mem.first){
    setTimeout(()=>{btn.classList.add('paired');mem.firstBtn.classList.add('paired');btn.classList.remove('sel');mem.firstBtn.classList.remove('sel');
      sparkBurst(btn,['#6EEB83','#2EC4B6']);
      mem.found++;SFX.pop();mem.first=null;mem.firstBtn=null;mem.lock=false;
      if(mem.found>=mem.total){SFX.reward();confetti();
        const verdict=mem.moves<=8?'Spotless recall — that was elite!':mem.moves<=12?'Nicely done, scientist.':'Got \'em all — that\'s what matters.';
        document.getElementById('umMsg').innerHTML=`<div class="reveal"><div class="rt">${icon('spark')} Perfect match!</div><p>You paired every quantity with its unit in <b>${mem.moves} flips</b>. ${verdict}</p></div>`;
        challengeWin('umCh',`Solved in ${mem.moves} flips${mem.moves<10?' — under 10!':''}.`);awardLabChallenge('units');
        hostSay('umHost',verdict);
      } else {hostSay('umHost',pick(['Match!','There it is.','Nice — keep going.','Boom. Pair down.']));}
    },380);
  }else{hostSay('umHost',pick(['Not a pair — remember where those live.','Close! File that away.','Nope, but now you know two more cards.']));
    setTimeout(()=>{btn.querySelector('span').style.visibility='hidden';mem.firstBtn.querySelector('span').style.visibility='hidden';
      btn.classList.remove('sel');mem.firstBtn.classList.remove('sel');mem.first=null;mem.firstBtn=null;mem.lock=false;SFX.wrong();},700);}
}

/* ============================================================
   MOTION LAB  (d = v × t)
   ============================================================ */
const MOTION_MAXD=200;
let motion={v:8,t:5,x:0,running:false,elapsed:0,target:60,solved:false};
function newMotionTarget(){
  // pick a target that IS reachable with whole-number v(1-20) & t(1-10)
  const v=2+Math.floor(Math.random()*13),t=3+Math.floor(Math.random()*7);
  motion.target=Math.min(v*t,MOTION_MAXD);motion.solved=false;
}
function motionX(d){return 8+Math.min(d/MOTION_MAXD,1)*82;}
function initMotion(mountId){
  motion={v:8,t:5,x:0,running:false,elapsed:0,target:60,solved:false};
  newMotionTarget();
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('moHost','Here\'s your mission: make the car stop DEAD on the flag. Just remember — distance equals velocity times time. Dial it in!')}
  ${howto('Drag the <b>Velocity</b> and <b>Time</b> sliders — the predicted distance (d = v × t) updates as you go. Then press <b>Launch</b> to send the car.')}
  ${challengeBlock('moCh',`Park the car exactly on the target: <b>${motion.target} m</b>.`)}
  <div class="sim-grid">
    <div class="sim-stage" id="motionView" style="aspect-ratio:16/7"></div>
    <div>
      ${slider('mV','Velocity',1,20,8,1,'motion.v=+this.value;document.getElementById("mVv").textContent=this.value+" m/s";motionReadout();drawMotion()',' m/s')}
      ${slider('mT','Time',1,10,5,1,'motion.t=+this.value;document.getElementById("mTv").textContent=this.value+" s";motionReadout();drawMotion()',' s')}
      <div class="readout" id="motionRead"></div>
      <button class="btn btn-green mt" style="width:100%" onclick="launchMotion()">${icon('flag')} Launch</button>
      <button class="btn btn-ghost mt" style="width:100%" onclick="newMotionTarget();initMotion('${mountId}')">${icon('refresh')} New target</button>
    </div></div>`;
  drawMotion();motionReadout();
}
function motionReadout(){
  const d=motion.v*motion.t;const off=d-motion.target;
  document.getElementById('motionRead').innerHTML=`<div class="row"><span>Predicted distance</span><b>d = v × t = ${motion.v} × ${motion.t} = ${d} m</b></div><div class="row"><span>Target</span><b style="color:#FFB84D">${motion.target} m</b></div><div class="row"><span>Off by</span><b style="color:${off===0?'#6EEB83':'#FFB84D'}">${off>0?'+':''}${off} m</b></div>`;
}
function drawMotion(){
  const traveled=motion.running?motion.v*motion.elapsed:motion.v*motion.t;
  const carX=motionX(traveled);const tX=motionX(motion.target);
  const spd=motion.running?motion.v:0;
  document.getElementById('motionView').innerHTML=`<svg viewBox="0 0 100 44" style="width:100%;height:100%">
    <defs>
      <linearGradient id="mRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#123a63"/><stop offset="1" stop-color="#081b33" stop-opacity="0"/></linearGradient>
      <linearGradient id="mBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#59b4ff"/><stop offset="1" stop-color="#1668b8"/></linearGradient>
      <linearGradient id="mGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf8ff"/><stop offset="1" stop-color="#8fd4ff"/></linearGradient>
    </defs>
    <rect x="0" y="34" width="100" height="10" fill="url(#mRoad)"/>
    <line x1="4" y1="34" x2="96" y2="34" stroke="#2EC4B6" stroke-width="1"/>
    ${[...Array(11)].map((_,i)=>`<line x1="${8+i*8.2}" y1="34" x2="${8+i*8.2}" y2="37" stroke="#3a5f80" stroke-width=".5"/>`).join('')}
    <g transform="translate(${tX},0)"><line x1="0" y1="14" x2="0" y2="34" stroke="#FFB84D" stroke-width=".8" stroke-dasharray="1.5 1.5"/>
      <path d="M0 14 L7 16.5 L0 19 Z" fill="#FFB84D"/><rect x="-1" y="13" width="2" height="2" fill="#FFB84D"/>
      <text x="0" y="12" fill="#FFB84D" font-size="3.4" text-anchor="middle" font-family="Montserrat" font-weight="700">${motion.target}m</text></g>
    ${spd>6?[...Array(3)].map((_,i)=>`<line x1="${carX-8-i*4}" y1="${28+i*1.5}" x2="${carX-13-i*4}" y2="${28+i*1.5}" stroke="#59b4ff" stroke-width="1" opacity="${0.5-i*0.14}"/>`).join(''):''}
    <ellipse cx="${carX}" cy="32.6" rx="7.4" ry="1.3" fill="#000" opacity=".25"/>
    <g transform="translate(${carX},26)">
      <rect x="-6.5" y="-0.5" width="13" height="6" rx="2" fill="url(#mBody)"/>
      <rect x="-3.5" y="-3.4" width="7.5" height="4" rx="1.2" fill="url(#mGlass)"/>
      <rect x="-2.7" y="-3" width="2.6" height="2.6" fill="#0c2b4d" opacity=".5"/>
      <rect x="5.6" y="0.4" width="1.1" height="1.8" rx=".4" fill="#FFB84D"/>
      <circle cx="-3" cy="6" r="2" fill="#12141a"/><circle cx="-3" cy="6" r=".8" fill="#5a7396"/>
      <circle cx="3" cy="6" r="2" fill="#12141a"/><circle cx="3" cy="6" r=".8" fill="#5a7396"/>
    </g>
    <text x="8" y="42" fill="#8aa0bd" font-size="3">start</text></svg>`;
}
function launchMotion(){
  if(motion.running)return;
  clearReveal('#motionRead');challengeReset('moCh',`Park the car exactly on the target: <b>${motion.target} m</b>.`);
  motion.running=true;motion.elapsed=0;SFX.pop();
  hostSay('moHost','And... go!');
  loop('motionView',dt=>{
    motion.elapsed+=dt;
    if(motion.elapsed>=motion.t){motion.elapsed=motion.t;motion.running=false;stopAnim();
      drawMotion();motionReadout();
      const d=motion.v*motion.t, off=d-motion.target, stage=document.getElementById('motionView');
      if(off===0){SFX.right();motion.solved=true;labCelebrate(stage,'moHost','BOOM. Dead on the mark — that\'s a bullseye!');
        challengeWin('moCh',`Parked exactly on ${motion.target} m. Textbook.`);awardLabChallenge('motion');
        const old=document.querySelector('#motionRead + .reveal');if(old)old.remove();
        document.getElementById('motionRead').insertAdjacentHTML('afterend',revealBlock('Nailed it!',`<b>d = v × t = ${motion.v} × ${motion.t} = ${d} m.</b> Same distance can come from a slow-long drive or a fast-short one — that\'s the whole equation in action.`));
      } else {SFX.wrong();shakeEl(stage);hostSay('moHost',`${off>0?'Overshot':'Came up short'} by ${Math.abs(off)} m. Nudge velocity or time and run it again!`);}
      return;}
    drawMotion();motionReadout();
  });
}

/* ============================================================
   FORCE SIMULATOR  (F = m × a)
   ============================================================ */
let fsim={F:20,m:4,fric:5,x:10,v:0,solved:false};
let forceTarget=3;
function newForceTarget(){forceTarget=[2,2.5,3,3.5,4,4.5,5][Math.floor(Math.random()*7)];}
function initForces(mountId){
  fsim={F:20,m:4,fric:5,x:10,v:0,solved:false};
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('foHost','Newton\'s second law, baby: F equals m times a. Balance push against friction and mass to hit the target acceleration — then let it RIP.')}
  ${howto('Drag <b>Applied force</b>, <b>Mass</b> and <b>Friction</b>. Watch acceleration (a = net force ÷ mass) update live, then press <b>Apply force</b> to launch the crate.')}
  ${challengeBlock('foCh',`Tune the sliders to accelerate the crate at exactly <b>${forceTarget.toFixed(1)} m/s²</b>, then apply the force.`)}
  <div class="sim-grid">
    <div class="sim-stage" id="forceView" style="aspect-ratio:16/8"></div>
    <div>
      ${slider('fF','Applied force',0,50,20,1,'fsim.F=+this.value;document.getElementById("fFv").textContent=this.value+" N";forceRead();drawForce()',' N')}
      ${slider('fM','Mass',1,10,4,1,'fsim.m=+this.value;document.getElementById("fMv").textContent=this.value+" kg";forceRead();drawForce()',' kg')}
      ${slider('fR','Friction',0,30,5,1,'fsim.fric=+this.value;document.getElementById("fRv").textContent=this.value+" N";forceRead();drawForce()',' N')}
      <div class="readout" id="forceRead"></div>
      <button class="btn btn-green mt" style="width:100%" onclick="runForces()">${icon('force')} Apply force</button>
      <button class="btn btn-ghost mt" style="width:100%" onclick="newForceTarget();initForces('${mountId}')">${icon('refresh')} New target</button>
    </div></div>`;
  drawForce();forceRead();
}
function netForce(){return Math.max(0,fsim.F-fsim.fric)*(fsim.F>=fsim.fric?1:0);}
function forceRead(){
  const net=fsim.F-fsim.fric, a=net/fsim.m, off=a-forceTarget;
  const match=net>0&&Math.abs(off)<0.05;
  document.getElementById('forceRead').innerHTML=`<div class="row"><span>Net force (F − friction)</span><b style="color:${net>0?'#6EEB83':'#FFB84D'}">${net} N</b></div><div class="row"><span>Acceleration</span><b>a = F/m = ${a.toFixed(2)} m/s²</b></div><div class="row"><span>Target</span><b style="color:${match?'#6EEB83':'#FFB84D'}">${forceTarget.toFixed(1)} m/s²</b></div>`;
}
function drawForce(){
  const cx=fsim.x;const net=fsim.F-fsim.fric;const moving=fsim.v>0.2;
  document.getElementById('forceView').innerHTML=`<svg viewBox="0 0 100 50" style="width:100%;height:100%">
    <defs>
      <linearGradient id="fWall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c3049"/><stop offset="1" stop-color="#0c2b4d"/></linearGradient>
      <linearGradient id="fCrate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9df3af"/><stop offset="1" stop-color="#3ea862"/></linearGradient>
      <marker id="fa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#2D9CFF"/></marker>
      <marker id="fb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#E63946"/></marker>
    </defs>
    <line x1="0" y1="40" x2="100" y2="40" stroke="#2EC4B6" stroke-width="1"/>
    <rect x="94" y="10" width="6" height="30" fill="url(#fWall)" stroke="#3a5f80" stroke-width=".5"/>
    <rect x="94" y="10" width="6" height="2.6" fill="#FFB84D" opacity=".85"/>
    ${moving?[...Array(3)].map((_,i)=>`<line x1="${cx-9-i*4}" y1="${30+i*2}" x2="${cx-14-i*4}" y2="${30+i*2}" stroke="#59b4ff" stroke-width="1" opacity="${0.5-i*0.14}"/>`).join(''):''}
    <ellipse cx="${cx}" cy="40.6" rx="8" ry="1.3" fill="#000" opacity=".22"/>
    <g transform="translate(${cx},28)">
      <rect x="-7" y="0" width="14" height="12" rx="2" fill="url(#fCrate)"/>
      <rect x="-7" y="0" width="14" height="3" rx="1.5" fill="#fff" opacity=".22"/>
      <line x1="-7" y1="4" x2="7" y2="4" stroke="#04321f" stroke-width=".4" opacity=".3"/>
      <line x1="-7" y1="8" x2="7" y2="8" stroke="#04321f" stroke-width=".4" opacity=".3"/>
      <rect x="-7" y="0" width="2" height="2" fill="#04321f" opacity=".35"/><rect x="5" y="0" width="2" height="2" fill="#04321f" opacity=".35"/>
      <rect x="-7" y="10" width="2" height="2" fill="#04321f" opacity=".35"/><rect x="5" y="10" width="2" height="2" fill="#04321f" opacity=".35"/>
      <text x="0" y="9" text-anchor="middle" font-size="4" font-family="Montserrat" font-weight="700" fill="#04321f">${fsim.m}kg</text>
    ${fsim.F>0?`<line x1="7" y1="6" x2="${7+Math.min(fsim.F/2,22)}" y2="6" stroke="#2D9CFF" stroke-width="2" marker-end="url(#fa)"/>`:''}
    ${fsim.fric>0?`<line x1="-7" y1="10" x2="${-7-Math.min(fsim.fric/2,18)}" y2="10" stroke="#E63946" stroke-width="1.6" marker-end="url(#fb)"/>`:''}</g>
    <text x="4" y="48" fill="#8aa0bd" font-size="3">blue = push · red = friction</text></svg>`;
}
function runForces(){
  clearReveal('#forceRead');challengeReset('foCh',`Tune the sliders to accelerate the crate at exactly <b>${forceTarget.toFixed(1)} m/s²</b>, then apply the force.`);
  fsim.solved=false;fsim.x=10;fsim.v=0;drawForce();const net=fsim.F-fsim.fric;
  if(net<=0){SFX.wrong();shakeEl(document.getElementById('forceView'));hostSay('foHost','Whoa — friction is winning! Your push has to beat friction or the crate just sits there. Add force!');toast('Applied force ≤ friction — the crate won\'t move.','warning');return;}
  const a=net/fsim.m;SFX.pop();hostSay('foHost','Force applied — here it goes!');
  loop('forceView',dt=>{
    fsim.v+=a*dt;fsim.x+=fsim.v*dt*4;
    if(fsim.x>90){fsim.x=90;fsim.v=0;stopAnim();drawForce();forceRead();
      const stage=document.getElementById('forceView');shakeEl(stage);sparkBurst(stage,['#FFB84D','#E63946','#fff']);
      if(Math.abs(a-forceTarget)<0.05){SFX.reward();fsim.solved=true;stageFlash(stage);
        challengeWin('foCh',`Hit ${forceTarget.toFixed(1)} m/s² exactly — that's F = m·a mastery.`);awardLabChallenge('forces');
        hostSay('foHost',`YES! ${net} N on ${fsim.m} kg gives exactly ${a.toFixed(1)} m/s². You just DID Newton\'s second law.`);
        const old=document.querySelector('#forceRead + .reveal');if(old)old.remove();
        document.getElementById('forceRead').insertAdjacentHTML('afterend',revealBlock('Target acceleration hit!',`Net force ${net} N ÷ mass ${fsim.m} kg = <b>${a.toFixed(1)} m/s²</b>. Want more acceleration? Add force or shed mass — same law, every time.`));
      } else {SFX.right();hostSay('foHost',`Crate hit the wall at ${a.toFixed(1)} m/s² — but the target was ${forceTarget.toFixed(1)}. Retune and run it back!`);}
      return;}
    drawForce();forceRead();
  });
}

/* ============================================================
   ENERGY PENDULUM (KE ↔ PE)
   ============================================================ */
let pend={A:0.9,ang:0.9,t:0,keFrac:0,best:0,solved:false};
function initEnergy(mountId){
  pend={A:52*Math.PI/180,ang:0,t:0,keFrac:0,best:0,solved:false};
  pend.ang=pend.A;
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('enHost','Energy never vanishes — it just changes costume. Green at the top is stored (potential); blue at the bottom is motion (kinetic). Your challenge: hit CATCH at the very bottom, where it\'s ALL kinetic.')}
  ${howto('Drag the <b>Starting swing</b> slider to set the release angle, then watch the energy bars. Press <b>Catch!</b> the instant the bob passes the bottom.')}
  ${challengeBlock('enCh','Tap Catch when kinetic energy reads 100% (bob at the bottom).')}
  <div class="sim-grid">
    <div class="sim-stage" id="pendView" style="aspect-ratio:1.3"></div>
    <div>
      ${slider('pA','Starting swing',20,80,52,1,'pend.A=this.value*Math.PI/180;pend.ang=pend.A;pend.t=0;document.getElementById("pAv").textContent=this.value+"°"','°')}
      <div class="readout" id="pendRead"></div>
      <button class="btn btn-green mt" style="width:100%" onclick="catchPend()">${icon('target')} Catch!</button>
      <p class="tiny mt">The total (green + blue) never changes — energy is conserved.</p>
    </div></div>`;
  loop('pendView',dt=>{pend.t+=dt;pend.ang=pend.A*Math.cos(pend.t*2.2);drawPend();});
}
function catchPend(){
  challengeReset('enCh','Tap Catch when kinetic energy reads 100% (bob at the bottom).');
  const ke=Math.round(pend.keFrac*100);pend.best=Math.max(pend.best,ke);
  const stage=document.getElementById('pendView');
  if(ke>=97){SFX.reward();pend.solved=true;labCelebrate(stage,'enHost','PERFECT catch! Bottom of the swing — 100% kinetic. That\'s peak speed, right there.');
    challengeWin('enCh','Caught it at full kinetic energy. Beautiful timing.');awardLabChallenge('energy');
  } else if(ke>=75){SFX.right();hostSay('enHost',`So close — ${ke}% kinetic. A hair early or late. Try again at the very bottom!`);
  } else {SFX.wrong();shakeEl(stage);hostSay('enHost',`Only ${ke}% kinetic there — that\'s mostly stored energy near the top. Wait for the bottom of the arc!`);}
}
function drawPend(){
  const L=60,ox=50,oy=12;const x=ox+Math.sin(pend.ang)*L,y=oy+Math.cos(pend.ang)*L;
  const hmax=(1-Math.cos(pend.A))||1;
  const peFrac=Math.min(Math.max((1-Math.cos(pend.ang))/hmax,0),1);const keFrac=1-peFrac;pend.keFrac=keFrac;
  const r=Math.round(110+(45-110)*keFrac),g=Math.round(235+(156-235)*keFrac),b=Math.round(131+(255-131)*keFrac);
  const glow=(2+keFrac*7).toFixed(1);
  document.getElementById('pendView').innerHTML=`<svg viewBox="0 0 100 90" style="width:100%;height:100%">
    <defs>
      <linearGradient id="pMount" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7396"/><stop offset="1" stop-color="#2c3f58"/></linearGradient>
      <radialGradient id="pBob" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="rgb(${Math.min(255,r+80)},${Math.min(255,g+50)},${Math.min(255,b+50)})"/><stop offset="1" stop-color="rgb(${r},${g},${b})"/></radialGradient>
    </defs>
    <path d="M${ox-Math.sin(pend.A)*L} ${oy+Math.cos(pend.A)*L} A${L} ${L} 0 0 1 ${ox+Math.sin(pend.A)*L} ${oy+Math.cos(pend.A)*L}" fill="none" stroke="#2EC4B6" stroke-width=".5" stroke-dasharray="1.5 2" opacity=".5"/>
    <rect x="26" y="9" width="48" height="4" rx="1.5" fill="url(#pMount)"/>
    <circle cx="32" cy="11" r="1.3" fill="#8fa3c2"/><circle cx="68" cy="11" r="1.3" fill="#8fa3c2"/>
    <line x1="${ox}" y1="${oy}" x2="${x}" y2="${y}" stroke="#eaf2ff" stroke-width="1"/>
    <circle cx="${x}" cy="${y}" r="6.5" fill="url(#pBob)" style="filter:drop-shadow(0 0 ${glow}px rgb(${r},${g},${b}))"/>
    <ellipse cx="${x-2.1}" cy="${y-2.4}" rx="2" ry="1.2" fill="#fff" opacity=".55"/></svg>`;
  document.getElementById('pendRead').innerHTML=`
    <div class="row"><span>Potential energy</span><b style="color:#6EEB83">${Math.round(peFrac*100)}%</b></div>
    <div style="height:9px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;margin:3px 0 8px"><i style="display:block;height:100%;width:${peFrac*100}%;background:#6EEB83"></i></div>
    <div class="row"><span>Kinetic energy</span><b style="color:#2D9CFF">${Math.round(keFrac*100)}%</b></div>
    <div style="height:9px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;margin:3px 0 8px"><i style="display:block;height:100%;width:${keFrac*100}%;background:#2D9CFF"></i></div>
    <div class="row"><span>Total energy</span><b style="color:#FFB84D">100% (constant)</b></div>
    <div class="row"><span>Best catch</span><b style="color:#6EEB83">${pend.best}% KE</b></div>`;
}

/* ============================================================
   COLLISION LAB (momentum conservation)
   ============================================================ */
let col={m1:3,m2:2,v1:6,v2:-3,x1:22,x2:74,running:false,done:false,v2post:null};
function initCollision(mountId){
  col={m1:3,m2:2,v1:6,v2:-3,x1:22,x2:74,running:false,done:false,v2post:null};
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('coHost','Momentum is mass in motion — and in a crash it can be transferred but never destroyed. Your challenge: tune the carts so the collision brings the RED cart to a dead stop.')}
  ${howto('Drag <b>Blue mass</b>, <b>Red mass</b> and <b>Blue velocity</b> (the arrows show momentum), then press <b>Collide</b> and watch what each cart does.')}
  ${challengeBlock('coCh','Set the masses and blue\'s speed so the red cart is (nearly) motionless after impact.')}
  <div class="sim-grid">
    <div class="sim-stage" id="colView" style="aspect-ratio:16/7"></div>
    <div>
      ${slider('c1','Blue mass',1,6,3,1,'col.m1=+this.value;document.getElementById("c1v").textContent=this.value+" kg";colRead();drawCol()',' kg')}
      ${slider('c2','Red mass',1,6,2,1,'col.m2=+this.value;document.getElementById("c2v").textContent=this.value+" kg";colRead();drawCol()',' kg')}
      ${slider('cv1','Blue velocity',0,10,6,1,'col.v1=+this.value;document.getElementById("cv1v").textContent=this.value+" m/s";colRead();drawCol()',' m/s')}
      <div class="readout" id="colRead"></div>
      <button class="btn btn-green mt" style="width:100%" onclick="runCollision()">${icon('ball')} Collide</button>
      <button class="btn btn-ghost mt" style="width:100%" onclick="initCollision('${mountId}')">${icon('refresh')} Reset carts</button>
    </div></div>`;
  drawCol();colRead();
}
function totalP(){return col.m1*col.v1+col.m2*col.v2;}
function colRead(){
  document.getElementById('colRead').innerHTML=`<div class="row"><span>Blue momentum</span><b style="color:#2D9CFF">${(col.m1*col.v1).toFixed(0)} kg·m/s</b></div><div class="row"><span>Red momentum</span><b style="color:#E63946">${(col.m2*col.v2).toFixed(0)} kg·m/s</b></div><div class="row"><span>Total momentum</span><b style="color:#6EEB83">${totalP().toFixed(0)} kg·m/s</b></div>`;
}
function pArrow(cx,cy,p,color){
  if(Math.abs(p)<0.5)return '';const len=Math.min(Math.abs(p)*1.4,20)*Math.sign(p);
  const id='pm'+Math.round(cx)+color.replace('#','');
  return `<line x1="${cx}" y1="${cy}" x2="${cx+len}" y2="${cy}" stroke="${color}" stroke-width="1.6" marker-end="url(#${id})"/><defs><marker id="${id}" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="${color}"/></marker></defs>`;
}
function drawCol(){
  const r1=4+col.m1,r2=4+col.m2;
  document.getElementById('colView').innerHTML=`<svg viewBox="0 0 100 44" style="width:100%;height:100%">
    <defs>
      <radialGradient id="colBlue" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#a9dbff"/><stop offset="1" stop-color="#1668b8"/></radialGradient>
      <radialGradient id="colRed" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb3ba"/><stop offset="1" stop-color="#a3232d"/></radialGradient>
    </defs>
    <line x1="2" y1="34" x2="98" y2="34" stroke="#2EC4B6" stroke-width="1"/>
    ${pArrow(col.x1,34-r1*2-3,col.m1*col.v1,'#2D9CFF')}
    ${pArrow(col.x2,34-r2*2-3,col.m2*col.v2,'#E63946')}
    <ellipse cx="${col.x1}" cy="35.3" rx="${r1*0.85}" ry="1.2" fill="#000" opacity=".22"/>
    <ellipse cx="${col.x2}" cy="35.3" rx="${r2*0.85}" ry="1.2" fill="#000" opacity=".22"/>
    <circle cx="${col.x1}" cy="${34-r1}" r="${r1}" fill="url(#colBlue)"/><text x="${col.x1}" y="${35-r1}" text-anchor="middle" font-size="3.4" fill="#04223f" font-weight="700">${col.m1}</text>
    <circle cx="${col.x2}" cy="${34-r2}" r="${r2}" fill="url(#colRed)"/><text x="${col.x2}" y="${35-r2}" text-anchor="middle" font-size="3.4" fill="#fff" font-weight="700">${col.m2}</text></svg>`;
}
function runCollision(){
  if(col.running)return;
  clearReveal('#colRead');challengeReset('coCh','Set the masses and blue\'s speed so the red cart is (nearly) motionless after impact.');
  const cv=document.getElementById('cv1');if(cv)col.v1=+cv.value;   // restore blue speed from slider (physics mutates col.v1)
  col.x1=22;col.x2=74;col.v2=-3;col.done=false;col.v2post=null;col.running=true;
  drawCol();colRead();SFX.pop();hostSay('coHost','Here comes the impact...');
  loop('colView',dt=>{
    col.x1+=col.v1*dt*3;col.x2+=col.v2*dt*3;
    const r1=4+col.m1,r2=4+col.m2;
    if(!col.done && col.x2-col.x1<=r1+r2 && col.v1>col.v2){
      const m1=col.m1,m2=col.m2,u1=col.v1,u2=col.v2;
      col.v1=((m1-m2)*u1+2*m2*u2)/(m1+m2);
      col.v2=((m2-m1)*u2+2*m1*u1)/(m1+m2);
      col.done=true;col.v2post=col.v2;SFX.right();colRead();
      const stage=document.getElementById('colView');shakeEl(stage);sparkBurst(stage,['#E63946','#2D9CFF','#fff']);
    }
    if(col.x1<4||col.x2>96||col.x1>96||col.x2<4){stopAnim();col.running=false;
      if(col.done){const stage=document.getElementById('colView');
        const old=document.querySelector('#colRead + .reveal');if(old)old.remove();
        document.getElementById('colRead').insertAdjacentHTML('afterend',revealBlock('Momentum conserved!',`Total momentum stayed <b>${totalP().toFixed(0)} kg·m/s</b> through the whole crash. It just got shared between the carts.`));
        if(Math.abs(col.v2post)<0.5){labCelebrate(stage,'coHost','THERE it is — red cart stopped cold! Blue handed off almost all its momentum. Gorgeous physics.');
          challengeWin('coCh','Red cart brought to a near dead stop. Momentum, transferred.');awardLabChallenge('collision');
        } else {hostSay('coHost',`Red is still rolling at ${col.v2post.toFixed(1)} m/s. Adjust the masses or blue\'s speed to stop it cold!`);}
      }
      return;}
    drawCol();
  });
}

/* ============================================================
   WAVE STUDIO
   ============================================================ */
let wave={A:22,f:1.2,wl:30,phase:0,tA:30,tf:2,twl:22,solved:false,matched:false};
function newWaveTarget(){
  wave.tA=10+Math.floor(Math.random()*15)*2;      // 10..38
  wave.tf=Math.round((0.6+Math.random()*2)*10)/10; // 0.6..2.6
  wave.twl=16+Math.floor(Math.random()*12)*2;      // 16..38
  wave.solved=false;wave.matched=false;
}
function initWaves(mountId){
  wave={A:22,f:1.2,wl:30,phase:0,tphase:0,tA:30,tf:2,twl:22,solved:false,matched:false};
  newWaveTarget();
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('waHost','See that faint ghost wave? That\'s the mystery signal. Match its amplitude, frequency and wavelength with your blue wave to lock it in.')}
  ${howto('Drag <b>Amplitude</b>, <b>Frequency</b> and <b>Wavelength</b> to reshape your blue wave until it lines up with the faint green ghost wave. Each readout shows your value / the target.')}
  ${challengeBlock('waCh',`Match the mystery wave: amplitude <b>${wave.tA}</b>, frequency <b>${wave.tf} Hz</b>, wavelength <b>${wave.twl}</b>.`)}
  <div class="sim-grid">
    <div class="sim-stage" id="waveView" style="aspect-ratio:16/7"></div>
    <div>
      ${slider('wA','Amplitude',5,40,22,1,'wave.A=+this.value;document.getElementById("wAv").textContent=this.value;waveHint()','')}
      ${slider('wF','Frequency',0.3,3,1.2,0.1,'wave.f=+this.value;document.getElementById("wFv").textContent=this.value+" Hz";waveHint()',' Hz')}
      ${slider('wL','Wavelength',12,50,30,1,'wave.wl=+this.value;document.getElementById("wLv").textContent=this.value;waveHint()','')}
      <div class="readout" id="waveRead"></div>
      <button class="btn btn-ghost mt" style="width:100%" onclick="newWaveTarget();initWaves('${mountId}')">${icon('refresh')} New mystery wave</button>
    </div></div>`;
  loop('waveView',dt=>{wave.phase+=dt*wave.f*3;wave.tphase+=dt*wave.tf*3;drawWave();});
}
function waveOff(){return {a:wave.A-wave.tA,f:+(wave.f-wave.tf).toFixed(2),w:wave.wl-wave.twl};}
function waveMatched(){const o=waveOff();return Math.abs(o.a)<=2&&Math.abs(o.f)<=0.15&&Math.abs(o.w)<=3;}
function waveHint(){
  if(wave.solved)return;const o=waveOff();
  let worst='a',mag=Math.abs(o.a)/2;
  if(Math.abs(o.f)/0.15>mag){worst='f';mag=Math.abs(o.f)/0.15;}
  if(Math.abs(o.w)/3>mag){worst='w';mag=Math.abs(o.w)/3;}
  if(waveMatched()){hostSay('waHost','Locked on — hold it right there!');return;}
  const name={a:'Amplitude',f:'Frequency',w:'Wavelength'}[worst];
  const dir=(worst==='a'?o.a:worst==='f'?o.f:o.w)>0?'a little too high':'a little too low';
  hostSay('waHost',`${name} is ${dir} — keep tuning.`);
}
function drawWave(){
  const cy=25,W=100;const match=waveMatched();
  let d='M0 '+cy,g='M0 '+cy;
  for(let x=0;x<=W;x+=2){
    const y=cy-(wave.A/2)*Math.sin((x/wave.wl)*Math.PI*2-wave.phase);d+=` L${x} ${y.toFixed(1)}`;
    const gy=cy-(wave.tA/2)*Math.sin((x/wave.twl)*Math.PI*2-wave.tphase);g+=` L${x} ${gy.toFixed(1)}`;
  }
  const cursorY=(cy-(wave.A/2)*Math.sin((W/wave.wl)*Math.PI*2-wave.phase)).toFixed(1);
  document.getElementById('waveView').innerHTML=`<svg viewBox="0 0 100 50" style="width:100%;height:100%">
    <defs><linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2D9CFF" stop-opacity=".4"/><stop offset="1" stop-color="#2D9CFF" stop-opacity="0"/></linearGradient></defs>
    <line x1="0" y1="${cy}" x2="100" y2="${cy}" stroke="#2EC4B6" stroke-width=".4" stroke-dasharray="2 2"/>
    <path d="${d} L${W} 50 L0 50 Z" fill="url(#waveFill)" opacity="${match?0.85:0.4}"/>
    <path d="${g}" fill="none" stroke="#6EEB83" stroke-width="2.4" opacity="${match?0.9:0.35}"/>
    <path d="${d}" fill="none" stroke="#2D9CFF" stroke-width="1.4" style="${match?'filter:drop-shadow(0 0 3px #2D9CFF)':''}"/>
    <circle cx="${W}" cy="${cursorY}" r="1.6" fill="#eaf2ff" style="${match?'filter:drop-shadow(0 0 3px #2D9CFF)':''}"/></svg>`;
  const speed=(wave.f*wave.wl/10).toFixed(1);
  document.getElementById('waveRead').innerHTML=`<div class="row"><span>Amplitude</span><b>${wave.A} <span style="color:#8aa0bd">/ ${wave.tA}</span></b></div><div class="row"><span>Frequency</span><b>${wave.f} <span style="color:#8aa0bd">/ ${wave.tf}</span> Hz</b></div><div class="row"><span>Wavelength</span><b>${wave.wl} <span style="color:#8aa0bd">/ ${wave.twl}</span></b></div><div class="row"><span>Speed (v = f × λ)</span><b style="color:#6EEB83">${speed} units/s</b></div>`;
  if(match&&!wave.solved){wave.solved=true;const stage=document.getElementById('waveView');
    labCelebrate(stage,'waHost','MATCH! Your wave locked onto the mystery signal. That\'s the whole language of waves right there.');
    challengeWin('waCh','Mystery wave matched — amplitude, frequency and wavelength all dialed in.');awardLabChallenge('waves');}
  else if(!match&&wave.solved){wave.solved=false;challengeReset('waCh',`Match the mystery wave: amplitude <b>${wave.tA}</b>, frequency <b>${wave.tf} Hz</b>, wavelength <b>${wave.twl}</b>.`);}
  wave.matched=match;
}

/* ============================================================
   LIGHT & COLOR LAB (reflection + additive mixing)
   ============================================================ */
let optic={ang:35,r:true,g:true,b:false,tAng:55,tColor:'255,255,0',tColorName:'Yellow',aimSolved:false,colSolved:false};
const OPTIC_COLORS=[['Yellow','255,255,0','Red + Green'],['Cyan','0,255,255','Green + Blue'],['Magenta','255,0,255','Red + Blue'],['White','255,255,255','all three']];
function newOpticTargets(){optic.tAng=15+Math.floor(Math.random()*11)*5;const c=pick(OPTIC_COLORS);optic.tColorName=c[0];optic.tColor=c[1];optic.tColorHint=c[2];optic.aimSolved=false;optic.colSolved=false;}
function initOptics(mountId){
  optic={ang:35,r:true,g:true,b:false,tAng:55,tColor:'255,255,0',tColorName:'Yellow',tColorHint:'Red + Green',aimSolved:false,colSolved:false};
  newOpticTargets();
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('opHost','Two experiments here. First, aim the reflected beam through the orange ring — remember, angle in equals angle out. Then mix the beams of light to hit the target color.')}
  ${howto('Drag the <b>Angle of incidence</b> slider so the green reflected beam passes through the ring. Then click the <b>Red</b>, <b>Green</b> and <b>Blue</b> buttons to mix light into the target color.')}
  ${challengeBlock('opCh',`Aim the reflected beam through the ring at <b>${optic.tAng}°</b>, then mix light to make <b>${optic.tColorName}</b>.`)}
  <div class="sim-grid">
    <div class="sim-stage" id="opticView" style="aspect-ratio:16/9"></div>
    <div>
      ${slider('oA','Angle of incidence',5,80,35,1,'optic.ang=+this.value;document.getElementById("oAv").textContent=this.value+"°";drawOptic()','°')}
      <div class="readout" id="opticRead"></div>
      <p class="tiny" style="margin:12px 0 4px;color:#b9cbe6">Additive light mixing — toggle the beams to make ${optic.tColorName}:</p>
      <div class="flex">
        <button class="btn" id="btnR" style="background:#E63946;color:#fff" onclick="optic.r=!optic.r;drawOptic()">Red</button>
        <button class="btn" id="btnG" style="background:#6EEB83;color:#04321f" onclick="optic.g=!optic.g;drawOptic()">Green</button>
        <button class="btn" id="btnB" style="background:#2D9CFF;color:#04223f" onclick="optic.b=!optic.b;drawOptic()">Blue</button>
      </div>
      <div id="mixResult" class="mt"></div>
      <button class="btn btn-ghost mt" style="width:100%" onclick="newOpticTargets();initOptics('${mountId}')">${icon('refresh')} New targets</button>
    </div></div>`;
  drawOptic();
}
function drawOptic(){
  const a=optic.ang*Math.PI/180;const cx=50,cy=68,len=54;
  const inX=cx-Math.sin(a)*len,inY=cy-Math.cos(a)*len;
  const outX=cx+Math.sin(a)*len,outY=cy-Math.cos(a)*len;
  const ta=optic.tAng*Math.PI/180;const rx=cx+Math.sin(ta)*len,ry=cy-Math.cos(ta)*len;
  const aimHit=Math.abs(optic.ang-optic.tAng)<=2;
  document.getElementById('opticView').innerHTML=`<svg viewBox="0 0 100 74" style="width:100%;height:100%">
    <defs>
      <linearGradient id="oFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6485"/><stop offset="1" stop-color="#1c3049"/></linearGradient>
      <marker id="oa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#FFB84D"/></marker>
      <marker id="ob" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="${aimHit?'#6EEB83':'#59b4ff'}"/></marker>
    </defs>
    <rect x="6" y="68" width="88" height="4" rx="1" fill="url(#oFloor)"/>
    ${[...Array(9)].map((_,i)=>`<circle cx="${10+i*10}" cy="70" r=".55" fill="#0c2b4d"/>`).join('')}
    <line x1="${cx}" y1="14" x2="${cx}" y2="68" stroke="#3a5f80" stroke-width=".5" stroke-dasharray="2 2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="2.6" ry="1" fill="#fff" opacity=".3"/>
    <circle cx="${rx}" cy="${ry}" r="4.5" class="${aimHit?'':'pulse-ring'}" fill="none" stroke="${aimHit?'#6EEB83':'#FFB84D'}" stroke-width="1.4" ${aimHit?'':'stroke-dasharray="2 1.5"'}/>
    <circle cx="${rx}" cy="${ry}" r="1.4" fill="${aimHit?'#6EEB83':'#FFB84D'}" opacity="${aimHit?1:.5}"/>
    <line x1="${inX}" y1="${inY}" x2="${cx}" y2="${cy}" stroke="#FFB84D" stroke-width="1.6" marker-end="url(#oa)"/>
    <line x1="${cx}" y1="${cy}" x2="${outX}" y2="${outY}" stroke="${aimHit?'#6EEB83':'#59b4ff'}" stroke-width="1.8" marker-end="url(#ob)" style="${aimHit?'filter:drop-shadow(0 0 3px #6EEB83)':''}"/>
    <path d="M${cx} ${cy-14} A14 14 0 0 0 ${cx-Math.sin(a)*14} ${cy-Math.cos(a)*14}" fill="none" stroke="#FFB84D" stroke-width=".5"/>
    <text x="8" y="12" fill="#8aa0bd" font-size="3.4">dashed line = normal · aim through the ring</text></svg>`;
  document.getElementById('opticRead').innerHTML=`<div class="row"><span>Angle of incidence</span><b style="color:#FFB84D">${optic.ang}°</b></div><div class="row"><span>Angle of reflection</span><b style="color:#6EEB83">${optic.ang}°</b></div><div class="row"><span>Target ring</span><b style="color:${aimHit?'#6EEB83':'#FFB84D'}">${optic.tAng}°</b></div>`;
  // additive mixing
  const r=optic.r?255:0,g=optic.g?255:0,b=optic.b?255:0;
  const names={'0,0,0':'Black (no light)','255,0,0':'Red','0,255,0':'Green','0,0,255':'Blue','255,255,0':'Yellow','255,0,255':'Magenta','0,255,255':'Cyan','255,255,255':'White'};
  const key=`${r},${g},${b}`;const colHit=(key===optic.tColor);
  document.getElementById('btnR').style.opacity=optic.r?1:.4;
  document.getElementById('btnG').style.opacity=optic.g?1:.4;
  document.getElementById('btnB').style.opacity=optic.b?1:.4;
  document.getElementById('mixResult').innerHTML=`<div class="flex"><div style="width:52px;height:52px;border-radius:12px;background:rgb(${r},${g},${b});border:1px solid var(--line)"></div><div><b style="color:#fff">${names[key]||'Mixed light'}</b><div class="tiny">Target: ${optic.tColorName} (${optic.tColorHint})</div></div></div>`;
  const stage=document.getElementById('opticView');
  if(aimHit&&!optic.aimSolved){optic.aimSolved=true;SFX.right();sparkBurst(stage,['#6EEB83','#FFB84D']);hostSay('opHost',`Bullseye! Angle in = angle out = ${optic.ang}°. Now mix the light to make ${optic.tColorName}.`);}
  if(colHit&&!optic.colSolved){optic.colSolved=true;SFX.right();sparkBurst(document.getElementById('mixResult'),['#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1),'#fff']);hostSay('opHost',`${optic.tColorName}! ${optic.tColorHint} — that\'s additive color mixing, exactly how your screen works.`);}
  if(optic.aimSolved&&optic.colSolved&&!optic.bothDone){optic.bothDone=true;stageFlash(stage);SFX.reward();
    challengeWin('opCh','Beam aimed AND color mixed — you\'ve got reflection and light down.');awardLabChallenge('optics');}
}

/* ============================================================
   CIRCUIT BUILDER (Ohm's law V = I × R)
   ============================================================ */
let circ={V:12,R:4,solved:false};
let circTarget=3;
function newCircTarget(){circTarget=[1,1.5,2,2.5,3,4][Math.floor(Math.random()*6)];}
function initCircuit(mountId){
  circ={V:12,R:4,solved:false};
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('ciHost','Ohm\'s law is the golden rule of circuits: current equals voltage divided by resistance. Think of voltage as pressure and resistance as a narrow pipe. Dial in the target current and watch that bulb blaze!')}
  ${howto('Drag the <b>Battery voltage</b> and <b>Resistance</b> sliders. Current (I = V ÷ R), power, and the bulb\'s brightness all update live as you go.')}
  ${challengeBlock('ciCh',`Set voltage and resistance so the current reads exactly <b>${circTarget.toFixed(1)} A</b>.`)}
  <div class="sim-grid">
    <div class="sim-stage" id="circView" style="aspect-ratio:16/9"></div>
    <div>
      ${slider('cV','Battery voltage',1,24,12,1,'circ.V=+this.value;document.getElementById("cVv").textContent=this.value+" V";drawCirc()',' V')}
      ${slider('cR','Resistance',1,12,4,1,'circ.R=+this.value;document.getElementById("cRv").textContent=this.value+" Ω";drawCirc()',' Ω')}
      <div class="readout" id="circRead"></div>
      <button class="btn btn-ghost mt" style="width:100%" onclick="newCircTarget();initCircuit('${mountId}')">${icon('refresh')} New target</button>
    </div></div>`;
  drawCirc();
}
function drawCirc(){
  const I=circ.V/circ.R;const bright=Math.min(I/6,1);const hit=Math.abs(I-circTarget)<0.05;
  const ringCol=hit?'#6EEB83':'#3a5f80';
  document.getElementById('circView').innerHTML=`<svg viewBox="0 0 100 56" style="width:100%;height:100%">
    <defs>
      <linearGradient id="ciBatt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a5f80"/><stop offset="1" stop-color="#12233b"/></linearGradient>
      <radialGradient id="ciBulb" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff7e0"/><stop offset="1" stop-color="#FFB84D"/></radialGradient>
    </defs>
    <rect x="16" y="12" width="68" height="34" rx="4" fill="none" stroke="${ringCol}" stroke-width="1.6" style="${hit?'filter:drop-shadow(0 0 4px #6EEB83)':''}"/>
    <rect x="9" y="23" width="13" height="12" rx="1.5" fill="url(#ciBatt)" stroke="#0c2b4d" stroke-width=".4"/>
    <line x1="14" y1="21" x2="14" y2="37" stroke="#FFB84D" stroke-width="1.6"/><line x1="18" y1="25" x2="18" y2="33" stroke="#FFB84D" stroke-width="3"/>
    <text x="15.5" y="20.5" text-anchor="middle" font-size="3.2" fill="#8aa0bd">+</text><text x="15.5" y="43" text-anchor="middle" font-size="3.2" fill="#8aa0bd">−</text>
    <path d="M44 45 l2.5 -3 l3 6 l3 -6 l3 6 l2.5 -3" fill="none" stroke="#cfae6b" stroke-width="1.6" stroke-linejoin="round"/>
    <text x="51" y="53" text-anchor="middle" font-size="3.4" fill="#b9cbe6">${circ.R}Ω</text>
    ${bright>0.15?`<circle cx="72" cy="12" r="${9+bright*4}" fill="rgba(255,184,77,${bright*0.28})"/>`:''}
    <circle cx="72" cy="12" r="6" fill="url(#ciBulb)" opacity="${0.2+bright*0.8}" style="filter:drop-shadow(0 0 ${bright*9}px #FFB84D)"/>
    <path d="M69 12h6M72 9v6" stroke="#081B33" stroke-width=".8"/>
    <ellipse cx="70.4" cy="9.8" rx="1.3" ry=".8" fill="#fff" opacity=".5"/>
    <rect x="70.4" y="16.4" width="3.2" height="1.7" fill="#8aa0bd"/>
    ${I>0?`<circle r="1.2" fill="#2D9CFF" style="filter:drop-shadow(0 0 2px #2D9CFF)"><animateMotion dur="${Math.max(0.5,3/I).toFixed(2)}s" repeatCount="indefinite" path="M16 46 L16 12 L84 12 L84 46 Z"/></circle>`:''}
  </svg>`;
  const P=circ.V*I;
  document.getElementById('circRead').innerHTML=`<div class="row"><span>Voltage (V)</span><b>${circ.V} V</b></div><div class="row"><span>Resistance (R)</span><b>${circ.R} Ω</b></div><div class="row"><span>Current (I = V ÷ R)</span><b style="color:${hit?'#6EEB83':'#FFB84D'}">${I.toFixed(2)} A</b></div><div class="row"><span>Target current</span><b style="color:${hit?'#6EEB83':'#FFB84D'}">${circTarget.toFixed(1)} A</b></div>`;
  if(hit&&!circ.solved){circ.solved=true;const stage=document.getElementById('circView');
    labCelebrate(stage,'ciHost',`LIGHTS ON! ${circ.V} V ÷ ${circ.R} Ω = exactly ${I.toFixed(1)} A. That\'s Ohm\'s law, glowing right in front of you.`);
    challengeWin('ciCh',`Dialed in ${circTarget.toFixed(1)} A — ${circ.V} V ÷ ${circ.R} Ω. Ohm would be proud.`);awardLabChallenge('circuit');
    const old=document.querySelector('#circRead + .reveal');if(old)old.remove();
    document.getElementById('circRead').insertAdjacentHTML('afterend',revealBlock('Current locked in!',`Notice there are many ways to the same current — double the voltage AND double the resistance and I stays put. That\'s the balance in I = V ÷ R.`));
  } else if(!hit&&circ.solved){circ.solved=false;clearReveal('#circRead');challengeReset('ciCh',`Set voltage and resistance so the current reads exactly <b>${circTarget.toFixed(1)} A</b>.`);}
}

/* ============================================================
   THERMODYNAMICS (thermal equilibrium)
   ============================================================ */
let therm={a:80,b:20,curA:80,curB:20,running:false,elapsed:0,dur:2.2};
function initThermo(mountId){
  therm={a:80,b:20,curA:80,curB:20,running:false,elapsed:0,dur:2.2};
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('thHost','Heat always flows one way: hot to cold. Set two starting temperatures, then let them touch and watch heat move until they match.')}
  ${howto('Drag the two temperature sliders, then press <b>Let heat flow</b> to watch the blocks reach thermal equilibrium.')}
  <div class="sim-grid">
    <div class="sim-stage" id="thermoView" style="aspect-ratio:16/7"></div>
    <div>
      ${slider('thA','Block A start temp',0,100,80,1,'therm.a=+this.value;document.getElementById("thAv").textContent=this.value+"°C";thermoReset()','°C')}
      ${slider('thB','Block B start temp',0,100,20,1,'therm.b=+this.value;document.getElementById("thBv").textContent=this.value+"°C";thermoReset()','°C')}
      <div class="readout" id="thermoRead"></div>
      <button class="btn btn-green mt" style="width:100%" onclick="runThermo()">${icon('flame')} Let heat flow</button>
    </div></div>`;
  thermoReset();
}
function tempColor(t){
  const k=Math.max(0,Math.min(1,t/100));
  const r=Math.round(45+(230-45)*k),g=Math.round(156+(57-156)*k),b=Math.round(255+(70-255)*k);
  return `rgb(${r},${g},${b})`;
}
function thermoReset(){stopAnim();therm.running=false;therm.curA=therm.a;therm.curB=therm.b;drawThermo();}
function thermoRead(){
  const eq=((therm.a+therm.b)/2).toFixed(1);
  document.getElementById('thermoRead').innerHTML=`<div class="row"><span>Block A</span><b style="color:${tempColor(therm.curA)}">${therm.curA.toFixed(1)}°C</b></div><div class="row"><span>Block B</span><b style="color:${tempColor(therm.curB)}">${therm.curB.toFixed(1)}°C</b></div><div class="row"><span>Equilibrium temp (average)</span><b style="color:#6EEB83">${eq}°C</b></div>`;
}
function drawThermo(){
  const cA=tempColor(therm.curA),cB=tempColor(therm.curB);
  const flow=therm.running&&Math.abs(therm.curA-therm.curB)>1;
  document.getElementById('thermoView').innerHTML=`<svg viewBox="0 0 100 44" style="width:100%;height:100%">
    <defs>
      <linearGradient id="thAg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cA}"/><stop offset="1" stop-color="${cA}" stop-opacity=".55"/></linearGradient>
      <linearGradient id="thBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cB}"/><stop offset="1" stop-color="${cB}" stop-opacity=".55"/></linearGradient>
      <marker id="thArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0l6 3-6 3z" fill="#FFB84D"/></marker>
    </defs>
    <line x1="4" y1="36" x2="96" y2="36" stroke="#2EC4B6" stroke-width="1"/>
    <ellipse cx="28" cy="37" rx="14" ry="1.6" fill="#000" opacity=".22"/><ellipse cx="72" cy="37" rx="14" ry="1.6" fill="#000" opacity=".22"/>
    <rect x="14" y="12" width="28" height="24" rx="4" fill="url(#thAg)"/>
    <rect x="58" y="12" width="28" height="24" rx="4" fill="url(#thBg)"/>
    <text x="28" y="27" text-anchor="middle" font-size="5" font-family="Montserrat" font-weight="700" fill="#04223f">${therm.curA.toFixed(0)}°</text>
    <text x="72" y="27" text-anchor="middle" font-size="5" font-family="Montserrat" font-weight="700" fill="#04223f">${therm.curB.toFixed(0)}°</text>
    ${flow?`<path d="M44 24h10" stroke="#FFB84D" stroke-width="2" stroke-dasharray="2 2" marker-end="url(#thArrow)"><animate attributeName="stroke-dashoffset" from="8" to="0" dur=".5s" repeatCount="indefinite"/></path>`:''}
  </svg>`;
  thermoRead();
}
function runThermo(){
  if(therm.running)return;
  therm.curA=therm.a;therm.curB=therm.b;therm.elapsed=0;therm.running=true;SFX.pop();
  hostSay('thHost','Heat is moving from the hotter block to the cooler one...');
  const a0=therm.a,b0=therm.b,eq=(a0+b0)/2;
  loop('thermoView',dt=>{
    therm.elapsed+=dt;const k=Math.min(therm.elapsed/therm.dur,1);
    therm.curA=a0+(eq-a0)*k;therm.curB=b0+(eq-b0)*k;
    if(k>=1){stopAnim();therm.running=false;
      const stage=document.getElementById('thermoView');
      labCelebrate(stage,'thHost',`Thermal equilibrium! Both blocks now sit at ${eq.toFixed(1)}°C — the total heat just redistributed evenly.`);
    }
    drawThermo();
  });
}

/* ============================================================
   ATOMIC / NUCLEAR — HALF-LIFE DECAY
   ============================================================ */
let atomic={n:0,total:24};
function initAtomic(mountId){
  atomic={n:0,total:24};
  document.getElementById(mountId).innerHTML=`
  ${hostBlock('atHost','Radioactive atoms are unstable — over time they decay. Every substance has its own half-life: the time for HALF of a sample to decay.')}
  ${howto('Drag the slider to fast-forward through half-lives and watch how many atoms remain stable (glowing) versus decayed (grey).')}
  <div class="sim-grid">
    <div class="sim-stage" id="atomicView" style="aspect-ratio:16/9"></div>
    <div>
      ${slider('atN','Half-lives elapsed',0,5,0,0.5,'atomic.n=+this.value;document.getElementById("atNv").textContent=this.value;drawAtomic()','')}
      <div class="readout" id="atomicRead"></div>
      <p class="tiny mt">In a real sample, WHICH atoms decay is random — this display just shows the count remaining.</p>
    </div></div>`;
  drawAtomic();
}
function drawAtomic(){
  const total=atomic.total;
  const remaining=Math.round(total*Math.pow(0.5,atomic.n));
  const cols=6,rows=Math.ceil(total/cols),cell=16;
  let dots='';
  for(let i=0;i<total;i++){
    const cx=(i%cols+0.5)*cell,cy=(Math.floor(i/cols)+0.5)*cell;
    dots+=i<remaining
      ?`<circle cx="${cx}" cy="${cy}" r="6" fill="#FFE066" style="filter:drop-shadow(0 0 3px #FFE066)"/>`
      :`<circle cx="${cx}" cy="${cy}" r="6" fill="#3a4f6b"/>`;
  }
  document.getElementById('atomicView').innerHTML=`<svg viewBox="0 0 ${cols*cell} ${rows*cell}" style="width:100%;height:100%">${dots}</svg>`;
  const pct=Math.round(remaining/total*100);
  document.getElementById('atomicRead').innerHTML=`<div class="row"><span>Formula</span><b>N = N₀ × (½)<sup>${atomic.n}</sup></b></div><div class="row"><span>Stable remaining</span><b style="color:#FFE066">${remaining} / ${total}</b></div><div class="row"><span>Percent remaining</span><b style="color:#6EEB83">${pct}%</b></div>`;
}

/* ============================================================
   ESCAPE ROOM (Mission 12)
   ============================================================ */
const ESCAPE_PUZZLES=[
  {q:'Lock 1 — Motion: A car travels 40 m in 8 s. What is its speed in m/s?',a:5,hint:'Speed = distance ÷ time = 40 ÷ 8.'},
  {q:'Lock 2 — Forces: A net force of 12 N acts on a 6 kg box. What is its acceleration in m/s²?',a:2,hint:'a = F ÷ m = 12 ÷ 6.'},
  {q:'Lock 3 — Momentum: A 5 kg cart moving at 4 m/s hits a stationary 5 kg cart and they stick together. What is their combined speed in m/s?',a:2,hint:'Momentum conserved: (5×4) ÷ (5+5) = 20 ÷ 10.'},
  {q:'Lock 4 — Thermodynamics: Two equal blocks touch — one at 80°C, one at 20°C. Ignoring losses, what final temperature (°C) do they reach?',a:50,hint:'They meet at the average: (80 + 20) ÷ 2.'},
  {q:'Lock 5 — Waves: A wave has frequency 3 Hz and wavelength 3 m. What is its speed in m/s?',a:9,hint:'v = f × λ = 3 × 3.'},
  {q:'Lock 6 — Optics: Light hits a mirror at 20° from the normal. At what angle does it reflect?',a:20,hint:'Law of reflection: angle in = angle out.'},
  {q:'Lock 7 — Circuits: A 12 V battery drives a 4 Ω resistor. What current flows, in amperes?',a:3,hint:'I = V ÷ R = 12 ÷ 4.'},
  {q:'Lock 8 — Atomic Physics: A radioactive sample has a half-life of 4 days. After 8 days (2 half-lives), what percent of it remains?',a:25,hint:'Each half-life cuts what\'s left in half: (½)².'}
];
let escapeSolved=[false,false,false,false];
function initEscape(mountId,free,mid){
  escapeSolved=[false,false,false,false];
  document.getElementById(mountId).innerHTML=`<div class="escape-stage"><div class="lock-dials" id="dials"></div><div id="escPuzzles"></div><div id="escDone" class="mt"></div></div>`;
  renderDials();renderEscapePuzzles(mid);
}
function renderDials(){
  document.getElementById('dials').innerHTML=ESCAPE_PUZZLES.map((p,i)=>`<div class="dial"><div class="win" id="dial-${i}">${escapeSolved[i]?p.a:'?'}</div><div class="tiny">Lock ${i+1}</div></div>`).join('');
}
function renderEscapePuzzles(mid){
  document.getElementById('escPuzzles').innerHTML=ESCAPE_PUZZLES.map((p,i)=>`
    <div class="glass" style="margin:12px 0;${escapeSolved[i]?'opacity:.6':''}">
      <b style="color:#fff">${p.q}</b>
      <div class="flex mt" ${escapeSolved[i]?'style="display:none"':''}>
        <input class="fill-in" id="esc-${i}" style="max-width:160px" placeholder="Answer" onkeydown="if(event.key==='Enter')solveEscape(${i},${mid||10})">
        <button class="btn btn-primary" onclick="solveEscape(${i},${mid||10})">Unlock</button></div>
      <div id="escfb-${i}" class="tiny" style="margin-top:6px">${escapeSolved[i]?`<span style="color:#6EEB83">${icon('check')} Unlocked!</span>`:''}</div>
    </div>`).join('');
}
function solveEscape(i,mid){
  const val=(document.getElementById('esc-'+i).value||'').trim();
  if(val&&answerMatches(val,[ESCAPE_PUZZLES[i].a])){escapeSolved[i]=true;SFX.right();renderDials();
    document.getElementById('dial-'+i).animate([{transform:'scale(1.4)'},{transform:'scale(1)'}],{duration:400});
    renderEscapePuzzles(mid);checkEscape(mid);}
  else{SFX.wrong();shakeEl(document.getElementById('esc-'+i));document.getElementById('escfb-'+i).innerHTML=`<span style="color:#FFB84D">${icon('bulb')} ${ESCAPE_PUZZLES[i].hint}</span>`;}
}
function checkEscape(mid){
  if(escapeSolved.every(Boolean)){SFX.unlock();confetti();
    const code=ESCAPE_PUZZLES.map(p=>p.a).join('-');
    document.getElementById('escDone').innerHTML=`<div class="callout tip" style="color:#eaf2ff"><b>${icon('unlock')} Master Lab Unlocked!</b> The code was <b style="font-size:1.3rem;letter-spacing:3px">${code}</b>. You solved every puzzle and completed your academy training!</div>
    <div class="center mt"><button class="btn btn-green btn-lg" onclick="completeEscapeMission(${mid||10})">Claim Mission Complete ✓</button></div>`;
    document.getElementById('escDone').scrollIntoView({behavior:'smooth'});}
}
function completeEscapeMission(mid){
  const m=mission(mid);const already=S.completed[mid];
  S.stars[mid]=3;S.scores[mid]=100;S.xp+=already?Math.round(m.xp*0.25):m.xp;S.completed[mid]=true;save();
  showMissionComplete(m,3,already?Math.round(m.xp*0.25):m.xp,syncBadges());
}
/* ===GAMES=== */

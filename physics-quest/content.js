/* ============================================================
   SVG ART LIBRARY (physics illustrations)
   ============================================================ */
const ART={
lab:`<svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a2b52"/><stop offset="1" stop-color="#081B33"/></linearGradient><radialGradient id="glow" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#2D9CFF" stop-opacity=".5"/><stop offset="1" stop-color="#2D9CFF" stop-opacity="0"/></radialGradient></defs><rect width="600" height="300" fill="url(#sky)"/><rect width="600" height="300" fill="url(#glow)"/><g opacity=".2" stroke="#2EC4B6"><line x1="0" y1="80" x2="600" y2="80"/><line x1="0" y1="160" x2="600" y2="160"/><line x1="0" y1="240" x2="600" y2="240"/><line x1="150" y1="0" x2="150" y2="300"/><line x1="450" y1="0" x2="450" y2="300"/></g><path d="M40 250 Q160 90 300 150 T560 70" fill="none" stroke="#6EEB83" stroke-width="3" opacity=".8"/><circle cx="300" cy="150" r="7" fill="#FFB84D"/><g transform="translate(80,120)"><ellipse cx="0" cy="0" rx="44" ry="16" fill="none" stroke="#2D9CFF" stroke-width="2"/><ellipse cx="0" cy="0" rx="44" ry="16" fill="none" stroke="#2EC4B6" stroke-width="2" transform="rotate(60)"/><ellipse cx="0" cy="0" rx="44" ry="16" fill="none" stroke="#6EEB83" stroke-width="2" transform="rotate(120)"/><circle cx="0" cy="0" r="6" fill="#FFB84D"/></g><g transform="translate(470,210)" stroke="#FFB84D" stroke-width="3" fill="none"><line x1="0" y1="0" x2="60" y2="0" marker-end="url(#a)"/><line x1="0" y1="0" x2="0" y2="-46"/></g><defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#FFB84D"/></marker></defs></svg>`,
motion:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="100" x2="190" y2="100" stroke="#2EC4B6" stroke-width="3"/><g transform="translate(60,74)"><rect x="0" y="0" width="52" height="20" rx="6" fill="#2D9CFF"/><rect x="8" y="-12" width="30" height="14" rx="4" fill="#59b4ff"/><circle cx="12" cy="22" r="7" fill="#1B1B1B"/><circle cx="40" cy="22" r="7" fill="#1B1B1B"/></g><g stroke="#6EEB83" stroke-width="3" fill="none"><line x1="120" y1="84" x2="160" y2="84" marker-end="url(#m)"/></g><defs><marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#6EEB83"/></marker></defs></svg>`,
ruler:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="50" width="160" height="34" rx="5" fill="#FFB84D"/>${[...Array(15)].map((_,i)=>`<line x1="${28+i*10}" y1="50" x2="${28+i*10}" y2="${i%5===0?66:60}" stroke="#081B33" stroke-width="1.5"/>`).join('')}<circle cx="150" cy="30" r="10" fill="none" stroke="#2EC4B6" stroke-width="3"/><line x1="157" y1="37" x2="168" y2="48" stroke="#2EC4B6" stroke-width="3"/></svg>`,
forces:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect x="80" y="52" width="40" height="40" rx="6" fill="#2D9CFF"/><g stroke-width="5" fill="none"><line x1="80" y1="72" x2="30" y2="72" stroke="#E63946" marker-end="url(#f1)"/><line x1="120" y1="72" x2="180" y2="72" stroke="#6EEB83" marker-end="url(#f2)"/></g><defs><marker id="f1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#E63946"/></marker><marker id="f2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#6EEB83"/></marker></defs></svg>`,
energy:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><line x1="100" y1="14" x2="100" y2="18" stroke="#b9cbe6"/><line x1="100" y1="16" x2="150" y2="80" stroke="#eaf2ff" stroke-width="2"/><circle cx="150" cy="80" r="13" fill="#FFB84D"/><path d="M60 96 Q100 40 140 96" fill="none" stroke="#6EEB83" stroke-width="2" stroke-dasharray="4 4"/><text x="20" y="60" fill="#6EEB83" font-size="11" font-family="Montserrat">PE</text><text x="150" y="112" fill="#2D9CFF" font-size="11" font-family="Montserrat">KE</text></svg>`,
momentum:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="90" x2="190" y2="90" stroke="#2EC4B6" stroke-width="2"/><circle cx="70" cy="74" r="16" fill="#2D9CFF"/><circle cx="130" cy="74" r="16" fill="#E63946"/><g stroke="#6EEB83" stroke-width="3" fill="none"><line x1="40" y1="55" x2="60" y2="55" marker-end="url(#p1)"/></g><defs><marker id="p1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#6EEB83"/></marker></defs></svg>`,
waves:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><path d="M10 65 Q35 15 60 65 T110 65 T160 65 T210 65" fill="none" stroke="#2D9CFF" stroke-width="3"/><line x1="10" y1="65" x2="190" y2="65" stroke="#2EC4B6" stroke-width="1" stroke-dasharray="3 3"/><line x1="35" y1="15" x2="35" y2="65" stroke="#6EEB83" stroke-width="1.5"/><text x="40" y="30" fill="#6EEB83" font-size="10" font-family="Montserrat">amplitude</text></svg>`,
optics:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><path d="M70 30l40 70H30z" fill="#2D9CFF" opacity=".35" stroke="#2D9CFF" stroke-width="2"/><line x1="10" y1="70" x2="60" y2="70" stroke="#fff" stroke-width="3"/><g stroke-width="3"><line x1="95" y1="72" x2="180" y2="45" stroke="#E63946"/><line x1="98" y1="76" x2="180" y2="70" stroke="#6EEB83"/><line x1="100" y1="80" x2="180" y2="95" stroke="#2D9CFF"/></g></svg>`,
circuit:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect x="30" y="30" width="140" height="70" rx="8" fill="none" stroke="#6EEB83" stroke-width="3"/><rect x="20" y="55" width="20" height="20" fill="#081B33"/><line x1="24" y1="52" x2="24" y2="78" stroke="#FFB84D" stroke-width="3"/><line x1="34" y1="58" x2="34" y2="72" stroke="#FFB84D" stroke-width="5"/><circle cx="120" cy="30" r="12" fill="#FFB84D"/><path d="M114 30h12M120 24v12" stroke="#081B33" stroke-width="1.5"/></svg>`,
scientist:`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="66" r="26" fill="#f2d3b8"/><path d="M74 60a26 26 0 0 1 52 0" fill="#3a3a3a"/><rect x="86" y="60" width="12" height="8" rx="2" fill="none" stroke="#081B33" stroke-width="2"/><rect x="102" y="60" width="12" height="8" rx="2" fill="none" stroke="#081B33" stroke-width="2"/><path d="M60 190v-30a40 40 0 0 1 80 0v30z" fill="#fff"/><g transform="translate(100,120)"><ellipse rx="18" ry="7" fill="none" stroke="#2EC4B6" stroke-width="1.5"/><ellipse rx="18" ry="7" fill="none" stroke="#2EC4B6" stroke-width="1.5" transform="rotate(60)"/><circle r="3" fill="#FFB84D"/></g></svg>`,
escape:`<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="70" width="80" height="66" rx="10" fill="#FFB84D"/><path d="M74 70v-16a26 26 0 0 1 52 0v16" fill="none" stroke="#eaf2ff" stroke-width="7"/><circle cx="100" cy="98" r="10" fill="#081B33"/><rect x="96" y="104" width="8" height="18" rx="3" fill="#081B33"/></svg>`,
thermo:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><rect x="94" y="18" width="12" height="66" rx="6" fill="none" stroke="#FF6B4A" stroke-width="3"/><circle cx="100" cy="100" r="17" fill="#FF6B4A"/><rect x="97" y="40" width="6" height="48" rx="3" fill="#FF6B4A"/><path d="M38 38q6-9 12 0t12 0M38 58q6-9 12 0t12 0" fill="none" stroke="#FFB84D" stroke-width="2" opacity=".7"/><path d="M138 38q6-9 12 0t12 0M138 58q6-9 12 0t12 0" fill="none" stroke="#2D9CFF" stroke-width="2" opacity=".5"/></svg>`,
atomic:`<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg"><g transform="translate(100,65)"><ellipse rx="72" ry="24" fill="none" stroke="#FFE066" stroke-width="2"/><ellipse rx="72" ry="24" fill="none" stroke="#2D9CFF" stroke-width="2" transform="rotate(60)"/><ellipse rx="72" ry="24" fill="none" stroke="#6EEB83" stroke-width="2" transform="rotate(120)"/><circle r="11" fill="#FFE066"/><circle cx="72" cy="0" r="4" fill="#2D9CFF"/><circle cx="-51" cy="-38" r="4" fill="#6EEB83"/></g></svg>`
};
function art(k){return ART[k]||ART.lab;}

/* ============================================================
   PHYSICS TOOLKIT — clickable quantities, units & formulas
   ============================================================ */
const TKCAT={base:'#6EEB83',derived:'#2D9CFF',elec:'#FFB84D',const:'#c58bff'};
const TKCATNAME={base:'SI base quantity',derived:'Derived quantity',elec:'Electricity',const:'Constant of nature'};
/* [symbol,name,unit,unitName,category,formula,fact] */
const TOOLKIT=[
['d','Distance','m','meter','base','—','The SI base unit of length. One meter is about one long stride.'],
['t','Time','s','second','base','—','The SI base unit of time. Physics describes how things change over time.'],
['m','Mass','kg','kilogram','base','—','How much matter an object contains — it stays the same everywhere, unlike weight.'],
['T','Temperature','K','kelvin','base','—','Measured from absolute zero (0 K = −273°C), the coldest possible temperature.'],
['v','Velocity','m/s','meters/second','derived','v = d / t','Speed with a direction. 100 m in 10 s = 10 m/s.'],
['a','Acceleration','m/s²','meters/second²','derived','a = Δv / t','How quickly velocity changes. Gravity accelerates falling objects at about 9.8 m/s².'],
['F','Force','N','newton','derived','F = m · a','A push or pull. One newton is roughly the weight of a small apple.'],
['W','Work / Energy','J','joule','derived','W = F · d','Energy transferred when a force moves something. Lifting a textbook ≈ 10 J.'],
['P','Power','W','watt','derived','P = E / t','How fast energy is used. A 60 W bulb uses 60 joules every second.'],
['p','Momentum','kg·m/s','kg·m/s','derived','p = m · v','"Mass in motion." A heavy, fast object is hard to stop — lots of momentum.'],
['f','Frequency','Hz','hertz','derived','f = 1 / T','How many wave cycles pass per second. Human hearing spans about 20–20,000 Hz.'],
['λ','Wavelength','m','meter','derived','v = f · λ','The length of one full wave. Red light waves are longer than blue.'],
['I','Current','A','ampere','elec','I = Q / t','The flow rate of electric charge. One of the SI base units.'],
['V','Voltage','V','volt','elec','V = I · R','The "push" that drives current. A wall outlet in the US is about 120 V.'],
['R','Resistance','Ω','ohm','elec','R = V / I','How much a material opposes current flow. Thin wires resist more.'],
['g','Gravity (Earth)','m/s²','9.8 m/s²','const','g ≈ 9.8','Every object near Earth accelerates downward at 9.8 m/s², regardless of mass.'],
['c','Speed of light','m/s','3×10⁸ m/s','const','c ≈ 3×10⁸','The universe\'s speed limit — light crosses the Earth 7 times in one second.']
];

/* ============================================================
   BADGES
   ============================================================ */
/* Badges keyed by mission TITLE, not numeric id — titles are stable across
   any future mission reordering; raw id literals here is what caused
   wave_rider/circuit_pro to silently point at the wrong mission once
   Thermodynamics and Atomic/Nuclear/Quantum were inserted. */
function missionId(title){const m=MISSIONS.find(x=>x.title===title);return m?m.id:null;}
function missionDone(s,title){const id=missionId(title);return id!=null&&!!s.completed[id];}
const BADGES=[
{id:'first_steps',name:'First Steps',desc:'Complete your first mission',tier:'bronze',glyph:'flag',cond:s=>completedCount()>=1},
{id:'metric_master',name:'Metric Master',desc:'Master measurement & units',tier:'bronze',glyph:'ruler',cond:s=>missionDone(s,'Measurement & Units')},
{id:'in_motion',name:'In Motion',desc:'Complete the motion mission',tier:'bronze',glyph:'speed',cond:s=>missionDone(s,'Motion & Kinematics')},
{id:'force_awakens',name:'Force of Nature',desc:'Master Newton\'s Laws',tier:'silver',glyph:'force',cond:s=>missionDone(s,'Forces & Newton\'s Laws')},
{id:'energizer',name:'Energizer',desc:'Complete Energy & Work',tier:'silver',glyph:'bolt',cond:s=>missionDone(s,'Energy & Work')},
{id:'collision_course',name:'Collision Course',desc:'Complete the Momentum mission',tier:'silver',glyph:'momentum',cond:s=>missionDone(s,'Momentum')},
{id:'heat_wave',name:'Heat Wave',desc:'Complete Thermodynamics',tier:'silver',glyph:'thermo',cond:s=>missionDone(s,'Thermodynamics')},
{id:'wave_rider',name:'Wave Rider',desc:'Complete Waves & Sound',tier:'silver',glyph:'wave',cond:s=>missionDone(s,'Waves & Sound')},
{id:'light_bender',name:'Light Bender',desc:'Complete Light & Optics',tier:'silver',glyph:'prism',cond:s=>missionDone(s,'Light & Optics')},
{id:'circuit_pro',name:'Circuit Pro',desc:'Build a working circuit',tier:'silver',glyph:'bulb',cond:s=>missionDone(s,'Electricity & Circuits')},
{id:'quantum_leap',name:'Quantum Leap',desc:'Complete Atomic, Nuclear & Quantum Physics',tier:'gold',glyph:'quantum',cond:s=>missionDone(s,'Atomic, Nuclear & Quantum Physics')},
{id:'escape_artist',name:'Escape Artist',desc:'Break out of the Review Escape Room',tier:'gold',glyph:'key',cond:s=>missionDone(s,'Review Escape Room')},
{id:'sharp_shooter',name:'Sharp Mind',desc:'Reach 80% accuracy',tier:'silver',glyph:'target',cond:s=>accuracy()>=80&&s.total>=10},
{id:'halfway',name:'Rising Physicist',desc:'Complete 5 missions',tier:'gold',glyph:'uparrow',cond:s=>completedCount()>=5},
{id:'streak3',name:'On Fire',desc:'3-day training streak',tier:'bronze',glyph:'flame',cond:s=>s.streak>=3},
{id:'level5',name:'Level 5 Scholar',desc:'Reach Level 5',tier:'gold',glyph:'star',cond:s=>level()>=5},
{id:'graduate',name:'Academy Graduate',desc:'Finish every mission',tier:'gold',glyph:'cap',cond:s=>completedCount()>=MISSIONS.length},
{id:'master',name:'Master Physicist',desc:'Earn top rank in the Final Challenge',tier:'holo',glyph:'crown',cond:s=>s.finalRank==='Master Physicist'},
{id:'perfectionist',name:'Perfectionist',desc:'Score 3 stars on any mission',tier:'gold',glyph:'diamond',cond:s=>Object.values(s.stars||{}).some(v=>v>=3)},
{id:'lab_first',name:'Experimenter',desc:'Beat your first lab challenge',tier:'bronze',glyph:'flask',cond:s=>Object.keys(s.labChallenges||{}).length>=1},
{id:'lab_all',name:'Lab Legend',desc:'Beat every lab challenge',tier:'gold',glyph:'atom',cond:s=>Object.keys(s.labChallenges||{}).length>=LAB_CHALLENGE_TOTAL}
];
const GLYPHS={
momentum:'<circle cx="38" cy="52" r="8"/><circle cx="61" cy="52" r="11"/><path d="M47 52h6" stroke="rgba(0,0,0,.28)" stroke-width="3" stroke-linecap="round" fill="none"/>',
thermo:'<rect x="46" y="30" width="8" height="28" rx="4"/><circle cx="50" cy="63" r="11"/><rect x="48.4" y="38" width="3.2" height="21" fill="rgba(0,0,0,.28)"/>',
prism:'<path d="M50 32 L67 64 H33 Z"/><path d="M50 32 L58 64 H42 Z" fill="rgba(0,0,0,.16)"/>',
quantum:'<circle cx="50" cy="50" r="8"/><circle cx="67" cy="50" r="3"/><circle cx="37" cy="63" r="2.6"/><circle cx="39" cy="35" r="2.2"/>',
key:'<circle cx="41" cy="46" r="8" fill="none" stroke="#ffffff" stroke-width="4"/><rect x="47" y="44" width="21" height="4" rx="1.5"/><rect x="59" y="48" width="3.6" height="7" rx="1"/><rect x="65" y="48" width="3.6" height="9" rx="1"/>',
flag:'<rect x="43" y="35" width="2.6" height="30" rx="1.2"/><path d="M45.6 35.5 L61 40.5 L45.6 45.5 Z"/>',
ruler:'<g transform="rotate(-18 50 50)"><rect x="33" y="45.5" width="34" height="9" rx="1.5"/><g fill="rgba(0,0,0,.28)"><rect x="38" y="45.5" width="1" height="4"/><rect x="43" y="45.5" width="1" height="4"/><rect x="48" y="45.5" width="1" height="4"/><rect x="53" y="45.5" width="1" height="4"/><rect x="58" y="45.5" width="1" height="4"/></g></g>',
speed:'<g fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M40 41 L48 50 L40 59"/><path d="M49 41 L57 50 L49 59"/></g>',
force:'<path d="M35 46 H53 V40.5 L64 50 L53 59.5 V54 H35 Z"/>',
bolt:'<path d="M54 33 L40 52 L49 52 L45 67 L61 46 L51 46 Z"/>',
wave:'<path d="M34 52 Q41 39 48 52 Q55 65 62 52 Q65 47 68 50" fill="none" stroke="#ffffff" stroke-width="3.6" stroke-linecap="round"/>',
bulb:'<circle cx="50" cy="46" r="12"/><rect x="45" y="57" width="10" height="6" rx="1.5"/><path d="M46 46 h8 M50 40 v11" stroke="rgba(0,0,0,.28)" stroke-width="1.5" fill="none"/>',
target:'<circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" stroke-width="3.2"/><circle cx="50" cy="50" r="7" fill="none" stroke="#ffffff" stroke-width="3.2"/><circle cx="50" cy="50" r="2.4"/>',
uparrow:'<path d="M50 33 L62 48 L54.5 48 L54.5 65 L45.5 65 L45.5 48 L38 48 Z"/>',
flame:'<path d="M50 33 C58 44 60 49 56 57 C53 63 46 63 43.5 57 C41.5 52 46 50 47 45 C48 41 46 39 50 33 Z"/><path d="M50 46 C54 50 55 54 52 58 C50 61 46.5 60 46 57 C45.5 54 48 52 50 46 Z" fill="rgba(255,184,77,.92)"/>',
star:'<path d="M50 33 l4.2 11.4 12.2 0.7 -9.4 7.8 3.1 11.8 -10.1 -6.4 -10.1 6.4 3.1 -11.8 -9.4 -7.8 12.2 -0.7 Z"/>',
cap:'<path d="M33 47 L50 40 L67 47 L50 54 Z"/><path d="M41 51.5 L41 59 Q50 64 59 59 L59 51.5 L50 55.4 Z" opacity="0.92"/><path d="M67 47 L67 58" stroke="#ffffff" stroke-width="1.6"/><circle cx="67" cy="59" r="1.9"/>',
crown:'<path d="M37 60 L34 41 L43.5 49 L50 37 L56.5 49 L66 41 L63 60 Z"/><rect x="37" y="60" width="26" height="3.6" rx="1.5"/><circle cx="34" cy="39" r="2.3"/><circle cx="50" cy="35" r="2.5"/><circle cx="66" cy="39" r="2.3"/>',
diamond:'<path d="M42 42 H58 L64 49 L50 65 L36 49 Z"/><path d="M42 42 L46.5 49 H36 Z" fill="rgba(0,0,0,.14)"/><path d="M58 42 L53.5 49 H64 Z" fill="rgba(0,0,0,.14)"/><path d="M46.5 49 H53.5 L50 65 Z" fill="rgba(0,0,0,.1)"/>',
flask:'<path d="M45 34h10v2.4h-2v7.4l7.7 15.4a3.4 3.4 0 0 1-3 4.9H42.3a3.4 3.4 0 0 1-3-4.9L47 43.8v-7.4h-2z"/><path d="M42.4 55h15.2l2.1 4.3a2.2 2.2 0 0 1-2 3.2H42.3a2.2 2.2 0 0 1-2-3.2z" fill="rgba(0,0,0,.24)"/>',
atom:'<circle cx="50" cy="50" r="3.4"/><g fill="none" stroke="#ffffff" stroke-width="2.6"><ellipse cx="50" cy="50" rx="17" ry="7"/><ellipse cx="50" cy="50" rx="17" ry="7" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="17" ry="7" transform="rotate(120 50 50)"/></g>'
};
function badgeSVG(id){
  const b=BADGES.find(x=>x.id===id);if(!b)return '';
  const rim=b.tier==='holo'?'url(#pq-holo)':`url(#pq-${b.tier}-bezel)`;
  const face=b.tier==='holo'?'url(#pq-gold-face)':`url(#pq-${b.tier}-face)`;
  const aura={bronze:'#c67a3c',silver:'#9fb4cc',gold:'#ffd76a',holo:'#c58bff'}[b.tier];
  return `<span class="medal"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${b.name} badge">
    <circle cx="50" cy="50" r="47" fill="none" stroke="${aura}" stroke-width="5" opacity="0.22"/>
    <circle cx="50" cy="50" r="44" fill="${rim}"/>
    <circle cx="50" cy="50" r="35" fill="${face}"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.32"/>
    <ellipse cx="50" cy="37" rx="24" ry="11" fill="#ffffff" opacity="0.26"/>
    <g fill="#ffffff">${GLYPHS[b.glyph]||''}</g>
  </svg><span class="shine"></span></span>`;
}
function syncBadges(){
  let earned=[];
  BADGES.forEach(b=>{if(b.cond(S)&&!S.badges.includes(b.id)){S.badges.push(b.id);earned.push(b);}});
  if(earned.length){save();earned.forEach((b,i)=>setTimeout(()=>{toast(`New badge earned: ${b.name}`,'medal');SFX.pop();},i*700));}
  return earned;
}
/* ===DATA=== */
/* ============================================================
   MISSIONS — content + scaffolding + Bloom's quizzes
   ============================================================ */
const bloomColors={Remember:'#2D9CFF',Understand:'#2EC4B6',Apply:'#6EEB83',Analyze:'#FFB84D',Evaluate:'#E63946',Create:'#c58bff'};
function support(html){return `<details class="scaffold support"><summary>${icon('compass')} Need a hand? Open a worked example</summary><div class="inner">${html}</div></details>`;}
function extend(html){return `<details class="scaffold extend"><summary>${icon('rocket')} Ready to level up? Extension Challenge</summary><div class="inner">${html}</div></details>`;}

const MISSIONS=[
{
id:1,title:'What is Physics?',sub:'The science of matter, energy, motion & the rules of reality',thumb:'scientist',color:'#2D9CFF',xp:120,
zone:'Foundations',teks:'TEKS §112.39(c)(2)(A–D)',tekslabel:'Nature of science: hypotheses vs. theories',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 1 · Briefing</span>
    <h2>Welcome to the Academy, ${PLAYER_NAME}</h2>
    <p><strong>Physics</strong> is the study of matter, energy, and how they interact — from a falling apple to a beam of starlight. It's the search for the fundamental <strong>rules</strong> that everything in the universe obeys.</p>
  </div>
  <div class="art">${art('lab')}</div>
</div>
<div class="lesson-body">
  <h3>What physicists actually do</h3>
  <p>Physics looks for patterns and writes them as <strong>laws</strong> — often short equations that predict how the world behaves. Drop a ball a thousand times and it always accelerates the same way. Physics captures that "always" and lets us predict the future of a system.</p>
  <div class="callout tip"><b>Think like a scientist:</b> Physics is the most foundational science. Chemistry rests on physics, biology rests on chemistry — the rules of physics run underneath it all.</div>
  <h3>The main branches</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Mechanics</div><div class="lbl">Motion, forces & energy — where we'll spend most of our training</div></div>
    <div class="fact"><div class="big">Waves</div><div class="lbl">Sound, light & vibrations that carry energy</div></div>
    <div class="fact"><div class="big">Electricity</div><div class="lbl">Charge, current & the circuits that power everything</div></div>
    <div class="fact"><div class="big">Thermodynamics</div><div class="lbl">Heat, temperature & energy transfer</div></div>
    <div class="fact"><div class="big">Modern</div><div class="lbl">Relativity & quantum — the strange rules of the very fast & very small</div></div>
  </div>
  <h3>The scientific method</h3>
  <p>Physicists <strong>observe</strong>, form a <strong>hypothesis</strong>, run an <strong>experiment</strong>, take <strong>measurements</strong>, and refine their model. A good theory makes predictions you can test — and could be proven wrong.</p>
  ${support(`<p>Confused about "energy vs matter"? <b>Matter</b> is the <i>stuff</i> — anything with mass, like a ball or the air. <b>Energy</b> is the <i>ability to make things happen</i> — motion, heat, light. A moving ball is matter that <i>carries</i> energy. Physics studies both and how energy moves between objects.</p>`)}
  ${extend(`<p>Physics laws are often <b>symmetric in time</b> — the equations work the same forwards and backwards. Yet in real life a smashed cup never un-smashes. This puzzle is called the "arrow of time," and it connects motion to thermodynamics (entropy). Something to keep in the back of your mind as you train!</p>`)}
  <div class="callout"><b>Your mission:</b> By the end of this academy you'll predict motion with equations, calculate forces and energy, build circuits, and understand waves. Let's begin.</div>
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'Physics is best described as the study of:',opts:['Only living things','Matter, energy, and how they interact','Just electricity','Historical events'],answer:1,why:'Physics studies matter, energy, and their interactions — the fundamental rules of the universe.',hint:'Think about the two big things physics connects: the "stuff" and what makes things happen.',explain:'Physics is the study of matter and energy and how they interact, making it the most fundamental science.'},
{bloom:'Understand',type:'mc',q:'Why is physics often called the most fundamental science?',opts:['It is the hardest','Its laws underlie chemistry and biology','It was invented first','It uses the most math'],answer:1,why:'Chemistry and biology are built on physical laws, so physics sits underneath them.',hint:'What other sciences depend on the rules physics describes?',explain:'Physics describes the fundamental rules that chemistry and then biology build upon, so it underlies the other sciences.'},
{bloom:'Apply',type:'mc',q:'A student times how long a ball takes to fall from different heights and looks for a pattern. Which part of the scientific method is this?',opts:['Forming a conclusion only','Taking measurements / experimenting','Ignoring the data','Guessing randomly'],answer:1,why:'Systematically measuring during a test is the experiment/measurement stage.',hint:'They are actively collecting numbers during a test.',explain:'Timing falls across conditions is running an experiment and taking measurements — a core step of the scientific method.'},
{bloom:'Analyze',type:'mc',q:'Which of these is a question physics (mechanics) would tackle, rather than another branch?',opts:['Why do cells divide?','How fast will a skateboard roll down a ramp?','What makes salt dissolve?','How do genes pass on?'],answer:1,why:'Motion down a ramp is mechanics — the physics of forces and motion.',hint:'Look for the question about motion and forces.',explain:'Predicting how fast something rolls down a ramp is a mechanics problem — forces and motion — which is core physics.'},
{bloom:'Evaluate',type:'short',q:'Argue why being able to predict motion with equations is more powerful than just describing motion in words. Give one example.',model:'Sample: Equations let you predict exact outcomes — e.g., knowing a car\'s speed and reaction time, you can calculate the stopping distance before a crash happens, which words alone can\'t give you precisely.',keywords:['predict','calculate','exact','number','distance','future','design']},
{bloom:'Create',type:'short',q:'Invent a physics question about something you enjoy (a sport, game, or hobby) that could be answered with an experiment.',model:'Example: "Does a basketball bounce higher on wood or concrete?" — you could drop it from the same height on each and measure the bounce. Any testable question works!',keywords:['measure','test','experiment','how','faster','higher','compare']}
]
},
{
id:2,title:'Measurement & Units',sub:'SI units, prefixes, precision & scientific notation',thumb:'ruler',color:'#FFB84D',xp:130,game:'toolkit',
zone:'Foundations',teks:'TEKS §112.39(c)(2)(H, I) · (c)(3)(F)',tekslabel:'Measurement, SI units & proportional reasoning',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 2 · Toolkit</span>
    <h2>Physics speaks in numbers</h2>
    <p>Every measurement needs a <strong>number and a unit</strong>. "5" is meaningless — 5 <em>what</em>? Meters? Seconds? Physicists worldwide share one system so results always mean the same thing: the <strong>SI system</strong>.</p>
  </div>
  <div class="art">${art('ruler')}</div>
</div>
<div class="lesson-body">
  <h3>The SI base units</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">m</div><div class="lbl">meter — length / distance</div></div>
    <div class="fact"><div class="big">kg</div><div class="lbl">kilogram — mass</div></div>
    <div class="fact"><div class="big">s</div><div class="lbl">second — time</div></div>
    <div class="fact"><div class="big">A</div><div class="lbl">ampere — electric current</div></div>
    <div class="fact"><div class="big">K</div><div class="lbl">kelvin — temperature</div></div>
  </div>
  <p>Other units are <strong>derived</strong> by combining these — speed is <span class="eq">m/s</span>, force is <span class="eq">kg·m/s²</span> (the newton).</p>
  <h3>Prefixes scale the units</h3>
  <p>Prefixes let one unit cover huge ranges: <strong>kilo</strong> (×1000), <strong>centi</strong> (÷100), <strong>milli</strong> (÷1000). So 1 km = 1000 m, and 1 cm = 0.01 m.</p>
  <div class="callout tip"><b>Scientific notation:</b> Huge or tiny numbers get compact. 300,000,000 m/s becomes <span class="eq">3 × 10⁸ m/s</span>. The exponent just counts how many places the decimal moves.</div>
  <h3>Precision & significant figures</h3>
  <p>A measurement is only as trustworthy as your tool. A ruler marked in mm can't honestly report a length to the nearest micrometer. <strong>Significant figures</strong> track how precise a value really is.</p>
  <h3>${icon('toolbox')} Interactive Physics Toolkit</h3>
  <p>Click any quantity to see its symbol, SI unit, formula, and a memorable fact. This is your reference for the whole academy.</p>
  <div id="game-toolkit" class="mt"></div>
  ${support(`<p><b>Unit conversion the easy way</b> — convert 2.5 km to meters. "Kilo" means ×1000, so multiply: 2.5 × 1000 = <b>2500 m</b>. Going the other way (m → km) you divide by 1000. Tip: bigger unit → smaller number, smaller unit → bigger number.</p>`)}
  ${extend(`<p><b>Dimensional analysis:</b> you can check any equation by tracking units. Is <i>speed = distance × time</i> correct? Units would be m·s — but speed must be m/s. It's wrong! The right formula is distance ÷ time. Units that don't match are a red flag that a formula is off. Try checking F = m·a this way (kg × m/s² = the newton ✔).</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What is the SI base unit of mass?',opts:['gram','newton','kilogram','pound'],answer:2,why:'The kilogram (kg) is the SI base unit of mass.',hint:'It is the one with a prefix already built into its name.',explain:'The SI base unit of mass is the kilogram (kg) — unusually, it already contains the "kilo" prefix.'},
{bloom:'Understand',type:'mc',q:'Why do scientists worldwide agree to use SI units?',opts:['They look nicer','So measurements mean the same thing everywhere','Because they are older','To use more math'],answer:1,why:'A shared system means results are comparable and reproducible anywhere.',hint:'Think about two labs on different continents sharing data.',explain:'A common unit system lets scientists everywhere compare and reproduce results without confusion or conversion errors.'},
{bloom:'Apply',type:'fill',q:'Convert 3 kilometers into meters. (Type just the number)',answers:['3000'],why:'Kilo means ×1000, so 3 km = 3 × 1000 = 3000 m.',hint:'"Kilo" means one thousand — multiply.',explain:'1 km = 1000 m, so 3 km = 3 × 1000 = 3000 m.'},
{bloom:'Analyze',type:'mc',q:'Which measurement is written correctly in scientific notation?',opts:['45 × 10³','4.5 × 10⁴','0.45 × 10⁵','45000'],answer:1,why:'Scientific notation uses one non-zero digit before the decimal: 4.5 × 10⁴.',hint:'The number in front should be between 1 and 10.',explain:'Proper scientific notation has exactly one non-zero digit before the decimal point, so 4.5 × 10⁴ is correct (all equal 45000).'},
{bloom:'Evaluate',type:'mc',q:'You measure a desk with a ruler marked in millimeters and report "742.5831 mm." What is wrong?',opts:['Nothing, more digits are better','The precision claimed is greater than the tool allows','The unit is wrong','It should be in kilometers'],answer:1,why:'A mm ruler can\'t justify digits far beyond a millimeter — the extra decimals are false precision.',hint:'Can a millimeter ruler really see ten-thousandths of a millimeter?',explain:'Reporting many decimals beyond what the tool can resolve is false precision. Significant figures should match the instrument\'s limit.'},
{bloom:'Create',type:'short',q:'Design a made-up "unit" for measuring something in your daily life (e.g., a "snack" of distance). Define what it equals in real units and when it would be handy.',model:'Example: 1 "hallway" = 30 meters, useful for describing how far apart classrooms are. Any clear definition tied to real SI units works — you\'re thinking about measurement!',keywords:['equal','meter','second','define','unit','measure']}
]
},
{
id:3,title:'Motion & Kinematics',sub:'Distance, speed, velocity & acceleration',thumb:'motion',color:'#2D9CFF',xp:150,game:'motion',
zone:'Motion & Forces',teks:'TEKS §112.39(c)(4)(A–C, F)',tekslabel:'Motion graphs, kinematics equations & frames of reference',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 3 · Motion Bay</span>
    <h2>Describing how things move</h2>
    <p><strong>Kinematics</strong> is the language of motion — no forces yet, just <em>where</em>, <em>how fast</em>, and <em>speeding up or slowing down</em>. Master this and the rest of mechanics clicks into place.</p>
  </div>
  <div class="art">${art('motion')}</div>
</div>
<div class="lesson-body">
  <h3>Speed vs velocity</h3>
  <p><strong>Speed</strong> is how fast you move: <span class="eq">speed = distance ÷ time</span>. <strong>Velocity</strong> is speed <em>with a direction</em> (e.g., 20 m/s <em>north</em>). Direction matters in physics — a car going in a circle at constant speed is always changing velocity.</p>
  <div class="factgrid">
    <div class="fact"><div class="big">v = d/t</div><div class="lbl">velocity = distance ÷ time</div></div>
    <div class="fact"><div class="big">m/s</div><div class="lbl">the SI unit of speed</div></div>
    <div class="fact"><div class="big">a = Δv/t</div><div class="lbl">acceleration = change in velocity ÷ time</div></div>
  </div>
  <h3>Acceleration</h3>
  <p><strong>Acceleration</strong> is how quickly velocity changes — speeding up, slowing down (negative acceleration), or turning. Its unit is <span class="eq">m/s²</span>. Near Earth, gravity accelerates falling objects at about <strong>9.8 m/s²</strong>.</p>
  <div class="callout tip"><b>Distance vs displacement:</b> Distance is the total path traveled; displacement is the straight-line change in position (with direction). Walk 3 m east then 3 m west: distance = 6 m, displacement = 0.</div>
  <h3>${icon('car')} Motion Simulator</h3>
  <p>Set a velocity and time, launch the car, and watch <span class="eq">d = v × t</span> come to life. Predict where it stops before you press go!</p>
  <div id="game-motion" class="mt"></div>
  ${support(`<p><b>Worked example:</b> A runner covers 100 m in 20 s. Speed = distance ÷ time = 100 ÷ 20 = <b>5 m/s</b>. To rearrange for distance: distance = speed × time. For time: time = distance ÷ speed. Cover the quantity you want with your finger in the triangle d over (v · t) to see which operation to use.</p>`)}
  ${extend(`<p><b>Stretch:</b> An object starting from rest under constant acceleration travels a distance <span class="eq">d = ½ a t²</span>. Drop a rock off a cliff for 3 s: d = ½ × 9.8 × 3² = ½ × 9.8 × 9 = <b>44.1 m</b>. Notice distance grows with the <i>square</i> of time — that\'s why falls get dangerous fast.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What is the formula for speed?',opts:['speed = time ÷ distance','speed = distance × time','speed = distance ÷ time','speed = mass × distance'],answer:2,why:'Speed = distance ÷ time. Faster means more distance covered per second.',hint:'To go faster you cover more distance in less time.',explain:'Speed = distance ÷ time. Its unit, m/s, literally means "meters per second."'},
{bloom:'Understand',type:'mc',q:'How can a car moving at a constant speed still be accelerating?',opts:['It cannot','If it changes direction, its velocity changes','Only if it speeds up','Only downhill'],answer:1,why:'Acceleration is any change in velocity — including a change in direction.',hint:'Velocity includes direction, and acceleration is a change in velocity.',explain:'Velocity includes direction, so turning changes velocity even at constant speed — meaning the car is accelerating.'},
{bloom:'Apply',type:'fill',q:'A cyclist rides 60 meters in 12 seconds. What is their speed in m/s? (Type the number)',answers:['5'],why:'Speed = distance ÷ time = 60 ÷ 12 = 5 m/s.',hint:'Divide distance by time.',explain:'Speed = distance ÷ time = 60 ÷ 12 = 5 m/s.'},
{bloom:'Analyze',type:'mc',q:'You walk 4 m east, then 4 m back west. Compare your distance and displacement.',opts:['Both are 8 m','Distance 8 m, displacement 0 m','Distance 0 m, displacement 8 m','Both are 0 m'],answer:1,why:'Distance is the total path (8 m); displacement is net change in position (0 m, back to start).',hint:'One measures total path; the other measures how far you ended from the start.',explain:'Distance is total path traveled (4 + 4 = 8 m). Displacement is net position change — you ended where you started, so 0 m.'},
{bloom:'Evaluate',type:'mc',q:'Two runners finish a 100 m race in the same time, but Runner A ran in a straight line and Runner B weaved side to side. Who had the greater average speed along their actual path?',opts:['Runner A','Runner B','They were identical','Impossible to say'],answer:1,why:'B covered more actual distance in the same time, so B\'s speed along the path was greater.',hint:'Weaving means the actual path traveled is longer, but the time was the same.',explain:'Runner B traveled a longer actual path in the same time, so B\'s average speed along the path was higher — even though both had the same displacement and race time.'},
{bloom:'Create',type:'short',q:'Design a simple experiment to measure your own top running speed using only a phone timer and a measuring tape. Describe the steps.',model:'Example: Mark out 20 m with the tape, sprint it while a friend times you, then compute speed = 20 ÷ time. Repeat 3 times and take the fastest. Any method that measures distance and time works!',keywords:['distance','time','measure','divide','mark','timer','speed']}
]
},
{
id:4,title:'Forces & Newton\'s Laws',sub:'Net force, F = ma, friction, gravity & weight',thumb:'forces',color:'#6EEB83',xp:170,game:'forces',
zone:'Motion & Forces',teks:'TEKS §112.39(c)(4)(D, E) · (c)(5)(B, C)',tekslabel:'Newton\'s laws, free-body diagrams, gravitational & electric force',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 4 · Force Bay</span>
    <h2>What makes things move (or stop)</h2>
    <p>A <strong>force</strong> is a push or pull, measured in <strong>newtons (N)</strong>. Isaac Newton's three laws explain how forces change motion — they're the backbone of all mechanics.</p>
  </div>
  <div class="art">${art('forces')}</div>
</div>
<div class="lesson-body">
  <h3>Newton's three laws</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">1st</div><div class="lbl">Inertia: an object keeps doing what it's doing unless a force acts on it.</div></div>
    <div class="fact"><div class="big">2nd</div><div class="lbl">F = m × a. More force → more acceleration; more mass → less.</div></div>
    <div class="fact"><div class="big">3rd</div><div class="lbl">Every action has an equal and opposite reaction.</div></div>
  </div>
  <h3>Net force</h3>
  <p>Multiple forces combine into one <strong>net force</strong>. If forces balance (net = 0), motion doesn't change — the object is in <strong>equilibrium</strong>. If they don't balance, the object accelerates in the direction of the net force.</p>
  <div class="callout tip"><b>Weight vs mass:</b> Mass (kg) is how much matter you have — it never changes. Weight is the <em>force</em> of gravity on that mass: <span class="eq">Weight = m × g</span>, with g ≈ 9.8 N/kg. On the Moon your mass is the same but your weight is far less.</div>
  <h3>Friction</h3>
  <p><strong>Friction</strong> opposes motion between surfaces. It's why a sliding book eventually stops (Newton's 1st law still holds — friction is the force acting on it).</p>
  <h3>Universal forces: gravity & electric charge</h3>
  <p>Two more forces follow an <strong>inverse-square law</strong> — double the distance and the force drops to a quarter. <strong>Newton's law of gravitation</strong>: <span class="eq">F = G·m₁m₂ / r²</span> — bigger masses or a closer distance means a stronger pull. <strong>Coulomb's law</strong> for electric charge has the same shape: <span class="eq">F = k·q₁q₂ / r²</span> — bigger charges or a closer distance means a stronger push or pull.</p>
  <div class="callout tip"><b>Same pattern, different force:</b> Gravity only pulls (mass is always positive); electric force can push OR pull depending on whether the charges match or differ. Both fade fast with distance — that's why the Moon's gravity barely nudges the tides, but you'd feel crushed standing on a much more massive, much closer world.</div>
  <h3>${icon('force')} Net Force Simulator</h3>
  <p>Apply forces to a crate and watch the net force and acceleration update live using <span class="eq">F = m × a</span>.</p>
  <div id="game-forces" class="mt"></div>
  ${support(`<p><b>Worked example:</b> Push a 2 kg cart with a net force of 10 N. Newton's 2nd law: a = F ÷ m = 10 ÷ 2 = <b>5 m/s²</b>. Rearranging F = ma: to find force use F = m·a; to find mass use m = F ÷ a. Same triangle trick as speed.</p>`)}
  ${extend(`<p><b>Stretch — free body diagrams:</b> Real objects often have several forces at once (gravity down, normal force up, push forward, friction back). Physicists draw each as an arrow from the object. The <i>net</i> force is the vector sum. A book resting on a table has gravity and normal force perfectly balanced → net force 0 → it stays put (Newton\'s 1st law in action).</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What is the unit of force?',opts:['joule','newton','watt','meter'],answer:1,why:'Force is measured in newtons (N).',hint:'It\'s named after the scientist who wrote the three laws of motion.',explain:'Force is measured in newtons (N), named after Isaac Newton. 1 N = 1 kg·m/s².'},
{bloom:'Understand',type:'mc',q:'Newton\'s 1st law explains why a passenger lurches forward when a car brakes suddenly. Why?',opts:['The seat pushes them','Their body\'s inertia keeps it moving until a force stops it','Gravity increases','The car speeds up'],answer:1,why:'Inertia: the body keeps moving forward until the seatbelt (a force) stops it.',hint:'What keeps a moving object moving until something acts on it?',explain:'By inertia (Newton\'s 1st law), the passenger\'s body keeps moving forward at the original speed until a force — the seatbelt — acts to stop it.'},
{bloom:'Apply',type:'fill',q:'A net force of 20 N acts on a 4 kg box. What is its acceleration in m/s²? (Type the number)',answers:['5'],why:'a = F ÷ m = 20 ÷ 4 = 5 m/s².',hint:'Rearrange F = ma to a = F ÷ m.',explain:'From F = m·a, acceleration a = F ÷ m = 20 ÷ 4 = 5 m/s².'},
{bloom:'Analyze',type:'mc',q:'Two forces act on a crate: 30 N right and 10 N left. What is the net force?',opts:['40 N right','20 N right','20 N left','0 N'],answer:1,why:'Opposite forces subtract: 30 − 10 = 20 N to the right.',hint:'Forces in opposite directions subtract; the winner sets the direction.',explain:'Opposing forces subtract: 30 N − 10 N = 20 N, in the direction of the larger force (right).'},
{bloom:'Evaluate',type:'mc',q:'A rocket pushes hot gas downward and rises upward. Which law best explains this, and is it correct?',opts:['1st law — inertia','3rd law — the gas pushed down pushes the rocket up equally','2nd law only','No law applies'],answer:1,why:'Action–reaction: the rocket pushes gas down, the gas pushes the rocket up with equal force.',hint:'Think action and reaction — equal and opposite.',explain:'Newton\'s 3rd law: the rocket exerts a downward force on the exhaust gas, and the gas exerts an equal, opposite upward force on the rocket, pushing it up.'},
{bloom:'Analyze',type:'mc',q:'Two objects are moved to twice their original distance apart, with no change in mass. According to Newton\'s law of gravitation (an inverse-square law), what happens to the gravitational force between them?',opts:['It doubles','It stays the same','It drops to a quarter of what it was','It drops to half of what it was'],answer:2,why:'Inverse-square law: doubling the distance divides the force by 2² = 4.',hint:'"Inverse-square" means the force depends on 1 ÷ distance², not 1 ÷ distance.',explain:'Newton\'s law of gravitation is F = G·m₁m₂ / r² — an inverse-square law. Doubling r divides the force by 2² = 4, so the force drops to one quarter of its original size.'},
{bloom:'Create',type:'short',q:'Describe a real situation from your life and identify which of Newton\'s three laws it demonstrates and why.',model:'Example: Kicking a soccer ball — my foot pushes the ball (2nd law: force gives it acceleration) and the ball pushes back on my foot (3rd law). Any real example correctly matched to a law works!',keywords:['inertia','force','acceleration','reaction','1st','2nd','3rd','push','equal']}
]
},
{
id:5,title:'Energy & Work',sub:'Work, kinetic & potential energy, power, conservation',thumb:'energy',color:'#FFB84D',xp:170,game:'energy',
zone:'Energy & Heat',teks:'TEKS §112.39(c)(6)(A, B)',tekslabel:'Work-energy theorem & kinetic/potential transformations',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 5 · Energy Lab</span>
    <h2>The currency of the universe</h2>
    <p><strong>Energy</strong> is the ability to do work, measured in <strong>joules (J)</strong>. It can't be created or destroyed — only <em>transformed</em> from one form to another. That single rule explains an enormous amount of physics.</p>
  </div>
  <div class="art">${art('energy')}</div>
</div>
<div class="lesson-body">
  <h3>Work</h3>
  <p><strong>Work</strong> is done when a force moves something: <span class="eq">W = Force × distance</span>. Push a box 3 m with 10 N and you've done 30 J of work. No movement means no work — holding a heavy bag still does zero physics-work (even if your arms disagree!).</p>
  <h3>Two key kinds of energy</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Kinetic</div><div class="lbl">Energy of motion. A moving car, a thrown ball. KE = ½mv².</div></div>
    <div class="fact"><div class="big">Potential</div><div class="lbl">Stored energy. A raised weight, a stretched spring. PE = mgh (for height).</div></div>
  </div>
  <div class="callout tip"><b>Conservation of energy:</b> On a roller coaster, high points have lots of potential energy and low speed; at the bottom that PE has become kinetic energy (fast!). The total stays the same (ignoring friction).</div>
  <h3>Power</h3>
  <p><strong>Power</strong> is how <em>fast</em> energy is used: <span class="eq">P = Energy ÷ time</span>, measured in <strong>watts (W)</strong>. Two motors can do the same work, but the more powerful one does it quicker.</p>
  <h3>${icon('bolt')} Energy Pendulum</h3>
  <p>Swing a pendulum and watch potential and kinetic energy trade back and forth while the total stays constant.</p>
  <div id="game-energy" class="mt"></div>
  ${support(`<p><b>Worked example:</b> Lift a 2 kg book 1.5 m onto a shelf. Potential energy gained = m·g·h = 2 × 9.8 × 1.5 = <b>29.4 J</b>. That\'s also the work you did against gravity. If the book falls, that 29.4 J converts into kinetic energy on the way down.</p>`)}
  ${extend(`<p><b>Stretch:</b> Kinetic energy depends on the <i>square</i> of speed: KE = ½mv². Double your speed and KE <i>quadruples</i>. That\'s why a car at 60 mph has four times the crash energy of one at 30 mph — and why speed limits matter so much. Try it: a 1000 kg car at 10 m/s has KE = ½ × 1000 × 10² = 50,000 J; at 20 m/s it\'s 200,000 J.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What is the SI unit of energy?',opts:['newton','watt','joule','ampere'],answer:2,why:'Energy and work are measured in joules (J).',hint:'It\'s not the unit of force or power.',explain:'Energy and work are both measured in joules (J). One joule is one newton-meter.'},
{bloom:'Understand',type:'mc',q:'Why does holding a heavy box perfectly still involve zero work in physics?',opts:['The box is too heavy','No distance is moved, and W = force × distance','Gravity cancels it','You are tired'],answer:1,why:'Work requires movement; with zero distance, W = F × 0 = 0.',hint:'Look at the work formula — what happens if distance is zero?',explain:'Work = force × distance. If the box doesn\'t move, distance is zero, so the work done on it is zero — no matter how tiring it feels.'},
{bloom:'Apply',type:'fill',q:'You push a cart with 15 N of force over 4 meters. How much work do you do, in joules? (Type the number)',answers:['60'],why:'W = force × distance = 15 × 4 = 60 J.',hint:'Multiply force by distance.',explain:'Work = force × distance = 15 N × 4 m = 60 J.'},
{bloom:'Analyze',type:'mc',q:'At the very top of a roller-coaster hill (moving slowly), the car\'s energy is mostly:',opts:['Kinetic','Potential','Zero','Heat'],answer:1,why:'High up and slow = maximum potential energy, minimal kinetic.',hint:'High position, low speed — which energy depends on height?',explain:'At the top, the car is high (max potential energy) and slow (little kinetic). As it descends, PE converts to KE and it speeds up.'},
{bloom:'Evaluate',type:'mc',q:'Two elevators lift the same load to the same floor, but Elevator A takes 5 s and Elevator B takes 10 s. Which statement is correct?',opts:['A does more work','B does more work','They do equal work, but A has greater power','A has less power'],answer:2,why:'Same work (same load and height), but A does it faster, so A has more power.',hint:'Work depends on load and height; power depends on how fast.',explain:'Both do the same work (same weight, same height). Power is work ÷ time, so the faster elevator (A) has greater power.'},
{bloom:'Create',type:'short',q:'Trace the energy transformations in a device or toy you know (e.g., a wind-up toy or a flashlight), naming at least two forms of energy.',model:'Example: A flashlight converts chemical energy (battery) → electrical energy → light and heat energy. Any correct chain of two or more energy forms works!',keywords:['kinetic','potential','chemical','electrical','light','heat','sound','convert']}
]
},
{
id:6,title:'Momentum',sub:'Mass in motion, impulse & collisions',thumb:'momentum',color:'#E63946',xp:170,game:'collision',
zone:'Energy & Heat',teks:'TEKS §112.39(c)(6)(C, D)',tekslabel:'Momentum, impulse & conservation of momentum',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 6 · Impact Lab</span>
    <h2>Mass in motion</h2>
    <p><strong>Momentum</strong> measures how hard something is to stop: <span class="eq">p = mass × velocity</span>. A slow truck and a fast bike can carry the same momentum. In any collision, total momentum is <strong>conserved</strong>.</p>
  </div>
  <div class="art">${art('momentum')}</div>
</div>
<div class="lesson-body">
  <h3>What momentum tells us</h3>
  <p>Momentum grows with both <strong>mass</strong> and <strong>velocity</strong>. A bowling ball has more momentum than a tennis ball at the same speed; speed it up and its momentum rises too. The unit is <span class="eq">kg·m/s</span>.</p>
  <h3>Conservation of momentum</h3>
  <p>In a closed system, the total momentum before a collision equals the total after. When two objects crash, momentum simply transfers between them — that's how Newton's cradle and billiards work.</p>
  <div class="callout tip"><b>Impulse:</b> A force acting over time changes momentum: <span class="eq">impulse = Force × time</span>. This is why airbags and crumple zones save lives — they extend the collision time, reducing the force your body feels.</div>
  <h3>${icon('ball')} Collision Lab</h3>
  <p>Set the masses and speeds of two carts, let them collide, and watch total momentum stay constant.</p>
  <div id="game-collision" class="mt"></div>
  ${support(`<p><b>Worked example:</b> A 3 kg ball rolls at 4 m/s. Its momentum = m × v = 3 × 4 = <b>12 kg·m/s</b>. To find velocity from momentum: v = p ÷ m. To find mass: m = p ÷ v. Same triangle relationship you\'ve used before.</p>`)}
  ${extend(`<p><b>Stretch — why airbags work:</b> Impulse = force × time = change in momentum. In a crash your momentum must drop to zero no matter what. If it happens in 0.01 s (hitting a dashboard), the force is huge. Spread over 0.3 s (an airbag), the same momentum change needs about 30× less force. Physics literally cushions the blow by stretching out the time.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What is the formula for momentum?',opts:['p = m ÷ v','p = m × v','p = F × d','p = ½mv²'],answer:1,why:'Momentum p = mass × velocity.',hint:'It combines how much matter is moving with how fast.',explain:'Momentum p = mass × velocity, with units of kg·m/s.'},
{bloom:'Understand',type:'mc',q:'Why can a slow-moving truck have the same momentum as a fast-moving motorcycle?',opts:['They can\'t','The truck\'s large mass makes up for its low speed','Trucks are always faster','Momentum ignores mass'],answer:1,why:'Momentum = mass × velocity, so large mass can balance small velocity.',hint:'Momentum depends on both mass and speed — one can compensate for the other.',explain:'Since momentum = mass × velocity, the truck\'s large mass can equal the motorcycle\'s high velocity, giving the same momentum.'},
{bloom:'Apply',type:'fill',q:'A 5 kg object moves at 6 m/s. What is its momentum in kg·m/s? (Type the number)',answers:['30'],why:'p = m × v = 5 × 6 = 30 kg·m/s.',hint:'Multiply mass by velocity.',explain:'Momentum = mass × velocity = 5 × 6 = 30 kg·m/s.'},
{bloom:'Analyze',type:'mc',q:'Why do airbags reduce injury in a crash?',opts:['They add momentum','They increase the time of impact, lowering the force','They make the car heavier','They speed you up'],answer:1,why:'Extending impact time reduces the force for the same momentum change (impulse).',hint:'Impulse = force × time. If time goes up for the same momentum change, what happens to force?',explain:'Your momentum change is fixed, but airbags extend the collision time. Since impulse = force × time, a longer time means a much smaller force on your body.'},
{bloom:'Evaluate',type:'mc',q:'Two identical carts approach each other at the same speed and stick together. What is their combined momentum just after?',opts:['Double the original','Zero — the equal, opposite momenta cancel','Cannot be determined','Triple'],answer:1,why:'Equal and opposite momenta sum to zero, and momentum is conserved.',hint:'Momentum has direction — add them as opposites.',explain:'The carts have equal but opposite momenta, which sum to zero. By conservation, the total after the collision is also zero, so the stuck-together pair is momentarily at rest.'},
{bloom:'Create',type:'short',q:'Design a safety feature for a sport or vehicle that uses the impulse idea (extending impact time) to reduce injury. Explain how it works.',model:'Example: padded gym flooring extends the time your body takes to stop when you fall, lowering the peak force. Any design that lengthens impact time to reduce force works!',keywords:['time','force','impulse','cushion','pad','extend','reduce']}
]
},
{
id:7,title:'Thermodynamics',sub:'Heat, temperature, energy transfer & entropy',thumb:'thermo',color:'#FF6B4A',xp:165,game:'thermo',
zone:'Energy & Heat',teks:'TEKS §112.39(c)(6)(E–G)',tekslabel:'Thermal energy transfer & the laws of thermodynamics',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 7 · Heat Lab</span>
    <h2>Energy on the move</h2>
    <p><strong>Heat</strong> is energy flowing between things at different temperatures — and it only flows one way: from hot to cold. <strong>Temperature</strong> isn't the same as heat; it's a measure of how fast the atoms inside something are jiggling.</p>
  </div>
  <div class="art">${art('thermo')}</div>
</div>
<div class="lesson-body">
  <h3>Temperature is molecular motion</h3>
  <p>Every atom in a warm cup of coffee is vibrating faster than the atoms in a cold glass of water. <strong>Temperature</strong> is really just the average kinetic energy of all those jiggling particles. Zero on the Kelvin scale — <strong>absolute zero</strong> — is the point where that motion (almost) stops entirely.</p>
  <h3>Three ways heat travels</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Conduction</div><div class="lbl">Direct contact — a pan handle heating up on the stove.</div></div>
    <div class="fact"><div class="big">Convection</div><div class="lbl">Moving fluid carries heat — warm air rising over a radiator.</div></div>
    <div class="fact"><div class="big">Radiation</div><div class="lbl">Energy travels as EM waves — sunlight warming your skin, no medium needed.</div></div>
  </div>
  <div class="callout tip"><b>The laws of thermodynamics (simplified):</b> Energy can change form but the total is always <strong>conserved</strong> (1st law) — and left alone, heat always spreads from hot to cold, never the reverse (2nd law / entropy). A dropped ice cube melts; it never un-melts itself.</div>
  <h3>${icon('flame')} Thermal Equilibrium Lab</h3>
  <p>Set two starting temperatures, let the blocks touch, and watch heat flow until both reach the same final temperature.</p>
  <div id="game-thermo" class="mt"></div>
  ${support(`<p><b>Worked example:</b> Two equal blocks of the same material touch — one at 80°C, one at 20°C. With no losses to the surroundings, they meet in the middle: (80 + 20) ÷ 2 = <b>50°C</b>. That\'s energy conservation in action — the total thermal energy doesn\'t vanish, it just spreads out evenly.</p>`)}
  ${extend(`<p><b>Stretch — entropy & the arrow of time:</b> Remember Mission 1\'s puzzle about why a smashed cup never un-smashes? This is the same idea. Heat spreading from hot to cold is far more likely than heat gathering itself back up — there are vastly more "spread out" arrangements than "concentrated" ones. That statistical one-way-ness is <b>entropy</b>, and it\'s why engines can never be perfectly efficient: some energy always leaks out as spread-out, unusable heat.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'Left alone, heat always flows from:',opts:['Cold objects to hot objects','Hot objects to cold objects','It flows both ways equally','Heat doesn\'t flow, only temperature does'],answer:1,why:'Heat naturally flows from hotter objects to cooler ones until they reach the same temperature.',hint:'Think about a hot cup of coffee left on a cold table.',explain:'Heat energy always flows from a hotter object to a cooler one until thermal equilibrium is reached — never spontaneously the other way.'},
{bloom:'Understand',type:'mc',q:'A metal spoon left in hot soup quickly becomes too hot to touch, but a wooden spoon stays cool. Why?',opts:['Wood is colder than metal','Metal conducts heat much faster than wood','The soup avoids the wood','Metal reflects heat'],answer:1,why:'Metals are much better conductors of heat than wood, so heat travels through them (and to your hand) faster.',hint:'Which material lets vibrating atoms pass energy along more easily?',explain:'Metal is a strong thermal conductor, so heat energy moves quickly through it to your hand. Wood is a poor conductor (an insulator), so it stays cool to the touch even in the same hot soup.'},
{bloom:'Apply',type:'fill',q:'Two equal blocks of the same material touch: one at 90°C, one at 30°C. Ignoring losses, what final temperature (in °C) do they reach? (Type the number)',answers:['60'],why:'With equal masses and no losses, they meet at the average: (90 + 30) ÷ 2 = 60°C.',hint:'Average the two starting temperatures.',explain:'For equal blocks of the same material with no heat lost to the surroundings, the final temperature is the average of the two starting temperatures: (90 + 30) ÷ 2 = 60°C.'},
{bloom:'Analyze',type:'mc',q:'You feel the Sun\'s warmth on your face even though the space between Earth and the Sun is empty (no air). Which heat transfer explains this?',opts:['Conduction','Convection','Radiation','None — this is impossible'],answer:2,why:'Radiation transfers energy as electromagnetic waves and needs no medium, unlike conduction or convection.',hint:'Which of the three methods doesn\'t need any matter in between to carry the energy?',explain:'Radiation carries energy as electromagnetic waves that can travel through the vacuum of space — that\'s why sunlight can warm you with no air or matter in between, unlike conduction or convection which both need a medium.'},
{bloom:'Evaluate',type:'mc',q:'A hot cup of coffee left in a room always cools down to room temperature — it never spontaneously gets hotter than the room on its own. Which law explains this one-way behavior?',opts:['Newton\'s first law','The first law of thermodynamics (conservation of energy)','The second law of thermodynamics (entropy)','Ohm\'s law'],answer:2,why:'The second law says heat spreads from hot to cold, and systems tend toward more disordered (higher-entropy) states — spontaneously reversing this is astronomically unlikely.',hint:'This is about the *direction* heat flows, not just that energy is conserved.',explain:'The first law says energy is conserved, but it doesn\'t forbid heat flowing backwards. The second law (entropy) is what explains why heat only spreads out spontaneously — coffee cooling to room temperature is energy dispersing, not disappearing.'},
{bloom:'Create',type:'short',q:'Design a way to keep a cold drink cold for longer, using what you know about conduction, convection, and radiation. Explain which transfer method(s) your design blocks.',model:'Example: an insulated (vacuum or foam) cup blocks conduction, a lid blocks convection currents of warm air reaching the drink, and a shiny/reflective outer surface reflects radiant heat. Any design that targets one or more transfer methods works!',keywords:['insulate','conduction','convection','radiation','lid','block','reflect']}
]
},
{
id:8,title:'Waves & Sound',sub:'Amplitude, frequency, wavelength & v = fλ',thumb:'waves',color:'#2EC4B6',xp:160,game:'waves',
zone:'Waves & Light',teks:'TEKS §112.39(c)(7)(A–D)',tekslabel:'Wave properties, wave speed & wave behaviors',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 8 · Wave Studio</span>
    <h2>How energy travels without matter</h2>
    <p>A <strong>wave</strong> carries energy from place to place without carrying the material itself. Sound, light, ripples, earthquakes — all waves. They share the same core vocabulary.</p>
  </div>
  <div class="art">${art('waves')}</div>
</div>
<div class="lesson-body">
  <h3>Two types of waves</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Transverse</div><div class="lbl">Wobble is perpendicular to travel — light, a shaken rope.</div></div>
    <div class="fact"><div class="big">Longitudinal</div><div class="lbl">Wobble is along the travel direction — sound, a pushed spring.</div></div>
  </div>
  <h3>Describing a wave</h3>
  <p><strong>Amplitude</strong> = height of the wave (its energy/loudness/brightness). <strong>Wavelength (λ)</strong> = distance between two peaks. <strong>Frequency (f)</strong> = cycles per second, in <strong>hertz (Hz)</strong>. They link together in one key equation:</p>
  <div class="callout tip"><b>The wave equation:</b> <span class="eq">wave speed = frequency × wavelength</span>, or v = f λ. For a fixed speed, higher frequency means shorter wavelength.</div>
  <h3>Sound</h3>
  <p>Sound is a longitudinal wave of vibrating air. Higher <strong>frequency</strong> → higher <strong>pitch</strong>; larger <strong>amplitude</strong> → louder. Sound needs a medium — in the vacuum of space, no one can hear you.</p>
  <h3>${icon('wave')} Wave Studio</h3>
  <p>Adjust amplitude, frequency, and wavelength and watch the wave respond in real time.</p>
  <div id="game-waves" class="mt"></div>
  ${support(`<p><b>Worked example:</b> A wave has frequency 5 Hz and wavelength 2 m. Its speed = f × λ = 5 × 2 = <b>10 m/s</b>. To find frequency: f = v ÷ λ. To find wavelength: λ = v ÷ f. Again, one triangle: v on top, f and λ below.</p>`)}
  ${extend(`<p><b>Stretch — echoes & the speed of sound:</b> Sound travels about 340 m/s in air. If you shout at a cliff and hear the echo 2 seconds later, the sound went to the cliff and back. Distance = speed × time = 340 × 2 = 680 m round trip, so the cliff is <b>340 m</b> away. Bats and submarines use this exact idea (echolocation and sonar).</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What does the frequency of a wave measure?',opts:['Its height','How many cycles pass per second','Its color only','Its total length'],answer:1,why:'Frequency = cycles per second, measured in hertz (Hz).',hint:'Its unit, hertz, means "per second."',explain:'Frequency is the number of wave cycles passing a point each second, measured in hertz (Hz).'},
{bloom:'Understand',type:'mc',q:'Why can\'t sound travel through the vacuum of outer space?',opts:['It is too cold','Sound needs a medium (like air) to vibrate','Space is too big','Light blocks it'],answer:1,why:'Sound is a vibration of matter, so with no medium it cannot travel.',hint:'Sound is a vibration of particles — what happens if there are no particles?',explain:'Sound is a longitudinal wave that vibrates a medium such as air. A vacuum has no particles to vibrate, so sound cannot travel through it.'},
{bloom:'Apply',type:'fill',q:'A wave has a frequency of 4 Hz and a wavelength of 3 m. What is its speed in m/s? (Type the number)',answers:['12'],why:'v = f × λ = 4 × 3 = 12 m/s.',hint:'Multiply frequency by wavelength.',explain:'Wave speed = frequency × wavelength = 4 × 3 = 12 m/s.'},
{bloom:'Analyze',type:'mc',q:'Two sound waves travel at the same speed. Wave X has a higher frequency than Wave Y. What must be true of their wavelengths?',opts:['X has a longer wavelength','X has a shorter wavelength','They are equal','Wavelength doesn\'t matter'],answer:1,why:'At fixed speed, v = fλ means higher frequency → shorter wavelength.',hint:'In v = fλ, if v is constant and f goes up, what must λ do?',explain:'Since v = f × λ is constant, a higher frequency must be paired with a shorter wavelength — they are inversely related at fixed speed.'},
{bloom:'Evaluate',type:'mc',q:'You want a wave to carry MORE energy without changing its speed or frequency. What should you change?',opts:['Increase the amplitude','Decrease the amplitude','Increase the wavelength','Nothing can change energy'],answer:0,why:'Amplitude sets a wave\'s energy — bigger amplitude carries more energy.',hint:'Which property controls loudness/brightness — the wave\'s "size"?',explain:'A wave\'s energy depends on its amplitude. Increasing amplitude (making the wave taller) increases the energy it carries, independent of speed or frequency.'},
{bloom:'Create',type:'short',q:'Design a simple way to compare the pitch of two sounds and relate what you hear to frequency.',model:'Example: pluck a guitar string tight vs loose — the tighter string vibrates faster (higher frequency) and sounds higher-pitched. Any method linking pitch to frequency works!',keywords:['frequency','pitch','high','low','vibrate','fast','string']}
]
},
{
id:9,title:'Light & Optics',sub:'The EM spectrum, reflection, refraction & color',thumb:'optics',color:'#c58bff',xp:160,game:'optics',
zone:'Waves & Light',teks:'TEKS §112.39(c)(7)(C–E)',tekslabel:'EM spectrum, reflection, refraction & image formation',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 9 · Optics Lab</span>
    <h2>The fastest thing in the universe</h2>
    <p><strong>Light</strong> is a wave of electricity and magnetism that travels at about <span class="eq">3 × 10⁸ m/s</span> — the cosmic speed limit. It doesn't need a medium, which is how sunlight crosses empty space to reach us.</p>
  </div>
  <div class="art">${art('optics')}</div>
</div>
<div class="lesson-body">
  <h3>The electromagnetic spectrum</h3>
  <p>Visible light is a tiny slice of a huge family: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. They differ only in <strong>frequency/wavelength</strong>. Red light has the longest visible wavelength; violet the shortest.</p>
  <h3>Reflection & refraction</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Reflection</div><div class="lbl">Light bounces off a surface. Angle in = angle out (mirrors).</div></div>
    <div class="fact"><div class="big">Refraction</div><div class="lbl">Light bends when it enters a new material — why a straw looks broken in water.</div></div>
  </div>
  <div class="callout tip"><b>Why the sky is blue:</b> Air scatters short-wavelength blue light more than red, so blue spreads across the whole sky. At sunset light travels through more air, blue scatters away, and we see red and orange.</div>
  <h3>Color</h3>
  <p>White light is all colors combined. Objects look colored because they <strong>reflect</strong> some wavelengths and <strong>absorb</strong> others — a red apple reflects red and absorbs the rest. Mixing light (red + green + blue) is different from mixing paint!</p>
  <h3>${icon('prism')} Light & Color Lab</h3>
  <p>Bounce a light ray off a mirror to see the law of reflection, then mix red, green, and blue light.</p>
  <div id="game-optics" class="mt"></div>
  ${support(`<p><b>Law of reflection made simple:</b> the angle the incoming ray makes with the mirror equals the angle the outgoing ray makes — measured from an imaginary line perpendicular to the surface (the "normal"). Hit a mirror at 30° and light leaves at 30° on the other side. That predictability is how periscopes and mirrors work.</p>`)}
  ${extend(`<p><b>Stretch — additive vs subtractive color:</b> Screens <i>add</i> light: red + green + blue light combine to make white (that\'s RGB). Paints <i>subtract</i>: each pigment absorbs colors, so mixing many paints heads toward black/brown. That\'s why your TV and your paint set follow opposite color rules — one adds light, the other removes it.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'Approximately how fast does light travel in a vacuum?',opts:['340 m/s','3 × 10⁸ m/s','9.8 m/s','1000 m/s'],answer:1,why:'Light travels at about 3 × 10⁸ m/s — the fastest speed in the universe.',hint:'It\'s the constant "c" — vastly faster than sound.',explain:'Light travels at roughly 3 × 10⁸ m/s (300 million m/s) in a vacuum, the universal speed limit denoted c.'},
{bloom:'Understand',type:'mc',q:'Why does a straw look bent where it enters a glass of water?',opts:['The straw actually bends','Light refracts (changes speed and direction) entering the water','Water magnifies it','Reflection off the straw'],answer:1,why:'Light bends as it slows entering water — refraction — so the straw appears offset.',hint:'What happens to light when it passes from air into water?',explain:'Light refracts — bends and slows — when passing from air into water, shifting the apparent position of the straw so it looks broken.'},
{bloom:'Apply',type:'mc',q:'A light ray hits a flat mirror at 40° to the normal. At what angle does it reflect?',opts:['20°','40°','50°','90°'],answer:1,why:'Law of reflection: angle of incidence = angle of reflection = 40°.',hint:'Angle in equals angle out.',explain:'By the law of reflection, the angle of reflection equals the angle of incidence, so it reflects at 40° from the normal.'},
{bloom:'Analyze',type:'mc',q:'A shirt appears green in white light. What is happening to the light?',opts:['It absorbs green and reflects the rest','It reflects green and absorbs other colors','It creates green light','It blocks all light'],answer:1,why:'A green object reflects green wavelengths to your eye and absorbs the others.',hint:'The color you see is the color being sent back to your eye.',explain:'The shirt reflects green wavelengths (which reach your eyes) and absorbs the other colors of white light, so it looks green.'},
{bloom:'Evaluate',type:'mc',q:'On a screen, red, green, and blue light all shine together on one spot. What color appears, and why?',opts:['Black — colors cancel','White — added light combines to white','Brown — like mixing paint','Still red'],answer:1,why:'Adding red, green, and blue light (RGB) produces white — additive color mixing.',hint:'Screens ADD light, unlike paints which subtract it.',explain:'Light mixing is additive: red + green + blue light combine to make white. This is opposite to paint mixing, which is subtractive and heads toward dark.'},
{bloom:'Create',type:'short',q:'Design a simple demonstration to show that white light contains many colors.',model:'Example: shine light through a prism (or a glass of water at an angle) to split it into a rainbow, showing white light is made of many colors. Any valid method works!',keywords:['prism','rainbow','split','colors','refract','spectrum','water']}
]
},
{
id:10,title:'Electricity & Circuits',sub:'Charge, current, voltage, resistance & Ohm\'s law',thumb:'circuit',color:'#FFB84D',xp:180,game:'circuit',
zone:'Electricity',teks:'TEKS §112.39(c)(5)(D–G)',tekslabel:'Conductors, circuit design & electric/magnetic fields',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 10 · Circuit Bay</span>
    <h2>The flow that powers everything</h2>
    <p><strong>Electricity</strong> is moving electric charge. Control that flow with a <strong>circuit</strong> and you can power a phone, a city, or a spacecraft. Three quantities rule it all: voltage, current, and resistance.</p>
  </div>
  <div class="art">${art('circuit')}</div>
</div>
<div class="lesson-body">
  <h3>The three key quantities</h3>
  <div class="factgrid">
    <div class="fact"><div class="big">Voltage (V)</div><div class="lbl">The "push" driving charge. Measured in volts.</div></div>
    <div class="fact"><div class="big">Current (I)</div><div class="lbl">The flow rate of charge. Measured in amperes (A).</div></div>
    <div class="fact"><div class="big">Resistance (R)</div><div class="lbl">Opposition to flow. Measured in ohms (Ω).</div></div>
  </div>
  <div class="callout tip"><b>Ohm's Law:</b> <span class="eq">V = I × R</span>. Voltage equals current times resistance. More voltage pushes more current; more resistance slows it down. A helpful picture: voltage is water pressure, current is flow, resistance is a narrow pipe.</div>
  <h3>Series vs parallel</h3>
  <p>In a <strong>series</strong> circuit, components share one loop — unplug one bulb and all go dark (old holiday lights). In a <strong>parallel</strong> circuit, each has its own branch — one can fail and the others keep working (house wiring).</p>
  <h3>${icon('plug')} Circuit Builder</h3>
  <p>Adjust the battery voltage and the resistance and watch the current — and the bulb's brightness — respond to Ohm's law.</p>
  <div id="game-circuit" class="mt"></div>
  ${support(`<p><b>Worked example:</b> A 12 V battery drives a circuit with 4 Ω of resistance. Ohm\'s law: I = V ÷ R = 12 ÷ 4 = <b>3 A</b> of current. Rearrange V = IR: to find voltage use V = I·R; to find resistance use R = V ÷ I. One more triangle: V on top, I and R below.</p>`)}
  ${extend(`<p><b>Stretch — why birds don\'t get shocked on power lines:</b> Current flows when there\'s a voltage <i>difference</i> across something. A bird touching one wire has almost no voltage difference between its two feet, so almost no current flows through it. Touch two wires (or a wire and the ground) and there\'s a big difference — dangerous. Electricity always needs a complete path and a difference in voltage.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'What does Ohm\'s Law state?',opts:['V = I ÷ R','V = I × R','V = I + R','V = R ÷ I'],answer:1,why:'Ohm\'s Law: Voltage = Current × Resistance (V = IR).',hint:'Voltage is the product of the other two quantities.',explain:'Ohm\'s Law is V = I × R: voltage equals current multiplied by resistance.'},
{bloom:'Understand',type:'mc',q:'Using the water analogy, what does voltage represent?',opts:['The width of the pipe','The water pressure pushing the flow','The flow rate','The temperature'],answer:1,why:'Voltage is like pressure — the push that drives current (flow).',hint:'Voltage is the "push"; current is the flow.',explain:'In the water analogy, voltage is the pressure that pushes water, current is the flow rate, and resistance is a narrow pipe opposing flow.'},
{bloom:'Apply',type:'fill',q:'A 10 V battery is connected to a 5 Ω resistor. What current flows, in amperes? (Type the number)',answers:['2'],why:'I = V ÷ R = 10 ÷ 5 = 2 A.',hint:'Rearrange V = IR to I = V ÷ R.',explain:'From Ohm\'s law, current I = V ÷ R = 10 ÷ 5 = 2 A.'},
{bloom:'Analyze',type:'mc',q:'In a string of lights wired in series, one bulb burns out and the whole string goes dark. Why?',opts:['The others overheated','Series shares one path, so a break stops all current','Too much voltage','They were parallel'],answer:1,why:'A series circuit is one loop; a single break stops current everywhere.',hint:'Series means one single loop for the current.',explain:'Series components share a single loop, so a break anywhere stops the current for all of them. Parallel wiring avoids this by giving each its own branch.'},
{bloom:'Evaluate',type:'mc',q:'Why is house wiring done in parallel rather than series?',opts:['It is cheaper','So each device gets full voltage and can work independently','To use less wire','Series is illegal'],answer:1,why:'Parallel branches each receive full voltage and keep working if another fails.',hint:'You want your TV to keep running even if a lamp burns out.',explain:'Parallel wiring gives every device the full voltage and its own branch, so appliances run independently and one failing doesn\'t shut off the rest.'},
{bloom:'Create',type:'short',q:'Design a simple circuit for a flashlight, listing the parts and explaining the path the current takes.',model:'Example: a battery (voltage source) → wire → switch → bulb → wire back to the battery, forming a complete loop. Closing the switch lets current flow and lights the bulb. Any complete-loop design works!',keywords:['battery','bulb','wire','switch','loop','current','complete']}
]
},
{
id:11,title:'Atomic, Nuclear & Quantum Physics',sub:'Photons, atomic spectra, half-life & E = mc²',thumb:'atomic',color:'#FFE066',xp:190,game:'atomic',
zone:'Modern Physics',teks:'TEKS §112.39(c)(8)(A–D)',tekslabel:'Photoelectric effect, atomic spectra, mass–energy equivalence & applications',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 11 · Quantum Bay</span>
    <h2>Where physics gets strange</h2>
    <p>Zoom in past atoms and the rules change. Light behaves as both a <strong>wave</strong> and a stream of <strong>particles</strong>. Atoms hold energy in fixed steps, not smooth ramps. And a tiny bit of mass can release an enormous amount of energy.</p>
  </div>
  <div class="art">${art('atomic')}</div>
</div>
<div class="lesson-body">
  <h3>Light comes in packets: the photoelectric effect</h3>
  <p>Shine light on certain metals and electrons pop off — but only if the light\'s <strong>frequency</strong> is high enough, no matter how bright it is. Einstein explained this by treating light as tiny energy packets called <strong>photons</strong>, each carrying energy proportional to its frequency. Dim high-frequency light ejects electrons instantly; bright low-frequency light ejects none at all.</p>
  <h3>Every element has a fingerprint</h3>
  <p>Heat a gas and pass its glow through a prism — instead of a smooth rainbow, you get sharp, specific lines. Electrons inside atoms only occupy fixed energy levels, and each element\'s set of possible "jumps" produces its own unique pattern of colors: its <strong>emission spectrum</strong>.</p>
  <div class="factgrid">
    <div class="fact"><div class="big">Fission</div><div class="lbl">Splitting a heavy nucleus (power plants) releases energy.</div></div>
    <div class="fact"><div class="big">Fusion</div><div class="lbl">Combining light nuclei (the Sun\'s core) releases even more.</div></div>
  </div>
  <div class="callout tip"><b>Mass-energy equivalence:</b> <span class="eq">E = mc²</span>. Because c (the speed of light) is so enormous, converting even a tiny bit of mass into energy — as in fission or fusion — releases a tremendous amount of power.</div>
  <h3>Radioactive decay & half-life</h3>
  <p>Unstable nuclei break down over time, releasing particles or energy. Every radioactive substance has a <strong>half-life</strong> — the time it takes for half of any sample to decay. It doesn\'t matter how much you start with; after one half-life, half remains; after two, a quarter; and so on.</p>
  <h3>${icon('atom')} Half-Life Decay Lab</h3>
  <p>Fast-forward through half-lives and watch how many atoms in the sample remain stable versus how many have decayed.</p>
  <div id="game-atomic" class="mt"></div>
  ${support(`<p><b>Worked example:</b> A sample has a half-life of 10 days. After 20 days — 2 half-lives — the fraction remaining is (½)² = <b>¼, or 25%</b>. After 3 half-lives (30 days), it\'s (½)³ = ⅛, or 12.5%. Each half-life cuts what\'s left in half again — it never quite disappears entirely.</p>`)}
  ${extend(`<p><b>Stretch — carbon dating:</b> Carbon-14 has a half-life of about 5,730 years. Living things constantly take in carbon-14, but once they die, it only decays. By measuring how much carbon-14 remains in a fossil or artifact and comparing it to how much a living thing would have, scientists can calculate how many half-lives have passed — and therefore its age. The same atomic physics behind power plants and the Sun also lets us read the age of ancient bones.</p>`)}
</div>`,
quiz:[
{bloom:'Remember',type:'mc',q:'The photoelectric effect shows that light behaves as:',opts:['A pure wave only','Tiny packets of energy called photons','A type of sound','Something with no energy at all'],answer:1,why:'Einstein explained the photoelectric effect by treating light as photons — discrete packets of energy.',hint:'Einstein\'s explanation gave light a "particle" side.',explain:'The photoelectric effect is explained by light acting as photons — individual packets of energy — showing light\'s particle-like nature alongside its wave-like behavior.'},
{bloom:'Understand',type:'mc',q:'Dim blue light ejects electrons from a metal, but very bright red light does not. Why?',opts:['Red light is too bright','Each red photon still doesn\'t carry enough energy, no matter how many there are','Blue light is always brighter','The metal blocks red light'],answer:1,why:'Electron ejection depends on the energy per photon (frequency), not the total intensity of light.',hint:'Does adding MORE weak photons ever add up to one strong one?',explain:'Whether electrons are ejected depends on each photon\'s individual energy (tied to frequency), not the total intensity. Piling on more low-energy red photons never gives any single one enough energy to eject an electron.'},
{bloom:'Apply',type:'fill',q:'A radioactive sample has a half-life of 10 days. After 20 days (2 half-lives), what percent of the original sample remains? (Type just the number)',answers:['25'],why:'After 2 half-lives, the fraction remaining is (½)² = ¼ = 25%.',hint:'Cut the sample in half, twice.',explain:'Each half-life cuts the remaining amount in half. After 2 half-lives: (½)² = ¼ of the original remains, which is 25%.'},
{bloom:'Analyze',type:'mc',q:'Two different elements, when heated and viewed through a prism, produce two completely different patterns of colored lines. What does this tell scientists?',opts:['One element is fake','Each element has its own unique set of electron energy levels — a fingerprint','The prism is broken','Temperature was different'],answer:1,why:'Each element\'s unique emission spectrum comes from its own specific set of electron energy-level jumps.',hint:'Think of the pattern of lines as an ID card for an element.',explain:'Every element\'s electrons occupy a unique set of energy levels, so the specific colors (wavelengths) they emit when electrons jump between levels form a unique "fingerprint" — this is how astronomers identify elements in distant stars.'},
{bloom:'Evaluate',type:'mc',q:'Both nuclear fission and nuclear fusion release large amounts of energy from tiny amounts of mass. What best explains why, according to E = mc²?',opts:['Mass and energy are unrelated','c² is such an enormous number that even a small amount of converted mass yields a huge amount of energy','Fission and fusion create new mass','Only fusion follows this equation'],answer:1,why:'Because c² (the speed of light squared) is enormous, a small mass converts to a very large amount of energy.',hint:'Look at the size of c — the speed of light — and think about squaring it.',explain:'E = mc² means energy equals mass times the speed of light squared. Since c² is an astronomically large number, even a very small amount of mass converted in fission or fusion releases an enormous amount of energy.'},
{bloom:'Create',type:'short',q:'Describe one real-world use of atomic, nuclear, or quantum physics (for example in medicine, energy, or dating fossils) and briefly explain the physics idea behind it.',model:'Example: Carbon dating uses the known half-life of carbon-14 to estimate the age of fossils by measuring how much has decayed. Other valid answers: nuclear power plants use fission to generate electricity; radiation therapy uses controlled radioactive decay to target cancer cells; PET scans use radioactive tracers. Any answer connecting a real application to the underlying atomic/nuclear idea works!',keywords:['half-life','decay','fission','fusion','radiation','carbon','nuclear','energy']}
]
},
{
id:12,title:'Review Escape Room',sub:'Solve physics puzzles to unlock the Master Lab',thumb:'escape',color:'#6EEB83',xp:200,game:'escape',
zone:'Capstone',teks:'TEKS §112.39(c)(3)(A, F)',tekslabel:'Critical thinking & quantitative problem solving across every strand',
content:()=>`
<div class="lesson-hero">
  <div class="lesson-body"><span class="pill">Mission 12 · Escape Room</span>
    <h2>Prove your training</h2>
    <p>The Master Laboratory is locked. Solve eight physics puzzles drawn from every mission to reveal the lock code and unlock the door. You've trained for this, ${PLAYER_NAME}.</p>
  </div>
  <div class="art">${art('escape')}</div>
</div>
<div class="lesson-body">
  <div class="callout tip"><b>How it works:</b> Each puzzle you solve reveals one piece of the lock code. Solve all eight to escape and complete your academy training.</div>
  <div id="game-escape" class="mt"></div>
</div>`,
quiz:[]
}
];
function mission(id){return MISSIONS.find(m=>m.id===id);}
function isUnlocked(id){return id===1 || S.completed[id-1];}
/* ===MISSIONS=== */

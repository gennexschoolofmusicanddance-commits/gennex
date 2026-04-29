import { useState, useEffect, useRef } from "react";
import { Send, Phone, Mail, MapPin, Star, ChevronLeft, ChevronRight, ChevronDown, Menu, X, Search, Instagram, Facebook, Play, Award, Users, BookOpen, GraduationCap, ClipboardCheck, ShieldCheck, Clock, Zap, Heart, PenTool, Layout, CheckCircle, ExternalLink } from "lucide-react";
import gennexLogo from "./assets/gennex/gennex-logo.png";
import gennexNameBoard from "./assets/gennex/name-board.jpg";
import gennexReception from "./assets/gennex/reception.jpg";
import gennexReceptionWide from "./assets/gennex/reception-raw.jpg";
import gennexInstrumentRoom from "./assets/gennex/instrument-room.jpg";
import gennexSummerCampPoster from "./assets/gennex/summer-camp-poster.jpg";
import gennexCertificate from "./assets/gennex/certificate.jpg";
import gennexDrumsStudent from "./assets/gennex/drums-student.jpg";
import gennexExams from "./assets/gennex/exams.jpg";
import gennexInstrumentRoomAlt from "./assets/gennex/instrument-room-2.jpg";
import gennexReceptionTwo from "./assets/gennex/reception-2.jpg";
import gennexStudentsOne from "./assets/gennex/students-1.jpg";
import courseBharatanatyam from "./assets/gennex/course-bharatanatyam.jpeg";
import courseDance from "./assets/gennex/course-dance.jpeg";
import courseDrums from "./assets/gennex/course-drums.jpeg";
import courseGuitar from "./assets/gennex/course-guitar.jpeg";
import coursePiano from "./assets/gennex/course-piano.jpeg";
import courseViolin from "./assets/gennex/course-violin.jpeg";
import courseVocal from "./assets/gennex/course-vocal.jpeg";
import courseYoga from "./assets/gennex/course-yoga.jpeg";
import courseZumba from "./assets/gennex/course-zumba.jpeg";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const G='#D4AF37',GL='#F4D03F',R='#E31837';
const BK='#0A0A0A',DP='#121212',SF='#1A1A1A',CD='#222222';
const CR='#FAF9F6',CR8='rgba(250,249,246,.8)',CR6='rgba(250,249,246,.6)',CR4='rgba(250,249,246,.4)',CR3='rgba(250,249,246,.3)';
const G1='rgba(212,175,55,.1)',G2='rgba(212,175,55,.2)',G3='rgba(212,175,55,.05)',R1='rgba(227,24,55,.1)';
const serif='"Cormorant Garamond",Georgia,serif',mono='"Space Mono",monospace',sans='"Space Grotesk",system-ui,sans-serif';
const tr=(extra={})=>({transition:'all .25s',...extra});
const lbl=(color=G)=>({ fontFamily:mono,fontSize:9,letterSpacing:'.38em',textTransform:'uppercase',color });
const sec=(bg=BK)=>({ padding:'112px 64px',background:bg });
const REAL_PHOTOS={
  logo:gennexLogo,
  nameBoard:gennexNameBoard,
  reception:gennexReception,
  receptionWide:gennexReceptionWide,
  instrumentRoom:gennexInstrumentRoom,
  instrumentRoomAlt:gennexInstrumentRoomAlt,
  summerCampPoster:gennexSummerCampPoster,
  certificate:gennexCertificate,
  drumsStudent:gennexDrumsStudent,
  exams:gennexExams,
  receptionTwo:gennexReceptionTwo,
  studentsOne:gennexStudentsOne,
  courseBharatanatyam,
  courseDance,
  courseDrums,
  courseGuitar,
  coursePiano,
  courseViolin,
  courseVocal,
  courseYoga,
  courseZumba,
};

const premiumStyles=`
  .section-shell{max-width:1280px;margin:0 auto}
  .section-heading{display:flex;flex-direction:column;gap:18px}
  .section-heading.center{align-items:center;text-align:center}
  .section-lead{font-family:${sans};font-size:14px;line-height:1.9;font-weight:300;color:${CR6};max-width:560px;margin:0}
  .premium-chip-row{display:flex;flex-wrap:wrap;gap:10px}
  .premium-chip{padding:8px 13px;border:1px solid ${G1};background:${SF};font-family:${mono};font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:${CR4}}
  .premium-button{display:inline-flex;align-items:center;gap:8px;padding:14px 22px;border:1px solid ${G};background:${G};color:${BK};font-family:${mono};font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:transform .22s ease,background .22s ease,color .22s ease,border-color .22s ease}
  .premium-button.ghost{background:transparent;color:${G}}
  .premium-button:hover{transform:translateY(-2px);background:${GL}}
  .premium-button.ghost:hover{background:${G};color:${BK}}
  .course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
  .course-card{position:relative;min-height:420px;border:1px solid ${G1};overflow:hidden;background:${CD};display:flex;align-items:flex-end;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
  .course-card:hover{transform:translateY(-4px);border-color:${G2};box-shadow:0 24px 48px rgba(0,0,0,.34)}
  .course-media{position:absolute;inset:0}
  .course-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease,filter .35s ease}
  .course-card:hover .course-media img{transform:scale(1.06);filter:saturate(1.08)}
  .course-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.06) 0%,rgba(10,10,10,.16) 28%,rgba(10,10,10,.86) 72%,rgba(10,10,10,.96) 100%)}
  .course-content{position:relative;z-index:2;display:flex;flex-direction:column;gap:14px;padding:28px;width:100%}
  .course-title{font-family:${sans};font-size:22px;font-weight:600;line-height:1.15;color:${CR};margin:0}
  .course-desc{font-family:${sans};font-size:13px;font-weight:300;line-height:1.75;color:${CR6};margin:0}
  .course-meta{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
  .course-tag{font-family:${mono};font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:${G}}
  .gallery-filter-row{display:flex;flex-wrap:wrap;gap:10px}
  .gallery-filter{padding:10px 18px;border:1px solid ${G1};background:transparent;color:${CR4};font-family:${mono};font-size:8px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;transition:background .22s ease,color .22s ease,border-color .22s ease}
  .gallery-filter.active,.gallery-filter:hover{background:${SF};border-color:${G2};color:${CR}}
  .gallery-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
  .gallery-card{position:relative;aspect-ratio:1.1;border:1px solid ${G1};overflow:hidden;background:${CD};cursor:pointer}
  .gallery-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s ease,filter .3s ease}
  .gallery-card:hover img{transform:scale(1.06);filter:saturate(1.04)}
  .gallery-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,10,.08) 0%,rgba(10,10,10,.18) 38%,rgba(10,10,10,.9) 100%);transition:background .25s ease}
  .gallery-card:hover::after{background:linear-gradient(180deg,rgba(10,10,10,.04) 0%,rgba(10,10,10,.16) 34%,rgba(10,10,10,.95) 100%)}
  .gallery-copy{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:20px;display:flex;flex-direction:column;gap:8px}
  .gallery-kicker{font-family:${mono};font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:${G}}
  .gallery-title{font-family:${sans};font-size:16px;font-weight:600;line-height:1.35;color:${CR};margin:0}
  .gallery-subtitle{font-family:${sans};font-size:12px;font-weight:300;line-height:1.6;color:${CR6};margin:0}
  .event-hero{display:grid;grid-template-columns:minmax(320px,.82fr) minmax(0,1.18fr);gap:28px;border:1px solid ${G1};background:linear-gradient(135deg,rgba(18,18,18,.98),rgba(10,10,10,.92));overflow:hidden;box-shadow:0 28px 60px rgba(0,0,0,.38)}
  .event-poster{min-height:520px;background:${BK};display:flex;align-items:center;justify-content:center}
  .event-poster img{width:100%;height:100%;object-fit:cover;display:block}
  .event-copy{padding:40px 38px;display:flex;flex-direction:column;justify-content:center;gap:22px}
  .event-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
  .event-metric{padding:16px 18px;border:1px solid ${G1};background:${SF}}
  .event-metric-label{font-family:${mono};font-size:7px;letter-spacing:.18em;text-transform:uppercase;color:${CR4};margin-bottom:8px}
  .event-metric-value{font-family:${sans};font-size:14px;font-weight:600;line-height:1.45;color:${CR}}
  .mode-page{background:${BK};min-height:100vh}
  .mode-hero{position:relative;min-height:78vh;padding:124px 64px 72px;display:flex;align-items:flex-end;overflow:hidden}
  .mode-hero-media{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.46;filter:saturate(.94) contrast(1.04)}
  .mode-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,10,10,.94),rgba(10,10,10,.72) 48%,rgba(10,10,10,.28)),linear-gradient(180deg,rgba(10,10,10,.18),rgba(10,10,10,.92))}
  .mode-hero-copy{position:relative;z-index:2;max-width:760px;display:flex;flex-direction:column;gap:24px}
  .mode-content{padding:96px 64px 112px;background:${DP}}
  .mode-panels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
  .mode-panel{background:${CD};border:1px solid ${G1};padding:28px;display:flex;flex-direction:column;gap:18px}
  .mode-panel-title{font-family:${sans};font-size:14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${CR};margin:0}
  .mode-list{display:flex;flex-direction:column;gap:12px}
  .mode-list-item{display:flex;gap:10px;align-items:flex-start}
  .mode-dot{width:6px;height:6px;border-radius:50%;background:${G};margin-top:8px;flex-shrink:0}
  .mode-list-copy{font-family:${sans};font-size:13px;font-weight:300;line-height:1.75;color:${CR6}}
  .mode-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
  .mode-card{background:${SF};border:1px solid ${G1};padding:16px 18px}
  .mode-card-title{font-family:${mono};font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:${G};margin-bottom:8px}
  .mode-card-copy{font-family:${sans};font-size:12px;font-weight:500;line-height:1.6;color:${CR8}}
  .mode-gallery{display:grid;grid-template-columns:1.05fr .95fr;gap:22px;align-items:stretch}
  .mode-gallery-media{min-height:340px;border:1px solid ${G1};overflow:hidden;background:${BK}}
  .mode-gallery-media img{width:100%;height:100%;object-fit:cover;display:block}
  .mode-support{background:${CD};border:1px solid ${G1};padding:28px;display:flex;flex-direction:column;gap:18px}
  @media (max-width:1100px){
    .course-grid,.gallery-grid,.mode-panels{grid-template-columns:repeat(2,minmax(0,1fr))}
    .event-hero,.mode-gallery{grid-template-columns:1fr}
    .mode-content,.mode-hero{padding-left:40px;padding-right:40px}
  }
  @media (max-width:760px){
    .course-grid,.gallery-grid,.mode-panels,.mode-card-grid,.event-metrics{grid-template-columns:1fr}
    .mode-hero{min-height:68vh;padding:104px 22px 44px}
    .mode-content{padding:72px 22px 88px}
    .event-copy{padding:28px 22px}
  }
`;

const getPageFromHash=()=>window.location.hash==='#online-class'?'online':window.location.hash==='#offline-class'?'offline':'home';

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({setPage}){
  const [sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>40);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  const go=id=>{
    setPage?.('home');
    if(window.location.hash) window.history.pushState(null,'',window.location.pathname+window.location.search);
    setTimeout(()=>document.querySelector(id)?.scrollIntoView({behavior:'smooth'}),30);
  };
  const openOnline=()=>{
    setPage?.('online');
    window.location.hash='online-class';
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const links=[['About','#about'],['Courses','#courses'],['Gallery','#gallery'],['FAQ','#faq'],['Contact','#contact']];
  return(
    <nav style={{position:'sticky',top:0,zIndex:100,padding:sc?'12px 0':'26px 0',background:sc?'rgba(10,10,10,.93)':'transparent',backdropFilter:sc?'blur(20px)':'none',borderBottom:sc?`1px solid ${G2}`:'1px solid transparent',transition:'all .4s',fontFamily:sans}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div onClick={()=>go('#home')} style={{display:'flex',alignItems:'center',gap:14,cursor:'pointer'}}>
          <img src={REAL_PHOTOS.logo} alt="Gennex School of Music and Dance logo" style={{height:46,width:60,objectFit:'contain',display:'block'}}/>
          <div>
            <div style={{fontFamily:serif,fontSize:17,fontWeight:700,letterSpacing:'.18em',color:G,textTransform:'uppercase'}}>Gennex</div>
            <div style={{fontFamily:mono,fontSize:7,letterSpacing:'.32em',color:CR4,textTransform:'uppercase'}}>School of Music & Dance</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:24}}>
          {links.map(([l,h])=>(
            <span key={l} onClick={()=>go(h)} style={tr({fontFamily:mono,fontSize:9,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:CR4,cursor:'pointer'})}
              onMouseEnter={e=>e.target.style.color=G} onMouseLeave={e=>e.target.style.color=CR4}>{l}</span>
          ))}
          <span onClick={openOnline} style={tr({fontFamily:mono,fontSize:9,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:G,cursor:'pointer'})}
            onMouseEnter={e=>e.target.style.color=R} onMouseLeave={e=>e.target.style.color=G}>Online Class</span>
          <button onClick={()=>go('#contact')} style={tr({padding:'10px 26px',background:'transparent',border:`1px solid ${G}`,color:G,fontFamily:mono,fontSize:9,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',cursor:'pointer'})}
            onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=BK;}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=G;}}>Enroll Free</button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero(){
  const cv=useRef(null);
  useEffect(()=>{
    const c=cv.current;if(!c)return;
    const ctx=c.getContext('2d');let t=0,id;
    const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    resize();window.addEventListener('resize',resize);
    const draw=()=>{
      const W=c.width,H=c.height;ctx.clearRect(0,0,W,H);
      [{amp:60,freq:.008,speed:.012,y:H*.35,a:.12,col:'212,175,55'},{amp:40,freq:.012,speed:.018,y:H*.5,a:.10,col:'227,24,55'},
       {amp:80,freq:.006,speed:.008,y:H*.65,a:.07,col:'212,175,55'},{amp:30,freq:.016,speed:.022,y:H*.42,a:.05,col:'250,249,246'}]
      .forEach(w=>{
        ctx.beginPath();ctx.moveTo(0,w.y);
        for(let x=0;x<=W;x+=2)ctx.lineTo(x,w.y+Math.sin(x*w.freq+t*w.speed*60)*w.amp);
        ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();
        ctx.fillStyle=`rgba(${w.col},${w.a})`;ctx.fill();
      });t++;id=requestAnimationFrame(draw);
    };draw();
    return()=>{cancelAnimationFrame(id);window.removeEventListener('resize',resize);};
  },[]);
  const go=id=>document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
  return(
    <section id="home" style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-end',overflow:'hidden',padding:'0 64px 80px',background:BK}}>
      <img src={REAL_PHOTOS.nameBoard} alt="Gennex School of Music and Dance name board" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',opacity:.46,filter:'saturate(.95) contrast(1.08)'}}/>
      <canvas ref={cv} style={{position:'absolute',inset:0,pointerEvents:'none',width:'100%',height:'100%'}}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(10,10,10,.92),rgba(10,10,10,.74) 44%,rgba(10,10,10,.28)),linear-gradient(to top,#0A0A0A,rgba(10,10,10,.55) 55%,rgba(10,10,10,.2))',zIndex:1}}/>
      <div style={{position:'relative',zIndex:10,maxWidth:920}}>
        <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:44}}>
          <img src={REAL_PHOTOS.logo} alt="Gennex School of Music and Dance logo" style={{width:112,height:86,objectFit:'contain'}}/>
          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
            <span style={{padding:'6px 14px',border:`1px solid rgba(227,24,55,.25)`,color:R,fontFamily:mono,fontSize:9,letterSpacing:'.25em',textTransform:'uppercase'}}>Chennai · Kolathur</span>
            <span style={{fontFamily:mono,fontSize:9,color:CR4,letterSpacing:'.25em',textTransform:'uppercase',display:'flex',alignItems:'center'}}>TN GOVT REGD · 298/2024</span>
          </div>
        </div>
        <h1 style={{fontFamily:serif,fontSize:'clamp(58px,9vw,128px)',lineHeight:.9,fontWeight:300,letterSpacing:'-.02em',marginBottom:36,color:CR}}>
          <em style={{color:G}}>Unlock</em><br/>Your<br/>
          <span style={{WebkitTextStroke:`1px rgba(245,239,224,.3)`,color:'transparent'}}>Potential</span>
        </h1>
        <p style={{fontFamily:sans,fontSize:16,color:CR6,maxWidth:440,marginBottom:44,fontWeight:300,lineHeight:1.8}}>
          A government-registered school of performing arts nurturing the next generation of musicians and dancers — one class at a time.
        </p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          {[['Book Free Trial','#contact',true],['Explore Courses','#courses',false]].map(([lbl,h,p])=>(
            <button key={lbl} onClick={()=>go(h)} style={tr({padding:'16px 36px',background:p?G:'transparent',color:p?BK:CR,border:p?'none':`1px solid rgba(250,249,246,.2)`,fontFamily:mono,fontSize:10,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',cursor:'pointer'})}
              onMouseEnter={e=>{e.currentTarget.style.background=p?GL:'rgba(255,255,255,.05)';e.currentTarget.style.transform='translateY(-2px)';}}
              onMouseLeave={e=>{e.currentTarget.style.background=p?G:'transparent';e.currentTarget.style.transform='none';}}>{lbl}</button>
          ))}
        </div>
      </div>
      <div style={{position:'absolute',right:64,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:40,zIndex:10,textAlign:'right'}}>
        {[['Art Forms','14+'],['Grade Levels','3'],['Potential','∞']].map(([l,v])=>(
          <div key={l}><div style={{fontFamily:serif,fontSize:42,fontWeight:700,color:R,lineHeight:1}}>{v}</div><div style={{fontFamily:mono,fontSize:9,letterSpacing:'.25em',textTransform:'uppercase',color:CR4,marginTop:4}}>{l}</div></div>
        ))}
      </div>
    </section>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker(){
  const items=['Keyboard','Guitar','Drums','Violin','Vocal Training','Bharatanatyam','Western Dance','Yoga Coming Soon','Zumba Coming Soon','Trinity College London','TN Govt Registered','Free Trial Classes','Online Classes'];
  return(
    <div style={{background:R,padding:'13px 0',overflow:'hidden'}}>
      <style>{`@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}} .tk{display:flex;gap:36px;animation:tick 28s linear infinite;width:max-content}`}</style>
      <div className="tk">
        {[...items,...items].map((t,i)=>(
          <span key={i} style={{fontFamily:mono,fontSize:9,fontWeight:700,letterSpacing:'.25em',textTransform:'uppercase',color:'white',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:18}}>
            {t}<span style={{opacity:.4}}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About(){
  return(
    <section id="about" style={{...sec(DP)}}>
      <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>About Gennex</span></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1.1,marginBottom:24}}>
            Where Talent Meets <em style={{color:G}}>Excellence</em>
          </h2>
          <p style={{fontFamily:sans,fontSize:15,color:CR6,lineHeight:1.85,fontWeight:300,marginBottom:20}}>
            Gennex School of Music & Dance is a government-registered performing arts academy in Kolathur, Chennai. We specialize in internationally-certified music and classical dance training following the Trinity College London syllabus.
          </p>
          <p style={{fontFamily:sans,fontSize:15,color:CR6,lineHeight:1.85,fontWeight:300,marginBottom:44}}>
            Our expert faculty guides students from foundation to advanced levels, ensuring every child and adult discovers their artistic potential in a structured, nurturing environment.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
            {[['Trinity College London','World-recognized syllabus'],['TN Govt Registered','Regd. No. 298/2024'],['5.0 ★ Google Rating','Verified Reviews'],['Est. Since 2010','15+ years of excellence']].map(([t,s])=>(
              <div key={t} style={{padding:'18px 22px',background:SF,border:`1px solid ${G1}`}}>
                <div style={{fontFamily:serif,fontSize:14,fontWeight:600,color:G,marginBottom:5}}>{t}</div>
                <div style={{fontFamily:sans,fontSize:11,color:CR4,fontWeight:300}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{position:'absolute',top:-20,left:-20,width:'100%',height:'100%',border:`1px solid ${G1}`}}/>
          <img src={REAL_PHOTOS.reception} alt="Gennex School reception and waiting area" style={{width:'100%',height:520,objectFit:'cover',objectPosition:'center',position:'relative',zIndex:1,display:'block'}}/>
          <div style={{position:'absolute',bottom:-18,right:-18,background:G,padding:'18px 26px',zIndex:2}}>
            <div style={{fontFamily:serif,fontSize:30,fontWeight:700,color:BK}}>14+</div>
            <div style={{fontFamily:mono,fontSize:8,color:BK,letterSpacing:'.2em',textTransform:'uppercase'}}>Art Forms</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({eyebrow,title,description,accent=G,align='left'}){
  return(
    <div className={`section-heading${align==='center'?' center':''}`}>
      <div style={{display:'flex',alignItems:'center',justifyContent:align==='center'?'center':'flex-start',gap:14}}>
        <div style={{width:26,height:1,background:accent}}/>
        <span style={lbl(accent)}>{eyebrow}</span>
        {align==='center'&&<div style={{width:26,height:1,background:accent}}/>}
      </div>
      <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4.8vw,68px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1.02,margin:0}}>{title}</h2>
      {description&&<p className="section-lead" style={{margin:align==='center'?'0 auto':0}}>{description}</p>}
    </div>
  );
}

function LearningModePage({id,eyebrow,title,description,image,imageAlt,badges,learnItems,steps,audience,mediaImage,mediaAlt,supportPanel,ctaLabel,onCta}){
  return(
    <main id={id} className="mode-page">
      <section className="mode-hero">
        <img src={image} alt={imageAlt} className="mode-hero-media"/>
        <div className="mode-hero-overlay"/>
        <div className="mode-hero-copy">
          <div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>{eyebrow}</span></div>
          <h1 style={{fontFamily:serif,fontSize:'clamp(52px,8vw,108px)',fontWeight:300,lineHeight:.92,letterSpacing:'-.02em',color:CR,margin:0}}>{title}</h1>
          <p style={{fontFamily:sans,fontSize:16,color:CR6,maxWidth:560,lineHeight:1.85,fontWeight:300,margin:0}}>{description}</p>
          <div className="premium-chip-row">
            {badges.map(b=><div key={b} className="premium-chip" style={{background:'rgba(10,10,10,.35)',borderColor:G2,color:CR8}}>{b}</div>)}
          </div>
          <button onClick={onCta} className="premium-button" style={{alignSelf:'flex-start'}}>{ctaLabel}</button>
        </div>
      </section>
      <section className="mode-content">
        <div className="section-shell" style={{display:'flex',flexDirection:'column',gap:22}}>
          <div className="mode-panels">
            <div className="mode-panel">
              <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:34,height:34,border:`1px solid ${G2}`,background:G1,display:'flex',alignItems:'center',justifyContent:'center',color:G}}><BookOpen size={16}/></div><h3 className="mode-panel-title">What You Learn</h3></div>
              <div className="mode-card-grid">
                {learnItems.map(item=>(
                  <div key={item.title} className="mode-card">
                    <div className="mode-card-title">{item.title}</div>
                    <div className="mode-card-copy">{item.copy}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mode-panel">
              <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:34,height:34,border:`1px solid ${G2}`,background:G1,display:'flex',alignItems:'center',justifyContent:'center',color:G}}><Clock size={16}/></div><h3 className="mode-panel-title">How It Works</h3></div>
              <div className="mode-list">
                {steps.map((step,index)=>(
                  <div key={step} className="mode-list-item">
                    <div style={{width:26,height:26,border:`1px solid ${G2}`,background:index===0?G:G1,color:index===0?BK:G,fontFamily:mono,fontSize:8,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{String(index+1).padStart(2,'0')}</div>
                    <div className="mode-list-copy">{step}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mode-panel">
              <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:34,height:34,border:`1px solid ${G2}`,background:G1,display:'flex',alignItems:'center',justifyContent:'center',color:G}}><Users size={16}/></div><h3 className="mode-panel-title">Who It’s For</h3></div>
              <div className="mode-list">
                {audience.map(item=>(
                  <div key={item} className="mode-list-item">
                    <div className="mode-dot"/>
                    <div className="mode-list-copy">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {(mediaImage||supportPanel)&&(
            <div className="mode-gallery" style={{gridTemplateColumns:mediaImage?'1.05fr .95fr':'1fr'}}>
              {mediaImage&&(
                <div className="mode-gallery-media">
                  <img src={mediaImage} alt={mediaAlt||title}/>
                </div>
              )}
              {supportPanel&&(
                <div className="mode-support">
                  <div style={{display:'flex',alignItems:'center',gap:12}}><div style={{width:34,height:34,border:`1px solid ${G2}`,background:G1,display:'flex',alignItems:'center',justifyContent:'center',color:G}}><CheckCircle size={16}/></div><h3 className="mode-panel-title">{supportPanel.title}</h3></div>
                  <div className="mode-list">
                    {supportPanel.items.map(item=>(
                      <div key={item} className="mode-list-item">
                        <div className="mode-dot"/>
                        <div className="mode-list-copy">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// ─── PROGRAMS ─────────────────────────────────────────────────────────────────
const PROGRAMS=[
  {title:'Keyboard / Piano',desc:'Trinity-driven keyboard and piano lessons with technique, theory, and confident performance practice.',tag:'Music Program',image:REAL_PHOTOS.coursePiano,position:'center'},
  {title:'Guitar',desc:'Acoustic and contemporary guitar training with rhythm fluency, chords, and live-play confidence.',tag:'Music Program',image:REAL_PHOTOS.courseGuitar,position:'center'},
  {title:'Drums',desc:'Structured drum coaching focused on timing, coordination, rudiments, and expressive groove.',tag:'Music Program',image:REAL_PHOTOS.courseDrums,position:'center'},
  {title:'Violin',desc:'Bow control, notation, posture, and guided graded preparation inside a focused studio format.',tag:'Music Program',image:REAL_PHOTOS.courseViolin,position:'center'},
  {title:'Vocal',desc:'Voice culture, pitch control, breath work, and expressive singing for beginners to advanced learners.',tag:'Music Program',image:REAL_PHOTOS.courseVocal,position:'center'},
  {title:'Bharatanatyam',desc:'Classical dance training rooted in discipline, expression, rhythm, and stage presentation.',tag:'Classical Dance',image:REAL_PHOTOS.courseBharatanatyam,position:'center'},
  {title:'Dance',desc:'Western and contemporary dance classes that build energy, musicality, coordination, and confidence.',tag:'Performance Dance',image:REAL_PHOTOS.courseDance,position:'center'},
  {title:'Yoga',desc:'A calm, technique-led wellness format planned as part of the next Gennex expansion.',tag:'Coming Soon',image:REAL_PHOTOS.courseYoga,position:'center',upcoming:true},
  {title:'Zumba',desc:'A high-energy group fitness format planned for students seeking movement and rhythm together.',tag:'Coming Soon',image:REAL_PHOTOS.courseZumba,position:'center',upcoming:true},
];

function Programs(){
  const [hov,setHov]=useState(null);
  const go=()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'});
  const highlights=['Trinity-Oriented Learning','Premium Studio Setup','Free Trial Available','Yoga & Zumba Soon'];
  return(
    <section id="courses" style={{...sec()}}>
      <div className="section-shell">
        <div style={{display:'grid',gridTemplateColumns:'1.05fr .95fr',alignItems:'end',marginBottom:34,gap:28}}>
          <SectionHeading eyebrow="Signature Programs" title={<>Explore Our <em style={{color:G,fontStyle:'italic'}}>Disciplines</em></>} description="Each program at Gennex is designed with guided progression, performance preparation, and a premium classroom experience that feels focused from the first session." accent={R}/>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <div className="premium-chip-row" style={{justifyContent:'flex-end'}}>
              {highlights.map(item=><div key={item} className="premium-chip">{item}</div>)}
            </div>
          </div>
        </div>
        <div className="course-grid">
          {PROGRAMS.map(p=>(
            <div key={p.title} className="course-card" onMouseEnter={()=>setHov(p.title)} onMouseLeave={()=>setHov(null)} style={{borderColor:hov===p.title?G2:G1}}>
              <div className="course-media">
                <img src={p.image} alt={p.title} style={{objectPosition:p.position||'center',objectFit:p.fit||'cover',background:p.fit==='contain'?BK:'transparent'}}/>
              </div>
              <div className="course-overlay"/>
              <div className="course-content">
                <div className="course-tag" style={{color:p.upcoming?CR4:G}}>{p.tag}</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <h3 className="course-title">{p.title}</h3>
                  <p className="course-desc">{p.desc}</p>
                </div>
                <div className="course-meta">
                  <div className="premium-chip" style={{background:'rgba(10,10,10,.35)',borderColor:p.upcoming?G1:G2,color:p.upcoming?CR4:G}}>{p.upcoming?'Launching Soon':'Free Trial Available'}</div>
                  {!p.upcoming&&<button onClick={go} className="premium-button ghost">Book Trial <ChevronRight size={14}/></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:18}}>
          {[['Active Courses','7 disciplines open now'],['Online Support','Music courses available online'],['Coming Soon','Yoga and Zumba are next']].map(([title,text])=>(
            <div key={title} style={{background:CD,border:`1px solid ${G1}`,padding:'18px 20px'}}>
              <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.22em',textTransform:'uppercase',marginBottom:8}}>{title}</div>
              <div style={{fontFamily:sans,fontSize:13,color:CR8,fontWeight:500,lineHeight:1.6}}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED VIDEOS ──────────────────────────────────────────────────────────
const VIDEOS=[
  {id:'v1',title:'Annual Grand Concert 2024',cat:'Performance',thumb:'https://images.unsplash.com/photo-1453090927415-5f45085b65c0?auto=format&fit=crop&q=80&w=1200',dur:'12:45',url:'https://www.youtube.com/embed/dQw4w9WgXcQ'},
  {id:'v2',title:'Bharatanatyam Arangetram Highlights',cat:'Dance',thumb:'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?auto=format&fit=crop&q=80&w=1200',dur:'08:20',url:'https://www.youtube.com/embed/dQw4w9WgXcQ'},
  {id:'v3',title:'Advanced Drum Session — Studio Live',cat:'Music',thumb:'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?auto=format&fit=crop&q=80&w=1200',dur:'05:15',url:'https://www.youtube.com/embed/dQw4w9WgXcQ'},
];

function FeaturedVideos(){
  const [sel,setSel]=useState(null);
  const [hov,setHov]=useState(null);
  return(
    <section id="performances" style={{...sec(DP)}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64,flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Stage & Studio</span></div>
            <h2 style={{fontFamily:serif,fontSize:'clamp(34px,5vw,68px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1}}>Featured <br/><em style={{color:R}}>Performances</em></h2>
          </div>
          <p style={{fontFamily:sans,fontSize:14,color:CR4,maxWidth:320,fontWeight:300,lineHeight:1.8}}>Witness the talent and dedication of our students through captured moments of musical and rhythmic excellence.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:40}}>
          {VIDEOS.map((v,i)=>(
            <div key={v.id} onClick={()=>setSel(v.url)} onMouseEnter={()=>setHov(v.id)} onMouseLeave={()=>setHov(null)} style={{cursor:'pointer'}}>
              <div style={{position:'relative',aspectRatio:'16/9',overflow:'hidden',border:`1px solid ${hov===v.id?G2:G1}`,marginBottom:20,transition:'border-color .3s'}}>
                <img src={v.thumb} alt={v.title} style={{width:'100%',height:'100%',objectFit:'cover',filter:hov===v.id?'none':'grayscale(60%)',transition:'all .7s',transform:hov===v.id?'scale(1.08)':'scale(1)'}} referrerPolicy="no-referrer"/>
                <div style={{position:'absolute',inset:0,background:hov===v.id?'rgba(10,10,10,.12)':'rgba(10,10,10,.45)',transition:'background .4s',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{width:60,height:60,background:R,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',transform:hov===v.id?'scale(1.1)':'scale(1)',transition:'transform .3s'}}>
                    <Play fill="white" color="white" size={22} style={{marginLeft:3}}/>
                  </div>
                </div>
                <div style={{position:'absolute',bottom:12,right:12,padding:'4px 10px',background:'rgba(10,10,10,.85)',fontFamily:mono,fontSize:9,color:G,backdropFilter:'blur(4px)'}}>{v.dur}</div>
              </div>
              <span style={{fontFamily:mono,fontSize:9,color:G,letterSpacing:'.25em',textTransform:'uppercase',display:'block',marginBottom:8}}>{v.cat}</span>
              <h3 style={{fontFamily:serif,fontSize:18,fontWeight:300,color:hov===v.id?R:CR,transition:'color .3s',marginBottom:8}}>{v.title}</h3>
              <div style={{display:'flex',alignItems:'center',gap:6,fontFamily:mono,fontSize:8,color:CR3,letterSpacing:'.18em',textTransform:'uppercase'}}>
                <ExternalLink size={10}/><span>Watch on YouTube</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {sel&&(
        <div onClick={()=>setSel(null)} style={{position:'fixed',inset:0,zIndex:200,background:'rgba(10,10,10,.95)',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px'}}>
          <button onClick={()=>setSel(null)} style={{position:'absolute',top:28,right:36,background:'none',border:'none',color:CR,fontSize:32,cursor:'pointer',fontFamily:sans}}>×</button>
          <div style={{width:'100%',maxWidth:900,aspectRatio:'16/9',background:BK,border:`1px solid ${G2}`,overflow:'hidden'}}>
            <iframe width="100%" height="100%" src={sel} title="Video" frameBorder="0" allow="autoplay" allowFullScreen/>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
function Certifications(){
  const [hov,setHov]=useState(null);
  const certs=[
    {title:'Gennex Academy',desc:'Our own structured certification system across all courses — Foundation, Intermediate, and Advanced levels. Government authorized and recognized across India.',tag:'Government Authorized',icon:'🏅'},
    {title:'Trinity College London',desc:'World leading music exam board offering graded exams in 60+ countries since 1877. Our students earn globally recognized graded credentials.',tag:'International Board',icon:'🎓'},
  ];
  return(
    <section id="certifications" style={{...sec(),borderTop:`1px solid ${G1}`,borderBottom:`1px solid ${G1}`}}>
      <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Recognition</span></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1.1,marginBottom:24}}>
            Globally <em style={{color:G}}>Recognized</em> Credentials
          </h2>
          <p style={{fontFamily:sans,fontSize:15,color:CR6,lineHeight:1.85,fontWeight:300,marginBottom:36,maxWidth:420}}>
            Gennex students earn certifications that open doors worldwide. We partner with internationally respected boards to ensure every achievement is recognized.
          </p>
          <div style={{padding:'24px 28px',background:SF,borderLeft:`3px solid ${G}`}}>
            <div style={{fontFamily:sans,fontWeight:700,fontSize:13,color:CR,letterSpacing:'.05em',marginBottom:8,textTransform:'uppercase'}}>TN Government Registered — No. 298/2024</div>
            <div style={{fontFamily:sans,fontWeight:300,fontSize:12,color:CR4,lineHeight:1.7}}>Certifications are government-authorized and recognized across India and internationally.</div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {certs.map((c,i)=>(
            <div key={c.title} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{background:CD,border:`1px solid ${hov===i?G2:G1}`,padding:32,display:'flex',gap:24,alignItems:'flex-start',transition:'border-color .3s',cursor:'default'}}>
              <div style={{width:60,height:60,background:hov===i?G1:G3,border:`1px solid ${G1}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,flexShrink:0,transition:'background .3s'}}>{c.icon}</div>
              <div>
                <h4 style={{fontFamily:serif,fontSize:22,fontWeight:300,color:CR,marginBottom:8}}>{c.title}</h4>
                <p style={{fontFamily:sans,fontWeight:300,fontSize:12,color:CR4,lineHeight:1.75,marginBottom:16}}>{c.desc}</p>
                <span style={{padding:'5px 14px',border:`1px solid ${G2}`,fontFamily:mono,fontSize:8,letterSpacing:'.2em',textTransform:'uppercase',color:G}}>{c.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
const GALLERY_ITEMS=[
  {id:'g1',category:'Music',title:'Drum Practice Session',subtitle:'Young drummers building timing and control',image:REAL_PHOTOS.drumsStudent,alt:'Student practicing drums at Gennex'},
  {id:'g2',category:'Music',title:'Instrument Room',subtitle:'Keyboard and guitar stations inside the academy',image:REAL_PHOTOS.instrumentRoomAlt,alt:'Gennex instrument room with keyboards and guitars'},
  {id:'g3',category:'Music',title:'Practice Floor',subtitle:'A clean studio setup for steady music training',image:REAL_PHOTOS.instrumentRoom,alt:'Gennex music practice space'},
  {id:'g4',category:'Dance',title:'Summer Camp Visual',subtitle:'Dance and Bharatanatyam promotion creative',image:REAL_PHOTOS.summerCampPoster,alt:'Gennex summer camp poster',fit:'contain'},
  {id:'g5',category:'Dance',title:'Exam Day Energy',subtitle:'Students gathering for performance and evaluation',image:REAL_PHOTOS.exams,alt:'Students at Gennex during exam event'},
  {id:'g6',category:'Studio',title:'Reception Lounge',subtitle:'Premium welcome area for parents and students',image:REAL_PHOTOS.receptionTwo,alt:'Gennex reception lounge'},
  {id:'g7',category:'Studio',title:'Academy Entrance',subtitle:'The first look and feel of the Gennex studio',image:REAL_PHOTOS.nameBoard,alt:'Gennex academy name board'},
  {id:'g8',category:'Studio',title:'Welcome Desk',subtitle:'A warm, polished front-of-house experience',image:REAL_PHOTOS.receptionWide,alt:'Gennex reception interior'},
  {id:'g9',category:'Events',title:'Certificate Moment',subtitle:'Recognized achievement and celebration',image:REAL_PHOTOS.certificate,alt:'Gennex certificate event'},
  {id:'g10',category:'Events',title:'Student Gathering',subtitle:'Parents and learners during an academy event',image:REAL_PHOTOS.studentsOne,alt:'Gennex event with students and parents'},
  {id:'g11',category:'Events',title:'Assessment Day',subtitle:'A full-house session with students and families',image:REAL_PHOTOS.exams,alt:'Gennex exams day'},
];

function Gallery(){
  const filters=['Music','Dance','Studio','Events'];
  const [filter,setFilter]=useState('Music');
  const photos=GALLERY_ITEMS.filter(item=>item.category===filter);
  return(
    <section id="gallery" style={{...sec()}}>
      <div className="section-shell" style={{display:'flex',flexDirection:'column',gap:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:20,flexWrap:'wrap'}}>
          <SectionHeading eyebrow="Gallery" title={<>Life at <em style={{color:G,fontStyle:'italic'}}>Gennex</em></>} description="A calmer, more premium view of the academy: studio spaces, student moments, event highlights, and the atmosphere that shapes every class."/>
          <div className="gallery-filter-row">
            {filters.map(item=>(
              <button key={item} className={`gallery-filter${filter===item?' active':''}`} onClick={()=>setFilter(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="gallery-grid">
          {photos.map(p=>(
            <div key={p.id} className="gallery-card" style={{background:p.fit==='contain'?BK:CD}}>
              <img src={p.image} alt={p.alt} style={{objectFit:p.fit||'cover'}}/>
              <div className="gallery-copy">
                <div className="gallery-kicker">{p.category}</div>
                <h3 className="gallery-title">{p.title}</h3>
                <p className="gallery-subtitle">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyChooseUs(){
  const [hov,setHov]=useState(null);
  const reasons=[
    {title:'Personalized Learning',desc:'Small class sizes and individual attention for every student.',Icon:Users},
    {title:'Researched Curriculum',desc:'Designed with the future in mind, using modern audio-video resources.',Icon:PenTool},
    {title:'Holistic Growth',desc:'Focus on confidence, discipline, and stage presence.',Icon:Heart},
    {title:'Modern Facilities',desc:'State-of-the-art studios designed for creativity and focus.',Icon:Layout},
    {title:'Flexible Programs',desc:'Weekly classes, intensive courses, or custom packages.',Icon:Clock},
    {title:'Performance Exposure',desc:'Regular recitals, concerts, and competitions.',Icon:Award},
    {title:'Expert Faculty',desc:'Highly trained professionals with years of industry experience.',Icon:CheckCircle},
    {title:'Govt. Authorized',desc:'TN Govt Registered academy with authentic certification.',Icon:ShieldCheck},
  ];
  return(
    <section style={{...sec(DP)}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:64}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Why Choose Us</span><div style={{width:26,height:1,background:G}}/></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1}}>The <em style={{color:G}}>Gennex</em> Difference</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:G1,border:`1px solid ${G1}`}}>
          {reasons.map((r,i)=>(
            <div key={r.title} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{background:hov===i?SF:CD,padding:'32px 28px',transition:'background .3s',cursor:'default'}}>
              <div style={{width:44,height:44,background:hov===i?R:R1,border:`1px solid rgba(227,24,55,.2)`,display:'flex',alignItems:'center',justifyContent:'center',color:hov===i?'white':R,marginBottom:18,transition:'all .3s'}}>
                <r.Icon size={20}/>
              </div>
              <h3 style={{fontFamily:sans,fontWeight:700,fontSize:13,color:CR,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:10,lineHeight:1.3}}>{r.title}</h3>
              <p style={{fontFamily:sans,fontWeight:300,fontSize:12,color:CR4,lineHeight:1.75}}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACADEMIC EXCELLENCE ──────────────────────────────────────────────────────
function AcademicExcellence(){
  const levels=[
    {title:'Foundation Level',grades:'Initial, Grades 1–3',desc:'Beginner level, building core skills and fundamental techniques.',col:G},
    {title:'Intermediate Level',grades:'Grades 4–6',desc:'Developing and refining skills with increased complexity and expression.',col:R},
    {title:'Advanced Level',grades:'Grades 7–8',desc:'Mastering techniques and professional performance standards.',col:CR},
  ];
  return(
    <section style={{...sec(),borderTop:`1px solid ${G1}`}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:64}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Structured Learning</span><div style={{width:26,height:1,background:G}}/></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1}}>Academic <em style={{color:G}}>Excellence</em></h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:40}}>
          {levels.map((l,i)=>(
            <div key={l.title} style={{background:CD,border:`1px solid ${G1}`,padding:'36px 30px'}}>
              <div style={{width:40,height:40,background:`${l.col}15`,border:`1px solid ${l.col}30`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <BookOpen size={18} color={l.col}/>
              </div>
              <h3 style={{fontFamily:serif,fontSize:22,fontWeight:300,color:CR,marginBottom:8}}>{l.title}</h3>
              <div style={{fontFamily:mono,fontSize:8,color:l.col,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:14}}>{l.grades}</div>
              <p style={{fontFamily:sans,fontWeight:300,fontSize:13,color:CR6,lineHeight:1.75}}>{l.desc}</p>
            </div>
          ))}
        </div>
        <div style={{background:SF,border:`1px solid ${G1}`,padding:'48px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:56}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
              <Award size={26} color={G}/><h3 style={{fontFamily:serif,fontSize:24,fontWeight:300,color:CR}}>Certifications & Exams</h3>
            </div>
            <p style={{fontFamily:sans,fontWeight:300,fontSize:13,color:CR6,lineHeight:1.85,marginBottom:24}}>
              Students can participate in internationally recognized examinations. These help earn certifications recognized worldwide through our two certification partners.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[['Internal','Gennex School of Music and Dance'],['External','Trinity College London']].map(([t,v])=>(
                <div key={t} style={{background:BK,border:`1px solid ${G1}`,padding:'18px 20px'}}>
                  <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginBottom:7}}>{t}</div>
                  <div style={{fontFamily:sans,fontWeight:600,fontSize:12,color:CR,fontStyle:t==='External'?'italic':'normal'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:28}}>
            {[
              {Icon:GraduationCap,t:'Examination Criteria',d:'A minimum of 50–60 classes per grade, or based on syllabus completion. For students under 7 years, eligibility is based on syllabus completion only.'},
              {Icon:ClipboardCheck,t:'Terms & Conditions',d:'Each class is 1 hour. High attendance required. If a student misses 8 consecutive classes, re-admission is required.'},
            ].map(({Icon,t,d})=>(
              <div key={t} style={{display:'flex',gap:18,alignItems:'flex-start'}}>
                <div style={{width:40,height:40,background:G1,border:`1px solid ${G1}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <Icon size={18} color={G}/>
                </div>
                <div>
                  <h4 style={{fontFamily:sans,fontWeight:700,fontSize:13,color:CR,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:8}}>{t}</h4>
                  <p style={{fontFamily:sans,fontWeight:300,fontSize:12,color:CR4,lineHeight:1.8}}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI CHAT ──────────────────────────────────────────────────────────────────
function AIChat(){
  const [msgs,setMsgs]=useState([{role:'assistant',text:"Welcome to Gennex School of Music & Dance! 🎵\n\nI'm your personal course advisor powered by Claude AI. Tell me about yourself — your age, interests, or what you'd love to learn — and I'll recommend the perfect path for you!",actions:['Course details','Fee structure','Trial class booking','Trinity syllabus']}]);
  const [input,setInput]=useState('');
  const [typing,setTyping]=useState(false);
  const sr=useRef(null);
  useEffect(()=>{if(sr.current)sr.current.scrollTop=sr.current.scrollHeight;},[msgs,typing]);
  const send=async(override)=>{
    const msg=(override||input).trim();if(!msg)return;
    if(!override)setInput('');
    setMsgs(p=>[...p,{role:'user',text:msg}]);setTyping(true);
    try{
      const history=msgs.map(m=>({role:m.role==='assistant'?'assistant':'user',content:m.text}));
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,
          system:`You are the Gennex School of Music & Dance Course Advisor. Be warm, professional and concise.
Location: No.26, Sastri Nagar Main Road, Ponniammanmedu, Kolathur, Chennai — 600 110.
Contact: 90870 00552 / 90870 00553. Email: gennexschoolofmusicanddance@gmail.com
Courses: Keyboard, Guitar, Drums, Violin, Vocal Training, Bharatanatyam, Western Dance. Yoga and Zumba are coming soon.
Syllabus: Trinity College London — Foundation (Initial–Grade 3), Intermediate (Grades 4–6), Advanced (Grades 7–8).
Fees: ₹1200–₹3500/month. 1 hour classes. Mon–Sat 4:30PM–8:30PM, Sun 4PM–6PM.
Google Rating: 5.0. TN Govt Regd No. 298/2024. Free trial available. Always encourage free trial booking.`,
          messages:[...history,{role:'user',content:msg}]})});
      const d=await res.json();
      setMsgs(p=>[...p,{role:'assistant',text:d.content?.[0]?.text||"Please call us at 90870 00552!"}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',text:"I'm having trouble connecting right now. Please call us at 90870 00552 or visit our Kolathur studio!"}]);}
    finally{setTyping(false);}
  };
  const qs=['What courses do you offer?','Fee structure?','Trinity Grade 5 requirements?','Age limit for Bharatanatyam?','Book free trial'];
  return(
    <section id="advisor" style={{...sec(DP)}}>
      <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
        <div style={{position:'sticky',top:112}}>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>AI-Powered · Claude</span></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1.1,marginBottom:22}}>Meet Your<br/><em style={{color:G}}>Course Advisor</em></h2>
          <p style={{fontFamily:sans,fontSize:14,color:CR6,maxWidth:380,lineHeight:1.85,marginBottom:32,fontWeight:300}}>Not sure which course is right for you? Our Claude AI advisor recommends the perfect path based on your age, interests, and goals.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:40}}>
            {qs.map(q=>(
              <button key={q} onClick={()=>send(q)} style={tr({padding:'8px 14px',border:`1px solid ${G2}`,fontFamily:mono,fontSize:8,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:CR4,background:'transparent',cursor:'pointer'})}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=G;e.currentTarget.style.color=G;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=G2;e.currentTarget.style.color=CR4;}}>{q}</button>
            ))}
          </div>
          <div style={{paddingTop:28,borderTop:`1px solid ${G1}`}}>
            <div style={{fontFamily:mono,fontSize:8,color:CR4,letterSpacing:'.2em',textTransform:'uppercase',marginBottom:8}}>Class Timings</div>
            <div style={{fontFamily:sans,fontWeight:300,fontSize:13,color:CR6,lineHeight:2}}>Mon – Sat: 4:30 PM – 8:30 PM<br/>Sunday: 4:00 PM – 6:00 PM</div>
          </div>
        </div>
        <div style={{background:CD,border:`1px solid ${G1}`,display:'flex',flexDirection:'column',height:560,boxShadow:`0 24px 48px rgba(0,0,0,.5)`}}>
          <div style={{padding:'18px 22px',background:G3,borderBottom:`1px solid ${G1}`,display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:36,height:36,background:G,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:serif,fontWeight:700,color:BK,fontSize:15}}>G</div>
            <div>
              <div style={{fontFamily:sans,fontWeight:700,color:CR,fontSize:13}}>Gennex Advisor</div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginTop:2}}>
                <div style={{width:6,height:6,background:'#22c55e',borderRadius:'50%'}}/>
                <span style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.18em',textTransform:'uppercase'}}>Online · Claude AI</span>
              </div>
            </div>
          </div>
          <div ref={sr} style={{flex:1,overflowY:'auto',padding:'22px 20px',display:'flex',flexDirection:'column',gap:16}}>
            <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:'flex',gap:10,flexDirection:m.role==='user'?'row-reverse':'row'}}>
                <div style={{width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0,background:m.role==='assistant'?G:SF,color:m.role==='assistant'?BK:CR6,border:m.role==='user'?`1px solid ${G2}`:'none',fontFamily:serif}}>{m.role==='assistant'?'G':'U'}</div>
                <div style={{maxWidth:'84%',padding:'12px 14px',fontSize:12,fontFamily:sans,fontWeight:300,lineHeight:1.8,background:m.role==='assistant'?SF:`rgba(212,175,55,.08)`,border:`1px solid ${m.role==='assistant'?G1:G2}`,color:CR,borderRadius:m.role==='assistant'?'0 8px 8px 8px':'8px 0 8px 8px'}}>
                  {m.text.split('\n').map((l,j)=><p key={j} style={{margin:j>0?'5px 0 0':0}}>{l}</p>)}
                  {m.actions&&(
                    <div style={{display:'flex',flexWrap:'wrap',gap:5,marginTop:12,paddingTop:12,borderTop:`1px solid ${G1}`}}>
                      {m.actions.map(a=>(
                        <button key={a} onClick={()=>send(a)} style={tr({padding:'5px 11px',border:`1px solid ${G2}`,fontFamily:mono,fontSize:7,letterSpacing:'.1em',textTransform:'uppercase',color:G,background:'transparent',cursor:'pointer'})}
                          onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=BK;}}
                          onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=G;}}>{a}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing&&(
              <div style={{display:'flex',gap:10}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:G,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:BK,fontFamily:serif,flexShrink:0}}>G</div>
                <div style={{background:SF,border:`1px solid ${G1}`,padding:'12px 14px',borderRadius:'0 8px 8px 8px',display:'flex',gap:4,alignItems:'center'}}>
                  {[0,1,2].map(d=><div key={d} style={{width:5,height:5,borderRadius:'50%',background:G,animation:`bob .6s ${d*.12}s infinite`}}/>)}
                </div>
              </div>
            )}
          </div>
          <div style={{padding:'14px 16px',borderTop:`1px solid ${G1}`,background:`rgba(10,10,10,.5)`,display:'flex',gap:10}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Ask me anything about courses..." rows={1}
              style={{flex:1,background:SF,border:`1px solid ${G1}`,padding:'11px 16px',fontFamily:sans,fontSize:12,color:CR,outline:'none',resize:'none',fontWeight:300}}/>
            <button onClick={()=>send()} style={tr({background:G,color:BK,border:'none',padding:'0 16px',cursor:'pointer',display:'flex',alignItems:'center'})}
              onMouseEnter={e=>e.currentTarget.style.background=GL} onMouseLeave={e=>e.currentTarget.style.background=G}>
              <Send size={15}/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS=[
  {name:'Sowmya Rajesh',role:'Parent',rating:5,text:'The best music school in Kolathur. My son is learning Keyboard here and the coaching is excellent. The individual attention given to each student for Trinity exams is a big advantage.',badge:'Son cleared Trinity Grade 3 with 92%'},
  {name:'Karthik Raja',role:'Student (Drums)',rating:5,text:"Gennex is amazing! The drum studio is well-equipped and the master explains complex rhythms so easily. I've been coming here for 6 months and the progress is incredible.",badge:'Performing at local cultural events'},
  {name:'Bhuvaneshwari',role:'Parent (Bharatanatyam)',rating:5,text:'Excellent place for Bharatanatyam. The teachers are very disciplined and follow a proper methodology. My daughter looks forward to every class at your Sastri Nagar studio.',badge:'Recognized at Inter-School Dance Fest'},
];

function InitialsAvatar({name,size=44,active=true}){
  const initials=name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase();
  return(
    <div aria-label={name} style={{width:size,height:size,borderRadius:'50%',background:active?G:G1,border:`1px solid ${active?G2:G1}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:size>=44?11:9,fontWeight:700,letterSpacing:'.08em',color:active?BK:G,flexShrink:0}}>
      {initials}
    </div>
  );
}

function Testimonials(){
  const [idx,setIdx]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setIdx(p=>(p+1)%TESTIMONIALS.length),8000);return()=>clearInterval(t);},[]);
  const t=TESTIMONIALS[idx];
  return(
    <section style={{...sec(BK)}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:64}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Student Stories</span></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
          <div>
            <div style={{fontFamily:serif,fontSize:68,color:G,opacity:.2,lineHeight:.7,marginBottom:24}}>"</div>
            <p style={{fontFamily:serif,fontSize:'clamp(15px,2vw,22px)',fontWeight:300,color:CR,lineHeight:1.75,marginBottom:24,fontStyle:'italic'}}>{t.text}</p>
            <div style={{display:'flex',gap:3,marginBottom:16}}>{Array.from({length:t.rating}).map((_,i)=><Star key={i} size={13} fill={G} color={G}/>)}</div>
            <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16}}>
              <InitialsAvatar name={t.name} size={44}/>
              <div>
                <div style={{fontFamily:sans,fontWeight:700,color:CR,fontSize:14}}>{t.name}</div>
                <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.2em',textTransform:'uppercase',marginTop:3}}>{t.role}</div>
              </div>
            </div>
            <div style={{display:'inline-block',padding:'5px 13px',background:G1,border:`1px solid ${G2}`,fontFamily:mono,fontSize:7,letterSpacing:'.18em',textTransform:'uppercase',color:G}}>{t.badge}</div>
            <div style={{display:'flex',gap:10,marginTop:40,alignItems:'center'}}>
              {[ChevronLeft,ChevronRight].map((Icon,i)=>(
                <button key={i} onClick={()=>setIdx(p=>i===0?(p-1+TESTIMONIALS.length)%TESTIMONIALS.length:(p+1)%TESTIMONIALS.length)}
                  style={tr({width:40,height:40,border:`1px solid ${G2}`,background:'transparent',color:G,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'})}
                  onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=BK;}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=G;}}><Icon size={16}/></button>
              ))}
              <div style={{display:'flex',gap:6,marginLeft:4}}>
                {TESTIMONIALS.map((_,i)=><div key={i} style={{width:i===idx?20:5,height:5,background:i===idx?G:G2,borderRadius:3,transition:'all .3s'}}/>)}
              </div>
            </div>
          </div>
          <div style={{background:CD,border:`1px solid ${G1}`,padding:'36px'}}>
            <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.3em',textTransform:'uppercase',marginBottom:24}}>5.0 ★ Google Rating</div>
            {TESTIMONIALS.map((te,i)=>(
              <div key={i} onClick={()=>setIdx(i)} style={{padding:'16px 0',borderBottom:i<TESTIMONIALS.length-1?`1px solid ${G1}`:'none',cursor:'pointer',opacity:i===idx?1:.4,transition:'opacity .3s',display:'flex',gap:12,alignItems:'center'}}>
                <InitialsAvatar name={te.name} size={36} active={i===idx}/>
                <div>
                  <div style={{fontFamily:sans,fontWeight:i===idx?700:400,color:i===idx?CR:CR6,fontSize:13}}>{te.name}</div>
                  <div style={{fontFamily:mono,fontSize:7,color:G,letterSpacing:'.18em',textTransform:'uppercase',marginTop:3}}>{te.role}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:28,paddingTop:28,borderTop:`1px solid ${G1}`,textAlign:'center'}}>
              <div style={{fontFamily:serif,fontSize:40,fontWeight:700,color:G}}>1000+</div>
              <div style={{fontFamily:mono,fontSize:8,color:CR4,letterSpacing:'.25em',textTransform:'uppercase',marginTop:4}}>Students Trained</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
const SUMMER_CAMP_EVENT={
  title:'Summer Camp 2026',
  desc:'A premium holiday intensive for music, dance, and Bharatanatyam students who want structured classes, certification-focused training, and a stronger creative routine during the break.',
  date:'June 2026',
  duration:'32 Hours',
  loc:'Gennex Studio, Kolathur',
  seats:'35 Seats',
  badge:'Limited Seats',
  img:REAL_PHOTOS.summerCampPoster,
};

function EventCalendar(){
  return(
    <section id="events" style={{...sec(DP)}}>
      <div className="section-shell" style={{display:'flex',flexDirection:'column',gap:34}}>
        <SectionHeading eyebrow="Summer Highlight" title={<>Summer Camp <em style={{color:G,fontStyle:'italic'}}>Hero</em></>} description="One focused event, given the visual weight it deserves. The Summer Camp now reads like a premium academy offering instead of another generic card."/>
        <div className="event-hero">
          <div className="event-poster">
            <img src={SUMMER_CAMP_EVENT.img} alt={SUMMER_CAMP_EVENT.title}/>
          </div>
          <div className="event-copy">
            <div className="premium-chip-row">
              <div className="premium-chip" style={{borderColor:G2,color:G,background:G1}}>{SUMMER_CAMP_EVENT.badge}</div>
              <div className="premium-chip">Certification Focus</div>
            </div>
            <h3 style={{fontFamily:serif,fontSize:'clamp(36px,4vw,62px)',fontWeight:300,color:CR,lineHeight:1.02,margin:0}}>{SUMMER_CAMP_EVENT.title}</h3>
            <p style={{fontFamily:sans,fontSize:14,color:CR6,lineHeight:1.88,fontWeight:300,margin:0,maxWidth:540}}>{SUMMER_CAMP_EVENT.desc}</p>
            <div className="event-metrics">
              {[['Date',SUMMER_CAMP_EVENT.date],['Duration',SUMMER_CAMP_EVENT.duration],['Location',SUMMER_CAMP_EVENT.loc],['Availability',SUMMER_CAMP_EVENT.seats]].map(([label,value])=>(
                <div key={label} className="event-metric">
                  <div className="event-metric-label">{label}</div>
                  <div className="event-metric-value">{value}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <button onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})} className="premium-button">Enroll Now <ChevronRight size={14}/></button>
              <button onClick={()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})} className="premium-button ghost">Book Seat</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS=[
  {q:'What is the registration status of Gennex?',a:'Gennex School of Music & Dance is a TN Government Registered institution (Regd No. 298/2024). We provide authorized certifications recognized across India and internationally.'},
  {q:'Which syllabus do you follow for music?',a:'We follow the world-renowned Trinity College London syllabus for Keyboard, Guitar, Drums, and Vocal Training. Students earn globally recognized graded credentials.'},
  {q:'Do you offer free trial classes?',a:'Yes! We offer a complimentary trial session for all music and dance courses. Book through our website or call our Kolathur studio directly at 90870 00552.'},
  {q:'Where is the academy located?',a:'No.26, Sastri Nagar Main Road, Ponniammanmedu, Kolathur, Chennai — 600 110. A purpose-built facility designed for both music and dance training.'},
  {q:'What age groups do you cater to?',a:'We nurture talent across all age groups — from children as young as 5 years to adults. Foundation courses for children, intermediate/advanced programs for teens and adults.'},
  {q:'What are the fees and class timings?',a:'Monthly fees range from ₹1200–₹3500 depending on the course. Each class is 1 hour. Mon–Sat: 4:30 PM–8:30 PM, Sunday: 4:00 PM–6:00 PM.'},
];

function FAQ(){
  const [open,setOpen]=useState(0);
  const [search,setSearch]=useState('');
  const filtered=FAQS.filter(f=>!search||f.q.toLowerCase().includes(search.toLowerCase())||f.a.toLowerCase().includes(search.toLowerCase()));
  return(
    <section id="faq" style={{...sec()}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>FAQ</span></div>
        <h2 style={{fontFamily:serif,fontSize:'clamp(34px,4vw,62px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1,marginBottom:48}}>Common <em style={{color:G}}>Questions</em></h2>
        <div style={{position:'relative',marginBottom:36}}>
          <Search size={14} style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',color:CR4}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions..." style={{width:'100%',background:SF,border:`1px solid ${G1}`,padding:'13px 16px 13px 42px',fontFamily:sans,fontSize:13,color:CR,outline:'none',boxSizing:'border-box',fontWeight:300}}/>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:1}}>
          {filtered.map((f,i)=>(
            <div key={i} style={{background:CD,border:`1px solid ${G1}`}}>
              <button onClick={()=>setOpen(open===i?-1:i)} style={{width:'100%',padding:'20px 22px',display:'flex',justifyContent:'space-between',alignItems:'center',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',gap:16}}>
                <span style={{fontFamily:sans,fontWeight:600,color:open===i?G:CR,fontSize:13,transition:'color .2s'}}>{f.q}</span>
                <ChevronDown size={16} color={G} style={{transform:open===i?'rotate(180deg)':'none',transition:'transform .3s',flexShrink:0}}/>
              </button>
              {open===i&&<div style={{padding:'0 22px 20px',fontFamily:sans,fontWeight:300,fontSize:13,color:CR6,lineHeight:1.85}}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact(){
  const [form,setForm]=useState({name:'',phone:'',course:'',age:''});
  const [done,setDone]=useState(false);
  const upd=k=>e=>setForm(p=>({...p,[k]:e.target.value}));
  const sub=()=>{if(form.name&&form.phone){setDone(true);setTimeout(()=>setDone(false),6000);}};
  const inp={background:SF,border:`1px solid ${G1}`,padding:'13px 18px',fontFamily:sans,fontSize:13,color:CR,outline:'none',fontWeight:300,width:'100%',boxSizing:'border-box'};
  return(
    <section id="contact" style={{...sec(DP)}}>
      <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'start'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}><div style={{width:26,height:1,background:G}}/><span style={lbl()}>Reach Us</span></div>
          <h2 style={{fontFamily:serif,fontSize:'clamp(30px,4vw,56px)',fontWeight:300,color:CR,letterSpacing:'-.02em',lineHeight:1.1,marginBottom:22}}>Book Your <em style={{color:G}}>Free Trial</em></h2>
          <p style={{fontFamily:sans,fontSize:14,color:CR6,maxWidth:360,lineHeight:1.85,marginBottom:48,fontWeight:300}}>Visit our studio, call us, or fill the form to book the right class. We’ll guide you to the best program, batch, and teacher for your level.</p>
          {[{Icon:Phone,lbl:'Phone',val:'90870 00552\n90870 00553'},{Icon:Mail,lbl:'Email',val:'gennexschoolofmusicanddance@gmail.com'},{Icon:MapPin,lbl:'Address',val:'No.26, Sastri Nagar Main Road\nPonniammanmedu, Kolathur\nChennai — 600 110'},{Icon:Star,lbl:'Google Rating',val:'5.0 ★ Verified Reviews\nOfficial QR Verified',fill:G}].map(({Icon,lbl:l,val,fill})=>(
            <div key={l} style={{display:'flex',gap:18,alignItems:'flex-start',marginBottom:24}}>
              <div style={{width:42,height:42,background:G1,border:`1px solid ${G1}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:G}}><Icon size={16} fill={fill||'none'}/></div>
              <div>
                <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.25em',textTransform:'uppercase',marginBottom:6}}>{l}</div>
                <div style={{fontFamily:sans,fontWeight:300,color:CR8,fontSize:13,lineHeight:1.8,whiteSpace:'pre-line'}}>{val}</div>
              </div>
            </div>
          ))}
          <div style={{marginTop:28,padding:'18px 22px',background:SF,border:`1px solid ${G1}`}}>
            <div style={{fontFamily:mono,fontSize:8,color:G,letterSpacing:'.25em',textTransform:'uppercase',marginBottom:10}}>Class Timings</div>
            <div style={{fontFamily:sans,fontWeight:300,fontSize:13,color:CR6,lineHeight:1.9}}>Mon – Sat: 4:30 PM – 8:30 PM<br/>Sunday: 4:00 PM – 6:00 PM</div>
          </div>
          <div style={{marginTop:20,background:BK,border:`1px solid ${G1}`,overflow:'hidden'}}>
            <img src={REAL_PHOTOS.receptionWide} alt="Gennex School reception area" style={{width:'100%',maxHeight:360,objectFit:'cover',objectPosition:'center',display:'block',background:BK}}/>
          </div>
        </div>
        <div style={{background:CD,border:`1px solid ${G1}`,padding:'48px 44px',boxShadow:`0 24px 48px rgba(0,0,0,.5)`}}>
          <h3 style={{fontFamily:serif,fontWeight:300,fontStyle:'italic',fontSize:26,color:CR,marginBottom:32}}>Book a Free Trial Class</h3>
          {done?(
            <div style={{textAlign:'center',padding:'44px 0'}}>
              <div style={{fontFamily:serif,fontSize:52,color:G,marginBottom:14}}>✓</div>
              <div style={{fontFamily:serif,fontSize:20,color:CR,marginBottom:10}}>Request Received!</div>
              <div style={{fontFamily:sans,fontWeight:300,color:CR6,fontSize:13,lineHeight:1.7}}>We'll contact you within 24 hours to confirm your free trial class.</div>
            </div>
          ):(
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {[['name','Full Name','E.g. John Doe','text'],['phone','Phone','+91 00000 00000','tel']].map(([k,l,ph,t])=>(
                  <div key={k}><div style={{fontFamily:mono,fontSize:8,color:CR4,letterSpacing:'.25em',textTransform:'uppercase',marginBottom:7}}>{l}</div><input type={t} value={form[k]} onChange={upd(k)} placeholder={ph} style={inp}/></div>
                ))}
              </div>
              {[{k:'course',l:'Course of Interest',opts:['Keyboard','Guitar','Drums','Violin','Vocal Training','Bharatanatyam','Western Dance','Yoga (Coming Soon)','Zumba (Coming Soon)']},{k:'age',l:'Student Age Group',opts:['Under 7 years','7–12 years','13–18 years','Adult (18+)']}].map(({k,l,opts})=>(
                <div key={k}><div style={{fontFamily:mono,fontSize:8,color:CR4,letterSpacing:'.25em',textTransform:'uppercase',marginBottom:7}}>{l}</div>
                <select value={form[k]} onChange={upd(k)} style={{...inp,appearance:'none',color:form[k]?CR:CR4}}>
                  <option value="">Select...</option>{opts.map(o=><option key={o}>{o}</option>)}
                </select></div>
              ))}
              <button onClick={sub} style={tr({padding:'18px',background:G,color:BK,fontFamily:mono,fontSize:9,fontWeight:700,letterSpacing:'.32em',textTransform:'uppercase',border:'none',cursor:'pointer',marginTop:6})}
                onMouseEnter={e=>{e.currentTarget.style.background=GL;e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background=G;e.currentTarget.style.transform='none';}}>Request Free Trial →</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function OfflineClasses({setPage}){
  const goContact=()=>{
    setPage?.('home');
    if(window.location.hash) window.history.pushState(null,'',window.location.pathname+window.location.search);
    setTimeout(()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}),30);
  };
  return(
    <LearningModePage
      id="offline-class"
      eyebrow="Studio Learning"
      title={<>Learn Inside the <em style={{color:G,fontStyle:'italic'}}>Gennex Studio</em></>}
      description="A premium in-person learning format for students who benefit from live correction, studio discipline, faculty presence, and a stronger performance environment."
      image={REAL_PHOTOS.receptionTwo}
      imageAlt="Gennex studio reception area"
      badges={['In-Studio Training','Hands-On Correction','Performance Culture','Free Trial']}
      learnItems={[
        {title:'Keyboard / Piano',copy:'Technique, theory, finger control, and progressive repertoire inside the studio setup.'},
        {title:'Guitar / Drums',copy:'Rhythm-based classes with direct posture correction, coordination work, and guided drills.'},
        {title:'Vocal / Violin',copy:'Foundational listening, pitch development, posture, and expression with live faculty correction.'},
        {title:'Dance Tracks',copy:'Bharatanatyam and western dance classes with movement clarity, timing, and stage discipline.'},
      ]}
      steps={['Book a trial session and visit the academy','Meet the faculty and join the right discipline','Train weekly in the studio with structured guidance','Build toward exams, recitals, and confident performance']}
      audience={['Students in Kolathur and nearby areas','Beginners who need direct in-room correction','Learners preparing for Trinity or stage programs','Parents seeking a focused classroom environment']}
      supportPanel={{title:'Why families choose offline',items:['Live faculty observation during every class','Better posture, positioning, and instrument handling','A stronger sense of discipline and class routine','Natural social energy from learning inside the academy']}}
      ctaLabel="Book Offline Trial"
      onCta={goContact}
    />
  );
}

// ─── ONLINE CLASSES ───────────────────────────────────────────────────────────
function OnlineClasses({setPage}){
  const goContact=()=>{
    setPage?.('home');
    if(window.location.hash) window.history.pushState(null,'',window.location.pathname+window.location.search);
    setTimeout(()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}),30);
  };
  return(
    <LearningModePage
      id="online-class"
      eyebrow="Live Online Classes"
      title={<>Learn Music <em style={{color:G,fontStyle:'italic'}}>from Home</em></>}
      description="A clean remote format for students who want premium faculty guidance, structured weekly practice, and Trinity-oriented learning without travelling to the studio."
      image={REAL_PHOTOS.instrumentRoomAlt}
      imageAlt="Gennex online music class visual"
      badges={['1:1 Personal Class','1:2 Shared Class','1:4 Small Group','Trial Class Available']}
      learnItems={[
        {title:'Keyboard / Piano',copy:'Progressive online lessons with notation, finger control, and home practice planning.'},
        {title:'Guitar / Drums',copy:'Rhythm-led classes with guided coordination work and step-by-step correction.'},
        {title:'Violin / Vocal',copy:'Pitch, technique, expression, and consistent review in live online sessions.'},
        {title:'Exam Support',copy:'Structured Trinity-oriented learning with clear goals and regular progress review.'},
      ]}
      steps={['Book a trial and get a quick level check','Join the right format: 1:1, 1:2, or 1:4','Attend live guided sessions and receive practice notes','Build consistency with reviews and next-step goals']}
      audience={['Students outside Kolathur or outside Chennai','Learners who prefer a premium class-from-home setup','Students balancing school, travel, and focused practice','Parents who want structure, reviews, and easy follow-up']}
      mediaImage={REAL_PHOTOS.instrumentRoom}
      mediaAlt="Gennex online practice support visual"
      supportPanel={{title:'Benefits of online learning',items:['Learn from home in 1:1, 1:2, or 1:4 formats','Keep a steady weekly rhythm without travel time','Receive clear corrections and follow-up practice goals','Stay consistent even with school or family schedule changes']}}
      ctaLabel="Book Online Trial"
      onCta={goContact}
    />
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({setPage,page='home'}){
  const insta='https://www.instagram.com/gennex_schoolofmusicanddance/';
  const footerColumns=page==='offline'?[
    {heading:'Music',items:[{label:'Keyboard',href:'#courses'},{label:'Guitar',href:'#courses'},{label:'Drums',href:'#courses'},{label:'Violin',href:'#courses'}]},
    {heading:'Dance',items:[{label:'Bharatanatyam',href:'#courses'},{label:'Western Dance',href:'#courses'},{label:'Yoga (Soon)',href:'#courses'},{label:'Zumba (Soon)',href:'#courses'}]},
    {heading:'Academy',items:[{label:'Online Classes',action:'online'},{label:'Summer Camp',href:'#events'},{label:'Free Trial',href:'#contact'}]},
    {heading:'Info',items:[{label:'About Us',href:'#about'},{label:'FAQ',href:'#faq'},{label:'Contact Us',href:'#contact'}]},
  ]:[
    {heading:'Music',items:[{label:'Keyboard',href:'#courses'},{label:'Guitar',href:'#courses'},{label:'Drums',href:'#courses'},{label:'Violin',href:'#courses'}]},
    {heading:'Dance',items:[{label:'Bharatanatyam',href:'#courses'},{label:'Western Dance',href:'#courses'},{label:'Yoga (Soon)',href:'#courses'},{label:'Zumba (Soon)',href:'#courses'}]},
    {heading:'Academy',items:[{label:'Online Classes',action:'online'},{label:'Summer Camp',href:'#events'},{label:'Free Trial',href:'#contact'}]},
    {heading:'Info',items:[{label:'About Us',href:'#about'},{label:'FAQ',href:'#faq'},{label:'Contact Us',href:'#contact'}]},
  ];
  const go=id=>{
    setPage?.('home');
    if(window.location.hash) window.history.pushState(null,'',window.location.pathname+window.location.search);
    setTimeout(()=>document.querySelector(id)?.scrollIntoView({behavior:'smooth'}),30);
  };
  const openOnline=()=>{
    setPage?.('online');
    window.location.hash='online-class';
    window.scrollTo({top:0,behavior:'smooth'});
  };
  return(
    <footer style={{background:BK,borderTop:`1px solid ${G1}`,padding:'72px 64px 36px',fontFamily:sans}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:56,flexWrap:'wrap',gap:36}}>
          <div>
            <img src={REAL_PHOTOS.logo} alt="Gennex School of Music and Dance logo" style={{width:92,height:72,objectFit:'contain',marginBottom:12,display:'block'}}/>
            <div style={{fontFamily:serif,fontSize:22,fontWeight:700,color:R,textTransform:'uppercase',letterSpacing:'.1em',lineHeight:1.1}}>Gennex School</div>
            <div style={{fontFamily:serif,fontSize:15,fontWeight:300,color:G,letterSpacing:'.25em',textTransform:'uppercase'}}>of Music & Dance</div>
            <div style={{fontFamily:mono,fontSize:7,color:CR4,letterSpacing:'.3em',textTransform:'uppercase',marginTop:6}}>TN Govt Regd · Kolathur, Chennai</div>
            <p style={{maxWidth:240,fontWeight:300,color:CR4,fontSize:12,lineHeight:1.8,marginTop:12}}>Chennai's premier academy for performing arts. Nurturing rhythm and melody since 2010.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,110px)',gap:32}}>
            {footerColumns.map(col=>(
              <div key={col.heading}>
                <div style={{fontFamily:mono,fontSize:7,color:R,letterSpacing:'.25em',textTransform:'uppercase',marginBottom:18}}>{col.heading}</div>
                {col.items.map(item=><div key={item.label} onClick={()=>item.action==='online'?openOnline():go(item.href)} style={tr({fontWeight:300,fontSize:11,color:CR4,cursor:'pointer',marginBottom:12})}
                  onMouseEnter={e=>e.target.style.color=R} onMouseLeave={e=>e.target.style.color=CR4}>{item.label}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{paddingTop:24,borderTop:`1px solid ${R1}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <span style={{fontFamily:mono,fontSize:7,color:'rgba(250,249,246,.28)',letterSpacing:'.1em',textTransform:'uppercase'}}>© 2025 Gennex School of Music & Dance. TN Govt Regd No. 298/2024. Chennai, Tamil Nadu.</span>
          <div style={{display:'flex',gap:8}}>
            {[[Instagram,insta],[Facebook,null]].map(([Icon,url],i)=>(
              <div key={i} onClick={()=>url&&window.open(url,'_blank','noopener,noreferrer')} style={tr({width:36,height:36,border:`1px solid ${R1}`,display:'flex',alignItems:'center',justifyContent:'center',color:CR4,cursor:url?'pointer':'default'})}
                onMouseEnter={e=>{e.currentTarget.style.background=R;e.currentTarget.style.color='white';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color=CR4;}}><Icon size={15}/></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState(getPageFromHash);
  useEffect(()=>{
    const link=document.createElement('link');
    link.href='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap';
    link.rel='stylesheet';document.head.appendChild(link);
    document.body.style.margin='0';document.body.style.padding='0';document.body.style.background='#0A0A0A';
    return()=>{try{document.head.removeChild(link);}catch{}};
  },[]);
  useEffect(()=>{
    const sync=()=>setPage(getPageFromHash());
    window.addEventListener('hashchange',sync);
    return()=>window.removeEventListener('hashchange',sync);
  },[]);
  return(
    <div style={{background:'#0A0A0A',color:'#FAF9F6',minHeight:'100vh',fontFamily:'"Space Grotesk",system-ui,sans-serif'}}>
      <style>{premiumStyles}</style>
      <Navbar setPage={setPage}/>
      {page==='online'?(
        <>
          <OnlineClasses setPage={setPage}/>
          <Footer setPage={setPage} page="online"/>
        </>
      ):page==='offline'?(
        <>
          <OfflineClasses setPage={setPage}/>
          <Footer setPage={setPage} page="offline"/>
        </>
      ):(
        <>
          <Hero/>
          <Ticker/>
          <About/>
          <Programs/>
          <Certifications/>
          <Gallery/>
          <WhyChooseUs/>
          <AcademicExcellence/>
          <AIChat/>
          <Testimonials/>
          <EventCalendar/>
          <FAQ/>
          <Contact/>
          <Footer setPage={setPage} page="home"/>
        </>
      )}
    </div>
  );
}

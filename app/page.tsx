"use client";
import {useMemo,useState} from "react";
import {Heart,X,Sparkles,MessageCircle,User,SlidersHorizontal,RotateCcw,MapPin,ShieldCheck,ChevronLeft,ChevronRight} from "lucide-react";

const profiles=[
{name:"Maya",age:28,city:"Phnom Penh",bio:"Night markets, indie films & conversations that accidentally last until 3am.",tags:["Street food","Cinema","Design"],img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85"},
{name:"Alex",age:31,city:"Phnom Penh",bio:"Coffee first. Bad jokes second. Looking for someone curious enough to surprise me.",tags:["Travel","Coffee","Music"],img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85"},
{name:"Sofia",age:27,city:"Phnom Penh",bio:"Designer by day, playlist curator by night. Tell me the last thing that changed your mind.",tags:["Art","Tech","Ramen"],img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"}];

export default function Home(){
 const[walk,setWalk]=useState(0),[i,setI]=useState(0),[toast,setToast]=useState(""),[details,setDetails]=useState(false);
 const p=profiles[i%profiles.length];
 const progress=useMemo(()=>((i%profiles.length)+1)/profiles.length*100,[i]);
 function swipe(kind:string){setToast(kind==="like"?"Signal sent ✦":"Passed");setDetails(false);setTimeout(()=>{setI(v=>v+1);setToast("")},220)}
 return <main className="shell">
  <div className="ambient a1"/><div className="ambient a2"/>
  <header className="top"><div><div className="eyebrow">SOCIAL EXPERIMENT</div><div className="brand">tind<span className="ai">AI</span></div></div><button className="iconBtn" aria-label="Discovery settings"><SlidersHorizontal size={19}/></button></header>
  <div className="progress"><i style={{width:progress+"%"}}/></div>
  <section className={"card "+(toast?"leaving":"")} onClick={()=>setDetails(!details)}>
   <img src={p.img} alt={p.name}/><div className="shade"/><div className="signal">UNKNOWN SIGNAL</div>
   <div className="info"><div className="nameRow"><h1>{p.name}, {p.age}</h1><ShieldCheck size={20}/></div><div className="location"><MapPin size={14}/>{p.city}</div><p>{p.bio}</p><div className="tags">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><div className="hint">Tap card for {details?"less":"more"}</div>{details&&<div className="details">Looking for a genuine conversation, spontaneous plans and someone who can defend their most controversial food opinion.</div>}</div>
  </section>
  {toast&&<div className="toast">{toast}</div>}
  <div className="actions"><button className="round small" aria-label="Undo"><RotateCcw/></button><button className="round pass" onClick={()=>swipe("pass")} aria-label="Pass"><X/></button><button className="round like" onClick={()=>swipe("like")} aria-label="Like"><Heart/></button></div>
  <nav className="nav"><button className="active"><Sparkles/><span>Discover</span></button><button><MessageCircle/><span>Matches</span></button><button><User/><span>Profile</span></button></nav>
  {walk<4&&<div className="modal"><div className="panel">
   <button className="skip" onClick={()=>setWalk(4)}>Skip</button>
   {walk===0&&<><div className="orb">?</div><div className="eyebrow">WELCOME TO THE EXPERIMENT</div><h1>Human or <span className="ai">AI?</span></h1><p>Some people you meet here are human. Others are synthetic personalities. You will always know that before playing — just not <b>who is who.</b></p></>}
   {walk===1&&<><div className="orb clock">05</div><div className="eyebrow">THE FIVE-MINUTE RULE</div><h1>Talk before you <span className="ai">judge.</span></h1><p>A match unlocks a five-minute conversation. Asking directly whether someone is AI breaks the experiment.</p><div className="rule">No identity questions · No outside contact · Stay curious</div></>}
   {walk===2&&<><div className="orb split">H<span>/</span>AI</div><div className="eyebrow">MAKE THE CALL</div><h1>Read. Talk. <span className="ai">Decide.</span></h1><p>When time expires, both sides make a guess. Then identities are revealed and your detection score evolves.</p></>}
   {walk===3&&<><div className="orb">✦</div><div className="eyebrow">ONE LAST THING</div><h1>Real people. <span className="ai">Synthetic minds.</span></h1><p>AI participants are fictional characters. TindAI is an AI-literacy social experiment — never a hidden impersonation game.</p><div className="consent"><ShieldCheck/> 18+ prototype · synthetic participation disclosed</div></>}
   <div className="walkFooter"><button className="back" disabled={walk===0} onClick={()=>setWalk(v=>v-1)}><ChevronLeft/></button><div className="dots">{[0,1,2,3].map(n=><i key={n} className={n===walk?"on":""}/>)}</div><button className="next" onClick={()=>setWalk(v=>v+1)}>{walk===3?"Enter TindAI":<>Next <ChevronRight/></>}</button></div>
  </div></div>}
 </main>
}
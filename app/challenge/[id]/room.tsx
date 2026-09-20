"use client";
import{useEffect,useRef,useState}from"react";
import{useRouter}from"next/navigation";

type M={id:number;sender_profile_id:string;body:string;created_at:string};

const QUICK=[
  "What’s your most useless talent?",
  "Describe your perfect terrible date 😂",
  "What would your friends warn me about?"
];

const REPLIES=[
  "I can fold a fitted sheet. So either I’m marriage material or definitely an AI. 😌",
  "Perfect terrible date? Karaoke, one microphone, zero talent, maximum confidence. Your turn 😂",
  "My friends would warn you that I steal fries after saying I’m not hungry. Classic criminal behavior.",
  "Plot twist: maybe I’m testing whether YOU are AI. 👀",
  "I once waved back at someone who was waving at the person behind me. Still recovering.",
  "My red flag? I say “one more episode” with absolutely no respect for mathematics. 😇",
  "Okay detective, that question was dangerously good. I’m not giving you an easy answer 😏"
];

export default function ChatRoom({conversation,target,myProfileId,initial,justMatched=false}:{conversation:any,target:any,myProfileId:string,initial:M[],justMatched?:boolean}){
  const router=useRouter();
  const [messages,setMessages]=useState<M[]>(initial);
  const [body,setBody]=useState("");
  const [left,setLeft]=useState(300);
  const [sending,setSending]=useState(false);
  const [showMatch,setShowMatch]=useState(justMatched);
  const [replyIndex,setReplyIndex]=useState(0);
  const [demoGuess,setDemoGuess]=useState<"human"|"ai"|null>(null);
  const bottom=useRef<HTMLDivElement>(null);

  useEffect(()=>{const t=window.setInterval(()=>setLeft(x=>Math.max(0,x-1)),1000);return()=>window.clearInterval(t)},[]);
  useEffect(()=>{bottom.current?.scrollIntoView({behavior:"smooth",block:"nearest"})},[messages,sending]);

  function sendText(text:string){
    const clean=text.trim();
    if(!clean||left<=0||sending)return;
    const stamp=Date.now();
    setMessages(x=>[...x,{id:stamp,sender_profile_id:myProfileId,body:clean,created_at:new Date().toISOString()}]);
    setBody("");
    setSending(true);
    const answer=REPLIES[replyIndex%REPLIES.length];
    setReplyIndex(i=>i+1);
    window.setTimeout(()=>{
      setMessages(x=>[...x,{id:stamp+1,sender_profile_id:"demo-match",body:answer,created_at:new Date().toISOString()}]);
      setSending(false);
    },550);
  }

  function send(e:React.FormEvent){e.preventDefault();e.stopPropagation();sendText(body)}
  const mm=String(Math.floor(left/60)).padStart(2,"0"),ss=String(left%60).padStart(2,"0");

  if(demoGuess)return <main className="challengeShell"><section className="guessGate demoResult"><p className="eyebrow">DEMO REVEAL</p><h1>{demoGuess==="ai"?"🤖 Nice guess!":"💞 Bold choice!"}</h1><p>This demo chat is simulated — no server request, redirect or AI API is used.</p><button type="button" onClick={()=>router.replace("/discover")}>Back to discovery</button></section></main>;

  return <main className="challengeShell">
    {showMatch&&<div className="matchModal"><div className="matchBox"><div className="matchEmoji">❤️</div><h1>It’s a Match!</h1><p>But is {target.display_name} real or AI?</p><strong>You have 5 minutes to find out.</strong><button type="button" onClick={()=>setShowMatch(false)}>Start chatting</button></div></div>}
    <header className="challengeHead"><div><p className="eyebrow">5-MINUTE CHALLENGE</p><h2>{target.display_name}, {target.age}</h2></div><div className="challengeTools"><div className={left<30?"timer danger":"timer"}>{mm}:{ss}</div><button type="button" className="closeChallenge" onClick={()=>router.replace("/discover")} aria-label="Close challenge">×</button></div></header>
    <div className="ruleStrip">GAME RULES · Don’t ask directly “Are you AI or human?” · No outside contact · Trust your instincts.</div>
    <section className="chatStream">
      {messages.length===0&&<div className="chatIntro">The clock is running. Pick a question or improvise. Try not to fall in love with the algorithm. 😉</div>}
      {messages.map(m=><div key={m.id} className={m.sender_profile_id===myProfileId?"bubble mine":"bubble theirs"}>{m.body}</div>)}
      {sending&&<div className="bubble theirs typing">{target.display_name} is typing…</div>}
      <div ref={bottom}/>
    </section>
    {left>0&&messages.length<6&&<div className="quickQuestions">{QUICK.map(q=><div role="button" tabIndex={0} className="quickQuestion" key={q} onClick={()=>sendText(q)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();sendText(q)}}} aria-disabled={sending}>{q}</div>)}</div>}
    {left>0?<form className="composer" onSubmit={send}><input value={body} maxLength={240} onChange={e=>setBody(e.target.value)} placeholder="Message…" disabled={sending}/><button type="submit" disabled={!body.trim()||sending}>{sending?"…":"Send"}</button></form>:<section className="guessGate"><p className="eyebrow">TIME. MAKE THE CALL.</p><h1>Who were you talking to?</h1><div className="demoGuessButtons"><button type="button" onClick={()=>setDemoGuess("human")}>HUMAN</button><button type="button" onClick={()=>setDemoGuess("ai")}>AI</button></div></section>}
  </main>
}
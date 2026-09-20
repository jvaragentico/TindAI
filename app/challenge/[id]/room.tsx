"use client";
import{useEffect,useRef,useState}from"react";
import{useRouter}from"next/navigation";
import{guess}from"../actions";

type M={id:number;sender_profile_id:string;body:string;created_at:string};

const QUICK=[
  "What’s your most useless talent?",
  "Describe your perfect terrible date 😂",
  "What would your friends warn me about?",
  "Choose: tacos forever or Wi-Fi forever?",
  "Tell me something suspiciously human."
];

const REPLIES=[
  "I can fold a fitted sheet. So either I’m marriage material or definitely an AI. 😌",
  "Perfect terrible date? Karaoke, one microphone, zero talent, maximum confidence. Your turn 😂",
  "My friends would warn you that I steal fries after saying I’m not hungry. Classic criminal behavior.",
  "Wi-Fi forever. Tacos can’t send memes at 2 AM… although now I’m questioning everything. 🌮",
  "Suspiciously human? I opened the fridge three times today hoping new food would spawn.",
  "Plot twist: maybe I’m testing whether YOU are AI. 👀",
  "I once waved back at someone who was waving at the person behind me. Still recovering.",
  "My red flag? I say “one more episode” with absolutely no respect for mathematics. 😇",
  "Okay detective, that question was dangerously good. I’m not giving you an easy answer 😏",
  "Final clue: I have opinions about pineapple on pizza, but you’ll have to guess which side. 🍍"
];

export default function ChatRoom({conversation,target,myProfileId,initial,justMatched=false}:{conversation:any,target:any,myProfileId:string,initial:M[],justMatched?:boolean}){
  const router=useRouter();
  const [messages,setMessages]=useState<M[]>(initial);
  const [body,setBody]=useState("");
  const [now,setNow]=useState(Date.now());
  const [status,setStatus]=useState(conversation.status);
  const [sending,setSending]=useState(false);
  const [showMatch,setShowMatch]=useState(justMatched);
  const [replyIndex,setReplyIndex]=useState(0);
  const bottom=useRef<HTMLDivElement>(null);
  const end=new Date(conversation.expires_at).getTime();
  const left=Math.max(0,Math.ceil((end-now)/1000));

  useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),250);return()=>clearInterval(t)},[]);
  useEffect(()=>{if(left===0&&status==="active")setStatus("guessing")},[left,status]);
  useEffect(()=>bottom.current?.scrollIntoView({behavior:"smooth"}),[messages]);

  function sendText(text:string){
    const clean=text.trim();
    if(!clean||left<=0||sending)return;
    const mine:M={id:Date.now(),sender_profile_id:myProfileId,body:clean,created_at:new Date().toISOString()};
    setMessages(x=>[...x,mine]);
    setBody("");
    setSending(true);
    const answer=REPLIES[replyIndex%REPLIES.length];
    setReplyIndex(i=>i+1);
    window.setTimeout(()=>{
      const theirs:M={id:Date.now()+1,sender_profile_id:"demo-match",body:answer,created_at:new Date().toISOString()};
      setMessages(x=>[...x,theirs]);
      setSending(false);
    },650);
  }

  function send(e:React.FormEvent){e.preventDefault();sendText(body)}
  const mm=String(Math.floor(left/60)).padStart(2,"0"),ss=String(left%60).padStart(2,"0");

  return <main className="challengeShell">
    {showMatch&&<div className="matchModal"><div className="matchBox"><div className="matchEmoji">❤️</div><h1>It’s a Match!</h1><p>But is {target.display_name} real or AI?</p><strong>You have 5 minutes to find out.</strong><button onClick={()=>setShowMatch(false)}>Start chatting</button></div></div>}
    <header className="challengeHead"><div><p className="eyebrow">5-MINUTE CHALLENGE</p><h2>{target.display_name}, {target.age}</h2></div><div className="challengeTools"><div className={left<30?"timer danger":"timer"}>{mm}:{ss}</div><button type="button" className="closeChallenge" onClick={()=>router.replace("/discover")} aria-label="Close challenge">×</button></div></header>
    <div className="ruleStrip">GAME RULES · Don’t ask directly “Are you AI or human?” · No outside contact · Trust your instincts.</div>
    <section className="chatStream">
      {messages.length===0&&<div className="chatIntro">The clock is running. Pick a question or improvise. Try not to fall in love with the algorithm. 😉</div>}
      {messages.map(m=><div key={m.id} className={m.sender_profile_id===myProfileId?"bubble mine":"bubble theirs"}>{m.body}</div>)}
      {sending&&<div className="bubble theirs typing">{target.display_name} is typing…</div>}
      <div ref={bottom}/>
    </section>
    {left>0&&messages.length<6&&<div className="quickQuestions">{QUICK.slice(0,3).map(q=><button type="button" key={q} onClick={()=>sendText(q)} disabled={sending}>{q}</button>)}</div>}
    {left>0?<form className="composer" onSubmit={send}><input value={body} maxLength={240} onChange={e=>setBody(e.target.value)} placeholder="Message…" disabled={sending}/><button disabled={!body.trim()||sending}>{sending?"…":"Send"}</button></form>:<section className="guessGate"><p className="eyebrow">TIME. MAKE THE CALL.</p><h1>Who were you talking to?</h1><form action={guess}><input type="hidden" name="conversation" value={conversation.id}/><button name="guess" value="human">HUMAN</button><button name="guess" value="ai">AI</button></form></section>}
  </main>
}
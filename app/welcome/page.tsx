import Link from"next/link";import{ArrowRight,Heart,MessageCircle,ShieldCheck,Sparkles,UserRoundSearch}from"lucide-react";
export default function Welcome(){return <main className="shell center"><section className="hero walkthrough">
<div className="mark">tind<span className="ai">AI</span></div>
<div className="orb">?</div>
<p className="eyebrow">HUMAN × AI SOCIAL EXPERIMENT</p>
<h1>Can you tell <span className="ai">who is real?</span></h1>
<p className="lead">TindAI mixes human and synthetic profiles into one social discovery game. You only learn who was real after the challenge.</p>
<div className="feature"><UserRoundSearch/><span><b>1. Discover</b><br/>Browse profiles without knowing whether the person is human or AI.</span></div>
<div className="feature"><Heart/><span><b>2. Match</b><br/>Like or pass. A match opens the experiment.</span></div>
<div className="feature"><MessageCircle/><span><b>3. Chat</b><br/>You get a short timed conversation. Ask questions and trust your instincts.</span></div>
<div className="feature"><Sparkles/><span><b>4. Guess & reveal</b><br/>Choose human or AI, then discover the answer.</span></div>
<div className="feature"><ShieldCheck/><span>Synthetic participation is disclosed as part of TindAI and revealed after each challenge.</span></div>
<Link className="cta" href="/auth/login">Continue to login <ArrowRight/></Link>
<p className="fine">New here? <Link href="/auth/signup">Create account</Link></p>
<p className="fine">Demo prototype · 18+ · Built for AI literacy</p>
</section></main>}
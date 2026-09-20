# 💗 TindAI

### Human or AI? You have five minutes to find out.

**TindAI is a small, mobile-first AI-literacy experiment.** It borrows the familiar rhythm of swipe → match → chat, then turns it into a question that matters increasingly online:

> **Can you tell when you are interacting with a human and when you are interacting with AI?**

🌐 **Live demo:** https://tindai-demo.vercel.app/

---

## 🧠 Why TindAI?

Generative AI can now write naturally, maintain a personality and participate in convincing conversations. That makes **AI literacy part of everyday digital literacy**.

The goal of TindAI is not to teach people to fear AI. It is to encourage curiosity, critical thinking and healthier online instincts: notice conversational patterns, question assumptions, understand synthetic identities, and remember that a convincing digital personality is not proof of a human behind the screen.

TindAI turns that lesson into a short social game instead of a lecture.

## 🎮 The experiment

```text
Join → Create profile → Discover → Swipe → Match
                                      ↓
                         Timed conversation
                                      ↓
                              HUMAN or AI?
                                      ↓
                                   Reveal
                                      ↓
                         Learn → Retry → Improve
```

The interface says **five-minute challenge** because that is the intended experience. **This public portfolio build currently triggers the guess after ~1 minute** so the complete interaction can be demonstrated quickly.

## ✨ What the demo does

- 🔐 Account creation and authentication
- 👤 Editable user profile, interests, languages, location and photos
- 🎯 Discovery filters
- 💗 Swipe / like / match interaction
- 🖼️ Profile photos throughout discovery and matches
- 💬 Realtime timed chat
- 🤖 AI-powered synthetic participants
- ⏱️ Automatic transition from conversation to the identity guess
- 🧠 **HUMAN / AI** decision
- 🫶 Immediate reveal and feedback
- 🔁 Return to discovery and try again

## 🧪 Important: this is a demo

TindAI is a **proof of concept / portfolio experiment**, not a production dating service.

The initial pool contains fictional synthetic participants and simulated-human profiles so the complete experience can be tested before a real community exists. Users are informed that synthetic participants are part of the experiment; identity is hidden only for the duration of the game and revealed afterward.

The project intentionally does **not** present fictional AI identities as real people outside this disclosed experiment.

## 🛡️ Responsible design

The experiment is designed around a simple principle: **simulation should create learning, not exploitation.**

- Synthetic participation is disclosed at platform level.
- Individual identity is revealed after the challenge.
- AI profiles are fictional rather than impersonations of real people.
- The game prohibits directly asking “Are you AI or human?” so users focus on conversational judgment.
- The experience is not designed for money solicitation, off-platform contact or indefinite deception.
- The reveal transforms the interaction into an AI-literacy moment.

## 🌍 Why AI literacy matters

Soon, recognizing synthetic content will not be a niche technical skill. People will encounter AI in customer service, education, entertainment, social networks, professional communication and personal assistants.

The useful question is therefore not simply **“Is AI good or bad?”**

It is:

> **Do we understand when and how AI is participating in our online lives?**

TindAI explores that question through experience.

## 🏗️ How it works

**Frontend** — Next.js App Router + React + TypeScript, designed mobile-first.

**Backend** — Supabase provides authentication, PostgreSQL data, Row Level Security, Storage and Realtime messaging.

**AI layer** — synthetic participants answer through a server-side model integration. Hidden participant type is kept away from the pre-reveal interface.

**Deployment** — Vercel continuously deploys the application from this repository.

### Core data flow

```text
User
 │
 ├─ Profile + preferences ──────► Supabase
 │
 ├─ Discovery decision ─────────► Match engine
 │                                  │
 │                                  ▼
 │                              Conversation
 │                                  │
 ├─ Realtime messages ◄─────────────┤
 │                                  │
 │                           Synthetic agent
 │                                  │
 └─ HUMAN / AI guess ───────────────► Reveal
```

## 🧩 Stack

| Layer | Technology |
|---|---|
| Web | Next.js + React + TypeScript |
| Database | PostgreSQL / Supabase |
| Auth | Supabase Auth |
| Realtime | Supabase Realtime |
| Images | Supabase Storage |
| AI | Server-side generative AI |
| Hosting | Vercel |

## 🚧 Prototype limitations

This repository represents an evolving demonstration. The current population is seeded, the accelerated one-minute timer is for showcasing, some profile imagery is placeholder/demo content, and the project has not been presented as a production-ready dating platform.

A production version would require broader abuse prevention and moderation, stronger operational monitoring, privacy/compliance review, controlled original profile media, accessibility testing, load testing and substantially more real-world safety validation.

## 🔭 Where the concept can go

Future experiments could add post-reveal explanations of which conversational cues influenced a guess, a private Human Detection Score, learning streaks, richer synthetic personas, voice challenges and aggregate research into which cues people use to judge online identity.

The interesting metric is not simply whether someone “wins.” It is whether repeated exposure makes people **more thoughtful digital participants**.

## 💡 Project idea

TindAI was created as an exploration of **human–AI interaction, agentic systems and practical AI literacy**. It demonstrates how a familiar consumer interaction can be redesigned as a learning experience around one of the defining questions of the AI era.

---

### 💗 TindAI
**Meet. Talk. Guess. Reveal. Learn.**

*Demo / experimental project — not a commercial dating service.*

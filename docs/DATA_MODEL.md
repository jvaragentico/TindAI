# TindAI data model — Step 5

The production database is the source of truth.

## Public, RLS-protected
- profiles / profile_photos / preferences / discovery_settings
- likes / matches
- conversations — one five-minute challenge per match
- messages — realtime transcript, max 1200 characters/message
- guesses — human-or-AI decision
- reports / blocks — safety controls

## Private, server-only
- private.participant_identity — human, simulated_human, synthetic_agent
- private.agent_personas — archetype, hidden traits, memory summary, model config

Identity is deliberately separated from public profiles. Clients cannot query participant type before reveal.

## Challenge lifecycle
waiting → active → guessing → revealed → closed

`start_challenge(match_id)` creates a server-timed five-minute window.
`submit_guess(conversation_id, guess)` refuses guesses while the challenge is still active.
`get_reveal(conversation_id)` is the only reveal path and requires authentication, conversation ownership, and a submitted guess.

## Realtime
`public.messages` is included in `supabase_realtime`. RLS limits transcript reads/writes to the authenticated conversation owner. AI/simulated replies will be written by trusted server-side code in the next step, never by exposing a secret key to the browser.

## Safety
Reports and blocks are ownership-scoped. Synthetic persona configuration is private. Agent defaults prohibit money solicitation and external-contact requests.

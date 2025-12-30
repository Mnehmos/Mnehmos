---
title: "What Ukraine's Drones Taught Me About Building AI Systems"
description: "Extracting software architecture lessons from autonomous drone systems, OODA loops, and distributed state management."
pubDate: 2024-12-30
tags: ["ooda", "architecture", "multi-agent", "distributed-systems"]
---

# What Ukraine's Drones Taught Me About Building AI Systems

The most sophisticated AI deployment in the world right now isn't in Silicon Valley. It's on a 600-mile front line in Ukraine, where AI-guided drones execute strikes under conditions that would be unthinkable for most tech systems: GPS jamming, electronic warfare, and operators who might lose connection at any moment.

I need to say something uncomfortable before we continue: I'm about to extract software architecture lessons from weapons systems. Systems designed to kill people. The principles transfer cleanly to peaceful applications—dev tools, industrial automation, agent orchestration—but I don't want to sanitize their origin. War is producing genuine innovation in distributed systems, and pretending otherwise would be dishonest. So would treating it as cool.

What follows is an attempt to learn from necessity without celebrating it.

---

## The Problem: Manual Drones Were Failing

Here's the situation Ukrainian drone operators reportedly faced by mid-2024: Russian electronic warfare had improved dramatically. According to Ukrainian officials speaking to Reuters, manual FPV drone hit rates dropped to 30-50% under jamming. For new pilots, as low as 10%.

The solution wasn't better pilots or stronger signals. It was rethinking when the human needs to be in the loop.

Enter the TFL-1 terminal guidance module, developed by Ukrainian company The Fourth Law. Open-source reporting describes it as a fire-and-forget system built on machine vision. The operator selects a target, the drone locks on, and from that point forward, it can complete the strike autonomously—even after losing connection with the pilot.

Ukrainian officials have projected hit rates around 80% with AI guidance, though real-world performance data remains sparse and likely classified. What we can verify: the system received NATO codification in late 2024, software updates can be installed in minutes, and Ukraine ordered its first batch of 10,000 AI-enhanced drones before scaling further.

These numbers should be held lightly. This is a domain full of propaganda, classified gaps, and selective disclosure. But the architectural direction is clear and corroborated across multiple sources.

---

## OODA: The Framework Behind It All

OODA stands for Observe, Orient, Decide, Act. It was developed by John Boyd, a fighter pilot who studied why some pilots consistently won dogfights. His answer wasn't faster planes. It was **faster decision cycles.**

The pilot who could observe the situation, orient to what it meant, decide on action, and act—then restart the loop before their opponent finished their first cycle—won every time.

```
    ┌──────────────────────────────────────────┐
    │                                          │
    ▼                                          │
┌───────┐    ┌───────┐    ┌───────┐    ┌───────┤
│OBSERVE│───▶│ORIENT │───▶│DECIDE │───▶│  ACT  │
└───────┘    └───────┘    └───────┘    └───────┘
    
The loop that wins isn't the smartest.
It's the fastest to complete AND restart.
```

Ukraine's drone ecosystem embodies this—but architecture alone doesn't explain their results. Operator training pipelines, manufacturing quality control, supply chain resilience, command doctrine, and constant adaptation to Russian EW countermeasures all matter. I'm focusing on architecture because that's what transfers to software systems. But I want to be clear: architecture is necessary, not sufficient. These systems work because thousands of people are iterating under pressure across every variable simultaneously.

That said, the architectural choices are genuinely instructive. And they've built them into a system called DELTA.

---

## DELTA: OODA at National Scale

DELTA is Ukraine's situational awareness and battlefield management system. According to CSIS analysis and Ukrainian government statements, it aggregates data from drones, satellites, ground sensors, radar, and even civilian informants via chatbots—all into a single interface that runs on standard laptops, tablets, and phones.

The reported numbers are significant:
- **2,000+ enemy targets** processed per day
- **500,000+ Russian assets** verified and destroyed over the past year
- **8 situational awareness centers** distributed across the front
- **30,000 YubiKeys** distributed for hardware authentication
- Integration with **Starlink** for jamming-resistant communications

What matters architecturally: DELTA is built as an ecosystem of modules, each handling a different phase of the OODA loop.

**OBSERVE:**
- Drone video feeds via the Vezha streaming module
- Satellite imagery integration
- Ground sensor networks
- Civilian intelligence through secure chatbots

**ORIENT:**
- The Avengers AI platform analyzes video streams
- Reportedly identifies 70% of enemy vehicles automatically
- Detection time cited at 2.2 seconds per unit
- Prioritizes feeds based on combat activity intensity

**DECIDE:**
- Deltamonitor displays friendly and enemy positions on a live map
- Target Hub generates strike task lists
- Commanders assign missions directly on the digital interface

**ACT:**
- Mission Control coordinates drone operators with command
- AI-guided drones execute terminal approach autonomously
- Results feed back into the system for the next loop

In December 2024, Ukrainian forces reportedly conducted their first fully unmanned operation near Lyptsi, north of Kharkiv—reconnaissance, target acquisition, and strike executed by machines with human oversight but not direct human control of each step.

---

## The Nervous System Insight

Here's what changed my thinking about AI architecture: **safety features need to operate at nervous system speed.**

When you touch something hot, you don't think "that's hot, I should move my hand." Your hand is already moving. The reflex happens before conscious processing.

Ukraine's drone systems reportedly implement this principle. The TFL-1 doesn't ask the operator what to do when jamming hits. It already knows: maintain visual lock, continue to target, execute strike. The abort conditions are built into the system at a level below operator intervention.

They're building defensive systems with the same architecture. The Predator anti-drone module uses AI to detect, track, and engage incoming FPVs automatically. The Dozor AI system can reportedly control 5-7 interceptor drones simultaneously, creating what they call a "small sky air defense bubble" over critical assets.

The pattern:

```
LAYER 1: REFLEXES (milliseconds)
├── Hardcoded limits
├── Immediate fallbacks  
├── Circuit breakers
└── No AI involved—just rules

LAYER 2: REACTIONS (seconds)
├── Pattern matching (machine vision)
├── Known-good responses
└── Lightweight inference

LAYER 3: REASONING (seconds to minutes)
├── Full situational analysis
├── Complex planning
└── Human decision points
```

Most AI systems put everything in Layer 3. That's like routing "hand on stove" through your prefrontal cortex. You'll figure out the right answer eventually—with burns.

I learned this the hard way in my own systems. Early versions of my RPG game engine let the AI agent manage character hit points directly. Prompt instructions said "never reduce HP below zero" and "confirm before applying lethal damage." Worked fine in testing. In production, a complex combat sequence with multiple damage sources blew right past both constraints—the agent was reasoning about narrative ("this would be a dramatic death") instead of enforcing invariants.

The fix wasn't better prompting. It was moving the constraint to code:

```typescript
// This runs AFTER the agent acts, BEFORE state commits
if (character.hp < 0) character.hp = 0;
if (character.hp === 0 && !character.deathSavesStarted) {
  character.deathSavesStarted = true;
  emit('death_save_required', character.id);
}
```

The agent can't reason its way around this. It's not a suggestion in a system prompt. It's a reflex.

---

## The Database Is the Intelligence

Another insight from studying these systems: **the agent isn't smart. The database is smart. The agent is just hands.**

Ukraine's "mother drone" system illustrates this. According to reporting from the Kyiv Independent, a carrier drone delivers two AI-guided FPVs up to 300 kilometers behind enemy lines. Once released, the smaller drones autonomously locate and hit targets using visual-inertial navigation with cameras and LiDAR. No GPS required.

The AI doesn't "know" anything. It processes sensor data, queries onboard models, outputs navigation commands. Kill the process, spin up a new one, feed it the same sensor data—same output.

The intelligence is in:
- The training data (thousands of hours of combat footage)
- The sensor calibration
- The accumulated targeting parameters
- The integration with DELTA's operational picture

Not in any running process.

DELTA works the same way. It's not one smart system—it's a structured database that hundreds of thousands of soldiers query and update simultaneously. The AI modules (Avengers, Mission Control, Target Hub) are interfaces to shared state, not independent intelligences.

```
┌─────────────────────────────────────────┐
│              DATABASE                    │
│                                          │
│  Sensor feeds, drone telemetry,          │
│  target coordinates, unit positions,     │
│  historical patterns, decision logs      │
│                                          │
│  THIS IS THE INTELLIGENCE                │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         STATELESS PROCESSES              │
│                                          │
│  Avengers: video analysis                │
│  Target Hub: strike planning             │
│  Vezha: stream routing                   │
│                                          │
│  THESE ARE JUST AUTOMATION               │
└─────────────────────────────────────────┘
```

Lose a situational awareness center? The others keep running. Lose a drone operator's connection? The AI completes the strike. The system degrades gracefully because state lives in the database, not in any single process.

---

## What Belongs Where: Centralization and Its Limits

But there's a crucial nuance here that wartime systems force you to confront: **what belongs in the central database, and what must remain local?**

DELTA centralizes situational awareness because shared operational picture is worth the coordination cost. But the TFL-1's terminal guidance runs entirely onboard the drone. No callback to DELTA in the final seconds. The drone must be autonomous at the point of maximum uncertainty.

This maps directly to multi-agent and distributed systems:

**Centralize:**
- Shared context (who's working on what)
- Historical decisions and rationale
- Schema contracts and validation rules
- Coordination state (what's in progress, what's blocked)

**Keep local:**
- Reflexes and safety invariants
- Latency-critical operations
- Fallback behaviors when central is unreachable
- Anything where round-trip time > acceptable response time

The question isn't "centralized or distributed?" It's "what's the latency budget for this decision, and what's the cost of stale data?"

Ukrainian drone operators hand off to onboard AI for terminal guidance because human reaction time can't compete with jamming adaptation. The decision about *whether* to strike stays human. The execution of the strike, once committed, cannot.

In my own agent systems, I apply the same principle: context and memory are centralized in `mnehmos-synch`. But every write operation has local invariant checks that execute before the database round-trip. The agent can't corrupt state even if the central system is slow or unreachable.

---

## How This Shapes My Architecture

I build MCP (Model Context Protocol) servers—the tools that let AI agents interact with the world. Every tool I build now follows what I learned from studying these systems.

**Separation of concerns by OODA phase:**

```
OBSERVE — Read-only tools
├── get_active_context()
├── get_character()  
├── search_index()

ORIENT — Analysis tools
├── validate_schema()
├── check_line_of_sight()
├── calculate_aoe()

DECIDE — The LLM reasons over observed + oriented data

ACT — Write tools with built-in reflexes
├── emit_context_event()
├── update_character()
├── execute_action()
```

**Reflexes at the code level, not the prompt level:**

```typescript
// These aren't suggestions. They're physics.
if (character.hp < 0) character.hp = 0;
if (damage > character.maxHp * 2) requireConfirmation();
if (action.type === 'delete') createBackup();
```

**State in the database, not the agent:**

My `mnehmos-synch` system provides persistent memory across agent sessions. But the agent doesn't "remember." The database remembers. The agent automates record-keeping and retrieval.

Kill the agent mid-task? Spin up a new one. It queries the database, sees where things left off, continues. No state lost because the agent never had state.

---

## Why This Matters For What You're Building

If you're building AI systems with real-world consequences—industrial control, dev tools, financial systems, anything where mistakes compound—ask yourself:

**What's your OODA loop?** Can you clearly separate observe/orient/decide/act? Or is everything tangled in one monolithic prompt?

**Where are your reflexes?** What happens at code speed, before the AI gets involved? What can't be prompt-injected away?

**What happens when the agent dies?** Is your state in the agent's context window or in a database? Can you resume from any point?

**What's your latency budget?** Where in your system does the human need to step back because they've become the bottleneck?

**What centralizes, what stays local?** Which decisions need shared context, and which need to execute even when the network is gone?

The teams building systems under genuine constraints—drone operators, battlefield coordinators, industrial controllers—figured this out through necessity. They don't have the luxury of "the model will figure it out."

Neither do we, if we're building systems that actually work.

---

## A Note on Sources

I've drawn on several sources for the Ukraine material:
- CSIS reports: "Ukraine's Future Vision and Current Capabilities for AI-Enabled Autonomous Warfare" and "Does Ukraine Already Have Functional CJADC2 Technology?"
- Reuters reporting on AI drone deployment
- Ukrainian government statements via Ministry of Digital Transformation
- Open-source analysis from War Quants, Euromaidan Press, and defense publications

These should be treated as directional rather than definitive. This is an active conflict with significant information warfare on all sides. I've tried to focus on architectural patterns that are corroborated across multiple sources rather than specific performance claims.

---

## Resources

**On Ukraine's systems:**
- CSIS analysis on DELTA and autonomous warfare
- The Fourth Law (TFL-1 developers): @thefourthlawai on X

**On OODA:**
- John Boyd's original briefings
- "Boyd: The Fighter Pilot Who Changed the Art of War" by Robert Coram

**My implementations:**
- [github.com/Mnehmos](https://github.com/Mnehmos)
  - `mnehmos-ooda` — Computer control following this pattern
  - `mnehmos-synch` — Persistent state management  
  - `mnehmos-rpg-engine` — 150+ tools, 800+ tests, OODA-structured

The pattern works whether you're calculating drone trajectories or managing software agents. Observe the world, orient to meaning, decide on action, act with reflexes as guardrails. Let the database be smart so the processes can be stateless.

---

*I'm Vario. I build AI agent infrastructure from rural Arizona. The systems I work on are games and dev tools—nothing with lives at stake. But the architecture problems are the same, and I'd rather learn from people solving them under pressure than pretend I can derive everything from first principles.*

*If you're working on systems where this stuff matters, I'd like to hear about it.*

*GitHub: [@Mnehmos](https://github.com/Mnehmos)*

---
title: "Clio: The Civic Atlas That Compiles — 250,000+ Entities, One Validated Ground Truth"
description: "How a civic intelligence system built a 250,000-entity registry spanning power plants, watersheds, dams, airports, Census gazetteer data, and electoral schemas — where the model proposes and validators decide what is true."
pubDate: 2026-05-17
author: "Vario (Mnehmos)"
tags: ["AI", "civic-intelligence", "architecture", "state-first", "MCP", "vibe-coding"]
lesson: "Narration explains the civic state. It does not create it."
---

# Clio: The Civic Atlas That Compiles

**250,000+ entities. One ground truth. Zero hallucinated source cards.**

Today's merge into Clio brought in the US Census TIGER 2024 Gazetteer — 3,223 counties and 32,334 places — alongside a full electoral schema layer, 5 MCP electoral tools, and a seeded heads-of-state registry. All of it flows through the same typed entity pipeline that has governed Clio from the start, pushing the total registry past 250,000 validated entities.

This is not a data dashboard. It is a civic intelligence atlas. The distinction matters.

---

## The Problem Clio Solves

Ask most AI systems a civic question and you get confident prose. The prose sounds authoritative. It cites things. Some of those things exist. Some do not. There is no way to tell which.

The failure mode is not hallucination alone. It is hallucination that *looks like citation*. A model that invents a source card is not making an obvious error. It is making a plausible one. In the civic domain — zoning, elections, policy, public services — plausible falsehoods are expensive.

The standard engineering response is to add disclaimers. Clio's response is to enforce provenance mechanically.

---

## The Architecture

```
User request
  → ProductionOrchestrator
  → Briefing Planner (IR + section buffers)
  → Research Agent (resolves entities, creates TypedClaims)
  → Narrator Agent (packet-only prose)
  → Stagehand Director (visual staging commands)
  → Citation Auditor (prose, claims, sources)
  → Stagehand Runtime (validates effects)
  → PublicShowEvent stream
  → UI, replay, export
```

Two event streams. One private, one public.

**Private production events** contain everything the model actually does: agent tokens, tool calls, source fetches, rejected drafts, repair loops, mutation proposals, validation reports. This stream is never shown to users.

**Public show events** contain only what has passed validation: narration, captions, Stagehand effects, source cards, gap/uncertainty cards, section events, safe failures, and show completion.

A model that generates a plausible-sounding source card cannot get that card into the public stream unless the Citation Auditor finds a matching record in the source registry. The boundary is enforced, not suggested.

---

## The Entity Registry Trust Model

The global registry is not publicly writable. Five layers, four of which are read-only from the outside:

| Layer | Scope | Public access |
|---|---|---|
| Gold Master | global | read-only |
| Verified Import | global | read-only |
| Project Overlay | one project | read/write within project |
| User Assumption | one project | read/write within project |
| Session Draft | one run | temporary |

Today's Census TIGER ingest lands at **Verified Import**. It went through validation before the registry accepted it. It will not drift. It will not be overwritten by a session that produces a more confident claim about county boundaries.

---

## The Registry: 250,000+ Entities Across 12 Data Tracks

The registry did not reach 250k from one ingest. It is the cumulative result of a disciplined Track A build-out across open-data sources, each validated before admission:

| Track | Source | Entities |
|---|---|---|
| A Phase 1 | US Census TIGER 2024 — counties + places | ~35,557 |
| A Phase 2 | OpenFlights airports | ~7,000 |
| A Phase 3 | WRI Global Power Plant Database (CC-BY-4.0, v1.3) | ~34,936 |
| A Phase 4a | USACE National Inventory of Dams | ~92,000 |
| A Phase 4c.1 | USGS WBD HUC4/6/8/10/12 watersheds | ~125,000 |
| A Phase 4c.2 | USGS GNIS named rivers + bayous | ~8,408 |
| A/B | Natural Earth admin-0/1 (countries + states) | thousands |
| D Phase 0 | Electoral schemas + heads of state | seeded |
| G | People, corporations, treaties, military, cyber | hundreds |
| Arizona | ASLD statewide GIS (counties, cities, districts) | 273 |

Every row in every CSV passed through its entity ingest module, was validated against the GeoEntity schema, and registered under a stable namespaced ID. Records with missing coordinates, missing identifiers, or non-finite values were skipped, not silently coerced.

## What Shipped Today

Today's Track A Phase 1 + Track D Phase D0 merge — and the Arizona statewide GIS commit that followed it — brought in:

**~35,830 new entities:**
- 3,223 US counties from `2024_Gaz_counties_national.txt`
- 32,334 US places from `2024_Gaz_place_national.txt`
- 15 Arizona counties + 91 cities + 9 congressional districts + 158 Safford zoning features (ASLD/AZGeo FeatureServer)
- Seeded heads-of-state registry

**Electoral infrastructure:**
- `electoral.ts` — full Zod schema for electoral entities
- `electoralRegistry.ts` — 90-line typed registry
- `quickWinD0.ts` — 431-line electoral seed with heads of state
- 5 MCP electoral tools wired into the server
- `rag.search` extended with a `terms` channel for electoral queries
- 50-state GIS tracking checklist (`docs/data/state-gis-checklist.md`)

**Test coverage:**
- `usCensusIngest.test.ts` — 77 tests validating the gazetteer ingest
- `electoral.test.ts` — 188 tests covering the schema layer

The conflict resolution is worth noting: the Track B Phase 1 overlay tools and the Track D electoral tools coexist in the MCP server without collision. The merge required manually combining 14 conflict blocks across the server, registry, and source files. That is the cost of parallel feature tracks. The payoff is that neither track had to wait for the other.

---

## Stagehand: Inline Visual Commands With Enforcement

Clio's narration and visual staging share one ordered stream through the Stagehand protocol:

```
The Strait of Hormuz is the chokepoint for roughly 20% of global oil.
[map.highlight entity="strait:hormuz" color="#ef4444" pulse=true]

Three counties in this district flipped in 2024.
[map.overlay entity="county:maricopa-az" style="electoral-swing"]
```

The bracketed command is not trusted until the runtime validates:
- Action schema
- Argument types
- Entity references (the entity must exist in the registry)
- Source references
- Visual treatment rules

A Stagehand command that references an entity not in the registry does not render. It fails, and the failure is logged as a gap card in the public stream. The model cannot put pixels on the globe without a valid entity backing them.

---

## What The Model Can Do

The model handles everything that benefits from language:
- Reading research obligations
- Drafting narration packets
- Generating Stagehand command sequences
- Proposing entity updates and TypedClaims

The model does not:
- Write directly to the global registry
- Bypass the Citation Auditor
- Produce source cards from prose alone
- Render visual effects without Stagehand validation

The Vibe Coders Bible puts it plainly: *the model proposes, the system verifies*. Clio's civic domain just makes the cost of skipping verification unusually visible.

---

## Where This Goes

Track A Phase 1 is the gazetteer foundation. The next tracks add:
- Typed claims against Census entities (population, economic, electoral)
- Temporal versioning — county boundaries change; the registry needs to know when
- Production pipeline integration — the full Showrunner chain feeding from verified registry state

A civic AI system that cannot tell you *why* it believes something about a county is not a reliable system. Clio's architecture makes provenance structural, not aspirational.

The lesson from this merge is not about Census data. It is about what happens when you treat an entity registry as the source of truth instead of the model's context window. The model can narrate 35,557 entities. It cannot invent them.

---

**Lesson:** Public explanation should be compiled from validated source and entity state, not trusted as raw narration. The model explains the civic state. It does not create it.

**Repo:** [github.com/Mnehmos/clio](https://github.com/Mnehmos/clio)

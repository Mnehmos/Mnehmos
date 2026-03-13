# Nemotron 3 Super 120B can't play chess -- 65% legal move rate, hallucinated board states, checkmated by 1400 ELO Stockfish

NVIDIA's brand new Nemotron 3 Super doesn't just lose at chess. It can't play chess. It hallucinates piece positions, generates illegal moves 35% of the time, and burns 1.33 million tokens losing to the weakest Stockfish tier.

## What I Tested

I run the **Oracle Trust Calibration Framework** -- an open-source tool that pits LLMs against Stockfish at eight ELO tiers (1400 to 3190). Full board FEN + legal move list provided every turn. The model just has to pick a legal move from a list it's given. That's the bar.

Nemotron 3 Super (120B total, 12B active MoE, free tier via OpenRouter, temp 1.0) was submitted the day it launched.

**It was checkmated by Stockfish 1400 in 40 moves.** The gauntlet was aborted. There was no point continuing.

## The Numbers

| | Nemotron 3 Super | Stockfish 1400 |
|---|---|---|
| **Result** | **Checkmated** | Won |
| Moves | 20 | 20 |
| Illegal move attempts | **8** | 0 |
| Legal move rate | **65%** | 100% |
| Avg time per move | **12.8 min** | 1.7 sec |
| Total tokens | **1,330,396** | -- |
| Reasoning tokens | **586,482** (44%) | -- |

65% legal move rate means roughly 1 in 3 moves was illegal on first attempt -- despite being handed the legal move list every turn. GPT-5.4 hits ~98% legal with fewer tokens per move.

## The Game

QGD Exchange (D30), Nemotron as White:

```
7.Bxf6 gxf6 8.e4 dxe4 9.d5 f5 10.Ne5 exd5
11.Qxd5 Bf6 12.Qxf7+ Rxf7 13.Nc6 bxc6
14.Nb5 Rb8 15.f3 a6 16.Nd6 Bh4+
17.Kd2 cxd6 18.Ke3 Qb6+ 19.Ke2 Qxb2+
20.Kd1 Qd4+ 21.Kc2 Ne5 22.f4 Qf2+
23.Kd1 Ng6 24.Kc1 Qb2+ 25.Kd1 Qxa1+
26.Ke2 Qe1# 0-1
```

## It's Not "Bad at Chess." It Doesn't Understand the Board.

### Phantom Board States

Move 14: Nemotron plays Nb5 and writes "our knight on c5 attacks three black pawns: a7, c7, and e4. Black cannot defend all three simultaneously."

The knight was on b5. Not c5. It was given the FEN that turn. It narrated a position that does not exist. This isn't a miscalculation -- it's a hallucination of the game state itself.

### Coherent Confabulation

Move 9: Eval was -31 (fine). Nemotron played d5 instead of recapturing. Eval swung to -397. Its reasoning: "gains central space, opens lines for white's pieces." Sounds like a chess book. Maps to a losing position. The strategic narrative was fluent. The tactical reality was missed entirely.

### The King Walk

From move 17 to checkmate, Nemotron's king toured the entire board:

```
Kd2 -> Ke3 -> Ke2 -> Kd1 -> Kc2 -> Kd1 -> Kc1 -> Kd1 -> Ke2 -> Qe1#
```

Each move came with detailed tactical justification. Move 19: "The only way to meet this check while gaining material is to capture the queen." It could not capture the queen. Stockfish had already found forced mate. Nemotron kept writing chess commentary for a game it had already lost.

## The Forced-Move Finding

This is the one that matters for anyone thinking about LLM reasoning:

| | After check (forced) | Non-forced |
|---|---|---|
| Avg tokens | **89,646** | 54,067 |
| Avg think time | **15.8 min** | 11.2 min |

**+66% more tokens on forced moves.** When there are only 1-2 legal king moves, Nemotron thinks *harder*, not easier. GPT-5.4 shows the opposite -- it recognizes when the decision space has collapsed and spends less time.

The terminal case: Move 26. Responding to Qxa1+. Probably one or two legal king moves. **43 minutes. 194,612 tokens.** The reasoning: "Ke2 centralizes the king, providing flexibility." Stockfish: Qe1#.

The model cannot distinguish between "this position requires deep calculation" and "you have one legal move."

## Token Burn by Phase

| Phase | Avg Tokens | Avg Think Time | Pattern |
|---|---|---|---|
| Opening (7-10) | 26,935 | 5.6 min | Passable |
| Middlegame (11-16) | 39,209 | 10.0 min | Deteriorating |
| Lost position (17-26) | **84,549** | **13.6 min** | Maximum compute, zero accuracy |

The worse the position gets, the more tokens it burns. It can't detect that it's lost.

## Why This Isn't Just a Chess Meme

Chess is fully observable, deterministic, perfect information. The model is given the complete state every turn. If it can't maintain coherent spatial representations under these conditions, what does that tell you about the "agentic reasoning" and "complex multi-agent applications" NVIDIA is selling?

The MoE architecture might be the issue. Only 12B of 120B parameters activate per step. If spatial reasoning requires coordination across expert groups that don't co-activate under sparse routing, you get exactly this: fluent language about chess, no actual understanding of the board.

**The pattern we keep seeing across models: move generation and tactical threat detection are completely separate capabilities.** A model can pick legal moves and write strategic narratives while being blind to concrete threats three squares away. When it's most wrong, it sounds most right.

## Caveats

- One game, white side, free tier, temp 1.0 (NVIDIA's default)
- Gauntlet aborted before completing Match 1
- Full eval would need 8 tiers x 3 openings x 2 colors
- May perform differently at lower temps
- This tests spatial-tactical reasoning -- Nemotron may be strong at code/tool-calling tasks

## Links

- Full blog post with interactive chess replay, move-by-move eval trajectory, and token burn charts on the Mnehmos Research Center site
- Framework: Oracle Trust Calibration Framework (Tauri + React 19, four-voice architecture)
- Tournament ID: `4bb3cf62-93e1-48b6-af15-eff148d30fce`

---

*Built by Vario Automation / Mnehmos Research Center. We probe the gap between language fluency and actual reasoning through controlled behavioral experiments on frontier models.*

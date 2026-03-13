Appreciate the genuine curiosity. Here's the data.

I run a chess testing framework that pits LLMs against Stockfish at various ELO levels. Every model gets the full board state (FEN) and legal move list each turn. Same prompt, same conditions, controlled and reproducible.

The 3Blue1Brown video is a great explainer for the transformer mechanism. But "word predictor on steroids" as a capability ceiling hasn't held up empirically since at least 2024. Here's what we're actually measuring:

**GPT-5.4 against Stockfish (20+ matches from our gauntlet):**
- 98% legal move rate at 1400 ELO, zero illegal moves in some game pairs
- Swept the Semi-Slav Meran 2-0, both wins by checkmate (29 moves as White, 23 as Black)
- Against Stockfish 3190 (near-maximum strength): 96% legal rate, survived 30+ moves
- Found forced mates and articulated the mating pattern in its reasoning before executing
- Think-time distribution is bimodal: forced recaptures take 45-48 seconds, complex decisions take 15-35 minutes. The model recognizes when the decision space is narrow vs wide

**DeepSeek V3.2 (IMO gold medal, "GPT-5 class" on reasoning benchmarks):**
- 60% retry rate on illegal moves
- Couldn't figure out where its own queen was: "Qxe5 is illegal because the queen is not on b6? Wait, the board shows queen on b6"
- Lost by forfeit

**Nemotron 3 Super 120B (the model in this post):**
- 65% legal move rate
- Hallucinated piece positions ("our knight on c5" -- it was on b5)
- Checkmated by 1400 Stockfish
- Spent 66% MORE tokens on forced moves (1-2 legal options) than non-forced moves. GPT-5.4 shows the opposite

So three models, all transformers, all "word predictors." One plays 1500-1800 ELO chess with near-perfect legality and correct self-assessment. One can't find its own queen. One hallucinates board states that don't exist.

The mechanism is next-token prediction. The capability is not bounded by the mechanism. What matters is what got encoded during training and how internal representations organize. GPT-5.4 clearly has some form of board-state tracking that persists across sequential moves -- whether you call that a world model or an emergent spatial representation, it's empirically there and measurably absent in the other two.

That's what we're studying. Not "can LLMs play chess" as a party trick, but what the variance between models tells you about their internal representations. Chess is just the controlled environment where you can measure it against ground truth.

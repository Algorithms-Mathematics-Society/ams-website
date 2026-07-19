---
title: "Why AMS runs contests, not courses"
pubDate: 2026-07-19
description: "AMS bets that a hard contest under a clock reveals more about a candidate than a course ever could, which is why Derive, Ascent, and Access are all built around live, timed problem-solving."
author: "Tilak"
image:
  url: "./cover.webp"
  alt: "Finalists on stage at the Derive '26 prize ceremony, IIT Bombay"
tags: ["about", "derive"]
---

# Why AMS runs contests, not courses

AMS is an Indian organization that runs national contests in quantitative
finance and competitive programming, and builds Access, the assessment
platform that turns contest performance into verified hiring signal. We could
have built another course platform. We built a scoreboard instead.

## The bet

A course tells you what someone was taught. A contest tells you what someone
can actually do when the clock is running and nobody can help. Derive '26
drew 2,500+ participants from 30+ institutions across India, out of a talent
pool of 5,000+ students AMS has reached so far, and the finals came down to
33 people in a room at IIT Bombay in July 2026. That funnel is the point:
most of the noise falls away before round two, and what's left is signal.

## What that looks like in practice

* **Derive** is timed, adversarial, and scored the same way for everyone in
  the room: probability, markets, and mathematical reasoning under pressure.
* **Ascent** does the same thing for systems: C++, optimization, and
  performance engineering, the winter edition of the circuit.
* **Access** takes that same idea and rents it to firms: a proctored
  assessment benchmarked against the AMS contest population, not a generic
  test bank.

## A small taste of the problem style

Derive problems tend to reward exact reasoning over brute force. Here's the
shape of it, not an actual contest problem, just the flavor:

```python
def expected_rounds(p_win: float) -> float:
    """Expected number of rounds to win once, given a per-round win prob."""
    if not 0 < p_win <= 1:
        raise ValueError("p_win must be in (0, 1]")
    return 1 / p_win

print(expected_rounds(0.25))  # 4.0
```

Nothing exotic: the contest rewards the person who sees the closed form
before the person who starts simulating.

> Jane Street was the Apex Partner of Derive '26, and QRT was the
> Convergence Partner for the finals. Firms show up because the scoreboard
> already did the filtering for them.

We'll use this space for recaps, problem walkthroughs, and notes on how the
next edition is shaping up. Start with [Derive](/derive) if you want to see
what the contest itself looks like.

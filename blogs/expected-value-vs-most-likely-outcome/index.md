---
title: "Expected Value vs Most Likely Outcome: A Derive Problem"
pubDate: 2026-11-02
description: "Work through a Derive ’26 probability problem using linearity of expectation and the binomial mode, with exact C++ and Python solutions and checked examples."
author: "AMS Team"
image:
  url: "./cover.png"
  alt: "Binomial distribution for ten independent 50–50 windows, with five gains highlighted as the most likely count"
tags: ["probability", "derive"]
---

A position starts at 100. In each of ten independent windows, it either doubles or halves, with equal probability. **The most likely final value is 100. The expected final value is about 931.32.** Both answers are correct, but they answer different questions.

This distinction is at the centre of **“The SpaceX IPO,” Problem A in the AMS Derive ’26 Posterior problem set**. The company story is a fictional contest setting. We use the probabilities and payout rules stated in the problem.

This walkthrough explains the model, derives the answer, and gives C++ and Python implementations checked against the supplied examples. You need basic probability and powers; the binomial reasoning is developed below.

## The problem: two experiments, two answers

Each scenario supplies five integers: `U`, `D`, `p`, `n`, and `S`.

- A gain multiplies a value by `U / 100`, with probability `p / 100`.
- A loss multiplies it by `D / 100`, with probability `(100 - p) / 100`.
- There are `n` independent windows, and `U > 100 > D > 0`.

The task asks for three outputs:

1. **x: expected total payout from n separate bonds.** Each bond starts at `S` and experiences just one window. These payouts add; they do not compound. Their total initial face value is `n × S`.
2. **y: wealth at the most likely gain count.** A separate position starts at `S` and compounds across all `n` windows.
3. **10 × x × y**, the combined quantity required by the statement.

The different starting allocations matter: `x` and `y` are not two performance measures for the same investment. Before calculating anything, decide which experiment each requested output belongs to.

## Expected payout: add the one-window expectations

Write `q = p / 100`, `u = U / 100`, and `d = D / 100`.

One bond pays either `S × u` or `S × d`. Its expected payout is therefore `S × (q × u + (1 - q) × d)`.

There are `n` such bonds, so **linearity of expectation** gives:

```text
x = n × S × (q × u + (1 - q) × d)
  = n × S × (p × U + (100 - p) × D) / 10000
```

Linearity itself does not require independence. The independent-window assumption will matter when we model the compounding position's gain count.

In the first sample, `U = 200`, `D = 50`, `p = 50`, `n = 10`, and `S = 100`. One bond has expected payout `0.5 × 200 + 0.5 × 50 = 125`. Ten bonds give **x = 1250**.

## Most likely wealth: count gains, not individual paths

Suppose exactly `k` windows are gains. Multiplication commutes, so their order does not affect the final wealth:

```text
W(k) = S × u^k × d^(n - k)
```

Because `u > d > 0`, each different gain count gives a different wealth value. Finding the most likely wealth is therefore equivalent to finding the most likely gain count.

The count follows a **binomial distribution**:

```text
P(K = k) = C(n, k) × q^k × (1 - q)^(n - k)
```

Here `C(n, k)` counts the ways to place `k` gains among `n` windows. This factor is essential. With ten fair windows, every ordered path has probability `1 / 1024`, but **252 different paths contain five gains**. Together they give that count a probability of `252 / 1024`, approximately 24.61%.

Five doublings and five halvings cancel, so the first sample has **y = 100**. “Most likely” does not mean “more likely than all other outcomes combined.” This outcome still has less than a 25% chance.

## Deriving the binomial mode

Compare two neighbouring probabilities. For `0 ≤ k < n`:

```text
P(K = k + 1) / P(K = k)
    = ((n - k) / (k + 1)) × (q / (1 - q))
```

The next probability is larger when `(n + 1) × q > k + 1`. The probabilities rise until this inequality stops holding, then fall.

If `(n + 1) × q` is not an integer, the **unique most likely count** is:

```text
k = floor((n + 1) × q)
```

If it is an integer `m`, there are two equally likely counts, `m - 1` and `m`. The supplied problem guarantees a unique most likely count, so that tied case is excluded. Since `p` is an integer percentage, compute the mode exactly as `((n + 1) × p) // 100`.

This is why rounding `n × q` is not the general solution. That expression is the expected count, not the mode. For example, with `n = 2` and `p = 30`, the expected count is 0.6, but the most likely count is zero: the probabilities for zero, one, and two gains are 0.49, 0.42, and 0.09.

## Why the expected compounding value is different

For the first sample, independence gives the compounding position an expected final value of:

```text
E[W] = 100 × (0.5 × 2 + 0.5 × 0.5)^10
     = 100 × 1.25^10
     ≈ 931.32
```

A small number of paths produce very large values, pulling the mean above the mode. The all-gain path alone ends at 102400, although its probability is only `1 / 1024`.

That 931.32 figure is **neither required output**: `x` concerns separate bonds, while `y` asks for the mode of the compounding position. It is included here to show why replacing “most likely” with “expected” changes the question.

## Exact C++ and Python solutions

The statement allows up to 1000 scenarios, with `2 ≤ n ≤ 10`. It guarantees that all three outputs are integers fitting a signed 64-bit integer, but intermediate products can be larger. Use integer arithmetic throughout and divide only after forming each complete expression.

### C++17

This version uses `__int128`, supported by GNU C++17, for intermediate products. It forms the numerator and denominator of `y` in at most ten iterations, avoiding floating-point powers. The final casts are safe under the statement's signed 64-bit output guarantee.

```cpp
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);

    int t;
    std::cin >> t;

    while (t--) {
        int U, D, p, n;
        long long S;
        std::cin >> U >> D >> p >> n >> S;

        const int k = (n + 1) * p / 100;
        const __int128 x = static_cast<__int128>(n) * S
            * (p * U + (100 - p) * D) / 10000;

        __int128 numerator = S;
        __int128 denominator = 1;
        for (int i = 0; i < n; ++i) {
            numerator *= (i < k ? U : D);
            denominator *= 100;
        }

        const __int128 y = numerator / denominator;
        const __int128 combined = 10 * x * y;

        std::cout << static_cast<long long>(x) << ' '
                  << static_cast<long long>(y) << ' '
                  << static_cast<long long>(combined) << '\n';
    }

    return 0;
}
```

### Python 3

Python's arbitrary-precision integers keep the same calculation exact without a separate intermediate integer type.

```python
import sys


def solve_case(U, D, p, n, S):
    k = ((n + 1) * p) // 100
    x = n * S * (p * U + (100 - p) * D) // 10000
    y = S * U**k * D**(n - k) // 100**n
    return x, y, 10 * x * y


def main():
    data = list(map(int, sys.stdin.buffer.read().split()))
    cases = data[0]
    output = []
    for i in range(cases):
        start = 1 + 5 * i
        answer = solve_case(*data[start:start + 5])
        output.append(" ".join(map(str, answer)))
    print("\n".join(output))


if __name__ == "__main__":
    main()
```

Integer division is exact here because of the problem's guarantees. Without them, it would silently discard a fractional remainder. Do not divide `U` or `D` by 100 using integer division before taking powers.

Both implementations calculate the same expressions without enumerating the `2^n` paths. The C++ loop performs `n` iterations, with `n ≤ 10`; the Python version uses integer powers with exponents no larger than ten.

## Check the supplied examples

```text
U    D   p   n   S       x      y      10*x*y
200  50  50  10  100     1250   100    1250000
200  50  60  5   1000    7000   2000   140000000
250  40  30  4   2500    10300  400    41200000
```

All three rows match the supplied problem set. We also checked the mode formula against the exact binomial probabilities for every allowed `n` and `p`, excluding the tied cases, and checked the payout expressions against explicit path enumeration on additional integer-output cases.

## A closer look at the work in Derive

This example makes several choices visible: separating two models, identifying the quantity being asked for, grouping equivalent paths, and preserving exact arithmetic. Those are more informative discussion points than the final three numbers alone.

In feedback about Derive ’26 overall, participant Shane Christian wrote:

> A well-designed contest: the problems are a mixture of probability, game theory, ad hoc problems, mathematics and quant. The style of the problem statements is unique.

*Selected participant feedback, June 2026. Quote shortened and lightly edited; it concerns the contest overall, not this specific problem.*

For participants, try explaining why the mode formula works before looking back at the code. For teams exploring a partnership, the statement and worked solution provide a concrete starting point for discussing the reasoning the competition involves.

Explore the [Derive ’26 format and finals](/derive), [discuss a competition partnership](/access), or [request updates about future editions](/updates?topic=derive).

Source: [Problem A, “The SpaceX IPO,” AMS Derive POSTERIOR on Codeforces Gym](https://codeforces.com/gym/690596/problem/A), as supplied in the Derive ’26 Posterior problem-set PDF. This article paraphrases the task and provides an independently checked explanation; it is not a setter-authored editorial.

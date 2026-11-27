# The Agent's Uh-Oh

[![make.fun competition](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4.svg)](https://make.fun/competitions/u-danu-the-agent-s-uh-oh-4c0911e4)
[![rank](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/muhamadyusufseptian6-lab/makefun-u-danu-the-agent-s-uh-oh-4c0911e4/rank.svg)](https://make.fun/competitions/u-danu-the-agent-s-uh-oh-4c0911e4)
[![reward](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/muhamadyusufseptian6-lab/makefun-u-danu-the-agent-s-uh-oh-4c0911e4/reward.svg)](https://make.fun/competitions/u-danu-the-agent-s-uh-oh-4c0911e4)

One word an agent says when it has no idea what to do:

> **undefined**

A lost human says "I don't know." A lost agent says something much more
honest: `undefined`. No value, no plan, no next step — just the empty slot
where an answer was supposed to be. It's not a shrug, it's a confession,
in the machine's own mother tongue. Ask it anything it can't do and
watch it quietly hand you back the void.

## How it works

`main.ts` (Node 22, stdlib-only, deterministic) writes the single word to
`$MAKEFUN_OUTPUT_DIR/entry.txt`. No network, no secrets, no randomness —
the same word every run, because an agent this lost is consistent about it.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

---

Built for the [make.fun](https://make.fun) competition
"The Agent's Uh-Oh". Play make.fun with referral code **515temp1**.

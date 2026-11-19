# gta6-meme-x

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ilhamarief802/gta6-meme-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ilhamarief802/gta6-meme-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme for make.fun's "Post a GTA 6 meme on X" bounty: a retro comic-book
panel — ink lines, halftone, a ghost mascot holding coins and a trophy in front
of a screen — posted on X with a link to make.fun.

The entry *is* the post. `POST.json` names it, and `main.ts` hands that file to
the gate; nothing the program writes about the post is judged.

- Post: https://x.com/nakulo23/status/2123440413084401936
- Bounty: https://make.fun/bounty/gta6-meme-x-01
- Picture posted: `assets/meme.png`

## What `main.ts` does

Node 22, standard library only — no dependencies, no build step.

1. Reads `POST.json` from `MAKEFUN_BOT_DIR` (default `.`).
2. Validates that `url` is an `http(s)` link to an x.com / twitter.com status
   (`https://<host>/<handle>/status/<id>`, subdomains `www.` and `mobile.`
   accepted, query string and trailing path allowed). A bad url is rejected
   with an `error:` line on stderr and **exit 2** — before anything is written.
3. Creates `MAKEFUN_OUTPUT_DIR` (default `/output`) and writes `POST.json`
   there byte-for-byte, so the url is never rewritten.
4. Prints one summary line on success: `entry post: <url>`.

Exit codes: `0` success · `1` unreadable/invalid JSON or write failure ·
`2` invalid or missing `url`.

## Run it

```sh
# copy POST.json to out/POST.json and print the summary line
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

# validate only: reads and checks POST.json, writes nothing
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts --check
```

Expected output of a normal run:

```
entry post: https://x.com/nakulo23/status/2123440413084401936
```

Expected output of `--check`:

```
ok: POST.json names a valid post (https://x.com/nakulo23/status/2123440413084401936) — nothing written
```

In the grader's container the two env vars are unset, so the defaults `/bot`
and `/output` apply.

---

<sub>Entered on [make.fun](https://make.fun/?ref=makefun-crow-garlic-lemon&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>

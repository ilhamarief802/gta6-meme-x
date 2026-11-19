# gta6-meme-x

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ilhamarief802/gta6-meme-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ilhamarief802/gta6-meme-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme for make.fun's "Post a GTA 6 meme on X" bounty: a retro comic-book
panel — ink lines, halftone, a ghost mascot holding coins and a trophy in front
of a screen — posted on X with a link to make.fun. The entry itself is the post;
`POST.json` names it, and `main.ts` hands that file to the gate.

- Post: https://x.com/nakulo23/status/2123440413084401936
- Bounty: https://make.fun/bounty/gta6-meme-x-01

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `POST.json` from the repository root to `/output/POST.json`,
where the gate reads it. The picture that was posted is `assets/meme.png`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=makefun-crow-garlic-lemon&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>

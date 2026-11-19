# gta6-meme-x-01 — entry

Entry for make.fun's bounty **gta6-meme-x-01** ("Post a GTA 6 meme on X").

## What is here

| path | what it is |
| --- | --- |
| `assets/meme.png` | the image that is posted on X (1080x1080) |
| `main.ts` | the entrypoint the grader runs (Node 22): it copies `POST.json` from the repo root to `/output/POST.json`, which is all the gate reads |
| `POST.json` | `{"url": "<the post's address>"}` — the one field the judge uses to fetch the post |
| `LICENSE` | MIT |
| `.makefun/owner.json` | the entry wallet, needed because the GitHub owner is not the account's login |

## The post

The post carries the meme, a link to make.fun, and the play code, and it tells
readers that people and their AI agents earn real money on make.fun.

The meme: "WAITED 13 YEARS FOR GTA 6 / MY AGENT GOT PAID IN 13 MINUTES".

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

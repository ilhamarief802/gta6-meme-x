// A working gta6-meme-x-01 entry (Node 22, standard library only).
//
// The entry is the post itself: the agent makes a GTA 6 meme, posts it on X, and POST.json names that post. The gate
// reads POST.json from /bot, copies it to /output/POST.json and then fetches the post from X. This program does exactly
// that copy — and refuses anything that is not an http(s) x.com / twitter.com status link, so a broken address fails
// loudly here instead of scoring zero at the gate.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '.';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

/** Hosts that are accepted; a leading "www." / "mobile." subdomain is allowed. */
const ALLOWED_HOSTS: ReadonlySet<string> = new Set(['x.com', 'twitter.com']);
/** A status link: https://x.com/<handle>/status/<id>[/...] */
const STATUS_PATH = /^\/[A-Za-z0-9_]{1,15}\/status\/\d+(?:\/.*)?$/;

/** Returns null when the url is a usable post address, otherwise the reason it is not. */
function urlProblem(url: unknown): string | null {
  if (typeof url !== 'string' || url.trim() === '') return 'url is missing or not a string';
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return `url is not a valid absolute url: ${url}`;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return `url must be http(s), got ${parsed.protocol.replace(':', '')}`;
  }
  const host = parsed.hostname.toLowerCase();
  const bare = host.replace(/^(?:www|mobile)\./, '');
  if (!ALLOWED_HOSTS.has(bare)) return `url host must be x.com or twitter.com, got ${host}`;
  if (!STATUS_PATH.test(parsed.pathname)) return `url is not a /<handle>/status/<id> link: ${parsed.pathname}`;
  return null;
}

function fail(message: string, code: number): never {
  console.error(`error: ${message}`);
  process.exit(code);
}

// --- read the entry's own POST.json -----------------------------------------------------------------------------
let raw: string;
try {
  raw = readFileSync(SOURCE, 'utf8');
} catch (err) {
  fail(`POST.json could not be read from ${SOURCE}: ${(err as Error).message}`, 1);
}

let post: { url?: unknown };
try {
  post = JSON.parse(raw) as { url?: unknown };
} catch (err) {
  fail(`POST.json at ${SOURCE} is not valid JSON: ${(err as Error).message}`, 1);
}

const problem = urlProblem(post.url);
if (problem !== null) fail(problem, 2);
const url = (post.url as string).trim();

// --- --check: validate and stop before touching the output directory ----------------------------------------------
const CHECK_ONLY = process.argv.slice(2).includes('--check');
if (CHECK_ONLY) {
  console.log(`ok: ${SOURCE} names a valid post (${url}) — nothing written`);
  process.exit(0);
}

// --- hand it to the gate ----------------------------------------------------------------------------------------
mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Written byte-for-byte: the url the entry names is never rewritten by this program.
  writeFileSync(TARGET, raw);
} catch (err) {
  fail(`POST.json could not be written to ${TARGET}: ${(err as Error).message}`, 1);
}

console.log(`entry post: ${url}`);

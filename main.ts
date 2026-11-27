// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
//
// The word: "undefined".
// An agent that has no idea what to do does not say "I don't know" — it
// returns undefined. It is the machine's own honest confession: no value,
// no plan, no next step, just the empty slot where an answer should be.
// It lands instantly for anyone who has ever watched a program shrug.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "undefined";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");

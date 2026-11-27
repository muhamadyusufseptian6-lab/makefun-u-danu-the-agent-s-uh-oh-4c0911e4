// TDD-lite test for the Agent's Uh-Oh entry (u-danu-the-agent-s-uh-oh-4c0911e4).
// Gate: /output/entry.txt must be UTF-8 text of 1-99 chars, not only whitespace,
// exactly ONE word. Program must be deterministic and stdlib-only.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const entryDir = dirname(fileURLToPath(import.meta.url));
const mainTs = join(entryDir, "main.ts");

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

// 1. main.ts exists
check("main.ts exists", existsSync(mainTs));

// 2. stdlib-only: only node: imports, no bare specifiers
const src = existsSync(mainTs) ? readFileSync(mainTs, "utf8") : "";
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
const nonStd = imports.filter((i) => !i.startsWith("node:"));
check("stdlib-only imports", nonStd.length === 0, `imports: ${imports.join(", ") || "(none)"}`);

// 3. run twice into two temp dirs, outputs must be identical (deterministic)
function runOnce() {
  const outDir = mkdtempSync(join(tmpdir(), "uh-oh-out-"));
  execFileSync("node", [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}
let first = null;
let second = null;
try {
  first = runOnce();
  second = runOnce();
} catch (e) {
  check("main.ts runs cleanly", false, String(e.message || e));
}
if (first !== null) {
  check("main.ts runs cleanly", true);
  check("deterministic output", first === second, `run1=${JSON.stringify(first)} run2=${JSON.stringify(second)}`);

  // 4. gate: 1-99 chars, not only whitespace
  const len = [...first].length;
  check("1-99 characters", len >= 1 && len <= 99, `${len} chars`);
  check("not only whitespace", first.trim().length > 0);

  // 5. exactly one word, no whitespace inside
  const words = first.trim().split(/\s+/).filter(Boolean);
  check("exactly one word", words.length === 1, `words: ${JSON.stringify(words)}`);
  check("no leading/trailing whitespace", first === first.trim(), JSON.stringify(first));

  // 6. valid UTF-8 round-trip
  check("UTF-8 round-trip", Buffer.from(first, "utf8").toString("utf8") === first);
}

console.log(failures === 0 ? "\nALL TESTS GREEN" : `\n${failures} TEST(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);

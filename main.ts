// The One-Line Exit — a one-line resignation letter for make.fun.
// The joke: the office's favourite line, "we're a family here", taken
// completely literally — after five years of it, the writer files for
// emancipation from the family instead of just quitting the job.
// One sentence, one line, a specific voice, and a punchline that
// arrives where the reader does not expect it.
//
// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of
// 1 to 140 characters, not only whitespace. This line is 103 chars.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const LINE =
  "I hereby resign: after five years of being told 'we're a family here,' I've decided to get emancipated.";

export const MAX_CHARS = 140;
export const OUTPUT_PATH = "/output/entry.txt";

/** The competition gate: 1-140 characters of UTF-8 text, not only whitespace. */
export function isValidEntry(text: string): boolean {
  if (typeof text !== "string") return false;
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  // No trailing newline either: the file must hold exactly this line.
  if (text !== text.trim()) return false;
  return true;
}

function main(): void {
  if (!isValidEntry(LINE)) {
    throw new Error(
      `Line fails the gate: ${[...LINE].length} chars (limit ${MAX_CHARS})`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LINE, "utf8");
  // Read it back and re-check the gate on exactly what was written,
  // so a partial write or encoding slip fails loudly instead of
  // silently shipping an invalid entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== LINE || !isValidEntry(written)) {
    throw new Error("Read-back check failed: /output/entry.txt is not the line");
  }
  console.log(`Wrote ${[...LINE].length} chars to ${OUTPUT_PATH}`);
  console.log(LINE);
}

main();

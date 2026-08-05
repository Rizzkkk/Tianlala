/**
 * Pulls the usable TIANLALA product photos into public/products/.
 *
 * Only items with a confident name match are listed here. Items that have no
 * matching photo are intentionally absent — they render as typographic cards
 * (see src/components/MenuCard.tsx), which is a design tier, not a fallback.
 *
 * Usage: node scripts/fetch-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "https://www.tianlala.ph/common/pc/static";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "products");

/** remote basename -> local basename (matches `image` fields in src/data/menu.ts) */
const MAP = {
  "Shake-a-MangoTea": "shake-a-mango-tea",
  "Fresh-Fruit-Tea-Bucket": "fresh-fruit-tea-bucket",
  "Happy-Family-Bucket": "happy-family-bucket",
  "Ice-Fresh-Lemonade": "ice-fresh-lemonade",
  "Grape-Lemon-Tea": "grape-lemon-tea",
  "Brown-Sugar-Boba-Milk-Tea": "brown-sugar-boba-milk-tea",
  "Boba-Milk-Tea": "boba-milk-tea",
  "Coconut-Jelly-Milk-Tea": "coconut-jelly-milk-tea",
  "Blooming-Jasmine-Milk-Tea": "blooming-jasmine-milk-tea",
  "Strawberry-Milk-Shake": "strawberry-milk-shake",
  "Peach-Milk-Shake": "peach-milk-shake",
  "Shake-a-Grape-Tea": "shake-a-grape-tea",
  "Snow_Top_Coffee": "snow-top-coffee",
  "Strawberry-Sundae": "strawberry-sundae",
  "Mango-Sundae": "mango-sundae",
  "Brown-SugarBoba-Sundae": "brown-sugar-boba-sundae",
};

await mkdir(OUT, { recursive: true });

let ok = 0;
let failed = 0;
let bytes = 0;

for (const [remote, local] of Object.entries(MAP)) {
  const url = `${SOURCE}/${remote}.jpg`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(join(OUT, `${local}.jpg`), buffer);

    bytes += buffer.length;
    ok += 1;
    console.log(`  ok    ${local}.jpg  ${(buffer.length / 1024).toFixed(0)} KB`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL  ${remote}.jpg  ${error.message}`);
  }
}

console.log(
  `\n${ok} downloaded (${(bytes / 1024 / 1024).toFixed(2)} MB), ${failed} failed.`,
);
if (failed > 0) process.exitCode = 1;

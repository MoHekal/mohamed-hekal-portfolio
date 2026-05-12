import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projects } from "../src/data.js";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "public/assets/mohamed-hekal.jpg",
  "public/assets/Mohamed_Hekal_CV.pdf",
  ...projects.map((project) => `public/${project.image.replace(/^\/+/, "")}`)
];

const missing = required.filter((item) => !existsSync(path.join(root, item)));
if (missing.length) {
  console.error("Missing required assets:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

const source = readFileSync(path.join(root, "src", "data.js"), "utf8");
for (const phrase of ["MoHekal", "nationstage.net", "CafeSystem"]) {
  if (!source.includes(phrase)) {
    console.error(`Missing portfolio reference: ${phrase}`);
    process.exit(1);
  }
}

console.log(`Portfolio checks passed: ${required.length} assets and key references verified.`);

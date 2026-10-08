import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { jobs } from "../data/jobs";
import { services } from "../data/services";
import { industries } from "../data/industries";
import { reasons } from "../data/reasons";
import { values } from "../data/values";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storeDir = path.resolve(__dirname, "../data/store");

async function main() {
  await fs.mkdir(storeDir, { recursive: true });

  await fs.writeFile(
    path.join(storeDir, "jobs.json"),
    JSON.stringify(jobs, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(storeDir, "services.json"),
    JSON.stringify(services, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(storeDir, "industries.json"),
    JSON.stringify(industries, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(storeDir, "reasons.json"),
    JSON.stringify(reasons, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.join(storeDir, "values.json"),
    JSON.stringify(values, null, 2),
    "utf8"
  );
  console.log("Seeding complete");
}

main().catch((err) => {
  console.error("Error seeding store:", err);
  process.exit(1);
});

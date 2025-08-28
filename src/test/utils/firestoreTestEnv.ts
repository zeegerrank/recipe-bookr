import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import type { Firestore } from "firebase/firestore";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

let env: RulesTestEnvironment | null = null;

export async function setupEmulator() {
  if (env) return env;
  const rulesPath = resolve(process.cwd(), "firestore.rules");
  const rules = existsSync(rulesPath)
    ? readFileSync(rulesPath, "utf8")
    : "rules_version = '2'; service cloud.firestore { match /databases/{db}/documents { match /{document=**} { allow read, write: if true; } } }";
  env = await initializeTestEnvironment({
    projectId: "demo-recipebookr",
    firestore: { host: "127.0.0.1", port: 8080, rules },
  });
  return env;
}

export async function resetEmulator() {
  if (env) await env.clearFirestore();
}

export async function teardownEmulator() {
  if (!env) return;
  await env.cleanup();
  env = null;
}

export async function getAuthDb(uid = "test_user"): Promise<Firestore> {
  if (!env) {
    await setupEmulator();
  }
  if (!env) {
    throw new Error("Test environment not initialized");
  }
  return env.authenticatedContext(uid).firestore() as unknown as Firestore;
}

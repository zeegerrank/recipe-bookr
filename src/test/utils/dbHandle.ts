import type { Firestore } from "firebase/firestore";
let dbRef: Firestore | null = null;

export function setTestDb(db: Firestore) {
  dbRef = db;
}

export function getTestDb(): Firestore {
  if (!dbRef) throw new Error("No test DB set. Call setTestDb() first.");
  return dbRef;
}

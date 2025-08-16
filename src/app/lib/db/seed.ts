import { db } from "../firebase/client";
import { getDoc, setDoc, doc } from "firebase/firestore";

async function setIfNotExist(path: string, data: unknown) {
  const ref = doc(db, path);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    await setDoc(ref, data);
    console.log(`✅ created: ${path}`);
  } else {
    console.log(`⏭️ skipped (already exist): ${path}`);
  }
}

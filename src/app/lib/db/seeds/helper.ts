import { db } from "../../firebase/client";
import { getDoc, setDoc, doc } from "firebase/firestore";

function ifErrorThrow(error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
}

export async function seedDoc(path: string, data: object) {
  try {
    const ref = doc(db, path);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, data);
      console.log(`✅ created: ${path}`);
    } else {
      console.log(`⏭️ skipped (already exist): ${path}`);
    }
  } catch (error) {
    ifErrorThrow(error);
  }
}

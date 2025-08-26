import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/client";
import { IngredientDoc, WriteIngredientDoc } from "./types";

const coll = collection(db, "ingredients");

// create
export type CreateIngredientResult = {
  id: string;
  created: boolean;
  status: number;
};
export async function createIngredient(
  id: string,
  data: WriteIngredientDoc
): Promise<CreateIngredientResult> {
  const ref = doc(coll, id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { id, created: false, status: 409 };
  }
  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id, created: true, status: 201 };
}

// upsert
export async function upsertIngredient(
  id: string,
  data: WriteIngredientDoc
): Promise<{ id: string }> {
  await setDoc(
    doc(db, "ingredients", id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return { id };
}

// get
export async function getIngredientById(
  id: string
): Promise<IngredientDoc | null> {
  const ref = doc(coll, id);
  const snap = await getDoc(ref);
  return snap.exists()
    ? { ...(snap.data() as IngredientDoc), id: snap.id }
    : null;
}

// list
export async function listIngredients(options?: {
  orderByField?: keyof IngredientDoc;
  qLimit?: number;
}): Promise<IngredientDoc[]> {
  const result = query(
    coll,
    ...(options?.orderByField ? [orderBy(options.orderByField as string)] : []),
    ...(options?.qLimit ? [limit(options.qLimit as number)] : [])
  );
  const snap = await getDocs(result);
  return snap.docs.map((doc) => ({
    ...(doc.data() as IngredientDoc),
    id: doc.id,
  }));
}

// update
export type updateIngredientResult = {
  status: number;
};
export async function updateIngredient(
  id: string,
  patch: Partial<WriteIngredientDoc>
): Promise<updateIngredientResult> {
  const ref = doc(coll, id);
  await updateDoc(ref, {
    ...patch,
    updatedAt: serverTimestamp(),
  });
  return { status: 204 };
}

// delete
export type deleteIngredientResult = { status: number };
export async function deleteIngredient(
  id: string
): Promise<deleteIngredientResult> {
  const ref = doc(coll, id);
  await deleteDoc(ref);
  return { status: 204 };
}

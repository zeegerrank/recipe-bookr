import { firebaseConfig } from "../config/firebase.config";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth as _getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore as _getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

function getAppInstance() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getDb() {
  const db = _getFirestore(getAppInstance());
  if (process.env.NODE_ENV === "development") {
    connectFirestoreEmulator(db, "localhost", 8080);
  }
  return db;
}
export function getAuth() {
  const auth = _getAuth(getAppInstance());
  if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
  }
  return auth;
}

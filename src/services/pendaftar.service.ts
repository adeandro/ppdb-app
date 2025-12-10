import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Pendaftar } from "../types/Pendaftar";

export async function createPendaftar(data: Pendaftar) {
  await addDoc(collection(db, "pendaftar"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function getPendaftar() {
  const snapshot = await getDocs(collection(db, "pendaftar"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Pendaftar[];
}

export async function updatePendaftar(id: string, data: Partial<Pendaftar>) {
  const ref = doc(db, "pendaftar", id);
  await updateDoc(ref, data);
}

export async function deletePendaftar(id: string) {
  const ref = doc(db, "pendaftar", id);
  await deleteDoc(ref);
}

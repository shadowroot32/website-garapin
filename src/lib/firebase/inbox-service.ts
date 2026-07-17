import { collection, query, orderBy, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export interface InboxMessage {
  id?: string;
  name: string;
  company: string;
  contact: string;
  websiteType: string;
  package: string;
  message: string;
  read: boolean;
  createdAt: any;
}

const COLLECTION_NAME = "inbox";

export const getMessages = async (): Promise<InboxMessage[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as InboxMessage[];
};

export const markAsRead = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { read: true });
};

export const deleteMessage = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

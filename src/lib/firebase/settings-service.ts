import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";

export interface AppSettings {
  adminName: string;
  brandName: string;
  whatsappNumber: string;
}

const SETTINGS_DOC_ID = "main_config";
const COLLECTION_NAME = "settings";

export const getSettings = async (): Promise<AppSettings | null> => {
  const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data() as AppSettings;
  }
  return null;
};

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
  await setDoc(docRef, settings, { merge: true });
};

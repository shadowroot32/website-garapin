import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  category: "ecommerce" | "company_profile" | "landing_page" | "dashboard" | "erp" | "crm";
  tags: string[];
  imageUrl?: string;
  link?: string;
  createdAt?: any;
}

const COLLECTION_NAME = "portfolios";
const portfolioCollection = collection(db, COLLECTION_NAME);

// Get all portfolios
export const getPortfolios = async (): Promise<PortfolioItem[]> => {
  const q = query(portfolioCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PortfolioItem[];
};

// Get single portfolio
export const getPortfolioById = async (id: string): Promise<PortfolioItem | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as PortfolioItem;
  }
  return null;
};

// Create new portfolio
export const createPortfolio = async (data: Omit<PortfolioItem, "id" | "createdAt">): Promise<string> => {
  const docRef = await addDoc(portfolioCollection, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// Update portfolio
export const updatePortfolio = async (id: string, data: Partial<PortfolioItem>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
  });
};

// Delete portfolio
export const deletePortfolio = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

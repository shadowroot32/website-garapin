import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./config";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

const COLLECTION_NAME = "blog_posts";

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as BlogPost;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

export const addBlogPost = async (post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
  try {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...post,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding blog post:", error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, updates: Partial<Omit<BlogPost, "id" | "createdAt">>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const dataToUpdate: any = {
      ...updates,
      updatedAt: serverTimestamp(),
    };
    if (updates.title) {
       dataToUpdate.slug = updates.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    await updateDoc(docRef, dataToUpdate);
  } catch (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};

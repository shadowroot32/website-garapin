import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "garapin-admin-dashboard",
  appId: "1:183166419349:web:627ef44b9dfc3ffd56f69c",
  storageBucket: "garapin-admin-dashboard.firebasestorage.app",
  apiKey: "AIzaSyAhhNKPnpxz-HoJ1w9rVdZ_AZmc2EvEpSM",
  authDomain: "garapin-admin-dashboard.firebaseapp.com",
  messagingSenderId: "183166419349",
  measurementId: "G-QJ112BLCG9",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "olx-new-c2dd0.firebaseapp.com",
    projectId: "olx-new-c2dd0",
    storageBucket: "olx-new-c2dd0.firebasestorage.app",
    messagingSenderId: "344627066091",
    appId: "1:344627066091:web:7035e154f9b33ab034baae",
    measurementId: "G-YQSWE0W6LE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const storage = getStorage();
const fireStore = getFirestore()
const fetchFromFireStore = async () => {
    try {
        const productsCollection = collection(fireStore, 'products')
        const productSnapshot = await getDocs(productsCollection)
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        console.log("Fetched producst", productList)
        return productList
    } catch (error) {
        console.error("errror in fetching", error)
        return []
    }
}
export {
    auth,
    provider,
    storage,
    fireStore,
    signOut,
    fetchFromFireStore

}
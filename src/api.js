import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, query, where,  getDocs, getDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB6Sf2u8uDnEWWhFWqZS2qcbpZ6TrvAjZE",
  authDomain: "vanlife-f6b82.firebaseapp.com",
  projectId: "vanlife-f6b82",
  storageBucket: "vanlife-f6b82.firebasestorage.app",
  messagingSenderId: "725756382003",
  appId: "1:725756382003:web:c30c332851605fbbf54c46",
  measurementId: "G-7J4GBTPR09"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollection = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollection)
    return snapshot.docs.map(doc => { 
            return { ...doc.data(), id: doc.id }
    })
}

export async function getVan(id) {
    const vanDoc = doc(db, "vans", id)
    const snapshot = await getDoc(vanDoc)
    return { ...snapshot.data(), id: snapshot.id }
}

export async function getHostVans() {
    const q = query(vansCollection, where("hostId", "==", "3Cge9mYKupLRGd9ml4C6"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => { 
            return { ...doc.data(), id: doc.id }
    })
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
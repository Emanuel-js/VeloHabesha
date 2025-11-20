import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDbQwJ0d5isxKYYrFk8K6_Jx8u43NJrNMM",
    authDomain: "bikercomm-933f1.firebaseapp.com",
    projectId: "bikercomm-933f1",
    storageBucket: "bikercomm-933f1.firebasestorage.app",
    messagingSenderId: "483405940748",
    appId: "1:483405940748:web:6916e90ef08519f369c629",
    measurementId: "G-F6FXFQY7V5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };

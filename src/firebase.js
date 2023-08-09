import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "movies-1ca10.firebaseapp.com",
  projectId: "movies-1ca10",
  storageBucket: "movies-1ca10.appspot.com",
  messagingSenderId: "722686333469",
  appId: "1:722686333469:web:3805a5190544b3431aecf4",
  measurementId: "G-6LEDGKDX2J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwRd41bNuJV2YKLKXqII3dTHzdLKAov7g",
  authDomain: "merry-go-round-92c7f.firebaseapp.com",
  projectId: "merry-go-round-92c7f",
  storageBucket: "merry-go-round-92c7f.appspot.com",
  messagingSenderId: "587666954723",
  appId: "1:587666954723:web:32d6fcafa225f4a5f728d6",
  measurementId: "G-NJKCTWC5BE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

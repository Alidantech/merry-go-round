// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwRd41bNuJV2YKLKXqII3dTHzdLKAov7g",
  authDomain: "merry-go-round-92c7f.firebaseapp.com",
  projectId: "merry-go-round-92c7f",
  storageBucket: "merry-go-round-92c7f.appspot.com",
  messagingSenderId: "587666954723",
  appId: "1:587666954723:web:32d6fcafa225f4a5f728d6",
  measurementId: "G-NJKCTWC5BE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCweneAttYIwSP_zetvJoVlDuBTP0kmBTU",
  authDomain: "netflixgpt-b186c.firebaseapp.com",
  projectId: "netflixgpt-b186c",
  storageBucket: "netflixgpt-b186c.firebasestorage.app",
  messagingSenderId: "246164446978",
  appId: "1:246164446978:web:500fc467d7ff765788ac1b",
  measurementId: "G-TTGMR92P0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
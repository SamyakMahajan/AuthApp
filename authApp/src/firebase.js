// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myauth-f8c58.firebaseapp.com",
  projectId: "myauth-f8c58",
  storageBucket: "myauth-f8c58.appspot.com",
  messagingSenderId: "337640621739",
  appId: "1:337640621739:web:bdee3af8699658249299ee",
  measurementId: "G-5Y5LHRB1ZJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
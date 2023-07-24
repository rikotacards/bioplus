// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnuhJMUH-ZfdizQPfsi2_lhE8r-vhjgp4",
  authDomain: "bioup.io",
  projectId: "bioplus-5d3d2",
  storageBucket: "bioplus-5d3d2.appspot.com",
  messagingSenderId: "287461596709",
  appId: "1:287461596709:web:36caab92ce67eb5419e9cc",
  measurementId: "G-MKK8DCT3TL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);

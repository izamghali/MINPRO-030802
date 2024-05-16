import * as firebase from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiCgFyGXdJKeD15nTt1QbsCHUUS4Hzpn4",
  authDomain: "mini-pro-02.firebaseapp.com",
  projectId: "mini-pro-02",
  storageBucket: "mini-pro-02.appspot.com",
  messagingSenderId: "386870263377",
  appId: "1:386870263377:web:69b1d5992211a7720b4270",
  measurementId: "G-QPKETSGPMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4A4dFe1K_PdP75IPdacmrr69m9nZa938",
  authDomain: "prueba-firebase-284f3.firebaseapp.com",
  projectId: "prueba-firebase-284f3",
  storageBucket: "prueba-firebase-284f3.appspot.com",
  messagingSenderId: "551708164403",
  appId: "1:551708164403:web:29ab4d401a17cb5e373e46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
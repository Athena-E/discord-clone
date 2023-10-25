// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTRAs37ll6vbYE61yBAtNsjNZ1lx7IUkI",
  authDomain: "discord-clone-d1584.firebaseapp.com",
  projectId: "discord-clone-d1584",
  storageBucket: "discord-clone-d1584.appspot.com",
  messagingSenderId: "697121149478",
  appId: "1:697121149478:web:47f94061f49b9128e98ce7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

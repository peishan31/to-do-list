// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "mern-todo-52855.firebaseapp.com",
    projectId: "mern-todo-52855",
    storageBucket: "mern-todo-52855.appspot.com",
    messagingSenderId: "369882022757",
    appId: "1:369882022757:web:6e3534ef2ec075566fd78c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
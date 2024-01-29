// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCG0fnsLH1nXS3EAWu8woJvOhEYVhZFrTs",
    authDomain: "react-quiz-application-36366.firebaseapp.com",
    projectId: "react-quiz-application-36366",
    storageBucket: "react-quiz-application-36366.appspot.com",
    messagingSenderId: "389872005157",
    appId: "1:389872005157:web:16daf53b0c938be3c40fcc",
    measurementId: "G-EFKFH3SCTH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
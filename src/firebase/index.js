import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1PNWNW2jaXRv33g24UjOWQEww4unuvFM",
  authDomain: "todo-repos.firebaseapp.com",
  projectId: "todo-repos",
  storageBucket: "todo-repos.appspot.com",
  messagingSenderId: "756012752939",
  appId: "1:756012752939:web:156dbaeaad83f89c1bca6e",
  measurementId: "G-F9Q5G2LM33"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
const db = getFirestore(app)
export {db}


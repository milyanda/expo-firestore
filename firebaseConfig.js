import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_w_efLIePzKdv2raacbmIXiJTJHa6CTc",
  authDomain: "reactday5-8c209.firebaseapp.com",
  projectId: "reactday5-8c209",
  storageBucket: "reactday5-8c209.appspot.com",
  messagingSenderId: "979110856334",
  appId: "1:979110856334:web:bf3cd1066b6fbda16cabdf",
  measurementId: "G-D0B5323LCX",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, getDocs };

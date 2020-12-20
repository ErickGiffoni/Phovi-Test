import firebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
//import "firebase/admin"

const firebaseConfig = {
  apiKey: "AIzaSyApUIKi9u4OWh319NSj8dG6WCCvTqqS1qU",
  authDomain: "trivia-maker-f473c.firebaseapp.com",
  databaseURL: "",
  projectId: "trivia-maker-f473c",
  storageBucket: "trivia-maker-f473c.appspot.com",
  messagingSenderId: "968342180329",
  appId: "1:968342180329:web:ff8a4a8708a10b3a3b3b78",
};

firebaseApp.initializeApp(firebaseConfig);

//var admin = require("firebase-admin");
//
//var serviceAccount = require("./serviceAccountKey.json");
//
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount)
//}); 


export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();

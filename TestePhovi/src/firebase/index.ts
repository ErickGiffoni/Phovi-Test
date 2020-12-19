import firebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebaseApp.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();

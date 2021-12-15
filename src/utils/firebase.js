import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDS9r14pivTg2x-Tl0Gh3A4rhBXJ4SD0lY",
  authDomain: "react-app-9a027.firebaseapp.com",
  projectId: "react-app-9a027",
  storageBucket: "react-app-9a027.appspot.com",
  messagingSenderId: "935127957235",
  appId: "1:935127957235:web:1c799246a54ca832b68186",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

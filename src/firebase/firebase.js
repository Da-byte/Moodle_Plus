import firebase from "firebase";

var firebaseConfig = {
  apiKey: "##########################",
  authDomain: "#############################333",
  databaseURL: "################################",
  projectId: "############################",
  storageBucket: "############################",
  messagingSenderId: "############################",
  appId: "#######################################",
  measurementId: "################################"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default app;
export const db = firebase.database();
export const auth = firebase.auth;
export const storage = firebase.storage();
export const databaseRef = firebase.database().ref();
export const analytics = firebase.analytics();



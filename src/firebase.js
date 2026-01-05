// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqcGP6coApUi7Ur70-oNTOXzNDjsfqIP4",
  authDomain: "doaniot-4fd43.firebaseapp.com",
  projectId: "doaniot-4fd43",
  storageBucket: "doaniot-4fd43.firebasestorage.app",
  messagingSenderId: "495335888138",
  appId: "1:495335888138:web:ed0aef87030e6bafd656f3",
  measurementId: "G-4PYGCDVXZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };

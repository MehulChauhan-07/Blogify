import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEvn("VITE_FIREBASE_API_KEY"),
  authDomain: getEvn("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: getEvn("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: getEvn("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEvn("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEvn("VITE_FIREBASE_APP_ID"),
  measurementId: getEvn("VITE_FIREBASE_MEASUREMENT_ID"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

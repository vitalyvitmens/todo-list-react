import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAXsPjUbROHw3Pbgo_OaAnbtGepJvnAC_E",
  authDomain: "todolistreact-78ceb.firebaseapp.com",
  projectId: "todolistreact-78ceb",
  storageBucket: "todolistreact-78ceb.appspot.com",
  messagingSenderId: "834459629942",
  appId: "1:834459629942:web:e911f6681aa777f7dd2257"
  databaseURL: "https://todolistreact-78ceb-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
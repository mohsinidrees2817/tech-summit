import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUdcI4MVcKy3yndsp8C2cBHFwHy56ba3w",
  authDomain: "techsummit-54f0c.firebaseapp.com",
  projectId: "techsummit-54f0c",
  storageBucket: "techsummit-54f0c.appspot.com",
  messagingSenderId: "207635079368",
  appId: "1:207635079368:web:d71003276536951e8e85fd",
  measurementId: "G-LFZDCZLG82",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

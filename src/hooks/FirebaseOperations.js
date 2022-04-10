import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7oiFNBsQmyKrQzlJbgIjgLTKABB3KjOo",
  authDomain: "furnitech-37b23.firebaseapp.com",
  databaseURL: "https://furnitech-37b23-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "furnitech-37b23",
  storageBucket: "furnitech-37b23.appspot.com",
  messagingSenderId: "893115740258",
  appId: "1:893115740258:web:761dbd1a9d12ae7645e13b",
  measurementId: "G-6Y0L562WQB"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default app;


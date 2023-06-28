// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0UeXLHeIM2rYxJd9vmBpLuYXj_zaC8TQ",
  authDomain: "gym-database-4e523.firebaseapp.com",
  databaseURL: "https://gym-database-4e523-default-rtdb.firebaseio.com",
  projectId: "gym-database-4e523",
  storageBucket: "gym-database-4e523.appspot.com",
  messagingSenderId: "729315069852",
  appId: "1:729315069852:web:1359d84a66b67ddde80259",
  measurementId: "G-N4ZFQXCXB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (analytics.isSupported()) {
  // Use Firebase Analytics
  analytics.logEvent('login', { method: 'email' });
} else {
  // Handle unsupported environment
  console.log('Firebase Analytics is not supported in this environment.');
}
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: 'buzz-scheduler.firebaseapp.com',
  projectId: 'buzz-scheduler',
  storageBucket: 'buzz-scheduler.appspot.com',
  messagingSenderId: '314217526764',
  appId: '1:314217526764:web:c843117db0a2ed62a03cc9',
  measurementId: 'G-ST6YZ5G5HC',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


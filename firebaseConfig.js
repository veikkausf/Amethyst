// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDffe7iYOK0IqY-3btLl7WLYnwQCeSjEbs',
  authDomain: 'amethyst-71024.firebaseapp.com',
  projectId: 'amethyst-71024',
  storageBucket: 'amethyst-71024.appspot.com',
  messagingSenderId: '946110492595',
  appId: '1:946110492595:web:efada742c539a002fce5c6',
  measurementId: 'G-GMYWBTXNZ4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

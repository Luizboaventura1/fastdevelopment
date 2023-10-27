import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

export const firebaseConfig = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: "fastdevelopment-712e1.firebaseapp.com",
  projectId: "fastdevelopment-712e1",
  storageBucket: "fastdevelopment-712e1.appspot.com",
  messagingSenderId: "658097375555",
  appId: "1:658097375555:web:62373493b0e938651607f6",
  measurementId: "G-1P1CHBPTH6"
})

export const auth = getAuth(firebaseConfig)

export const db = getFirestore(firebaseConfig)


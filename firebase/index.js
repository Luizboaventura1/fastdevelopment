import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = initializeApp({
  apiKey: "AIzaSyCGXLEqMwDuH_KADPhPFq1Upfdny044e5c",
  authDomain: "fastdevelopment-712e1.firebaseapp.com",
  projectId: "fastdevelopment-712e1",
  storageBucket: "fastdevelopment-712e1.appspot.com",
  messagingSenderId: "658097375555",
  appId: "1:658097375555:web:62373493b0e938651607f6",
  measurementId: "G-1P1CHBPTH6"
})



export const db = getFirestore(firebaseConfig)

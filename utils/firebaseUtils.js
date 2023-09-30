import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth";
import {auth,db} from '../../../firebase'
import {collection, addDoc} from "firebase/firestore";


export async function createUser (name,email,password) {
  createUserWithEmailAndPassword(auth, email, password)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      addUserInFirestore(name,email,password,user.uid)
    }
  })
}

function addUserInFirestore (name,email,password,uid) {
  addDoc(collection(db, "users"), {
    name,
    email,
    password,
    uid,
    frame: []
  });
}
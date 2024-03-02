import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

export default async function addUserInFirestore(name, email, uid) {
  const DB = getFirestore();

  await addDoc(collection(DB, "users"), {
    name,
    email,
    uid,
    workspace: [],
  });
}
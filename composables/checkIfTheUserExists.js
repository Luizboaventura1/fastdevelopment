import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";

export default async function checkIfTheUserExists(email) {
  const DB = getFirestore();

  const q = query(collection(DB, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

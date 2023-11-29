import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default async function getDataWorkspace() {
  const auth = getAuth();
  const db = getFirestore();
  let userEmail = "";

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          userEmail = user.email;

          const q = query(
            collection(db, "users"),
            where("email", "==", userEmail)
          );

          const querySnapshot = await getDocs(q);

          let result = null;

          querySnapshot.forEach((doc) => {
            result = doc.data().workspace;
          });

          resolve(result);
        }
      } catch (error) {
        reject(error);
      } finally {
        unsubscribe();
      }
    });
  });
}

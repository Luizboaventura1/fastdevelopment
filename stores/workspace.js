import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { defineStore } from "pinia";

export const useWorkspace = defineStore("workspace", () => {
  const frames = ref([]);

  const getAuthenticatedUserEmail = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user.email);
        } else {
          reject(new Error("Usuário não autenticado."));
        }
      });
    });
  };

  const getUserDataByEmail = async (email) => {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    return {
      id: userDoc.id,
      photoUrl: getAuth().currentUser?.photoURL,
      name: userData.name,
      email: userData.email,
      frames: userData.workspace,
    };
  };

  const fetchWorkspaceData = async () => {
    try {
      const userEmail = await getAuthenticatedUserEmail();
      const userData = await getUserDataByEmail(userEmail);

      if (userData) {
        return userData;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  const updateWorkspaceData = async () => {
    try {
      const userEmail = await getAuthenticatedUserEmail();
      const userData = await getUserDataByEmail(userEmail);

      if (!userData) {
        throw new Error("Dados do usuário não encontrados.");
      }

      const userDocRef = doc(getFirestore(), "users", userData.id);

      if (frames.value) {
        await updateDoc(userDocRef, { workspace: frames.value });
      } else {
        throw new Error("Array de frames não encontrado.");
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    frames,
    fetchWorkspaceData,
    updateWorkspaceData,
  };
});
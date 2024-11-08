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

export const useWorkspace = defineStore("workspace", {
  state: () => {
    return {
      frames: [],
    };
  },
  actions: {
    workspace() {
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
                result = {
                  id: doc.id,
                  photoUrl: user.photoURL,
                  name: doc.data().name,
                  email: doc.data().email,
                  frames: doc.data().workspace,
                };
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
    },
    async updateWorkspace() {
      const auth = getAuth();
      const db = getFirestore();

      try {
        const userId = await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (user) {
              const q = query(
                collection(db, "users"),
                where("email", "==", user.email)
              );

              const querySnapshot = await getDocs(q);

              let userId = null;

              querySnapshot.forEach((doc) => {
                userId = doc.id;
              });

              resolve(userId);
            } else {
              reject(new Error("Usuário não autenticado!"));
            }
          });
        });

        const frameDocRef = doc(db, "users", userId);

        if (this.frames) {
          await updateDoc(frameDocRef, {
            workspace: this.frames,
          });
        } else {
          throw new Error("Array não encontrado!");
        }
      } catch (e) {
        return e.message;
      }
    },
  },
});
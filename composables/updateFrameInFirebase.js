/* import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default async function updateFrameInFirebase(frame, id) {
  const db = getFirestore();

  const frameDocRef = doc(db, "users", id);
  console.log(frame,id)
  if (frame != null && frame != undefined && id != null && id != undefined) {
    await updateDoc(frameDocRef, {
      workspace: frame,
    });
  }
}
 */
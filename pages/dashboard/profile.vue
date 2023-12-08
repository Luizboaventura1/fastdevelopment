<template>
  <header class="h-full min-w-max">
    <div class="container h-full flex justify-center">
      <div class="config p-4 rounded-lg w-full bg-secondaryColorF overflow-y-auto">
        <div class="profile px-4 py-7 rounded-lg flex gap-4 items-center bg-subSecondaryColorF">
          <img
            v-if="userPhoto"
            :src="userPhoto"
            alt="Img user"
            class="rounded-full w-[60px] h-[60px] ring-1 ring-zinc-700"
          />

          <h1 class="w-full text-white">{{ userName }}</h1>
        </div>
        <DividerDefault space-y="4" />
        <div class="email rounded-lg flex p-4 bg-subSecondaryColorF">
          <span class="me-3 font-medium text-white">Email:</span>
          <span class="text-white">{{ userEmail }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onAuthStateChanged, getAuth } from "firebase/auth";
import DividerDefault from "@/components/Common/Dividers/DividerDefault.vue"
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

let userName = ref("");
let userPhoto = ref("../../../../assets/avatar-fast-development.png");
let userEmail = ref("");

onMounted(() => {
  // get user photo

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email;
      userPhoto.value = user.photoURL;

      // get name

      const q = query(
        collection(db, "users"),
        where("email", "==", userEmail.value)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        userName.value = doc.data().name;
      });
    }
  });
});
</script>

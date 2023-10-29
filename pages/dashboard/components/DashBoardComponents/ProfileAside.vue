<template>
  <nuxt-link to="/dashboard/profile">
    <div class="my-4 hover:bg-secondaryColorF p-2 flex items-center gap-3 rounded-md transition-colors cursor-pointer">
      <div class="avatar-container">
        <div class="rounded-full w-[45px] h-[45px] overflow-hidden">
          <img
            class="w-[45px] h-[45px]"
            :src="userPhoto"
            alt="User"
          >
        </div>
      </div>
      <div class="user-name w-[170px]">
        <div class="name truncate text-white font-medium w-full">
          {{ userName }}
        </div>
        <div class="category truncate text-zinc-400 italic w-full">
          ...
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";


let userName = ref("")
let userPhoto = ref("../../../../assets/avatar-fast-development.png")
let userEmail = ref("")


onMounted(() => {

  // get user photo

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email
      userPhoto.value = user.photoURL

      // get name

      const q = query(collection(db, "users"), where("email", "==", userEmail.value))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        userName.value = doc.data().name
      })

    }
  })
})

</script>

<style lang="scss" scoped>
.avatar {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
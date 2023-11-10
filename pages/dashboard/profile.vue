<template>
  <header class="h-full min-w-max">
    <div class="container h-full flex justify-center items-center">
      <div class="config p-4 rounded-lg">
        <div class="profile px-4 py-7 rounded-lg">
          <div class="img-container w-full flex justify-center items-center">
            <div class="img-user-box">
              <img
                v-if="userPhoto"
                :src="userPhoto"
                alt="Img user"
                class="rounded-full"
              >
              <svg v-else="true" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 460.8 460.8" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M230.432 0c-65.829 0-119.641 53.812-119.641 119.641s53.812 119.641 119.641 119.641 119.641-53.812 119.641-119.641S296.261 0 230.432 0zM435.755 334.89c-3.135-7.837-7.314-15.151-12.016-21.943-24.033-35.527-61.126-59.037-102.922-64.784-5.224-.522-10.971.522-15.151 3.657-21.943 16.196-48.065 24.555-75.233 24.555s-53.29-8.359-75.233-24.555c-4.18-3.135-9.927-4.702-15.151-3.657-41.796 5.747-79.412 29.257-102.922 64.784-4.702 6.792-8.882 14.629-12.016 21.943-1.567 3.135-1.045 6.792.522 9.927 4.18 7.314 9.404 14.629 14.106 20.898 7.314 9.927 15.151 18.808 24.033 27.167 7.314 7.314 15.673 14.106 24.033 20.898 41.273 30.825 90.906 47.02 142.106 47.02s100.833-16.196 142.106-47.02c8.359-6.269 16.718-13.584 24.033-20.898 8.359-8.359 16.718-17.241 24.033-27.167 5.224-6.792 9.927-13.584 14.106-20.898 2.611-3.135 3.133-6.793 1.566-9.927z" opacity="1" data-original="#000000"></path></g></svg>
              <div class="change-photo rounded-full d-flex justify-content-center align-items-center p-2">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 36.174 36.174" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path d="M23.921 20.528c0 3.217-2.617 5.834-5.834 5.834s-5.833-2.617-5.833-5.834 2.616-5.834 5.833-5.834 5.834 2.618 5.834 5.834zm12.253-8.284v16.57a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-16.57a4 4 0 0 1 4-4h4.92V6.86a3.5 3.5 0 0 1 3.5-3.5h11.334a3.5 3.5 0 0 1 3.5 3.5v1.383h4.92c2.209.001 4 1.792 4 4.001zm-9.253 8.284c0-4.871-3.963-8.834-8.834-8.834-4.87 0-8.833 3.963-8.833 8.834s3.963 8.834 8.833 8.834c4.871 0 8.834-3.963 8.834-8.834z" opacity="1" data-original="#000000"></path></g></svg>
              </div>
            </div>
          </div>
          <div class="user-data w-full mt-4">
            <h1 class="w-full text-center my-2">{{ userName }}</h1>
            <h2 class="w-full text-center">...</h2>
          </div>
        </div>
        <div class="email rounded-lg flex p-4 my-3">
          <span class="me-3 font-medium">Email</span>
          <span>{{ userEmail }}</span>
        </div>
        <div class="email rounded-lg flex p-4 my-3">
          <span class="me-3 font-medium">Empresa</span>
          <span>...</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

const auth = getAuth()
const db = getFirestore()

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
$primary-color: #121214;
$secondary-color: #222226;
$primary-color-text: rgb(236, 236, 236);

header {

  .config {
    width: 100%;
    max-width: 800px;

    .profile {
      background-color: $primary-color;

      .img-container {
        svg {
          width: 80px;
          height: 80px;
          fill: #474750;
        }

        .img-user-box {
          position: relative;
          width: 80px;
          height: 80px;

          .change-photo {
            position: absolute;
            right: -15px;
            bottom: -15px;
            height: 40px;
            width: 40px;
            background-color: $primary-color;
            cursor: pointer;

            svg {
              fill: #5e5e65;
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .user-data {
        h1 {
          color: $primary-color-text;
          font-size: 17px;
        }

        h2 {
          color: rgb(175, 175, 175);
          font-style: italic;
          font-size: 15px;
        }
      }
    }

    .email {
      background-color: $primary-color;
      font-size: 17px;

      span:nth-of-type(1) {
        color: $primary-color-text;
      }

      span:nth-of-type(2) {
        color: rgb(214, 214, 214);
      }
    }

    .logout {
      border: 0;
      outline: none;
      background-color: $primary-color;
      transition: .3s;
      color: $primary-color-text;

      svg {
        fill: #5e5e65;
        width: 25px;
        height: 25px;
        transition: .3s;
      }

      &:hover {
        background-color: #d71239;
        svg {
          fill: $primary-color;
        }
      }
    }

    .back-dashboard {
      border: 0;
      outline: none;
      background-color: $primary-color;
      transition: .3s;
      color: $primary-color-text;

      svg {
        fill: #5e5e65;
        width: 25px;
        height: 25px;
        transition: .3s;
      }

      &:hover {
        background-color: #333339;
        svg {
          fill: $primary-color;
        }
      }
    }
  }
}
</style>
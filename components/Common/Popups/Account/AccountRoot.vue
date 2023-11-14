<template>
  <div
    class="relative w-[45px]"
  >
    <div
      :class="`w-[${props.size}px] h-[${props.size}px]`"
      class="rounded-full relative overflow-hidden cursor-pointer"
    >
      <img
        @click.stop="stateModal = !stateModal"
        src="../../../../assets/avatar-fast-development.png"
        alt="Default photo"
        class="absolute z-0"
      >
      <img
        @click.stop="closeModal"
        v-if="(userPhoto == undefined) ? false : true"
        class="w-full absolute z-10"
        :src="userPhoto"
        alt="User"
      >
    </div>
    <div class="absolute bottom-9 right-5">
      <OptionsModalRoot
        v-on-click-outside="closeCard"
        :stateModal="stateModal"
      >
        <template #nav>
          <TitleOptionsModal>
            Sua conta
          </TitleOptionsModal>
          <CloseButton
            :event="closeCard"
            size="16"
          />
        </template>

        <template #buttons>
          <nuxt-link to="/dashboard/profile">
            <ActionOptionsModal>
              Ver perfil
            </ActionOptionsModal>
          </nuxt-link>
          <ActionOptionsModal
            :event="() => openWarningMessage('Sair da conta?')"
          >
            Fazer logout
          </ActionOptionsModal>
        </template>

      </OptionsModalRoot>
    </div>
  </div>
  <Loading
    :visibility="loading"
  />
  <WarningMessage
    :message="warningMessage"
    :state="stateWarningMessage"
    :cancel="cancelWarningMessage"
    :confirm="confirmWarningMessage"
  />
</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import OptionsModalRoot from '@/components/Common/Popups/OptionsModal/OptionsModalRoot.vue';
import ActionOptionsModal from '@/components/Common/Popups/OptionsModal/ActionOptionsModal.vue';
import TitleOptionsModal from '@/components/Common/Popups/OptionsModal/TitleOptionsModal.vue';
import CloseButton from '@/components/Common/FeedBack/CloseButton.vue';
import Loading from '../../Loadings/Loading.vue';
import { signOut } from "firebase/auth";
import WarningMessage from '../../FeedBack/WarningMessage.vue';

let props = defineProps({
  size: String
})

const closeModal = () => {
  if (stateModal.value) {
    stateModal.value = false
  } else {
    stateModal.value = true
  }
}

const router = useRouter()
let loading = ref(false)

const auth = getAuth()
const db = getFirestore()

let userName = ref("")
let userPhoto = ref(undefined)
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

let stateModal = ref(false)

//When you click outside the modal it will close
const closeCard = () => stateModal.value = false

const logout = async () => {
  loading.value = true

  // end the session
  await signOut(auth).then(() => {
    loading.value = false // Disable Loading

    // blocks the routes
    const logged = useCookie('token')
    logged.value = false

    // back home
    router.push('/')

  })
}

// Warning message Card

let stateWarningMessage = ref(false)
let warningMessage = ref("")

const openWarningMessage = (message) => {
  stateWarningMessage.value = true
  warningMessage.value = message
}

const cancelWarningMessage = () => stateWarningMessage.value = false

const confirmWarningMessage = () => {

  logout()
  stateWarningMessage.value = false

}

</script>

<style lang="scss" scoped>
.avatar {
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
<template>
  <div class="dashboard w-full h-screen flex">
    <aside
      class="h-screen bg-subSecondaryColorF overflow-hidden"
      :style="`width:${dashboardWidth}px;`"
    >
      <div class="p-3">
        <LogoAside />
        <ProfileAside />
        <FrameAside
          :event="() => router.push('/dashboard/frame')"
        />
        <div class="divider w-full h-[1px] bg-zinc-700 my-3"></div>
        <LogoutAside
          :event="() => openWarningMessage('Sair da conta?')"
        />
      </div>
    </aside>

    <div class="flex-1 w-[calc(100% - 280px)] overflow-x-auto">
      <header
        class="h-full"
      >
        <nav
          class="h-[60px] flex items-center px-4"
        >
          <BurguerButton
            :event="dashboardToggle"
          />
        </nav>
        <main class="bg-secondaryColorF overflow-x-auto p-3">
          <NuxtPage />
        </main>
      </header>
    </div>

  </div>

  <Loading
    :visibility="loading"
  />
  <WarningMessage
    :state="stateWarningMessage"
    :message="warningMessage"
    :cancel="cancelWarningMessage"
    :confirm="confirmWarningMessage"
  />
</template>

<script setup>
import FrameAside from './dashboard/components/DashBoardComponents/FrameAside.vue'
import LogoAside from './dashboard/components/DashBoardComponents/LogoAside.vue'
import ProfileAside from './dashboard/components/DashBoardComponents/ProfileAside.vue'
import LogoutAside from './dashboard/components/DashBoardComponents/LogoutAside.vue'
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase';
import { useRouter } from '#vue-router';
import BurguerButton from './dashboard/components/BurguerButton.vue';
import Loading from '~/components/Common/Loading.vue';
import { onAuthStateChanged } from 'firebase/auth';
import WarningMessage from '~/components/Kanban/Modals/WarningMessage.vue';

const router = useRouter()
// starts true to check if the user is logged in
let loading = ref(true)

definePageMeta({
  middleware: "auth"
})

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

// control the dashboard

let dashboardWidth = ref("280")

const dashboardToggle = () => {
  if (dashboardWidth.value === '280')
    return dashboardWidth.value = '0'
  
  return dashboardWidth.value = '280'
}

// Checks whether the user is logged in or not

onMounted(() => {
  const logged = useCookie('token')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      logged.value = true
      loading.value = false
    }
     else {
      logged.value = false
      router.push('/')
    }
  })

})

// confirm exit account

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

  aside {
    transition: .5s;
  } 

  nav {
    background-color: #1b1b1d;
  }

  main {
    height: calc(100% - 60px);
  }
</style>
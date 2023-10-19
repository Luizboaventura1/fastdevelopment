<template>
  <div class="dashboard w-full h-screen flex">
    <aside
      class="h-screen bg-subSecondaryColorF overflow-hidden"
      :style="`width:${dashboardWidth}px;`"
    >
      <div class="p-3">
        <LogoAside />
        <ProfileAside />
        <FrameAside />
        <div class="divider w-full h-[1px] bg-zinc-700 my-3"></div>
        <LogoutAside
          :event="logout"
        />
      </div>
    </aside>

    <div class="flex-1">
      <header
        class="h-full"
        :class="headerClass"
      >
        <nav
          class="h-[60px] flex items-center px-4"
        >
          <BurguerButton
            :event="dashboardToggle"
          />
        </nav>
        <main class="bg-secondaryColorF w-full overflow-y-auto p-3">
          <NuxtPage />
        </main>
      </header>
    </div>

  </div>
</template>

<script setup>
import FrameAside from './dashboard/components/DashBoardComponents/FrameAside.vue'
import LogoAside from './dashboard/components/DashBoardComponents/LogoAside.vue'
import ProfileAside from './dashboard/components/DashBoardComponents/ProfileAside.vue'
import LogoutAside from './dashboard/components/DashBoardComponents/LogoutAside.vue'
import { signOut } from "firebase/auth";
import { auth } from '../../../firebase'
import { useRouter } from '#vue-router';
import BurguerButton from './dashboard/components/BurguerButton.vue';

const router = useRouter()

definePageMeta({
  middleware: "auth"
})

const logout = () => {
  // end the session
  signOut(auth)
  
  // blocks the routes
  const logged = useCookie('token')
  logged.value = false

  // back home
  router.push('/')
}

// control the dashboard

let dashboardWidth = ref('280')

const dashboardToggle = () => {
  if (dashboardWidth.value === '280')
    return dashboardWidth.value = '0'
  
  return dashboardWidth.value = '280'
}

const headerClass = computed(() => {
  return dashboardWidth.value === 0 ? 'w-screen' : 'w-full'
})

</script>

<style lang="scss" scoped>

  aside {
    transition: .5s;
  } 

  header {
    //width: calc(100% - 280px);
  }

  nav {
    background-color: #1b1b1d;
  }

  main {
    height: calc(100% - 60px);
  }
</style>
<template>
  <div class="relative">
    <ButtonNav
      @event="toggleModal"
    >
      <NotificationIcon
        size="20"
      />
    </ButtonNav>
    <div class="absolute top-11 right-2 z-50">
      <Transition>
        <div
          v-on-click-outside.bubble="closeModal"
          v-if="stateModal"
          class="notification bg-secondaryColorF w-[350px] rounded-lg p-5"
        >
          <nav class="flex items-center justify-between">
            <TitleNotification>
              Notificações
            </TitleNotification>
            <CloseButton
              size="18"
              :event="closeModal"
            />
          </nav>
          <DividerDefault
            spaceY="2"
          />
          <main>
            <NoNotifications 
              :state="true"
            >
              Sem notificações
            </NoNotifications>
          </main>
        </div>
      </Transition>
    </div>
  </div>

</template>

<script setup>
import { vOnClickOutside } from '@vueuse/components'
import TitleNotification from './TitleNotification.vue';
import CloseButton from '~/components/Common/FeedBack/CloseButton.vue';
import DividerDefault from '~/components/Common/Dividers/DividerDefault.vue';
import NoNotifications from './NoNotifications.vue'
import ButtonNav from '~/pages/dashboard/components/DashBoardComponents/ButtonNav.vue';
import NotificationIcon from '~/pages/dashboard/components/DashBoardComponents/NotificationIcon.vue';

let stateModal = ref()

const toggleModal = () => stateModal.value = !stateModal.value

const closeModal = () => stateModal.value = false

</script>

<style lang="scss" scoped>
.notification {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.413);
  border: 1px solid rgba(55, 55, 55, 0.998);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
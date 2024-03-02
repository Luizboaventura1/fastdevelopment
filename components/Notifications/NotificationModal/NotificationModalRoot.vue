<template>
  <div class="relative">
    <ButtonNav
      @event="toggleModal"
    >
      <NotificationIcon
        size="20"
      />
    </ButtonNav>
    <div
      class="absolute w-screen flex justify-end top-11 -right-10 sm:right-0"
    >
      <Transition>
        <div
          v-on-click-outside.bubble="closeModal"
          v-if="stateModal"
          class="notification bg-secondaryColorF rounded-lg p-4 z-40"
        >
          <nav class="flex items-center justify-between">
            <TitleNotification>
              Notificações
            </TitleNotification>
            <CloseButton
              size="15"
              :event="closeModal"
            />
          </nav>
          <DividerDefault
            spaceY="2"
          />
          <main
            class="overflow-y-auto"
          >
            <section
              v-for="notification in notifications"
              :key="notification"
            >
              <NotificationItem
                :title="notification.title"
                :message="notification.message"
              />
            </section>
            <NoNotifications 
              :state="stateNoNotifications"
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
import NotificationItem from './NotificationItem/NotificationItem.vue';

// User Notifications
let notifications = ref([])

// Control modal state
let stateModal = ref()

const toggleModal = () => stateModal.value = !stateModal.value
const closeModal = () => stateModal.value = false

// If you have any notifications, remove the "No notifications" component

let stateNoNotifications = ref(false)

const checkAndHandleNoNotifications = () => {
  if (notifications.value.length === 0) {
    handleNoNotifications.show()
  } else {
    handleNoNotifications.close()
  }
}

const handleNoNotifications = {
  close: () => stateNoNotifications.value = false,
  show: () => stateNoNotifications.value = true
}

watch(notifications,checkAndHandleNoNotifications)
onMounted(checkAndHandleNoNotifications)

</script>

<style lang="scss" scoped>
.notification {
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.413);
  border: 1px solid rgba(55, 55, 55, 0.998);
  width: 100%;
  max-width: 300px;
}

@media screen and (max-width: 400px) {
  .notification {
    max-width: 280px;
  }
}

main {
  height: 100%;
  max-height: 400px;
}

::-webkit-scrollbar-thumb {
  display: none;
}

::-webkit-scrollbar {
  display: none;
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
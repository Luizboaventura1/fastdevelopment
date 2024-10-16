import type { ToastInterface } from "@/components/Common/Notifications/Toast/types/ToastInterface";
import type { Notification } from "~/components/Common/Notifications/Toast/types/Notification";
import { ref, type Ref } from "vue";

export default function useToast(): ToastInterface {
  let toastList: Ref<Notification[]> = ref([]);

  const add = (newToast: Notification): void => {
    toastList.value.unshift(newToast);

    let timeout = newToast.timeout ? newToast.timeout : 2000;

    setTimeout(() => {
      removeToast(newToast)
    }, timeout);

  };

  const removeToast = (toast: Notification): void => {
    const index = toastList.value.indexOf(toast);
    if (index !== -1) {
      toastList.value.splice(index, 1);
    }
  };

  return {
    toastList,
    add,
  };
}

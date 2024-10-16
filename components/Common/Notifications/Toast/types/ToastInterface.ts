import type { Ref } from "vue";
import type { Notification } from "../../components/Common/Notifications/Toast/types/Notification";

export interface ToastInterface {
  toastList: Ref<Notification[]>;
  add: (newToast: Notification) => void;
}
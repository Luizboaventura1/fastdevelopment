import type { Ref } from "vue";
import type { Notification } from "./Notification";

export interface ToastInterface {
  toastList: Ref<Notification[]>;
  add: (newToast: Notification) => void;
}
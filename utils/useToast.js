import { ref } from 'vue';

export default function useToast() {
  let toastList = ref([]);

  const add = (newToast) => {
    toastList.value.unshift(newToast);

    let timeout = newToast.timeout ? newToast.timeout : 2000;

    setTimeout(() => {
      removeToast(newToast);
    }, timeout);
  };

  const removeToast = (toast) => {
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
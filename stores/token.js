import { defineStore } from "pinia";
export const useTokenStore = defineStore('token', {
  state: () => {
    return {
      token: (typeof localStorage !== 'undefined' && localStorage.getItem('token'))
      ? JSON.parse(localStorage.getItem('token'))
      : {}
    }
  }
})
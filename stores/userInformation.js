import { defineStore } from "pinia";
export const userInformation = defineStore("user", {
  state: () => {
    return {
      user: {
        name: "",
        email: "",
        userPhoto: ""
      }
    }
  }
})
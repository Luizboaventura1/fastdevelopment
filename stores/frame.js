import { defineStore } from "pinia";
export const useFrame = defineStore('frame', {
  state: () => {
    return {
      frame: []
    }
  }
})
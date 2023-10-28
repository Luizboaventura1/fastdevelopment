import { defineStore } from "pinia";
export const useFrame = defineStore('frame', {
  state: () => {
    return {
      frame: [
        {
          title: 'A fazer',
          cards: [
            {
              title: 'Equipamento',
              description: 'Descrição...'
            },
            {
              title: 'Site',
              description: 'Descrição...'
            },
            {
              title: 'Lp',
              description: 'Descrição...'
            }
          ] 
        },
        {
          title: 'Em progresso',
          cards: [
            {
              title: 'Equipamento',
              description: 'Descrição...'
            },
            {
              title: 'Site',
              description: 'Descrição...'
            },
            {
              title: 'Lp',
              description: 'Descrição...'
            }
          ] 
        }
      ]
    }
  }
})
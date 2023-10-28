import { defineStore } from "pinia";
export const useFrame = defineStore('frame', {
  state: () => {
    return {
      frame: [
        {
          title: 'A fazer',
          cards: [
            {
              title: 'Desenvolver funcionalidade de login',
              description: 'Implementar o sistema de autenticação para o aplicativo.'
            },
            {
              title: 'Criar página inicial',
              description: 'Construir a página inicial com informações sobre o aplicativo.'
            },
            {
              title: 'Configurar banco de dados',
              description: 'Configurar o Firebase Firestore como banco de dados para armazenar dados do aplicativo.'
            }
          ] 
        },
        {
          title: 'Em progresso',
          cards: [
            {
              title: 'Design da interface de usuário',
              description: 'Criar o design da interface de usuário para o aplicativo.'
            },
            {
              title: 'Implementar recursos avançados',
              description: 'Adicionar recursos avançados, como notificações em tempo real.'
            },
            {
              title: 'Testes e depuração',
              description: 'Realizar testes extensivos e depuração do aplicativo.'
            }
          ] 
        }
      ]
    }
  }
})
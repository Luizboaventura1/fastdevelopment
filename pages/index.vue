<template>
  <div>
    <button
      @click="addItem"
    >
      Add
    </button>
  </div>
</template>

<script setup>
import {useTokenStore} from '../stores/token.js'
import {db} from '@/firebase'
import {addDoc,collection} from 'firebase/firestore'
const store = useTokenStore()

console.log(store.token)

const addItem = () => {
  addDoc(collection(db, "dado"), {
    nome: 'Luiz'
  });

}
</script>
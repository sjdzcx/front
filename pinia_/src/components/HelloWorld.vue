<script setup>
import { ref } from 'vue'
import useSum from '@/store/sum'
console.log('"---------------"');
const useSumStore = useSum();
// console.log(useSumStore);
console.log(useSumStore.sum);
function add() {
  // console.log(useSumStore);
  useSumStore.sum++;

}

</script>
<template>
  <div>
    <div>{{ useSumStore.sum }}</div>
    <button @click="add">+</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script setup>
import { ref } from 'vue'
import useSum from '@/store/sum'
const useSumStore = useSum();
console.log(useSumStore.sum);
function add() {
  // console.log(useSumStore);
  useSumStore.add();

}

</script>
<template>
  <div>
    <div>{{ useSumStore.sum }}/{{ useSumStore.doubleSum }}</div>
    <button @click="add">+</button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

import { defineStore } from "pinia";


export default defineStore('sum', {
    state: () => ({
        sum: 1
    })
});
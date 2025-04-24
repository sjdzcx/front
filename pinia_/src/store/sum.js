import { defineStore } from "@/pinia";


export default defineStore('sum', {
    state: () => ({
        sum: 1
    })
    , getters: {
        doubleSum: function () {
            return this.sum * 2;
        }
    }, actions: {
        add() {
            this.sum++
        },
        reduce() {
            this.sum--
        },
        reset() {
            this.sum = 1;
        }
    }
});
import { effectScope, getCurrentInstance, reactive } from 'vue'
import symbolPinia from './symbolPinia.js'
function creastePinia() {
    const scope = new effectScope(true); // 创建一个新的 effectScope
    const state = scope.run(() => reactive({})) //用来管理所有store下的state
    const pinia = {
        _s: new Map(), // 用于存储所有的 store
        _e: scope, //用于管理所有store状态
        install() {
            //得到当前实例
            const app = getCurrentInstance();
            app.provide(symbolPinia, pinia); //将 pinia 实例提供给 Vue 的依赖注入系统
        },
        state
    }
    return pinia;
}
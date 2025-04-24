import { computed, getCurrentInstance, inject, reactive } from "vue";
import piniaSymbol from "./globalAttr.js";
import { effectScope } from "vue";
function createOptionStore(id, options, pinia) {
    const { state, getters, actions } = options;
    const store = reactive({}); //一个响应式对象
    function setup() { //对用户传递的state,actions getters 进行处理
        //1. 将传入的state 赋值给state[id] 
        //2. 如果state 存在，则将state()的对象 返回给locationState
        //3. 不存在则返回全新的对象
        const locationState = (pinia.state[id] = state) ? state() : {}; //将state放入pinia实例中进行管理
        // console.log(locationState, "locationState");


        //locationState：只是一个普通的对象
        //getters 是通过计算属性包装的
        return Object.assign(locationState, actions, Object.keys(getters || {}).reduce((memo, name) => {
            memo[name] = computed(() => {
                return getters[name].call(store); //将方法绑定到store上
            })
            return memo;
        }, {}));
    }
    let scope;
    //setupStore 是用户传递的方法,和属性
    const setupStore = pinia._e.run(() => {
        scope = effectScope(true); // 自己可以停止自己

        return scope.run(() => setup())
    })
    function wrapAction(name, actions) {
        return function () {
            const res = actions.apply(store, arguments); //将方法绑定到store上
            //-----------
            return res;
        }
    }
    for (const key in setupStore) {
        const prop = setupStore[key];
        if (typeof prop === 'function') {
            setupStore[key] = wrapAction(key, prop); //将方法绑定到store上
        }
    }
    pinia._s.set(id, store); //将store放入pinia实例中
    //将setupStore的值放入store中，此时才将setupStore中的原本state中的内容添加了响应式
    Object.assign(store, setupStore);
    window.cxstore = store;
}


export function defineStore(idorOptions, setup) {

    let id;
    let options;
    if (typeof idorOptions === 'string') {
        id = idorOptions;
        options = setup;
    } else {
        id = idorOptions.id;
        options = idorOptions;
    }
    function useStore() {
        //得到当前实例对象
        let instance = getCurrentInstance();
        const pinia = instance && inject(piniaSymbol);
        if (!pinia._s.has(id)) {
            createOptionStore(id, options, pinia);
        }
        const store = pinia._s.get(id);
        return store;
    }
    return useStore
}
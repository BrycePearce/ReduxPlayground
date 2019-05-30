import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // has to be named state, vuex looks for it. Keeps track of the items/variables we want to access.
        counter: 0
    },
    getters: { // Getters will do any calculations we need, so that we don't need to do it in multiple components. (State here is automatically passed by vuex)
        doubleCounter: ((state) => { // Use getters when you want to display a computed value of state (e.g. counter * 2), but *** you cannot alter state from a getter ***
            return state.counter * 2;
        }),
        stringCounter: ((state) => {
            return state.counter + ' Clicks';
        }),
    },
    mutations: { // Mutations change state, and track changes. ***Mutations are the only way to change the state value*** (unless you access statea directly)
        increment: ((state) => {
            state.counter++;
        }),
        decrement: ((state) => {
            state.counter--;
        }),
    }
})
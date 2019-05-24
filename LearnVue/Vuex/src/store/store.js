import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // has to be named state, vuex looks for it. Keeps track of the items/variables we want to access.
        counter: 0
    },
    getters: { // Getters will do any calculations we need, so that we don't need to do it in multiple components. (State here is automatically passed by vuex)
        doubleCounter: state => {
            return state.counter * 2;
        }
    }
})
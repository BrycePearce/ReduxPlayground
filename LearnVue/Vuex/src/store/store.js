import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // has to be named state, vuex looks for it. Keeps track of the items/variables we want to access.
        counter: 0,
        value: 0
    },
    getters: { // Getters will do any calculations we need, so that we don't need to do it in multiple components. (State here is automatically passed by vuex)
        doubleCounter: ((state) => { // Use getters when you want to display a computed value of state (e.g. counter * 2), but *** you cannot alter state from a getter ***
            return state.counter * 2;
        }),
        stringCounter: ((state) => {
            return state.counter + ' Clicks';
        }),
        value: (state) => {
            return state.value;
        }
    },
    mutations: { // Mutations change state, and track changes. ***Mutations are the only way to change the state value*** (unless you access statea directly)
        increment: ((state, payload) => {
            state.counter += payload; // note: mutations is synchronous. Do not do timeouts or http calls here. If you need to do that, then use an Action
        }),
        decrement: ((state, payload) => {
            state.counter -= payload;
        }),
        updateValue: (state, payload) => {
            state.value = payload;
        }
    }, // ** Consider only having actions to commit to your mutations. It can help keep things organized **
    actions: { // actions allow you to make mutation changes asynchronous. You 'commit' to the mutation once the 'action' is done.
        increment: ((context, payload) => { // increment: ({context}) => { commit('increment') } is also valid
            context.commit('increment', payload) // payload here is how much to increment by. Note: commits call mutations.
        }),
        decrement: ((context, payload) => {
            context.commit('decrement', payload)
        }),
        asyncIncrement: ((context, payload) => { // the whole point of actions is to allow mutations to take place asynchronously 
            setTimeout(() => {
                context.commit('increment', payload.by)
            }, payload.duration)
        }),
        asyncDecrement: ((context, payload) => {
            setTimeout(() => {
                context.commit('decrement', payload.by)
            }, payload.duration)
        }),
        updateValue ({ commit }, payload) {
            commit('updateValue', payload)
        }
    }
})
const state = {
    counter: 0
};

const getters = {
    doubleCounter: ((state) => { // Use getters when you want to display a computed value of state (e.g. counter * 2), but *** you cannot alter state from a getter ***
        return state.counter * 2;
    }),
    stringCounter: ((state) => {
        return state.counter + ' Clicks';
    })
};

const mutations = {
    increment: ((state, payload) => {
        state.counter += payload; // note: mutations is synchronous. Do not do timeouts or http calls here. If you need to do that, then use an Action
    }),
    decrement: ((state, payload) => {
        state.counter -= payload;
    })
};

const actions = {
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
    })
};

export default {
    state,
    mutations,
    actions,
    getters
}
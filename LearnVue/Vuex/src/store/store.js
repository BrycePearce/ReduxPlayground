import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';

import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // has to be named state, vuex looks for it. Keeps track of the items/variables we want to access.
        value: 0
    },
    getters,
    mutations, // ** Consider only having actions to commit to your mutations. It can help keep things organized **
    actions,
    modules: {
        counter
    }
})
import stocks from '../../data/stocks.js'
const state = {
    stocks: []
};

const mutations = {
    'SET_STOCKS'(state, stocks) {
        state.stocks = stocks;
    },
    'RNG_STOCKS'(state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
};

const actions = {
    buyStock: (({commit}, order) => {
        commit('BUY_STOCK', order);
    }),
    initStocks: (({commit}) => {
        commit('SET_STOCKS', stocks);
    }),
    randomizeStocks: ({commit}) => {
        commit('RNG_STOCKS');
    }
}

// Q: why use getters to get state instead of just accessing state:
// A: It's a common practice to use getters. Whilst you can directly access the state, abstracting state access away prevents unwanted mutations. Additionally, you can easily transform your data in getters in case you need that.
const getters = {
    stocks: state => {
        return state.stocks;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
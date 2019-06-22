const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'BUY_STOCK'(state, {
        stockId,
        stockPrice,
        quantity
    }) {
        // Check if the stock exists
        const record = state.stocks.find(stock => stock.id === stockId);

        // if it does, buy it
        if (record) {
            record.quantity += quantity;
        } else {
            // Otherwise, add it to our list of stocks
            state.stocks.push({
                id: stockId,
                quantity: quantity
            });
        }
        
        // update funds
        state.funds -= stockPrice * quantity;
    },
    'SELL_STOCK'(state, {
        stockId,
        quantity,
        stockPrice
    }) {
        // Check if the stock exists
        const record = state.stocks.find(stock => stock.id === stockId);

        // If we are selling a valid amount of stocks
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else { // If we sell more than what we have, or exactly how much we have, remove it
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }

        // update funds
        state.funds += stockPrice * quantity;
    }
}

const actions = {
    sellStock({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    stockPortfolio(state, getters) {
        return state.stocks.map(stock => {
            // (access getters from stock module)
            const record = getters.stocks.find(element => element.id === stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            };
        });
    },
    funds(state) {
        return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
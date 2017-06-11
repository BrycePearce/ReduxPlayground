//redux store
import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/index';

//user will be an object, so initialize it as such
let user = {};

//create an object for the default data
const defaultState = {
  //es6 lets you just say 'user' where previous you had to initialize with:  user: user
  user
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

//hot reload (makes things update without refresh)
if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
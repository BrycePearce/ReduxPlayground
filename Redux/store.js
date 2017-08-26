//redux store
import { createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers/index';

//comments will be an object, so initialize it as such. Will contain the comment and the user commenting
let comments = {};
//create an object for the default data
const defaultState = {
  //es6 lets you just say 'user' where previous you had to initialize with:  comments: comments
  comments
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
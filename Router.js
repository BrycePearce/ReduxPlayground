import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { history } from './store';

//components
import Container from './components/Container';

render((
  /*Provider will expose our store to the application*/
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Route path="/" component={Container}>
      </Route>
    </BrowserRouter>
  </Provider>

), document.getElementById('container'));


/*
Redirect for onClick: https://youtu.be/UVQ0ATR0vpI?t=10m15s
For example, if you click 'Log in' it will redirect you to your Witter userpage
*/
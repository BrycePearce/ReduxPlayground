import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store';

new Vue({
  el: '#app',
  store, // es6 implmentation, can also do store: store
  render: h => h(App)
})

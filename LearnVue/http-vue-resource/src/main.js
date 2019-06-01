import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-http-demo-project.firebaseio.com/data.json' // Global Options. This sets a root url that all requests get sent to.
// can also set up default headers, content-type, etc


// Can also set up interceptors, e.g.
Vue.http.interceptors.push((request, next) => {
  if (request.method === 'POST') {
    request.method = 'PUT';
  }
  next(response => {
    response.json = () => {
      return {
        messages: response.body
      }
    }
  });
});
new Vue({
  el: '#app',
  render: h => h(App)
})
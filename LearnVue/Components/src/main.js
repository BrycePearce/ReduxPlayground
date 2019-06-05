import Vue from 'vue'
import App from './App.vue'

// similar to services in Angular
export const eventBus = new Vue({
  // can access this anywhere, kind of global state
  methods: {
    changeAge(age) {
      this.$emit('ageWasEdited', age)
    }
  }
});

// similar to services in Angular
// export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
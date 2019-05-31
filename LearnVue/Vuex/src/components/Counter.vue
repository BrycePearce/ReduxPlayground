<template>
  <div>
    <button class="btn btn-primary" @click="increment(100)">Increment</button>
    <button class="btn btn-primary" @click="decrement(50)">Decrement</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["increment", "decrement"]) // vuex implemented increment and decrement as seen commented below. Note, this passes on arguments ( increment(100) ) automatically

    // increment() {
    //     this.$store.commit('increment'); // vuex will search for a method named 'increment' in mutations and execute it
    // },
    // decrement() {
    //     this.$store.commit('decrement');
    // }
  }
};
</script>
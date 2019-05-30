<template>
  <div>
    <button class="btn btn-primary" @click="increment">Increment</button>
    <button class="btn btn-primary" @click="decrement">Decrement</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["increment", "decrement"]), // vuex implemented increrment and decrement as seen commented below
    // increment() {
    //   this.$store.commit("increment"); // vuex will search for a method named 'increment' in mutations and execute it
    // },
    // decrement() {
    //   this.$store.commit("decrement");
    // }
  }
};
</script>
<template>
  <div>
    <button class="btn btn-primary" @click="asyncIncrement({by: 50, duration: 500})">Increment</button> <!-- note: actions can take 1 param by default. If need more, use object like shown here. -->
    <button class="btn btn-primary" @click="asyncDecrement({by: 50, duration: 500})">Decrement</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["asyncIncrement", "asyncDecrement"]) // vuex implemented increment and decrement as seen commented below. Note, this passes on arguments ( increment(100) ) automatically










    // **** USING MUTATIONS DIRECTLY **** (it's valid, but using Actions can be seen as best practice. Comes down to preference)
    // ...mapMutations(["increment", "decrement"]), // vuex implemented increment and decrement as seen commented below
    // increment() { // **note. Do not need these two methods if you are using mapMutations
    //   this.$store.commit("increment"); // vuex will search for a method named 'increment' in mutations and execute it
    // },
    // decrement() {
    //   this.$store.commit("decrement");
    // }
  }
};
</script>
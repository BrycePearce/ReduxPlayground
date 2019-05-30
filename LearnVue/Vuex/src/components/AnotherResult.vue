<template>
  <div>
    <p>Counter is: {{ doubleCounter }}</p>
    <p>Number of Clicks: {{ stringCounter }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
      ...mapGetters([ // mapGetters replaces counter() and clicks(), where we had to have computed methods for each getter. This getter creates the variables that can be used directly.
            "doubleCounter", 
            "stringCounter"
        ])
    // counter() { // having computer methods works for getting getters, but mapGetters will do this for us with less code
    //   return this.$store.getters.doubleCounter;
    // },
    // clicks() {
    //   return this.$store.getters.stringCounter;
    // }
  }
};
</script>
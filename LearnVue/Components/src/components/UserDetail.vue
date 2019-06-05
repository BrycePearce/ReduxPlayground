<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>Child component recieved name: {{ switchName() }}</p>
        <p>Child component recieved name: {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn()">Reset Name</button>
    </div>
</template>

<script>
import { eventBus } from "../main";

export default {
    // props: ['name'],
    props: {
        // name: [String, Array] // can be string or array
        name: {
            type: String,
            required: true, // this component can only be used if this prop is passed
            // default: '' // you can also set default value
        // default: function() { return {} } if you want default to be an object, or an array, or something
        },
        resetFn: Function, // you can pass functions down as a prop
        userAge: Number
    },
    methods: {
        switchName() {
            return this.name.split('').reverse().join('');
        },
        resetName() {
            this.name = "Helen";
            this.$emit('nameWasReset', this.name);
        }
    },
    created() {
        // on recieved event 'ageWasEdited', execute callback method
        eventBus.$on('ageWasEdited', (age) => {
            this.userAge = age;
        });
    }
}
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>

<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>Child component recieved name: {{ switchName() }}</p>
    </div>
</template>

<script>
export default {
    // props: ['name'],
    props: {
        // name: [String, Array] // can be string or array
        name: String,
        required: true, // this component can only be used if this prop is passed
        default: '' // you can also set default value
        // default: function() { return {} } if you want default to be an object, or an array, or something
    },
    methods: {
        switchName() {
            return this.name.split('').reverse().join('');
        }
    }
}
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>

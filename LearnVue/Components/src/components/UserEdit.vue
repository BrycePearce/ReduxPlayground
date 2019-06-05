<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <p>User age: {{ userAge }}</p>
        <button @click="editAge" class="button">Edit Age</button>
    </div>
</template>

<script>
import { eventBus } from "../main";
export default {
    props: {
        userAge: {
            type: Number
        }
    },
    methods: {
        editAge() {
            this.userAge = 30;
            // emit change via eventBus to userDetail
            // eventBus.$emit('ageWasEdited', this.userAge);
            // this.$emit('ageWasEdited', this.userAge)
            eventBus.changeAge(this.userAge);
        }
    }
}
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>

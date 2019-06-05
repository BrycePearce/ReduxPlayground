<template>
  <div class="component">
    <h1>The User Component</h1>
    <p>I'm an awesome User!</p>
    <button @click="changeName">Change my Name</button>
    <p> Name is {{ myName }}
    <hr>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <app-user-detail :name="myName" @nameWasReset="name = $event" :resetFn="resetName" :userAge="age"></app-user-detail>
      </div>
      <div class="col-xs-12 col-sm-6">
        <app-user-edit :userAge="age" @ageWasEdited="age = $event"></app-user-edit>
      </div>
    </div>
  </div>
</template>

<script>
import UserDetail from "./UserDetail.vue";
import UserEdit from "./UserEdit.vue";

export default {
  data() {
    return {
        myName: 'Helen',
        age: 27
    };
  },
  methods: {
      changeName() {
          this.myName = 'Anna';
      },
      resetName() {
        this.myName = 'Helen';
      }
  },
  components: {
    appUserDetail: UserDetail,
    appUserEdit: UserEdit
  }
};
</script>

<style scoped>
div {
  background-color: lightblue;
}
</style>

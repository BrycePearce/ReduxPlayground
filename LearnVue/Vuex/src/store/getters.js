// Getters will do any calculations we need, so that we don't need to do it in multiple components. (State here is automatically passed by vuex)
export const value = (state) => {
    return state.value;
}
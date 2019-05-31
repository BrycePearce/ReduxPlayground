// Mutations change state, and track changes. ***Mutations are the only way to change the state value*** (unless you access statea directly)
export const updateValue = (state, payload) => {
    state.value = payload;
};
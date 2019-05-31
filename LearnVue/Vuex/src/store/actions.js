// ** Consider only having actions to commit to your mutations. It can help keep things organized **
// actions allow you to make mutation changes asynchronous. You 'commit' to the mutation once the 'action' is done.
export const updateValue = ({commit}, payload) => {
    commit('updateValue', payload);
};
// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

//using {} because we are returning an object, not an array
function user(state = {}, action) {
  console.log(state, action);
  return state;
}

export default user;
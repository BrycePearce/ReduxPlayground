//keep track of current user
export function user(name) {
  console.log("welcome to actionCreator for user, the current user is: " + name);
  return {
    type: 'CURRENT_USER',
    name
  }
}
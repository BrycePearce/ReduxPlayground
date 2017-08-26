// add comment
export function addComment(postId, author, comment) {
 console.log("action being created!");
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}
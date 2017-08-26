import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/*
//redux to keep track of user
function mapStateToProps(state) {
  console.log("we are setting user to " + state.user.user);
  return {
    user: state.user.user
  }
}

//connects functions in actionCreator and maps them to this.props, so it will become this.props.functionName() which we use in the componentDidMount
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
*/
class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      comment: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    //this handlesChange for all signup inputs
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault(); //prevents page from refreshing on submit
    console.log("Submitting form");
    const postId = this.props.params.postId;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    //send our data to the actionCreator 'addComment'
    this.props.addComment(postId, author, comment);
  }
  render() {
    let { dispatch } = this.props;
    return (
      <div>
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="author" placeholder="author" className="userBox" onChange={this.handleChange}></input>
          <input type="text" ref="comment" placeholder="comment" onChange={this.handleChange} />
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
}
export default Comments;

/*
//if we are using redux in a component, export like this
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
*/
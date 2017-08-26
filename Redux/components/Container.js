import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import Comments from './Comments';

class Container extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        Send a comment to both
        <Comments />
        {/*React.cloneElement(this.props.children, this.props)*/}
      </div>
    )
  }
}

export default Container;
import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

class Container extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        {/*React.cloneElement(this.props.children, this.props)*/}
      </div>
    )
  }
}

export default Container;
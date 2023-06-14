import React from 'react';
import { json, checkStatus } from './utils';

class Worldlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = (props.location && props.location.state) || {};
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <p>test</p>
      </div>
    )
  }
}

export default Worldlist;
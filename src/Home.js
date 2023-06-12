import React from 'react';
import { listCountries } from './utils';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: '',
    }
  }

  render() {
    return (
      <div>
        <p>test</p>
      </div>
    )
  }
}

export default StartOver;
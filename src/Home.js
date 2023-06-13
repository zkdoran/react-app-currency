import React from 'react';
import { json, checkStatus } from './utils';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
    };
  }

  componentDidMount () {   
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ currencies: data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }



  render() {
    return (
      <div className="row">
        <div className="col">
          <select>
            <option>Option 1</option>
          </select>
        </div>
        <div className="col">

        </div>
      </div>
    )
  }
}

export default StartOver;
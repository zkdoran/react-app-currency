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
    const { currencies } = this.state;

    return (
      <div className="row">
        <div className="col">
          <select>
            {Object.keys((currencies) => ((sym) => <option key={sym} value={sym}>{currencies[sym]}</option>))}
          </select>
        </div>
        <div className="col">
          <input></input>
        </div>
      </div>
    )
  }
}

export default StartOver;
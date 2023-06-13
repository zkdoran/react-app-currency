import React from 'react';
import { json, checkStatus } from './utils';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
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
      <div className="row g-2">
        <div className="col-md">
          <div className='form-floating'>
            <select className='form-select' id='floatingSelectGrid'>
              {Object.keys(currencies).map((sym) => {
                return <option key={sym} value={sym}>{currencies[sym]}</option>
              })}
            </select>
            <label for='floatingSelectGrid'>Starting Country</label>
          </div>
        </div>
        <div className="col-md">
          <div className='form-floating'>
            <input type='number' className='form-control' id='floatingInputGrid' placeholder='1' value='1' />
            <label for="floatingInputGrid">How much you got?</label>
          </div>
        </div>
      </div>
    )
  }
}

export default StartOver;
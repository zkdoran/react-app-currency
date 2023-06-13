import React from 'react';
import { json, checkStatus } from './utils';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ 
      ...this.state,
      [event.targer.name]: value
    });
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
    const { currencies, selectStartValue, selectEndValue } = this.state;

    return (
      <div className="container text-center">
        <div className="row g-2">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' value={selectStartValue} onChange={this.handleChange}>
                <option selected>Choose your Starting Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Starting Country</label>
            </div>
          </div>
          <div className="col-md">
            <div className='form-floating input-group mb-3'>
              <span className='input-group-text'>$</span>
              <input type='number' className='form-control' placeholder='1' value='1' />
              <span className='input-group-text'>.00</span>
            </div>
          </div>
        </div>
        <div className="row g-2">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' value={selectEndValue} onChange={this.handleChange}>
                <option selected>Choose your Destination Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Starting Country</label>
            </div>
          </div>
          <div className="col-md">

          </div>
        </div>
      </div>
    )
  }
}

export default StartOver;
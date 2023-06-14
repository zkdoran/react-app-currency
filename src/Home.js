import React from 'react';
import { json, checkStatus } from './utils';
import { Link, useHistory } from 'react-router-dom';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ 
      ...this.state,
      [event.target.name]: value
    });
  }

  handleSubmit(event) {
    const { selectEndValue, selectStartValue } = this.state;
    let history = useHistory();


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
    });
  }

  render() {
    const { currencies, selectStartValue, selectEndValue } = this.state;

    return (
      <div className="container text-center px-4">
        <div className="row align-items-center row-cols-2 gx-5 ">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectStartValue' value={selectStartValue} onChange={this.handleChange}>
                <option disabled>Choose your Starting Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Starting Country</label>
            </div>
          </div>
          <div className="col-md">
            <div className='form-floating input-group'>
              <input type='number' className='form-control' placeholder='1' value='1' />
            </div>
          </div>
        </div>
        <div className="row justify-content-between gx-5 mt-5">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectEndValue' value={selectEndValue} onChange={this.handleChange}>
                <option selected disabled>Choose your Destination Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Destination Country</label>
              <h1>Check how you measure up 1 vs. 1!</h1>
            </div>
          </div>
          <div className="col-md">
            <p>DIVIDER test</p>
          </div>
          <div className="col-md">
            <button type="button" className="btn btn-danger btn-lg" value="Submit">Test Your Might</button>
            <h1>Check how you measure up againse The World!</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default StartOver;
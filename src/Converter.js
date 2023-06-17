import React from 'react';
import { json, checkStatus } from './utils';
import { Link } from 'react-router-dom';

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = (props.location && props.location.state) || 
    {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
      startAmount: 1,
      endAmount: 1,
      exchangeRate: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //setting the dropdown value when changed
  handleChange(event) {
    const value = event.target.value;
    this.setState({ 
      ...this.state,
      [event.target.name]: value
    });
  }

  //fetching list of currencies for dropdowns
  componentDidMount () {   
    let { selectStartValue, selectEndValue } = this.state;

    fetch(`https://api.frankfurter.app/latest?from=${selectStartValue}&to=${selectEndValue}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ exchangeRate: data.rates[selectEndValue] });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }

  render() {
    const { currencies, selectStartValue, selectEndValue, startAmount, endAmount, exchangeRate } = this.state;

    return (
      <div className="container text-center px-4">
        <div className="row align-items-center">
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
            <div className='form'>
              <input type='number' className='form-control' name='startAmount' value={startAmount} onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-md">
            <div className='form'>
              <input type='number' className='form-control' name='endAmount' value={startAmount * exchangeRate} onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectEndValue' value={selectEndValue} onChange={this.handleChange}>
                <option disabled>Choose your Destination Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}               
              </select>
              <label for='floatingSelectGrid'>Destination Country</label>
            </div>
          </div>
        </div>        
        <div className="row justify-content-between gx-5 mt-5">   
          <div className="col-md">
            <Link to={{ pathname: "/Worldlist/", state: this.state }}>
              <button type="button" className="btn btn-warning btn-lg">Brawl</button>
            </Link>
            <h3>Don't like what you see? Check your starting country vs. The World!</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Converter;
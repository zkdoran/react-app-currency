import React from 'react';
import { json, checkStatus } from './utils';
import { Link } from 'react-router-dom';
import img from './18879888_v1030-014-removebg-preview.png';
import './Home.css';

class StartOver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
      startAmount: 1,
      exchangeRate: 1,
      rates: {},
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
    const { currencies, selectStartValue, selectEndValue, startAmount } = this.state;

    return (
      <div className="container text-center px-4">
        <div className="row align-items-center gx-5 mt-5">
          <h1>Choose Your Starting Location!</h1>
        </div>
        <div className="row align-items-center row-cols-2 gx-5 mt-1 border border-3 border-light rounded py-2" id="topSelections">
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
          <div className="col-md border-start border-light">
            <div className='form'>
              <input type='number' className='form-control' name='startAmount' value={startAmount} onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-between gx-5 border border-3 border-light rounded py-2" id="bottomSelections">
          <div className="col-md">
            <div className='form-floating'>
              <select className='form-select' id='floatingSelectGrid' name='selectEndValue' value={selectEndValue} onChange={this.handleChange}>
                <option disabled>Choose your Destination Country</option>
                {Object.keys(currencies).map((sym) => {
                  return <option key={sym} value={sym}>{currencies[sym]}</option>
                })}
              </select>
              <label for='floatingSelectGrid'>Destination Country</label>
              <h3 id="converterText">How do you measure against this opponent?</h3>
              <Link to={{ pathname: "/Converter/", state: this.state }}>
                <button type="button" className="btn btn-primary btn-lg rounded-pill" id="converterButton">1 v 1</button>
              </Link>             
            </div>
          </div>
          <div className="col-md">
            <img src={img} />
          </div>
          <div className="col-md">
            <h3>How do you measure against the World?</h3>
            <Link to={{ pathname: "/Worldlist/", state: this.state }}>
              <button type="button" className="btn btn-warning btn-lg rounded-pill">1 v ∞</button>
            </Link>            
          </div>
        </div>
      </div>
    )
  }
}

export default StartOver;
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
      exchangeRate: 1,
      rates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //setting the dropdown value when changed
  handleChange(event) {
    const value = event.target.value;
    this.setState({ 
      ...this.state,
      [event.target.name]: value
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { selectStartValue, selectEndValue, startAmount, exchangeRate} = this.state;
    
    let holdStart = selectStartValue;
    let holdEnd = selectEndValue;
    let holdTemp = null;

    holdTemp = holdStart;
    holdStart = holdEnd;
    holdEnd = holdTemp;

    let tempOutput = null;
    let tempFix = null;

    tempFix = startAmount * exchangeRate;
    tempOutput = tempFix.toFixed(2);

    this.setState({ selectStartValue: holdStart, selectEndValue: holdEnd, startAmount: tempOutput });

    fetch(`https://api.frankfurter.app/latest?from=${holdStart}&to=${holdEnd}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ exchangeRate: data.rates[holdEnd] });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectStartValue !== this.state.selectStartValue) {
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
    const { currencies, selectStartValue, selectEndValue, startAmount, exchangeRate } = this.state;

    return (
      <div className="container text-center px-4">
        <div className="row align-items-center gx-5 mt-5 border border-3 border-light rounded py-2">
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
          <div className="col-md border border-light-subtle">
            <h3>{(startAmount * exchangeRate).toFixed(2)}</h3>
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
          <div className="col-md mt-5">
            <button type="button" className="btn btn-success btn-lg rounded-pill" onClick={this.handleClick}>⇋ Switch ⇌</button>
          </div>
        </div>        
        <div className="row justify-content-between gx-5 mt-5">   
          <div className="col-md">
            <h3>Don't like what you see? Check your starting country vs. The World!</h3>
            <Link to={{ pathname: "/Worldlist/", state: this.state }}>
              <button type="button" className="btn btn-warning btn-lg rounded-pill mt-2">1 v ∞</button>
            </Link>            
          </div>
        </div>
      </div>
    )
  }
}

export default Converter;
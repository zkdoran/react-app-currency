import React from 'react';
import { json, checkStatus } from './utils';

class Worldlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = (props.location && props.location.state) || 
    {
      currencies: {},
      selectStartValue: 'USD',
      selectEndValue: 'EUR',
    };
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
            <div className='form-floating'>
              <input type='number' className='form-control' placeholder='1' value='1' />
            </div>
          </div>
        </div>
        <div className="row align-items-center gx-5 mt-5">
          <div className="col-md">
           
          </div>         
        </div>
      </div>
    )
  }
}

export default Worldlist;
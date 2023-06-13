import React from 'react';
import { json, checkStatus } from './utils';

class ListCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: null,
    };
  }

  componentDidMount () {   
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({ entries: data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render() {
    const { entries } = this.state;
    console.log(entries);
    return (
      <div className='container m-5'>
        <select className='custom-select'>
          
        </select>
      </div>
    )
  }

}

export default ListCountries;
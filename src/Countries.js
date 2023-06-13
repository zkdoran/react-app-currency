import React from 'react';
import { json, checkStatus } from './utils';

class ListCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
    };

    this.countries = this.countries.bind(this);
  }

  countries() {   
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      if (data.Response === 'True') {
        console.log(data);
        this.setState({ countryList: data, error: '' });
      }
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  render() {
    const { countryList } = this.state
    console.log(countryList);
    return (
      <div>
        <p>{countryList}</p>
      </div>
    )
  }

}

export default ListCountries;
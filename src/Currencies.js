import { json, checkStatus } from './utils';

class AllCurrencies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
    };

    this.listCurrencies = this.listCurrencies.bind(this);
  }

  listCurrencies() {   
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



}

export default AllCurrencies;
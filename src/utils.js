export const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

export const json = (response) => response.json()

export const listcountries = () => {   
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
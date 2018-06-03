import React, { Component } from 'react';
import axios from 'axios';
import FilterForm from './components/FilterForm';
import Country from './components/Country';
import CountryList from './components/CountryList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      selectedCountries: [],
      filter: '',
      clickedCountry: false,
    };
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data,
        })
      });
  }

  handleChange = (event) => {
    const filter = event.target.value.toLowerCase();
    this.setState({
      filter,
      clickedCountry: false,
      selectedCountries: this.state.countries.filter(country => country.name.toLowerCase().includes(filter)),
    });
  }

  handleSelect = (country) => {
    return () => {
      this.setState({
        clickedCountry: country,
      });
    };
  }

  render() {
    return (
      <div className="App">
        <FilterForm handleChange={this.handleChange} value={this.state.filter} />
        { this.state.clickedCountry
          ? <Country country={this.state.clickedCountry} />
          : <CountryList selectedCountries={this.state.selectedCountries} handleSelect={this.handleSelect} />
        }
      </div>
    );
  }
}

export default App;

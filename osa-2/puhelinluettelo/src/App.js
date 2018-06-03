import React, { Component } from 'react';
import AddForm from './components/AddForm';
import FilterForm from './components/FilterForm';
import Person from './components/Person';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: '',
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
    event.preventDefault();
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
    event.preventDefault();
  }

  handlePhoneChange = (event) => {
    this.setState({ newPhone: event.target.value });
    event.preventDefault();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      this.rejectSubmit();
    } else {
      const persons = [ ...this.state.persons ];
      persons.push({ name: this.state.newName, number: this.state.newPhone });
      this.setState({
        newName: '',
        newPhone: '',
        persons,
      });  
    }
  }

  rejectSubmit = () => {
    alert(`Nimi ${this.state.newName} on jo käytössä! Hölmö!`);
    this.setState({
      newName: '',
      newPhone: '',
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data });
      })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterForm handleFilterChange={this.handleFilterChange} />
        <AddForm 
          handleSubmit={this.handleSubmit}
          handleNameChange={this.handleNameChange}
          handlePhoneChange={this.handlePhoneChange}
          newName={this.state.newName}
          newPhone={this.state.newPhone} />
        <h2>Numerot</h2>
          <table><tbody>
            {this.state.persons.filter(person => person.name.toLowerCase()
              .includes(this.state.filter.toLowerCase()))
              .map(person => (
                <Person key={person.name} person={person} />
            ))}
          </tbody></table>
      </div>
    )
  }
}

export default App;

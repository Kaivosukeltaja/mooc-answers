import React, { Component } from 'react';
import AddForm from './components/AddForm';
import FilterForm from './components/FilterForm';
import Person from './components/Person';
import Notification from './components/Notification';
import personsApi from './services/persons';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: '',
      notification: '',
    }
  }

  showNotification = (notification) => {
    this.setState({ notification });
    window.setTimeout(() => this.setState({ notification: '' }), 3000);
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
      this.replaceNumber();
    } else {
      const newPerson = { name: this.state.newName, number: this.state.newPhone };
      this.addPerson(newPerson);
    }
  }

  addPerson = (newPerson) => {
    const persons = [ ...this.state.persons ];
    personsApi.create(newPerson)
      .then(response => {
        newPerson.id = response.data.id;
        persons.push(newPerson);
        this.setState({
          newName: '',
          newPhone: '',
          persons,
        });
        this.showNotification(`Lisättiin ${newPerson.name}`);
      });
  }

  replaceNumber = () => {
    if (window.confirm(`${this.state.newName} on jo olemassa, korvataanko numero uudella?`)) {
      const person = this.state.persons.find(person => person.name === this.state.newName);
      person.number = this.state.newPhone;
      personsApi.update(person)
      .then(() => {
        this.showNotification(`${person.name} numero päivitetty`);
      })
      .catch(() => {
        // Joku ehti poistaa, lisätään uutena
        this.setState({ persons: this.state.persons.filter(p => p.name !== person.name)})
        this.addPerson(person);
      });
    }
    this.setState({
      newName: '',
      newPhone: '',
    });
  }

  componentDidMount() {
    personsApi.getAll()
      .then(response => {
        this.setState({ persons: response.data });
      })
  }

  deletePerson(person) {
    return () => {
      if (window.confirm(`Poistetaanko ${person.name}?`)) {
        this.setState({ persons: this.state.persons.filter(p => p !== person)});
        personsApi.remove(person.id);
        this.showNotification(`Poistettiin ${person.name}`);
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification text={this.state.notification} />
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
                <Person key={person.name} person={person} onRemove={this.deletePerson(person)} />
            ))}
          </tbody></table>
      </div>
    )
  }
}

export default App;

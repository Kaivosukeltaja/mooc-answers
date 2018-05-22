import React, { Component } from 'react';
import Button from './components/Button';
import Statistics from './components/Statistics';

class App extends Component {
  constructor() {
    super();
    this.state = {
      votes: {
        good: 0,
        neutral: 0,
        bad: 0,
      },
    };
  }

  addVote(vote) {
    return () => {
      const votes = Object.assign({}, this.state.votes);
      votes[vote]++;
      this.setState({ votes });  
    }
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button text="Hyvä" onClick={this.addVote('good')} />
        <Button text="Neutraali" onClick={this.addVote('neutral')} />
        <Button text="Huono" onClick={this.addVote('bad')} />
        <Statistics votes={this.state.votes} />
      </div>
    );
  }
}

export default App;

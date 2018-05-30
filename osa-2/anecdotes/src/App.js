import React from 'react';
import Anecdote from './Anecdote';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: {},
      best: undefined,
    }
  }

  nextAnecdote = () => {
    this.setState({ selected: parseInt(Math.random() * this.props.anecdotes.length, 10) });
  }

  vote = () => {
    const previousScore = this.state.points[this.state.selected] | 0;
    const points = { ...this.state.points };
    points[this.state.selected] = previousScore + 1;
    this.setState({ points });
    if (!this.state.best || previousScore >= this.state.points[this.state.best]) {
      this.setState({ best: this.state.selected });
    }
  }

  render() {
    return (
      <div>
        <Anecdote 
          text={this.props.anecdotes[this.state.selected]}
          votes={this.state.points[this.state.selected]}
          />
        <button onClick={this.vote}>Vote</button>
        <button onClick={this.nextAnecdote}>Next anecdote</button>
        { this.state.points[this.state.best] > 0 &&
          <React.Fragment>
            <h2>Anecdote with most votes:</h2>
            <Anecdote
              text={this.props.anecdotes[this.state.best]}
              votes={this.state.points[this.state.best]}
              />
          </React.Fragment>
        }
      </div>
    )
  }
}

export default App;

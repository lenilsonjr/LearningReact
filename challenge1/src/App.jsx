import React, { Component } from 'react';
import Timer from './Timer';
import './App.css';
import { Form, FormControl, Button } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deadline: 'December 25, 2017',
      newDeadline: ''
    }
  }

  changeDeadline() {
    this.setState({deadline: this.state.newDeadline});
  }

  render() {
    return (
      <div className="app">
        <div className="app-title">
          Countdown to {this.state.deadline}
        </div>
        <Timer 
          deadline={this.state.deadline}
        />
        <Form inline>
          <FormControl
            className="deadline-input"
            placeholder='new date'
            onChange={event => this.setState({newDeadline: event.target.value})}
          />
          <Button onClick={() => this.changeDeadline()}>
          Submit
          </Button>
        </Form>
      </div>
    )
  }

}

export default App;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder } from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text);
  }

  render() {
    console.log('this.props', this.props);
    return(
      <div className="app">
        <div className="title">ReminderPro</div>
        <div className="form-inline">
          <div className="form-group">
            <input 
              type="text"
              className="form-control"
              placeholder="I have to..."
              onChange={event => this.setState({text: event.target.value})}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Reminder          
          </button>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder })(App);
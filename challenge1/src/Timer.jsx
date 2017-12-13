import React, { Component } from 'react';
import './App.css';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentDeadline: 0,
      remainingSeconds: 0
    }
  }

  componentWillMount() {
    this.setState({currentDeadline: parseInt(this.props.deadline)});    
    this.getTimeUntil(parseInt(this.props.deadline));
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);      
  }

  getTimeUntil(deadline) {

    if ( this.state.currentDeadline != deadline ) {
      this.setState({currentDeadline: deadline});    
      this.setState({remainingSeconds: 0});      
    }

    if (deadline != 0) {

      const count = this.state.remainingSeconds == 0 ? deadline - 1 : this.state.remainingSeconds - 1;
      this.setState({remainingSeconds: count});
  
      if (count <= 0 && deadline !== 0) {
        alert('BEEEP BEEP!');
        this.setState({remainingSeconds: 0});
      }  

    }

  }

  render() {
    return(
      <div>
        <div className="clock-remainingSeconds">{this.state.remainingSeconds} seconds</div>
      </div>
    )
  }
}

export default Timer;
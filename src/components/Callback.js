import React, { Component } from 'react';
import Auth from '../Auth';

class Callback extends Component {
  state = { auth: new Auth() };
  componentDidMount() {
    const { auth } = this.state;
    auth.handleAuthentication();
  }
  render() {
    return <div>Loading...</div>;
  }
}
export default Callback;

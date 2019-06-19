import React, { Component } from 'react';
import { Login, Home, Register } from './components';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
class App extends Component {
  state = { loggedIn: false, details: {}, data: {} };
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );
    this.update();
  }
  update = () => {
    axios
      .get('http://localhost:8080/protec')
      .then(res => {
        this.setState({
          loggedIn: true,
          details: {
            ...res.data.user,
            update: this.update,
          },
        });
      })
      .catch(error => {
        this.setState({ loggedIn: false });
      });
  };
  login = details => {
    this.setState({
      data: details,
    });
    this.update();
    this.setState({ loggedIn: true });
  };
  render() {
    return (
      <BrowserRouter>
        {this.state.loggedIn ? (
          <Switch>
            <Route path='/' component={() => <Home details={this.state} />} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/' component={() => <Login login={this.login} />} />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';

export default class ExEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      cash: '',
      credit: 0,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/exs/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          cash: response.data.cash,
          credit: response.data.credit,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      cash: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      credit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      cash: this.state.cash,
      credit: this.state.credit,
    };

    console.log(exercise);

    axios
      .post(
        'http://localhost:5000/exs/update/' + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Update User:</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username: </label>
            <select
              ref='userInput'
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>cash: </label>
            <input
              type='text'
              required
              value={this.state.cash}
              onChange={this.onChangeDescription}
            />
          </div>
          <div>
            <label>credit: </label>
            <input
              type='text'
              value={this.state.credit}
              onChange={this.onChangeDuration}
            />
          </div>

          <div>
            <input type='submit' value='Edit User Log' />
          </div>
        </form>
      </div>
    );
  }
}

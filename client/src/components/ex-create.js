import React, { Component } from 'react';
import axios from 'axios';

export default class ExCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCash = this.onChangeCash.bind(this);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      cash: 0,
      credit: 0,
      users: [],
      error: '',
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
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

  onChangeCash(e) {
    this.setState({
      cash: e.target.value,
    });
  }

  onChangeCredit(e) {
    this.setState({
      credit: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.credit < 0) {
      this.setState({
        error: 'It is not possible to enter a negative number',
      });
      return;
    }
    const exercise = {
      username: this.state.username,
      cash: this.state.cash,
      credit: this.state.credit,
    };
    console.log(exercise);

    axios
      .post('http://localhost:5000/exs/add', exercise)
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
              // ref='userInput'
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
              onChange={this.onChangeCash}
            />
          </div>
          <div>
            <label>credit: </label>
            <input
              type='text'
              value={this.state.credit}
              onChange={this.onChangeCredit}
            />
          </div>

          <div>
            <input type='submit' value='Create User Log' />
          </div>
        </form>
        {this.state.error.length > 2 && (
          <div className='error'>{this.state.error}</div>
        )}
      </div>
    );
  }
}

// export default ExCreate;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

///
// her/ i mess thing!
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.cash}</td>
    <td>{props.exercise.credit}</td>
    <td>
      <Link className='btnUser' to={'/edit/' + props.exercise._id}>
        Edit
      </Link>{' '}
      |{' '}
      <a
        className='btnUser'
        href='#'
        onClick={() => {
          props.deleteEx(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class ExList extends Component {
  constructor(props) {
    super(props);

    this.deleteEx = this.deleteEx.bind(this);

    this.state = { exs: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/exs')
      .then((response) => {
        this.setState({ exs: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteEx(id) {
    axios
      .delete('http://localhost:5000/exs/' + id)
      .then((res) => console.log(res.data));
    this.setState({
      exs: this.state.exs.filter((e) => e._id !== id),
    });
  }
  exerciseList() {
    return this.state.exs.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteEx={this.deleteEx}
          key={currentexercise._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>All Our Bank Account:</h3>
        <table id='customers'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Cash</th>
              <th>Credit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

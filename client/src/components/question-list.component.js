import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import QuestionTableRow from './QuestionTableRow';

const API_URL = process.env.REACT_APP_API;

export default class QuestionList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/`)
      .then(res => {
        this.setState({
          questions: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.questions.map((res, i) => {
      return <QuestionTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}
import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AnswerRow from './AnswerRow';

const API_URL = process.env.REACT_APP_API;

export default class Question extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      points: 0,
      answers: []
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/question/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data.title,
          body: res.data.body,
          points: res.data.points
        }); console.log('Question data', this.state);
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get(`${API_URL}/answers/` + this.props.match.params.id)
      .then(res => {
        this.setState({
          answers: res.data
        }); console.log('Answers data', this.state);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  answerList() {
    return this.state.answers.map((res, i) => {
      return <AnswerRow obj={res} key={i} index={i + 1} />;
    });
  }

  render() {
    return (<div>
      <h1>{this.state.title}</h1>
      <p>{this.state.body}</p>
      <p>Points: {this.state.points}</p>
      <br /><br />
      <Button variant="danger" size="lg" type="submit" href={"/create-answer/" + this.props.match.params.id}>
        Submit answer
      </Button>
      <br /><br /><br /><br />
      <h2>{this.state.answers.length > 0 ? "Answers" : "No answers yet"}</h2>
      {this.answerList()}
    </div>);
  }
}
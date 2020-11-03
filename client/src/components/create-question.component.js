import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API;

export default class CreateQuestion extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeQuestionTitle = this.onChangeQuestionTitle.bind(this);
    this.onChangeQuestionBody = this.onChangeQuestionBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      title: '',
      body: '',
      points: 0
    }
  }

  onChangeQuestionTitle(e) {
    this.setState({title: e.target.value})
  }

  onChangeQuestionBody(e) {
    this.setState({body: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const questionData = {
        title: this.state.title,
        body: this.state.body,
        points: this.state.points
    };

    axios
        .post(`${API_URL}/create-question`, questionData)
        .then(res => console.log(res.data));

    this.setState({title: '', body: '', points: 0});
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={this.state.title} onChange={this.onChangeQuestionTitle}/>
        </Form.Group>

        <Form.Group controlId="Body">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" type="text" value={this.state.body} onChange={this.onChangeQuestionBody}/>
        </Form.Group>

        <Form.Group controlId="Points" hidden>
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={this.state.points}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Question
        </Button>
      </Form>
    </div>);
  }
}
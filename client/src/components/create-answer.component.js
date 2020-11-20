import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API;

export default class CreateAnswer extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeAnswerBody = this.onChangeAnswerBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      body: '',
      points: 0,
      question: null
    }
  }

  onChangeAnswerBody(e) {
    this.setState({body: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();

    const url = window.location.href;
    const answerData = {
        body: this.state.body,
        points: this.state.points,
        question: url.substring(url.lastIndexOf('/') + 1)
    };

    axios
        .post(`${API_URL}/create-answer/` + this.props.match.params.id, answerData)
        .then(res => console.log(res.data, this.props.match.params.id));

    this.setState({body: '', points: 0, question: null});
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Body">
          <Form.Label>Your answer</Form.Label>
          <Form.Control as="textarea" type="text" value={this.state.body} onChange={this.onChangeAnswerBody}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Send answer
        </Button>
      </Form>
    </div>);
  }
}
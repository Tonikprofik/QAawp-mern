import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateQuestion from "./components/create-question.component";
import CreateAnswer from "./components/create-answer.component";
import Question from "./components/question.component";
import QuestionList from "./components/question-list.component";

const API_URL = process.env.REACT_APP_API;

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/question-list"} className="nav-link">
                React MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-question"} className="nav-link">
                  Create Question
                </Link>
              </Nav>

              <Nav>
                <Link to={"/question-list"} className="nav-link">
                  Questions
                </Link>
              </Nav>
              
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12} className="mt-5">
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={QuestionList} />
                <Route path="/create-question" component={CreateQuestion} />
                <Route path="/question/:id" component={Question} />
                <Route path="/question-list" component={QuestionList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class QuestionTableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let questionId = "/question/" + this.props.obj._id;

        return (
            <tr>
                <td><a href={questionId}>{this.props.obj.title}</a></td>
                <td>{this.props.obj.body}</td>
                <td>{this.props.obj.points}</td>
            </tr>
        );
    }
}
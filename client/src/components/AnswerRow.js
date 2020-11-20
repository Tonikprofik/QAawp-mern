import React, { Component } from 'react';

export default class AnswerRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4>Answer {this.props.index}</h4>
                <div>{this.props.obj.body}</div>
                <div>Points: {this.props.obj.points}</div>
                <hr />
            </div>
        );
    }
}
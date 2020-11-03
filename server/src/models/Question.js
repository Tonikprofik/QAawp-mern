const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema(
    {
        title: {
            type: String
        },
        body: {
            type: String
        },
        points: {
            type: Number
        }
    }, {
        collection: 'questions'
    }
);

module.exports = mongoose.model('Question', questionSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema(
    {
        body: {
            type: String
        },
        points: {
            type: Number
        },
        question: {
            type: mongoose.Types.ObjectId,
            ref: 'Question'
        }
    }, {
        collection: 'answers'
    }
);

module.exports = mongoose.model('Answer', answerSchema)
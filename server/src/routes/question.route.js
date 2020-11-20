let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Question Model
let questionSchema = require('../models/Question');
let answerSchema = require('../models/Answer');

// CREATE a question
router.route('/create-question').post((req, res, next) => {
    questionSchema.create(req.body, (error, data) => {
        if (error) {
            res.status(500).send(err);
        } else {
            console.log(data)
            res.status(201).json(data)
        }
    })
});

// CREATE an answer
router.route('/create-answer/:id').post((req, res, next) => {
    answerSchema.create(req.body, (error, data) => {
        if (error) {
            res.status(500).send(err);
        } else {
            console.log(data)
            res.status(201).json(data)
        }
    })
});

// List all questions
router.route('/').get((req, res) => {
    questionSchema.find((error, data) => {
        if (error) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data)
        }
    })
})

// Get answers
router.route('/answers/:id').get((req, res) => {
    const questionID = req.params.id;

    answerSchema.find({"question": mongoose.Types.ObjectId(questionID)}, (error, data) => {
        if (error) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data);
        }
    })
})

// Get single question
router.route('/question/:id').get((req, res) => {
    const questionID = req.params.id;

    questionSchema.findById(questionID, (error, data) => {
        if (error) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data);
        }
    })
})


// Update Question
// router.route('/update-question/:id').put((req, res, next) => {
//     questionSchema.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('Question updated successfully !')
//         }
//     })
// })

// Delete Question
// router.route('/delete-question/:id').delete((req, res, next) => {
//     questionSchema.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// })

module.exports = router;
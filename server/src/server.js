/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

/**** Configuration ****/
const app = express();

function createServer() {
  const routes = require('./routes/question.route')
  const {DB_URI} = require('./config/keys');

  /**** DB ****/
  mongoose.Promise = global.Promise;
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database sucessfully connected!')
      },
      error => {
        console.log('Could not connect to database : ' + error)
      }
    );

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  /**** Add routes ****/
  app.use('/api', routes);

  // PORT
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
  })

  // 404 Error
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
  }
  
  return app;
}

module.exports = createServer;
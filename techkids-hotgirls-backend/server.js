const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./users/users.router');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', (error) => {
  if (error) {
    throw error;
  } else {
    console.log('Connect to mongodb success ...');
    const app = express();

    // use middleware
    app.use(bodyParser.json());
    app.use(session({
      secret: 'keyboard cat',
    }));

    // routers
    // /users/test
    app.use('/users', userRouter);

    // start server
    app.listen(3001, (err) => {
      if (err) {
        throw err;
      }
      console.log('Server listen on port 3000 ...');
    });
  }
});
const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./models/question.model');

mongoose.connect(
  'mongodb://localhost:27017/quyetde',
  {useNewUrlParser: true},
  (e) => {
    if (e) {
      console.log(e);
    } else {
      console.log('Connect to mongodb sucess');

      const app = express();

      // routers
      app.use(express.static('public'));
      app.use(bodyParser.json());

      app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/index.html'));
      });

      app.get('/question/:questionId', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/question.html'));
      });

      app.get('/ask', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
      });

      app.get('/search', (req, res) => {
        res.sendFile(path.resolve(__dirname, './public/html/search.html'));
      });

      app.post('/create-question', (req, res) => {
        // save newQuestion
        questionModel.create({
          questionContent: req.body.questionContent,
        }, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            res.status(201).json({
              success: true,
              id: data._id,
            });
          }
        });
      });

      app.get('/get-question-by-id/:questionId', (req, res) => {
        questionModel.findById(req.params.questionId, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            res.status(200).json({
              success: true,
              data: {
                ...data._doc,
                id: data._id,
              },
            });
          }
        });
      });

      app.get('/get-random-question', (req, res) => {
        questionModel.aggregate([
          {$sample: {size: 1}},
        ]).exec((error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.message,
            });
          } else {
            res.status(200).json({
              success: true,
              data: {
                ...data[0],
                id: data[0]._id,
              },
            });
          }
        });
      });

      app.put('/vote', (req, res) => {
        // check if record exist
        questionModel.findById(req.body.id, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              message: error.messsage,
            });
          } else if (!data) {
            res.status(404).json({
              success: false,
              message: `Question not found`,
            });
          } else {
            questionModel.findByIdAndUpdate(
              req.body.id,
              {$inc: {[req.body.vote]: 1}},
              (err) => {
                if (err) {
                  res.status(500).json({
                    success: false,
                    message: err.messsage,
                  });
                } else {
                  res.status(201).json({
                    success: true,
                  });
                }
              });
          }
        });
      });

      app.get('/search-quetions', (req, res) => {
        const keyword = req.query.keyword;

        questionModel.find({
          // ignore-case
          questionContent: {$regex: keyword, $options: 'i'},
        }, (error, data) => {
          if (error) {
            res.status(500).json({
              success: false,
              messsage: error.message,
            });
          } else {
            res.status(200).json({
              success: true,
              data: data,
              total: data.length,
            });
          }
        });
      });

      app.listen(3000);
    }
  },
);
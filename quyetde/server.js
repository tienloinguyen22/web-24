const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// routers
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});

app.get('/ask', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
});

app.post('/create-question', (req, res) => {
  // save question to database
  // questionContent
  // like
  // dislike
  // createdAt

  // save newQuestion
  fs.readFile('./data.json', (error, data) => {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      const questionList = JSON.parse(data);
      const newQuestionId = new Date().getTime();
      const newQuestion = {
        id: newQuestionId,
        questionContent: req.body.questionContent,
        like: 0,
        dislike: 0,
        createdAt: new Date().toString(),
      };
      questionList.push(newQuestion);

      fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: error.message,
          });
        } else {
          res.status(201).json({
            success: true,
            id: newQuestionId,
          });
        }
      });
    }
  });
});

app.listen(3000);
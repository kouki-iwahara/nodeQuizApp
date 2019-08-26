'use strict'

const express = require('express');
const request = require('request-promise');
const ejs = require('ejs');

const app = express();
app.use(express.static('public'));
app.engine('ejs', ejs.renderFile);

// API生成のためのデータ
const options = {
  url: 'https://opentdb.com/api.php?amount=10',
  method: 'GET',
  json: true
}
// クイズデータのAPI取得
const getQuizData = () => {
  try {
    return request(options);
  } catch (error) {
    console.log(error);
  };
}
// 選択肢をシャッフルする関数
const shuffleChoice = (choice) => {
  let length = choice.length;
  while(length > 0) {
    const random = Math.floor(Math.random() * length);
    const tmp = choice[length - 1];
    choice[length - 1] = choice[random];
    choice[random] = tmp;
    length -= 1;
  }
}
// クイズデータ生成の関数
const createQuizData = async () => {
  const quizData = await getQuizData();
  // 選択肢をシャッフル
  quizData.results.forEach(data => {
    data.incorrect_answers.push(data.correct_answer);
    shuffleChoice(data.incorrect_answers);
  });
  return quizData.results
}

// メインページ
app.get('/', (req, res) => {
  res.render('index.ejs')
})
// APIを参照するページ
app.get('/quizAPI', async (req, res) => {
  const quizData = await createQuizData();
  res.json(quizData);
})

app.listen(3000, () => {
  console.log('start server: ' + 'http://localhost:3000');
})
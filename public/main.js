'use strict'
const title = document.getElementById('title');
const categoryTag = document.getElementById('category-tag');
const difficultyTag = document.getElementById('difficulty-tag');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const question = document.getElementById('question');
const btnArea = document.getElementById('btnArea');
const startBtn = document.createElement('button');

// ホーム画面生成の関数
const createHomeDisplay = () => {
  title.textContent = 'ようこそ';
  categoryTag.textContent = '【ジャンル】';
  difficultyTag.textContent = '【難易度】';
  question.textContent = '以下のボタンをクリック';
  startBtn.textContent = '開始';

  btnArea.appendChild(startBtn);
  startBtn.addEventListener('click', async () => {
    showQuiz();
    question.textContent = '取得中';
    startBtn.id = 'startBtn';
    document.getElementById("startBtn").remove();
  });
};

const showQuiz = async () => {
  const api = await fetch('./quizAPI');
  const quizData = await api.json();
  console.log(quizData);
}

createHomeDisplay();
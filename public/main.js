'use strict'
// ホーム画面生成の関数
const createHomeDisplay = () => {
  const title = document.getElementById('title');
  const categoryTag = document.getElementById('category-tag');
  const difficultyTag = document.getElementById('difficulty-tag');
  const question = document.getElementById('question');
  const btnArea = document.getElementById('btnArea');
  const startBtn = document.createElement('button');

  title.textContent = 'ようこそ';
  categoryTag.textContent = '【ジャンル】';
  difficultyTag.textContent = '【難易度】';
  question.textContent = '以下のボタンをクリック';
  startBtn.textContent = '開始';

  btnArea.appendChild(startBtn);
  startBtn.addEventListener('click', async () => {
    const api = await fetch('https://opentdb.com/api.php?amount=10');
    const jsonData = await api.json();
    console.log(jsonData.results);
  });
};

createHomeDisplay();
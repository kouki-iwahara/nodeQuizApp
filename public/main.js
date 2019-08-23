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
  // スタートボタン押下の挙動
  startBtn.addEventListener('click', async () => {
    // クイズデータを取得し表示する
    showQuiz(0);
    question.textContent = '取得中';
    startBtn.id = 'startBtn';
    document.getElementById("startBtn").remove();
  });
};
// クイズデータを取得、表示する関数
const showQuiz = async (index) => {
  // API取得
  const api = await fetch('./quizAPI');
  const quizData = await api.json();
  console.log(quizData);
  // 取得したデータを使い問題生成
  createQuestion(quizData, index);
};
// クイズ問題を生成する関数
const createQuestion = (quizData, index) => {
  title.textContent = index + 1;
  category.textContent = quizData[index].category;
  difficulty.textContent = quizData[index].difficulty;
  question.innerHTML = quizData[index].question;
  // 選択肢生成
  createChoiceBtn(quizData, index)
};
// 選択肢を生成する関数
const createChoiceBtn = (quizData, index) => {
  // 選択肢があったら消す
  if(btnArea.textContent) {
    btnArea.textContent = '';
  };
  // 選択肢の数だけボタンを生成
  quizData[index].incorrect_answers.forEach(choice => {
    const choiceBtn = document.createElement('button');
    choiceBtn.textContent = choice;
    // ボタン押下の挙動
    choiceBtn.addEventListener('click', () => {
      // 次の問題を表示
      createQuestion(quizData, index + 1);
    })
    // ボタンの挙動を宣言してから表示
    btnArea.appendChild(choiceBtn);
  });
};
// ホーム画面の生成
createHomeDisplay();
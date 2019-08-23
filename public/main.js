'use strict';
const title = document.getElementById('title');
const categoryTag = document.getElementById('category-tag');
const difficultyTag = document.getElementById('difficulty-tag');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const question = document.getElementById('question');
const btnArea = document.getElementById('btn-area');
// 正答数を代入
let score = 0;

// ホーム画面生成の関数
const createHomeDisplay = () => {
  title.textContent = 'ようこそ';
  categoryTag.textContent = '【ジャンル】';
  difficultyTag.textContent = '【難易度】';
  question.textContent = '以下のボタンをクリック';
  const startBtn = document.createElement('button');
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
  // 選択肢の数だけボタンを生成。incorrect_answersに既に全ての選択肢がシャッフルされている
  quizData[index].incorrect_answers.forEach(choice => {
    const choiceBtn = document.createElement('button');
    choiceBtn.textContent = choice;
    // ボタン押下の挙動
    choiceBtn.addEventListener('click', () => {
      // 選択肢があったら消す
      if(btnArea.textContent) {
        btnArea.textContent = '';
      };
      // 正解ならscoreをインクリメント
      if(choiceBtn.textContent === quizData[index].correct_answer){
        score++;
      };
      // １０問目じゃないなら次の問題を表示。１０問目なら結果を表示。
      if(quizData.indexOf(quizData[index]) < 9) {
        createQuestion(quizData, index + 1);
      } else {
        // 結果の画面を表示
        createResultDsiplay();
      };
    })
    // ボタンの挙動を宣言してから表示
    btnArea.appendChild(choiceBtn);
  });
};
// 結果の画面を表示する関数
const createResultDsiplay = () => {
  const quistionInfo = document.getElementById('question-info');
  const backHomeBtn = document.createElement('button');
  backHomeBtn.id = 'backHomeBtn';
  backHomeBtn.textContent = 'ホームに戻る';
  // ボタン押下でホーム画面を生成
  backHomeBtn.addEventListener('click', () => {
    createHomeDisplay();
    document.getElementById("backHomeBtn").remove();
  })
  title.textContent = `あなたの正答数は${score}です`;
  quistionInfo.textContent = '';
  question.textContent = '再チャレンジしたい場合は下をクリック';
  btnArea.appendChild(backHomeBtn);
}
// ホーム画面の生成
createHomeDisplay();
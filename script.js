var players = [];
var currentIndex = 0;
var timer;
var gameStarted = false; // 配役が開始されたかどうかのフラグ

function startGame() {
  if (gameStarted) {
    return; // 配役が既に開始されている場合は何もしない
  }
  
  gameStarted = true; // 配役開始フラグを立てる
  
  players = []; // プレイヤーの配列をリセット
  currentIndex = 0; // 現在のインデックスをリセット
  
  var playerCount = parseInt(document.getElementById('playerCount').value);
  for (var i = 0; i < playerCount; i++) {
    players.push('探究者');
  }
  var werewolfIndex = Math.floor(Math.random() * playerCount);
  players[werewolfIndex] = '嘘つき';
  displayRole();
  document.getElementById('nextButton').disabled = false;
  document.getElementById('startButton').disabled = true; // 配役開始ボタンを無効化する
}


function displayRole() {
  var resultDiv = document.getElementById('result');
  var currentPlayer = players[currentIndex];
  
  var roleText = document.createElement('span');
  roleText.textContent = 'プレイヤー ' + (currentIndex + 1) + ' は「' + currentPlayer + '」です.';

  if (currentPlayer === '嘘つき') {
    roleText.classList.add('lying');
  } else if (currentPlayer === '探究者') {
    roleText.classList.add('explorer');
  }

  resultDiv.innerHTML = '';
  resultDiv.appendChild(roleText);

  timer = setTimeout(function() {
    hideRole();
    showNextMessage();
  }, 4000);
}

function hideRole() {
  document.getElementById('result').innerHTML = '';
}

function showNextMessage() {
  var resultDiv = document.getElementById('result');
  if (currentIndex < players.length - 1) {
    resultDiv.innerHTML = '次の人に渡してください。';
  } else {
    resultDiv.innerHTML = '配役終了';
    document.getElementById('nextButton').disabled = true;
    gameStarted = false; // 配役終了時にフラグをリセットして再び配役開始ボタンを押せるようにする
    document.getElementById('startButton').disabled = false;
  }
}

function nextPlayer() {
  currentIndex++;
  if (currentIndex < players.length) {
    clearTimeout(timer);
    displayRole();
  }
}

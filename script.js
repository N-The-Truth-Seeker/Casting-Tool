var players = [];
var currentIndex = 0;
var timer;

function startGame() {
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
}

function displayRole() {
    var resultDiv = document.getElementById('result');
    var currentPlayer = players[currentIndex];
    
    var roleText = document.createElement('span');
    roleText.textContent = 'プレイヤー ' + (currentIndex + 1) + ' は「' + currentPlayer + '」です。';
  
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
  }
}

function nextPlayer() {
  currentIndex++;
  if (currentIndex < players.length) {
    clearTimeout(timer);
    displayRole();
  }
}

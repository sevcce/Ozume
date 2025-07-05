const firebaseConfig = {
  apiKey: "AIzaSyAcRbqwZhYhoZQudskIug7WYNUck7VlXD4",  // kendi key'ini gir
  authDomain: "tetris-skor.firebaseapp.com",
  databaseURL: "https://tetris-skor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tetris-skor",
  storageBucket: "tetris-skor.appspot.com",
  messagingSenderId: "438988899189",
  appId: "1:438988899189:web:0b2a3f196ab7a7d26e093c"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Sabit grid boyutu
//const grid = 40;
let grid = window.innerWidth <= 768 ? 20 : 40;


let count = 0;

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};



let apple = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMaxGridXY() {
  return {
    maxX: Math.floor(canvas.width / grid),
    maxY: Math.floor(canvas.height / grid)
  };
  
}

function resetApple() {
  const { maxX, maxY } = getMaxGridXY();
  apple.x = getRandomInt(0, maxX) * grid;
  apple.y = getRandomInt(0, maxY) * grid;
}

function resetGame() {
  const finalScore = snake.maxCells - 4;
  promptAndSaveScore(finalScore);

  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  resetApple();
}


function loop() {
  requestAnimationFrame(loop);
  if (++count < 6) return;

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Canvas kenarlarında dolaşsın
  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) snake.cells.pop();

  // Yem çiz
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // Yılan çiz
  ctx.fillStyle = "lime";
  snake.cells.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Yem yendi mi
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      resetApple();
    }

    // Kendine çarptı mı
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        resetGame();
        return;
      }
    }
  });
}

document.addEventListener("keydown", e => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

//function resizeCanvas() {
  //const size = Math.floor(Math.min(window.innerWidth, window.innerHeight) / grid) * grid;
  //canvas.width = size;
  //canvas.height = size;
  //resetApple();
//}

function resizeCanvas() {
  const size = Math.floor(Math.min(window.innerWidth, window.innerHeight) / grid) * grid;
  canvas.width = size;
  canvas.height = size;
  resetApple();
}





document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();

  let startX = null;
  let startY = null;

  canvas.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    if (!startX || !startY) return;

    const touch = e.touches[0];
    const diffX = touch.clientX - startX;
    const diffY = touch.clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      } else if (diffX < 0 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
      }
    } else {
      if (diffY > 0 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      } else if (diffY < 0 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }
    }

    e.preventDefault();
    startX = null;
    startY = null;
  }, { passive: false });
});

requestAnimationFrame(loop);

const players = ["oz", "sev"];

function saveScore(player, score) {
  const key = `scores_${player}`;
  const scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.unshift(score);
  const top3 = scores.slice(0, 3);
  localStorage.setItem(key, JSON.stringify(top3));
}

function openScoreBoard() {
  window.open("snakeSkor.html", "_blank");
}

function saveScoreToFirebase(player, score) {
  const newRef = db.ref("snakeScores/" + player).push();
  newRef.set({
    score: score,
    timestamp: Date.now()
  });
}

function promptAndSaveScore(score) {
  let player = prompt("Kim oynadı? 'oz' ya da 'sev' yaz:");
  if (!player) return;

  player = player.toLowerCase().trim();
  if (players.includes(player)) {
    saveScore(player, score);           // localStorage kaydı
    saveScoreToFirebase(player, score); // Firebase kaydı
  } else {
    alert("Geçersiz oyuncu. Skor kaydedilmedi.");
  }
}




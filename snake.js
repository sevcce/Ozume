const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
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

function loop() {
  requestAnimationFrame(loop);
  if (++count < 6) return;

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;
  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({ x: snake.x, y: snake.y });
  if (snake.cells.length > snake.maxCells) snake.cells.pop();

  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  ctx.fillStyle = "lime";
  snake.cells.forEach((cell, index) => {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 20) * grid;
      apple.y = getRandomInt(0, 20) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 20) * grid;
        apple.y = getRandomInt(0, 20) * grid;
      }
    }
  });
}

document.addEventListener("keydown", e => {
    // Sayfanın kaymasını engelle
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
  

requestAnimationFrame(loop);


  function openSnakeGame() {
    window.open("snake.html", "SnakeGame", "width=450,height=500");
  }



let startX = null;
let startY = null;

canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

canvas.addEventListener("touchmove", e => {
  if (!startX || !startY) return;

  const touch = e.touches[0];
  const diffX = touch.clientX - startX;
  const diffY = touch.clientY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // yatay swipe
    if (diffX > 0 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    } else if (diffX < 0 && snake.dx === 0) {
      snake.dx = -grid;
      snake.dy = 0;
    }
  } else {
    // dikey swipe
    if (diffY > 0 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    } else if (diffY < 0 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
  }

  startX = null;
  startY = null;
});

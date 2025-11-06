const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 175, y: 500, width: 50, height: 100, speed: 5 };
let obstacles = [];
let score = 0;
let gameOver = false;

// 🕹️ Draw Car
function drawCar() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

// 🚧 Draw Obstacles
function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
}

// 🧮 Move Obstacles
function moveObstacles() {
  obstacles.forEach(o => o.y += 2.5); // 🔹 Slower speed
  obstacles = obstacles.filter(o => o.y < canvas.height);
}

// 🎲 Generate Random Obstacles
function generateObstacle() {
  if (Math.random() < 0.02) { // 🔹 Fewer obstacles
    let x = Math.random() * (canvas.width - 50);
    obstacles.push({ x, y: -100, width: 50, height: 100 });
  }
}

// 💥 Collision Detection
function checkCollision() {
  for (let o of obstacles) {
    if (
      car.x < o.x + o.width &&
      car.x + car.width > o.x &&
      car.y < o.y + o.height &&
      car.y + car.height > o.y
    ) {
      gameOver = true;
      showGameOver();
    }
  }
}

// 🔁 Restart Game
function restartGame() {
  car = { x: 175, y: 500, width: 50, height: 100, speed: 5 };
  obstacles = [];
  score = 0;
  gameOver = false;
  update();
}

// 🧾 Game Over Text
function showGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("💥 GAME OVER 💥", canvas.width / 2, canvas.height / 2 - 20);
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
  ctx.fillText("Tap or press R to Restart", canvas.width / 2, canvas.height / 2 + 60);
}

// 🔄 Game Loop
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacles();
  moveObstacles();
  generateObstacle();
  checkCollision();

  score++;
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  requestAnimationFrame(update);
}

// 🎮 Controls
document.addEventListener("keydown", (e) => {
  if (gameOver && e.key.toLowerCase() === "r") {
    restartGame();
  }
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= car.speed;
  if (e.key === "ArrowRight" && car.x < canvas.width - car.width) car.x += car.speed;
});

canvas.addEventListener("click", () => {
  if (gameOver) restartGame();
});

update();


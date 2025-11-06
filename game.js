const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 175, y: 500, width: 50, height: 100, speed: 5 };
let obstacles = [];
let score = 0;

function drawCar() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
}

function moveObstacles() {
  obstacles.forEach(o => o.y += 4);
  obstacles = obstacles.filter(o => o.y < canvas.height);
}

function generateObstacle() {
  if (Math.random() < 0.03) {
    let x = Math.random() * (canvas.width - 50);
    obstacles.push({ x, y: -100, width: 50, height: 100 });
  }
}

function checkCollision() {
  for (let o of obstacles) {
    if (
      car.x < o.x + o.width &&
      car.x + car.width > o.x &&
      car.y < o.y + o.height &&
      car.y + car.height > o.y
    ) {
      alert("💥 Game Over! Your Score: " + score);
      document.location.reload();
    }
  }
}

function update() {
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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= car.speed;
  if (e.key === "ArrowRight" && car.x < canvas.width - car.width) car.x += car.speed;
});

update();


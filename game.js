// 🚗 Simple Car Game with Obstacles
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = 400;
canvas.height = 600;

let car = {
  x: 180,
  y: 500,
  width: 40,
  height: 80,
  color: "red"
};

let obstacles = [];
let score = 0;
let gameOver = false;

// 🎮 Move the car with arrow keys
document.addEventListener("keydown", (e) => {
  if (gameOver) return;
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= 20;
  if (e.key === "ArrowRight" && car.x + car.width < canvas.width) car.x += 20;
});

// 🚧 Create obstacles
function createObstacle() {
  let x = Math.random() * (canvas.width - 50);
  obstacles.push({ x: x, y: -50, width: 50, height: 50, color: "yellow" });
}

// 💥 Check collision
function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// 🕹️ Update game
function update() {
  if (gameOver) return;

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the car
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Move and draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.y += 5;

    ctx.fillStyle = o.color;
    ctx.fillRect(o.x, o.y, o.width, o.height);

    // Check for collision
    if (isColliding(car, o)) {
      gameOver = true;
      alert("💥 Game Over! Your score: " + score);
      return;
    }
  }

  // Remove off-screen obstacles
  obstacles = obstacles.filter(o => o.y < canvas.height);

  // Add score
  score++;
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  requestAnimationFrame(update);
}

// 🕒 Create obstacles every 1 second
setInterval(() => {
  if (!gameOver) createObstacle();
}, 1000);

update();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ball = {
  x: 250,
  y: 400,
  radius: 20,
  vx: 0,
  vy: 0
};

const startX = 250;
const startY = 400;
const gravity = 0.4;

let isDragging = false;
let score = 0;
let scored = false;

function drawHoop() {
  ctx.beginPath();
  ctx.ellipse(250, 100, 40, 10, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "white";
  ctx.fillRect(210, 40, 80, 10);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function checkScore() {
  const hoopX = 250;
  const hoopY = 100;

  const distance = Math.hypot(ball.x - hoopX, ball.y - hoopY);

  if (distance < 15 && ball.vy > 0 && !scored) {
    score++;
    scored = true;
    console.log("Score! Total:", score);
  }
}

function update() {
  if (ball.vx !== 0 || ball.vy !== 0) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += gravity;

    checkScore();

    if (ball.y > canvas.height + 50) {
      resetBall();
      scored = false;
    }
  }
}

function resetBall() {
  ball.x = startX;
  ball.y = startY;
  ball.vx = 0;
  ball.vy = 0;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHoop();
  update();
  drawBall();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const distance = Math.hypot(mouseX - ball.x, mouseY - ball.y);
  if (distance < ball.radius) {
    isDragging = true;
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;

  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  ball.vx = (ball.x - mouseX) * 0.2;
  ball.vy = (ball.y - mouseY) * 0.2;
});

gameLoop();
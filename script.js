const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function drawHoop() {
  // Rim
  ctx.beginPath();
  ctx.ellipse(250, 100, 40, 10, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Backboard
  ctx.fillStyle = "white";
  ctx.fillRect(210, 40, 80, 10);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(250, 400, 20, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

drawHoop();
drawBall();
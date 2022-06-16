var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;

window.onload = function()
{
  canvas = document.getElementById('playGround');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 144;
  setInterval(() => { draw(); ballMove(); }, 1000 / framesPerSecond);

}

function draw()
{
  drawGround();
  drawRacquet();
  drawBall();
}

function drawGround()
{
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawRacquet()
{
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(5, canvas.clientHeight / 2 - 50, 10, 100);
}

function drawBall()
{
  canvasContext.fillStyle = "green";
  canvasContext.fillRect(ballX,  ballY, 20, 20);
}

function ballMove()
{
  ballX += 1;
  ballY += 1;

  if(ballX >= canvas.clientWidth || ballY >= canvas.clientHeight)
  {
    ballX = Math.random() * canvas.clientWidth;
    ballY = Math.random() * canvas.clientHeight;
  }
}

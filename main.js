var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeed = 1;

window.onload = function()
{
  canvas = document.getElementById('playGround');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 144;
  setInterval(() => { drawning(); ballMove(); }, 1000 / framesPerSecond);

}

function drawning()
{
  //ground
  drawRect (0, 0, canvas.clientWidth, canvas.clientHeight, 'black');

  //left racquet
  drawRect(5, canvas.clientHeight / 2 - 50, 10, 100, 'white');

  //ball
  drawBall(ballX, ballY, 10, 'green');
}

function drawRect(leftX, topY, width, height, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(centerX, centerY, radius, color)
{
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function ballMove()
{
  ballX += ballSpeed;
  ballY += ballSpeed;

  if(ballX >= canvas.clientWidth || ballY >= canvas.clientHeight)
  {
    ballSpeed = -ballSpeed;
  }

  else if(ballX <= 0 || ballY <= 0)
  {
    ballSpeed = -ballSpeed;
  }
}

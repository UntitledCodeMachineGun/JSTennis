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
  drawObject (0, 0, canvas.clientWidth, canvas.clientHeight, 'black');

  //left racquet
  drawObject(5, canvas.clientHeight / 2 - 50, 10, 100, 'white');

  //ball
  drawObject(ballX,  ballY, 20, 20, 'green');
}

function drawObject(leftX, topY, width, height, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillRect(leftX, topY, width, height);
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

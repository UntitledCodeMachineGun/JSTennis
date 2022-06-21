var canvas;
var canvasContext;

var framesPerSecond = 144;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 1.5;
var ballSpeedY = 0.6;

var racqLY = 250;
const RACQ_LHEIGHT = 100;

function calculateMousePos(evt)
{
  var ground = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - ground.left - root.scrollLeft;
  var mouseY = evt.clientY - ground.top - root.scrollTop;
  
  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function()
{
  canvas = document.getElementById('playGround');
  canvasContext = canvas.getContext('2d');

  setInterval(() => { drawning(); ballMove(); }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', 
    function(evt)
    {
      var mousePos = calculateMousePos(evt);
      racqLY = mousePos.y - RACQ_LHEIGHT / 2;
    });
}

function drawning()
{
  //ground
  drawRect (0, 0, canvas.clientWidth, canvas.clientHeight, 'black');

  //left racquet
  drawRect(5, racqLY, 10, RACQ_LHEIGHT, 'white');

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
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.clientWidth)
  {
    ballSpeedX = -ballSpeedX;
  }
  else if(ballY > canvas.clientHeight)
  {
    ballSpeedY = -ballSpeedY;
  }
  else if(ballX < 0)
  {
    ballSpeedX = -ballSpeedX;
  }
  else if(ballY < 0)
  {
    ballSpeedY = -ballSpeedY;
  }
}
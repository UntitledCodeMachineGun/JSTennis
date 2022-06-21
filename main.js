var canvas;
var canvasContext;

var framesPerSecond = 144;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 4;
var ballSpeedY = 2;

var racqLY = 250;
var racqRY = 250;

const RACQ_LHEIGHT = 100;
const RACQ_THICKNESS = 10;
const RACQ_INDENT = 5;

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
  drawRect (0, 0, canvas.width, canvas.height, 'black');

  //left racquet
  drawRect(RACQ_INDENT, racqLY, RACQ_THICKNESS, RACQ_LHEIGHT, 'white');

  //right racquet
  drawRect(canvas.width - RACQ_THICKNESS - RACQ_INDENT, racqRY, RACQ_THICKNESS, RACQ_LHEIGHT, 'white');

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

function ballReset()
{
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function ballMove()
{
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.clientWidth - (RACQ_THICKNESS + RACQ_INDENT))
  {
    if(ballY > racqRY && ballY < racqRY + RACQ_LHEIGHT)
    {
      ballSpeedX = -ballSpeedX;
    }
    else
    {
      ballReset();
    }
  }
  else if(ballY > canvas.clientHeight)
  {
    ballSpeedY = -ballSpeedY;
  }
  else if(ballX < (RACQ_THICKNESS + RACQ_INDENT))
  {
    if(ballY > racqLY && ballY < racqLY + RACQ_LHEIGHT)
    {
      ballSpeedX = -ballSpeedX;
    }
    else
    {
      ballReset();
    }
  }
  else if(ballY < 0)
  {
    ballSpeedY = -ballSpeedY;
  }
}
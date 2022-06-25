var canvas;
var canvasContext;

var framesPerSecond = 60;

var ballX = 400;
var ballY = 300;
var ballSpeedX = 6;
var ballSpeedY = 4;

var racqLY = 250;
var racqRY = 250;

var scoreP1 = 0;
var scoreP2 = 0;
var scoreToWin = 3;

var _pause = true;

var nickName = '';

const RACQ_HEIGHT = 100;
const RACQ_THICKNESS = 10;
const RACQ_INDENT = 5;
const CHUNK = RACQ_HEIGHT / 2 - 15;
const ACCELERATE_RATE = 0.35;
const LEADERBOARD = document.getElementById('score');

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

function handleMouseClick()
{
  if(_pause)
  {
    scoreP1 = 0;
    scoreP2 = 0;
    _pause = false;
  }
}

window.onload = function()
{
  canvas = document.getElementById('playGround');
  canvasContext = canvas.getContext('2d');

  canvasContext.font = '25px s';

  setInterval(() => { drawning();
    
    if(_pause)
    {
      drawText(canvas.width / 2, 100, 'Click to play', 'white');
      return;
    }

    compMoving(); }, 1000 / framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);

  canvas.addEventListener('mousemove', function(evt) { leftRacqMove(evt); });
}

function compMoving()
{
  rightRacqMove();
  ballMove();
}

function drawning()
{
  //ground
  drawRect (0, 0, canvas.width, canvas.height, 'black');

  //left racquet
  drawRect(RACQ_INDENT, racqLY, RACQ_THICKNESS, RACQ_HEIGHT, 'white');

  //right racquet
  drawRect(canvas.width - RACQ_THICKNESS - RACQ_INDENT, racqRY, RACQ_THICKNESS, RACQ_HEIGHT, 'white');

  //ball
  drawBall(ballX, ballY, 10, 'green');

  //Player 1 score
  drawScore(scoreP1, 100, 100, 'white');
  
  //Player 2 score
  drawScore(scoreP2, canvas.width - 100, 100, 'white');
}

function drawScore(score, leftX, topY, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillText(score, leftX, topY);
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

function drawText(leftX, topY, text, color)
{
  canvasContext.fillStyle = color;
  canvasContext.fillText(text, leftX, topY);
}

function ballReset()
{
  if(scoreP1 >= scoreToWin || scoreP2 >= scoreToWin)
  {
    _pause = true;
  }

  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = -ballSpeedY;
}

function leftRacqMove(evt)
{
  var mousePos = calculateMousePos(evt);
  racqLY = mousePos.y - RACQ_HEIGHT / 2;
}

function rightRacqMove()
{
  var racqRYCenter = racqRY + RACQ_HEIGHT / 2;

  if(racqRYCenter < ballY - CHUNK)
  {
    racqRY += 4.5;
  }
  else if(racqRYCenter > ballY + CHUNK)
  {
    racqRY -= 4.5;
  }
}

function ballMove()
{
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX > canvas.width - (RACQ_THICKNESS + RACQ_INDENT) - 1)
  {
    if(ballY > racqRY && ballY < racqRY + RACQ_HEIGHT)
    {
      ballSpeedX = -ballSpeedX;
      
      let deltaY = ballY - (racqRY + RACQ_HEIGHT / 2);

      ballSpeedY = deltaY * ACCELERATE_RATE;
    }
    else
    {
      scoreP1++;
      ballReset();
    }
  }
  else if(ballY > canvas.height)
  {
    ballSpeedY = -ballSpeedY;
  }
  else if(ballX < (RACQ_THICKNESS + RACQ_INDENT) - 1)
  {
    if(ballY > racqLY && ballY < racqLY + RACQ_HEIGHT)
    {
      ballSpeedX = -ballSpeedX;

      let deltaY = ballY - (racqLY + RACQ_HEIGHT / 2);

      ballSpeedY = deltaY * ACCELERATE_RATE;
    }
    else
    {
      scoreP2++;
      ballReset();
    }
  }
  else if(ballY < 0)
  {
    ballSpeedY = -ballSpeedY;
  }
}
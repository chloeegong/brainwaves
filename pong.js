/* global createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke,
createButton, backgroundColor, color, fill, ellipse, text, stroke, line, width,
height, mouseX, mouseY, mouseIsPressed, pmouseX, pmouseY, keyCode, ENTER, textFont */

let width,
  height,
  initialBallX,
  initialBallY,
  ballWidth,
  ballHeight,
  paddleX1,
  paddleX2,
  paddleX,
  paddleY,
  paddleWidth,
  xVelocity,
  yVelocity,
  speed,
  gravity,
  button;

function setup() {
  //canvas & color settings
  createCanvas(400, 400);
  background(255, 255, 255);

  width = 400;
  height = 400;

  setUpBall();
  setUpPaddle();

  //change in x, y positions
  xVelocity = 5;
  yVelocity = 5;
}

function draw() {
  background(color("white"));

  // rectangular paddle created -> follows x position of cursor
  drawPaddle();

  // see if paddle goes off of screen
  checkPaddleLimits();

  // check if user does not hit the ball
  checkGameOver();

  // update the x * y positions of ball
  initialBallX += xVelocity;
  initialBallY += yVelocity;

  // check if the ball hits the sides
  checkHorizontalLimits();

  // check if the ball hits the top or paddle
  checkVerticalLimits();


  // ellipse drawn on canvas
  ellipse(initialBallX, initialBallY, 15, 15);
}

// Method checks if the ball hits the right and left sides of the screen
function checkHorizontalLimits(){
  //bounce off the sides if the ellipses hit
  if (initialBallX >= width - ballWidth || initialBallX <= 0) {
    // left limit & right limit
    xVelocity *= -1;
  }
  if (initialBallY <= 0) {
    yVelocity *= -1;
  }
}

// Method checks if the ball hits the top and bottom sides of the screen
function checkVerticalLimits(){
    if (initialBallY == paddleY && (initialBallX >= paddleX1 && initialBallX <= paddleX2)) {
      yVelocity *= -1;
    }
}
// Method checks if the paddle goes off of the screen horizontally
function checkPaddleLimits() {
  // if paddle goes off the screen on the left
  if (paddleX1 < 0) {
    paddleX1 = 0 + 10;
    paddleX2 = paddleWidth;
  }

  // if paddle goes off the screen on the right
  if (paddleX2 > width) {
    paddleX2 = width - 10;
    paddleX1 = width - paddleWidth;
  }
}

// Method draws the paddle and updates its position
function drawPaddle(){
  line(paddleX1, paddleY, paddleX2, paddleY);
  paddleX1 = mouseX - paddleWidth / 2;
  paddleX2 = mouseX + paddleWidth / 2;
}

// Method ends the game and displays a message if user loses game
function checkGameOver() {

  if (initialBallY > paddleY) {
    noStroke();
    fill('black');
    textFont("Georgia", 30, 30);
    text("Game Over", width / 3, height / 2);
    textFont("Georgia", 15, 30);
    text("Press enter to play again", width / 2 - 75, height / 2 + height / 4);
  }
}

// Method sets the ball initial position (set to top of screen) and dimensions
function setUpBall() {
  // ball dimensions
  ballWidth = 10;
  ballHeight = 10;

  //initial ball position
  initialBallX = width / 2;
  initialBallY = 0;
  speed = 5;
  gravity = 0.5;
  initialBallY += speed;
  speed += gravity;
}

// Method sets the paddle position (set to center) and dimensions
function setUpPaddle() {
  paddleY = height - 30;
  paddleWidth = 80;
  paddleX1 = width / 2 - paddleWidth / 2;
  paddleX2 = width / 2 + paddleWidth / 2;
  fill(0, 33, 115);
  stroke(0, 33, 115);

  strokeWeight(8);
}

function keyPressed() {
  if (keyCode == ENTER) {
    createCanvas(400, 400);
    background(255, 255, 255);

    width = 400;
    height = 400;

    setUpBall();
    setUpPaddle();

    //change in x, y positions
    xVelocity = 5;
    yVelocity = 5;
  }
}

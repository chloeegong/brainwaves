// animal crossing js

/* global createCanvas, background, color, random,
fill, noStroke, rect, width, height, keyCode, LEFT_ARROW, RIGHT_ARROW,
UP_ARROW, DOWN_ARROW, text, textSize, collideRectRect, ENTER, textAlign,
stroke, line, CENTER */

var fruitArr, fruitSize, score, gameIsOver, charX, charY, charV, hit,
    time;

function setup() {
  createCanvas(400, 400);

  setupChar();

  fruitSize = 10;
  score = 0;
  gameIsOver = false;

  time = 1000;

  fruitArr = [];

  for (let i = 0; i < 10; i++) {
    fruitArr.push(new Fruit());
  }
}

function draw() {
  background(color("#98FB98"));

  //display character
  fill(color("yellow"));
  noStroke();
  rect(charX, charY, 10, 10);

  //call to display fruits
  for (let i = 0; i < fruitArr.length; i++) {
    fruitArr[i].display();
  }

  gridLines();
  checkCollisions();
  displayScores();
  handleTime();
  displayTime();

  if(gameIsOver) {
    textSize(30);
    textAlign(CENTER);
    text("game over", width / 2, height / 2);
    textSize(15);
    text(`score: ${score}`, width / 2, height * 3/4);
    setupChar();
    return;
  }

}

function setupChar() {
  charX = width / 2;
  charY = height / 2;
  charV = 10;
}

function gridLines() {
  stroke(color("#71f071"));

  for (let i = 10; i < width; i = i + 10) {
    line(i, 0, i, height); //vertical line
    line(0, i, width, i); //horizontal line
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW) {
    charX -= charV;
  } else if(keyCode === RIGHT_ARROW) {
    charX += charV;
  } else if(keyCode === UP_ARROW) {
    charY -= charV;
  } else if(keyCode === DOWN_ARROW) {
    charY += charV;
  }

  if(keyCode === ENTER) {
    setup();
  }
}

class Fruit {
  constructor() {
    this.x = Math.floor(random(1, 39)) * 10;
    this.y = Math.floor(random(1, 39)) * 10;
    this.color = random(360);

  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    rect(this.x, this.y, 10, 10);
  }
}

//check if fruit is collected, collide rect rect
function checkCollisions() {

  // rearrange all fruits on the board, increment score
  for (let i = 0; i < fruitArr.length; i++) {
    hit = collideRectRect(charX, charY, 10, 10, fruitArr[i].x, fruitArr[i].y, 10, 10);
    if (hit) {
      score++;

      fruitArr = [];
      for (let i = 0; i < 10; i++) {
        fruitArr.push(new Fruit());
      }

    }

  }

}

function displayScores() {
  textSize(12);
  fill(0);

  text(`Score: ${score}`, 10, 20);
}

function handleTime() {
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
  }
}

function displayTime() {
  textSize(12);
  fill(0);

  text(`Time: ${time}`, 10, 40);
}

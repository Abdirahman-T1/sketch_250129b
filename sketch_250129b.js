let rect1Y, rect2Y, yMovement, y2Movement;
let circleX, circleY, circlespeedX, circlespeedY;
let score, score2, canMove;

function setup() {
    createCanvas(600, 600);
    rect1Y = height / 2;
    rect2Y = height / 2;
    yMovement = 0;
    y2Movement = 0;
    circleX = height / 2;
    circleY = height / 2;
    circlespeedX = 3;
    circlespeedY = 3;
    score = 0;
    score2 = 0;
    canMove = true;
}

function draw() {
    background(200);

    // Player scores
    fill(0);
    textSize(20);
    text("Player 1 Score = " + score2, 10, 20);
    text("Player 2 Score = " + score, 350, 20);

    // Middle line
    stroke(0);
    line(width / 2, 0, width / 2, height);

    // Player paddles
    fill(0, 0, 255);
    rect(0, rect1Y, 20, 110);
    fill(255, 0, 0);
    rect(width - 21, rect2Y, 20, 110);

    // Ball
    fill(255);
    ellipse(circleX, circleY, 40, 40);

    // Ball movement
    if (canMove) {
        circleX += circlespeedX;
        circleY += circlespeedY;
    } else {
        textSize(100);
        fill(0);
        text("Paused", 110, 250);
        textSize(20);
        fill(0);
        text("Player 1 keys: W, S", 115, 270);
        text("Player 2 keys: I, K", 115, 295);
    }

    // Paddle movement
    rect1Y += yMovement;
    rect2Y += y2Movement;

    // Paddle looping
    if (rect1Y > height) rect1Y -= 650;
    if (rect1Y < -150) rect1Y += 650;
    if (rect2Y > height) rect2Y -= 650;
    if (rect2Y < -150) rect2Y += 650;

    // Ball collisions
    if (circleX - 20 <= 20 && circleY > rect1Y && circleY < rect1Y + 110) {
        circlespeedX *= -1;
    }
    if (circleX + 20 >= width - 20 && circleY > rect2Y && circleY < rect2Y + 110) {
        circlespeedX *= -1;
    }
    if (circleY <= 0 || circleY >= height) {
        circlespeedY *= -1;
    }

    // Scoring
    if (circleX <= 0) {
        circleX = width / 2;
        score++;
    } else if (circleX >= width) {
        circleX = width / 2;
        score2++;
    }
}

// Paddle controls
function keyPressed() {
    if (key === 'w' || key === 'W') yMovement = -5;
    if (key === 's' || key === 'S') yMovement = 5;
    if (key === 'i' || key === 'I') y2Movement = -5;
    if (key === 'k' || key === 'K') y2Movement = 5;
}

function keyReleased() {
    if (key === 'w' || key === 'W' || key === 's' || key === 'S') yMovement = 0;
    if (key === 'i' || key === 'I' || key === 'k' || key === 'K') y2Movement = 0;
}

// Pause game on mouse click
function mousePressed() {
    canMove = !canMove;
}

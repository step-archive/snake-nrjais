let snake = undefined;
let food = undefined;
let numberOfRows = 60;
let numberOfCols = 120;

let animator = undefined;

const animateSnake = function () {
  let oldHead = snake.getHead();
  let oldTail = snake.move();
  let head = snake.getHead();
  if (hasCollided(head)) {
    stopGame();
    return;
  }
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  growIfEatenFood(head);
}

const stopGame = function(){
  clearInterval(animator);
  putRestartButton();
}

const hasCollided = function (head) {
  return collisionWithAnyWall(head) || collisionWithItself(head);
}

const collisionWithItself = function (head) {
  return snake.getBody().some(bodyPos => head.isSameCoordAs(bodyPos));
}

const collisionWithAnyWall = function (head) {
  let isInsideXCoordRange = head.isXCoordBetween(0, numberOfCols - 1);
  let isInsideYCoordRange = head.isYCoordBetween(0, numberOfCols - 1);
  return !isInsideXCoordRange || !isInsideYCoordRange;
}

const growIfEatenFood = function (head) {
  if (head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows, numberOfCols);
    drawFood(food);
  }
}

const changeSnakeDirection = function (event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener = function () {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function () {
  let tail = new Position(12, 10, "east");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();

  snake = new Snake(head, body);
}

const createFood = function (numberOfRows, numberOfCols) {
  food = generateRandomPosition(numberOfCols, numberOfRows);
}

const restartGame = function(){
  clearPreviousGame();
  startGame();
}

const startGame = function () {
  createSnake();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows, numberOfCols);
  drawFood(food);
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

window.onload = startGame;

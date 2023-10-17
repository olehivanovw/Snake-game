const canvas = document.querySelector('#game')
const ctx = canvas.getContext('2d')

const arena = new Image()
arena.src = './img/arena.png'

const foodApple = new Image()
foodApple.src = './img/apple.png'

const foodBanana = new Image()
foodBanana.src = './img/banana.png'

const foodCherry = new Image()
foodCherry.src = './img/cherry.png'

const foodArr = [foodApple, foodBanana, foodCherry]
const ranIndFood = Math.floor(Math.random() * 3)

let box = 32
let score = 0

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box
}

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

document.addEventListener('keydown', direction)

let dir

function direction(e) {
  if (e.keyCode === 37 && dir !== 'right') {
    dir = 'left'
  } else if (e.keyCode === 38 && dir !== 'down') {
    dir = 'up'
  } else if (e.keyCode === 39 && dir !== 'left') {
    dir = 'right'
  } else if (e.keyCode === 40 && dir !== 'up') {
    dir = 'down'
  }
}

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game)
      alert(`----- YOU LOSE. YOUR SCORE - ${score} -----`)
    }
  }
}

function drawGame() {
  ctx.drawImage(arena, 0, 0)

  ctx.drawImage(foodArr[ranIndFood], food.x, food.y)

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'black' : 'brown';
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
  }

  ctx.fillStyle = 'white'
  ctx.font = '32px Arial'
  ctx.fillText(score, box * 2.5, box * 1.5);

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (snakeX === food.x && snakeY === food.y) {
    score++
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box
    }
  } else {
    snake.pop()
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
    clearInterval(game)
    alert(`----- YOU LOSE. YOUR SCORE - ${score} -----`)
  }

  switch (dir) {
    case 'left':
      snakeX -= box
      break
    case 'right':
      snakeX += box
      break
    case 'up':
      snakeY -= box
      break
    case 'down':
      snakeY += box
      break
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  eatTail(newHead, snake)

  snake.unshift(newHead)
}

let game = setInterval(drawGame, 100)
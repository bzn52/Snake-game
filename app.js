let playBoard = document.querySelector(".container .board");
let scoreval = document.querySelector(".container .score-value")
let gameOverBox = document.querySelector(".container .game-over")
let gameOverScore = document.querySelector(".container .game-score")
let restart = document.querySelector(".container .restart")

let gameEnd = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let moveX = 0, moveY = 0;
let snakeBody = [];
let IntervalId;
let score = 0;

//creating audios
const hitSFX = new Audio("hit.mp3");
const eatSFX = new Audio("eat.mp3");

let createGame = () => {
    if (gameEnd) {
        return EndGame();
    }

    //If snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        eatSFX.play();
        changeFoodPosition();
        snakeBody.push([snakeX, snakeY]);
        score++;
        scoreval.innerHTML = score;
        gameOverScore.innerHTML = score;
    }

    //Moving Snake
    snakeX += moveX;
    snakeY += moveY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]

    //Game ends when snake collide with wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        hitSFX.play();
        return gameEnd = true;
    }


    //Create food
    let li = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    for (let i = 0; i < snakeBody.length; i++) {
        //Create snake
        li += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`

        //Checking if snake head hit snake body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            hitSFX.play();
            gameEnd = true;
        }
    }

    //Insert food into board
    playBoard.innerHTML = li;
}


//Changing food position
let changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

let changeDirection = (e) => {
    if (e.classList.contains("ArrowLeft")) {
        moveX = -1;
        moveY = 0;
    }
    else if (e.classList.contains("ArrowUp")) {
        moveX = 0;
        moveY = -1;
    }
    else if (e.classList.contains("ArrowRight")) {
        moveX = 1;
        moveY = 0;
    }
    else if (e.classList.contains("ArrowDown")) {
        moveX = 0;
        moveY = 1;
    }

    createGame();
}

//Change direction with arrow keys
document.addEventListener("keydown", event => {

    switch (event.key) {
        case "ArrowLeft":
            moveX = -1;
            moveY = 0;
            break;
        case "ArrowUp":
            moveX = 0;
            moveY = -1;
            break;
        case "ArrowRight":
            moveX = 1;
            moveY = 0;
            break;
        case "ArrowDown":
            moveX = 0;
            moveY = 1;
            break;
    }
});


//Increase speed on score increase



let EndGame = () => {
    clearInterval(IntervalId);
    gameOverBox.style.left = "0%";
}

restart.addEventListener("click", () => {
    location.reload();
})

changeFoodPosition();
IntervalId = setInterval(createGame, 150);
createGame();
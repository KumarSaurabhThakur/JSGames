const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "aqua";

const context = canvas.getContext("2d");


//PLAYER CREATION
let gravity = 1;

class player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.position.width = 60;
        this.position.height = 60;
    }

    draw() {
        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.position.width, this.position.height);
    }

    playerMovement() {
        if ((this.position.height + this.position.y + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
        this.position.y += this.velocity.y;

        //Collision Detection
        if ((this.position.x >= platform.x)
            && (this.position.x <= (platform.position.x + platform.width))
            && ((this.position.y+5) >= platform.position.y)
            && (this.position.y <= (platform.position.y + 1))) {
            this.velocity.y = 0;

        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}


//PLAYER MOVEMENT
addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        playerFigure.velocity.x = 5;
    }

    else if (e.key === "ArrowUp") {
        if (playerFigure.velocity.y === 0) {
            playerFigure.velocity.y = -20;
        }
    }

    else if (e.key === "ArrowLeft") {
        playerFigure.velocity.x = -5;
    }
});

addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") {
        playerFigure.velocity.x = 0;
    }

    else if (e.key === "ArrowLeft") {
        playerFigure.velocity.x = 0;
    }
})

const playerFigure = new player();



//PLATFORMS CREATION
class platform {
    constructor() {
        this.position = { x: 300, y: 400 };
        this.width = 200;
        this.height = 20;
    }

    draw() {
        context.fillStyle = "blue";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}

const platfromFigure = new platform();
//GAME ANIMATION
function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    playerFigure.playerMovement();
    playerFigure.draw();
    platfromFigure.draw();

}

gameAnimation();
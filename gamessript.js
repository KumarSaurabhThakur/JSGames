"use strict";

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.background = "aqua";

canvas.style.backgroundImage = "url('sky.jpg')";
canvas.style.backgroundSize = "cover";

const context = canvas.getContext("2d");

let offset = 0;

let hillset = 0;

let pitholesset = 0;

//PLAYER CREATION
let gravity = 0.8;

let key = "";

class player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.position.width = 80;
        this.position.height = 177;
        this.frames = 1;
    }


    draw() {
        if (this.velocity.y == 0 && this.velocity.x == 0) {
            if (key == "right")
                context.drawImage(marioStandingRight, 177 * this.frames, 0, 177, 400, this.position.x, this.position.y, this.position.width, this.position.height);
            if (key == "left")
                context.drawImage(marioStandingLeft, 177 * this.frames, 0, 177, 400, this.position.x, this.position.y, this.position.width, this.position.height);
        }
        if (this.velocity.x > 0)

            context.drawImage(marioMovingRight, 340 * this.frames, 0, 340, 400, this.position.x, this.position.y, 155, 185);
        if (this.velocity.x < 0)
            context.drawImage(marioMovingLeft, 340 * this.frames, 0, 340, 400, this.position.x, this.position.y, 155, 185);
    }

    playerMovement() {
        this.frames++;
        if (this.frames > 24)
            this.frames = 1;

        if ((this.position.height + this.position.y + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
        //if(this.position.y=this.position.height==canvas.height){
        //  alert("Game Over");
        // window.location.reload
        //  }
        //this.position.y += this.velocity.y;

        //Collision Detection
        for (let i = 0; i < platformsArray.length; i++) {

            if (((this.position.x + this.position.width) >= platformsArray[i].position.x)
                && (this.position.x <= (platformsArray[i].position.x + platformsArray[i].width))
                && ((this.position.y + this.position.height + this.velocity.y) >= platformsArray[i].position.y)
                && (this.position.y <= (platformsArray[i].position.y))) {
                this.velocity.y = 0;

            }

            /*if ((this.position.x + this.position.width) == platformsArray[i].x
                && (this.position.y + this.position.height) == canvas.height)
                this.velocity.x = 0;*/

            /*for (let i = 0; i < pitholesArray.length; i++) {

                if (((this.position.x + this.position.width) >= pitholesArray[i].position.x)
                    && (this.position.x <= (pitholesArray[i].position.x + pitholesArray[i].width))
                    && ((this.position.y + this.position.height + this.velocity.y) >= pitholesArray[i].position.y)
                    && (this.position.y <= (pitholesArray[i].position.y))) {
                    this.velocity.y = 0;

                }*/


            /*if ((this.position.x >= platformFigure2.position.x)
                && (this.position.x <= (platformFigure2.position.x + platformFigure2.width))
                && ((this.position.y + 40) >= platformFigure2.position.y)
                && (this.position.y <= (platformFigure2.position.y))) {
                this.velocity.y = 0;
    
            }*/

        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}


let marioStandingRight = new Image();
marioStandingRight.src = "spriteStandRight.png";

let marioStandingLeft = new Image();
marioStandingLeft.src = "spriteStandLeft.png";

let marioMovingRight = new Image();
marioMovingRight.src = "spriteRunRight.png";

let marioMovingLeft = new Image();
marioMovingLeft.src = "spriteRunLeft.png";



//PLAYER MOVEMENT
addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        key = "right";
        playerFigure.velocity.x = 3;
        if (playerFigure.position.x + playerFigure.position.width > 400) {
            moveOffset(-15);
            moveHills(-15);
            //movePitholes(-15);
        }
        if (playerFigure.position.x + playerFigure.position.width > 600)
            playerFigure.position.x = 600;
    }

    else if (e.key === "ArrowUp") {
        key = "up";
        playerFigure.velocity.y = -25;
        //splayerFigure.position.y-=8;
        // if (
        // \playerFigure.position.y + playerFigure.position.height > canvas.height - 5) {
        //     playerFigure.velocity.y = -25;
        // }
        // if (playerFigure.position.y + playerFigure.position.height < platformFigure.height +5) {
        //     playerFigure.velocity.y = -25;
        // }
    }

    else if (e.key === "ArrowLeft") {
        key = "left";
        if (playerFigure.position.x > 0) {
            playerFigure.velocity.x = -3;
        }
        if (playerFigure.position.x + playerFigure.position.width <= 400) {
            moveOffset(15);
            moveHills(15);
            // movePitholes(15);
        }
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

//PLATFORMS CREATION
class platform {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y, width: width, height: height };
        this.width = width;
        this.height = height;
    }

    draw() {
        let platforms = new Image();
        platforms.src = "platform.png";
        context.drawImage(platforms, this.position.x, this.position.y, this.width, this.height);
    }

}


//PITHOLES CREATION
/*class pitholes {
    constructor(x, y, width, height) {
        this.position = { x: x, y: y, width: width, height: height };
        this.width = width;
        this.height = height;
    }

    draw() {
        let platforms = new Image();
        platforms.src = "platformSmallTall.png";
        context.drawImage(platforms, this.position.x, this.position.y, this.width, this.height);
    }

}*/


//HILLSclass hills {
class hillsImages {
    constructor() {
        this.position = { x: 0, y: 100 };
    }
    hillsDraw() {
        let hills = new Image();
        hills.src = "hills.png";
        context.drawImage(hills, this.position.x, this.position.y);

    }

}

let hillsArray = [];
const hillsFigure = new hillsImages();
hillsArray.push(hillsFigure);

let platformsArray = [];
const platformFigure = new platform(0, 500, 800, 200);
const platformFigure2 = new platform(platformFigure.width - 1, 500, 800, 200);
const platformFigure3 = new platform(platformFigure.width * 2 - 2, 500, 800, 200);
const platformFigure4 = new platform(platformFigure.width * 3 + 100, 450, 800, 200);
const platformFigure5 = new platform(platformFigure.width * 4 + 200, 350, 800, 200);
const platformFigure6 = new platform(platformFigure.width * 5 + 400, 500, 800, 200);

platformsArray.push(platformFigure);
platformsArray.push(platformFigure2);
platformsArray.push(platformFigure3);
platformsArray.push(platformFigure4);
platformsArray.push(platformFigure5);
platformsArray.push(platformFigure6);

/*let pitholesArray = [];
const pitholesFigure = new pitholes(platformFigure.width * 3 + 80, 400, 400, 400);

pitholesArray.push(pitholesFigure);*/

const playerFigure = new player();
playerFigure.draw();
//GAME ANIMATION
function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);

    /*platformFigure.draw();
    platformFigure2.draw();*/

    for (let i = 0; i < hillsArray.length; i++) {
        hillsArray[i].hillsDraw();
    }

    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].draw();
    }

    /*for (let i = 0; i < pitholesArray.length; i++) {
        pitholesArray[i].draw();
    }*/

    playerFigure.playerMovement();
    playerFigure.draw();

}

function moveOffset(x) {
    offset += x;
    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].position.x += x;
    }
}

function moveHills(a) {
    hillset += a;
    for (let i = 0; i < hillsArray.length; i++) {
        hillsArray[i].position.x += a;
    }
}

/*function movePitholes(a) {
    pitholesset += a;
    for (let i = 0; i < pitholesArray.length; i++) {
        pitholesArray[i].position.x += a;
    }
}*/

moveHills(-15);
moveOffset(-15);
//movePitholes(-15);
Promise.all(Array.from(document.images).map(img => {
    if (img.complete)
        return Promise.resolve(img.naturalHeight !== 0);
    return new Promise(resolve => {
        img.addEventListener('load', () => resolve(true));
        img.addEventListener('error', () => resolve(false));
    });
})).then(results => {
    if (results.every(res => res))
        console.log('all images loaded successfully');
    else
        console.log('some images failed to load, all finished loading');
});
gameAnimation();

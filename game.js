var canvas = document.getElementById("game");
var context = canvas.getContext('2d');
var ball = {
    x : 50,
    y : 300,
    dx : 4,
    dy : 4,
    R : 15,
};
var paddle = {
    width: 90,
    height: 10,
    x: 250,
    y: canvas.height - 10,
    speed: 10,
    ismovingLeft : false,
    ismovingRight : false

};
var isgameOver = false;
var userScorce = 0;
var Max = 21;
var isgameWin = false;
var BrickConfig = {
    offsetX:30, 
    offsetY:30,
    margin:30, 
    width:510/7, 
    height:20, 
    totalrow:3,
    totalcol:7,
};
var BrickList = [];

for(var i = 0; i < BrickConfig.totalrow; i++) {
    for(var j = 0; j < BrickConfig.totalcol; j++) {
        BrickList.push({
            x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
            y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
            isBroken: false
        });
    }
}
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 65 || event.keyCode == 37) {
        paddle.ismovingLeft = true;
    } else if (event.keyCode == 68 || event.keyCode == 39) {
        paddle.ismovingRight = true;
    };
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 65 || event.keyCode == 37) {
        paddle.ismovingLeft = false;
    } else if (event.keyCode == 68 || event.keyCode == 39) {
        paddle.ismovingRight = false;
    };
});
function drawBall() {
    context.beginPath();
    context.arc(ball.x,ball.y,ball.R,0, Math.PI * 2);
    context.fillStyle ="red";
    context.fill();
    context.closePath();
};
function drawPaddle() {
    context.beginPath();
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fill();
    context.closePath();
};
/* 
    2 * OFFSET + 7 * WIDTH + 6 * MARGIN = 750
    OFFSET = MARGIN = 30
    =>WIDTH = 510/7
    ROW = 3
    COL = 7
*/
function drawBricks() {
    BrickList.forEach(function (b) {
        if(!b.isBroken) {
            context.beginPath();
            context.rect(b.x,b.y,BrickConfig.width,BrickConfig.height);
            context.fillStyle ="orange";
            context.fill();
            context.closePath();
        }
    });        
}
function Ballhandle() {
    if(ball.x < ball.R || ball.x > canvas.width - ball.R) {
        ball.dx=-ball.dx;
    };   
    if(ball.y < ball.R) {
        ball.dy=-ball.dy;
    };
};
function Paddlehandle() {
    if(ball.x + ball.R >= paddle.x && ball.x + ball.R <= paddle.x + paddle.width && 
        ball.y + ball.R >= canvas.height - paddle.height) {
            ball.dy=-ball.dy;
    };
};
function BricksCollidhandle() {
    BrickList.forEach(function (b) {
        if(!b.isBroken) {
            if(ball.x >= b.x && ball.x <= b.x + BrickConfig.width &&
                ball.y + ball.R >= b.y && ball.y - ball.R <= b.y + BrickConfig.height) {
                ball.dy = -ball.dy;
                b.isBroken = true;
                userScorce += 1;
                if(userScorce >= Max) {
                    isgameOver = true;
                    isgameWin = true;
                }
            }
        }
    });
};
function Ballnewposition() {
    ball.x+=ball.dx;
    ball.y+=ball.dy;
};
function Paddlenewposotion() {
    if(paddle.ismovingLeft) {
        paddle.x -= paddle.speed
    } else if(paddle.ismovingRight) {
        paddle.x += paddle.speed
    };
    if(paddle.x < 0) {
        paddle.x = 0;
    } else if(paddle.x > canvas.width-paddle.width) {
        paddle.x = canvas.width-paddle.width;
    };
};
function checkgameOver() {
    isgameOver = true;
};  
function handlegamewinover() {
    if(isgameWin) {
        alert("EASY GAME")
    } else {
        alert("NOOB")
    }
}
function draw() {
    if(!isgameOver) {
        context.clearRect(0,0,canvas.width,canvas.height);
        //ve bong
        drawBall();
        drawPaddle();
        drawBricks();
        Ballhandle();
        Paddlehandle();
        BricksCollidhandle();
        Ballnewposition();
        Paddlenewposotion();
        if(ball.y > canvas.height - ball.R) {
            checkgameOver();
        };
        requestAnimationFrame(draw);
    } else {
        handlegamewinover();
    }
};
draw();
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const first_direction = 2 * Math.PI * Math.random();

const user = {
    x:0,
    y: (canvas.height - 100)/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

const com = {
    x:canvas.width - 10,
    y: (canvas.height - 100)/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5 * Math.cos(first_direction),
    velocityY: 5 * Math.sin(first_direction),
    color: "WHITE"
}

const net = {
    x: canvas.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}


function drawRect(x, y, width, height, color){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);

}

function drawCircle(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
}

function drawNet(){
    for(let i=0; i<=canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

function drawText(x, y, text, color){
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, x, y)
}

function render(){
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");

    drawNet();

    drawText(canvas.width/4, canvas.height/5, user.score, "WHITE");
    drawText(3*canvas.width/4, canvas.height/5, com.score,  "WHITE");

    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    drawCircle(ball.x, ball.y, ball.radius, ball.color);

}

canvas.addEventListener("mousemove", movePlayer)
function movePlayer(event){
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height/2;
}


function collision(ball, player){
    ball.top = ball.y + ball.radius;
    ball.bottom = ball.y - ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius; 

    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;

    return ball.right > player.left && ball.left < player.right && ball.bottom > player.top && ball.top < player.bottom
}


function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY *= -1;
    }

    let computerLevel = 1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    let player = (ball.x < canvas.width) ? user : com;

    if (collision(ball, player) || collision(ball, com)){
        ball.velocityX *= -1
    }

    if((ball.x + ball.radius >= canvas.width)){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        player.score += 1;
    }
    if((ball.x - ball.radius <= 0)){
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        com.score += 1;
    }
}


function game(){
    update();
    render();
}

const framePerSecond = 60;
setInterval(game, 1000/framePerSecond);

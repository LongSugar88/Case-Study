let player;
let background;
let myScore;
let obstacles = [];
let bullet = [];
let flappy_Bird = [];
const PLAYER_WIDTH = 60;
const PLAYER_HEIGHT = 60;
const GAME_AREA_WIDTH = 680;
const GAME_AREA_HEIGHT = 420;
const BACKGROUND_WIDTH = 720;
const BACKGROUND_HEIGHT = 420;
const POSITION_X = 0;
const POSITION_Y = GAME_AREA_HEIGHT/2 - PLAYER_HEIGHT/2;

let GameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        this.canvas.width = GAME_AREA_WIDTH;
        this.canvas.height = GAME_AREA_HEIGHT;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.score = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
};
let Component = function (width, height, color, x, y, type){
    this.type = type
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    if(type == 'image' || type == 'background'){
        this.image = new Image();
        this.image.src = color;
    }
    this.update = function () {
        let ctx = GameArea.context;
        if(this.type == 'text'){
            ctx.font = 'bold ' + this.width + ' '+ this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if(type == 'image' || type == 'background'){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            if(type == 'background'){
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
    this.newPosition = function(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.type == 'background'){
            if(this.x == -(this.width)){
                this.x = 0
            }
        }
    }
    this.checkDivePoint = function(obj) {
        let topEdge = this.y;
        let underEdge = this.y + this.height;
        let leftEdge = this.x;
        let rightEdge = this.x + this.width;
        let topObstacle = obj.y;
        let underObstacle = obj.y + obj.height;
        let leftObstacle = obj.x;
        let rightObstacle = obj.x + obj.width;
        let dive = true;
        if( topEdge > underObstacle || underEdge < topObstacle||
            leftEdge > rightObstacle || rightEdge < leftObstacle
        ) {
            dive = false;
        }
        return dive
    };
    this.clear = function () {
        ctx = GameArea.context;
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
function startGame() {
    player = new Component(PLAYER_WIDTH, PLAYER_HEIGHT,'https://i.imgur.com/pNbhCD4.png', POSITION_X, POSITION_Y,'image');
    background = new Component(BACKGROUND_WIDTH, BACKGROUND_HEIGHT, 'https://i.imgur.com/bgWwpBT.jpg', 0, 0, 'background');
    myScore = new Component('30px','Consolas','yellow', 280, 40,'text');
    GameArea.start()
}

let order = false;
function imperialOrder() {
    order = true;
    return order;
}
function updateGameArea(){
    let x, height, space, maxHeight, minHeight,maxSpace, minSpace;
    for(let i=0; i<obstacles.length; i++){
        if(player.checkDivePoint(obstacles[i])){
            GameArea.stop();
            return
        }
    }
    for (i=0; i<bullet.length; i++){
        for(let j=0; j<obstacles.length; j++){
            if(bullet[i].checkDivePoint(obstacles[j])){
                obstacles.splice(j,1);
                bullet.splice(i,1);
            }
        }
    }
    for (i=0; i<bullet.length; i++){
        for(let j=0; j<flappy_Bird.length; j++){
            if(bullet[i].checkDivePoint(flappy_Bird[j])){
                flappy_Bird.splice(j,1);
                bullet.splice(i,1);
            }
        }
    }
    for(let j=0; j<flappy_Bird.length; j++) {
        if (player.checkDivePoint(flappy_Bird[j])) {
            flappy_Bird.splice(j,1);
            GameArea.score *= 0.5;
        }
    }

    GameArea.clear();
    background.speedX = -0.5;
    background.newPosition();
    background.update();
    GameArea.frameNo += 1;
    function randomNumber(max, min) {
        let random = Math.floor(Math.random()*(max-min+1)+min);
        return random
    }
    function bulletType() {
        let image = "";
        switch (randomNumber(6,1)) {
            case 1:
                image = './image/bullet_flappy_1.png' // Bullet 1
                break;
            case 2:
                image = './image/bullet_flappy_2.png'  // Bullet 2
                break;
            case 3:
                image = './image/bullet_flappy_3.png'  //Bullet 3
                break;
            case 4:
                image = './image/bullet_flappy_4.png' //Bullet 4
                break;
            case 5:
                image = './image/bullet_flappy_5.png' //Bullet 4
                break;
            case 6:
                image = './image/bullet_flappy_6.png' //Bullet 4
                break;
        }
        return image;
    }
    if(GameArea.frameNo == 1 || obsAppearCondition(200)){
        x = GameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minSpace = 80;
        maxSpace = 200;
        space = Math.floor(Math.random()*(maxSpace-minSpace+1)+minSpace);
        flappy_Width = randomNumber(70,20)
        flappy_Y = randomNumber(height+space-flappy_Width,height+flappy_Width) - Number(flappy_Width);
        let obstacle1 = new Component(30, height, 'https://i.imgur.com/6D49450.png' , x, 0, 'image');
        let obstacle2 = new Component(30,x - height - space,'https://i.imgur.com/6D49450.png', x, height+space, 'image' );
        let flappyBird = new Component(flappy_Width,flappy_Width,'https://i.imgur.com/pNbhCD4.png', x,flappy_Y, 'image' );
        obstacles.push(obstacle1);
        obstacles.push(obstacle2);
        flappy_Bird.push(flappyBird);
    }
    // while (GameArea.score > 3){
    if(order){
        let bullet1 = new Component(PLAYER_WIDTH, PLAYER_HEIGHT,bulletType(), player.x + player.width, player.y, 'image')
        bullet.push(bullet1);
        GameArea.score -= 2;
        order = false;
        // }
    }
    for( let i=0; i<bullet.length; i++){
        bullet[i].speedX = 3;
        bullet[i].newPosition();
        bullet[i].update();
    }
    for( let i=0; i<flappy_Bird.length; i++) {
        flappy_Bird[i].speedX = -2;
        flappy_Bird[i].newPosition();
        flappy_Bird[i].update();
    }
    for(let i=0; i<obstacles.length; i++){
        obstacles[i].speedX = -1;
        obstacles[i].newPosition();
        obstacles[i].update()
    }
    for(let i=0; i<obstacles.length; i++){
        if(player.x == obstacles[i].x+ obstacles[i].width){
            GameArea.score++
        }
    }
    myScore.text = 'SCORE: ' + GameArea.score/2;

    myScore.update();
    player.newPosition();
    player.update();



}
function obsAppearCondition(n){
    if((GameArea.frameNo/n) % 1 == 0 ) { return true};
    return false;
}
function moveUp() {
    player.speedY = -1;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'
}
function moveDown() {
    player.speedY = +1;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'
}
function moveLeft() {
    player.speedX = -1;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'

}
function moveRight() {
    player.speedX = +1;
    player.image.src ='https://i.imgur.com/BUrXyTb.png'
}
function moveUpKey() {
    player.y -= 3;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'
}
function moveDownKey() {
    player.y += 3;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'
}
function moveLeftKey() {
    player.x -= 3;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'

}
function moveRightKey() {
    player.x += 3;
    player.image.src ='https://i.imgur.com/BUrXyTb.png'
}
function clearMove() {
    player.speedX = 0;
    player.speedY = 0;
    player.image.src ='https://i.imgur.com/pNbhCD4.png'


};
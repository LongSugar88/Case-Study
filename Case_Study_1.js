
function startGame() {
    player = new Component(PLAYER_WIDTH, PLAYER_HEIGHT,'https://i.imgur.com/pNbhCD4.png', POSITION_X, POSITION_Y,'image');
    background = new Component(BACKGROUND_WIDTH, BACKGROUND_HEIGHT, './image/background.jpg', 0, 0, 'background');
    myScore = new Component('30px','Consolas','white', 480, 40,'text');
    highestSocre = new Component('30px','Consolas','white', 20, 40,'text');
    GameArea.start()
    updateGameArea()
    // GameArea.intervalTime()
}
let order = false;
function imperialOrder() {
    order = true;
    return order;
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
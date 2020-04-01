function updateGameArea(){
    let x, height, space, maxHeight, minHeight,maxSpace, minSpace;
    // timeOut = setTimeout(updateGameArea, timeUpdate);
    // for(let i=0; i<obstacles.length; i++){
    //     if(player.checkDivePoint(obstacles[i])){
    //         GameArea.stop();
    //         return
    //     }
    // }
    for(let j=0; j<flappy_Bird.length; j++) {
        if (player.checkDivePoint(flappy_Bird[j])) {
            flappy_Bird.splice(j,1);
            GameArea.score *= 0.5;
        }
    }
    function checkCollistion(objA,objB) {
        for (i=0; i<objA.length; i++){
            for(let j=0; j<objB.length; j++){
                if(objA[i].checkDivePoint(objB[j])){
                    objA.splice(i,1);
                    objB.splice(j,1);
                }
            }
        }
    }
    checkCollistion(bullet,obstacles);
    checkCollistion(bullet,flappy_Bird);
    GameArea.clear();
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
    function flappyType() {
        let image ='';
        switch (randomNumber(6,1)) {
            case 1:
                image = 'https://media3.giphy.com/media/ly11KJIWG310Q/source.gif';
                break;
            case 2:
                image = './image/flappy_1.png';
                break;
            case 3:
                image = './image/flappy_2.png';
                break;
            case 4:
                image = './image/flappy_3.png';
                break;
            case 5:
                image = './image/flappy_4.png';
                break;
            case 6:
                image = './image/flappy_5.png';
                break;
        }
        return image;
    }
    if(GameArea.frameNo == 1 || obsAppearCondition()){
        x = GameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minSpace = 80;
        maxSpace = 200;
        space = Math.floor(Math.random()*(maxSpace-minSpace+1)+minSpace);
        flappy_Width = randomNumber(70,20)
        flappy_Y = randomNumber(height+flappy_Width,height+space-flappy_Width);
        let obstacle1 = new Component(30, height, 'https://i.imgur.com/6D49450.png' , x, 0, 'image');
        let obstacle2 = new Component(30,x - height - space,'https://i.imgur.com/6D49450.png', x, height+space, 'image' );
        let flappyBird = new Component(flappy_Width,flappy_Width,flappyType(), x,flappy_Y, 'image' );
        obstacles.push(obstacle1);
        obstacles.push(obstacle2);
        obstaclesInvisible.push(obstacle1);
        flappy_Bird.push(flappyBird);
    }
    if(order && GameArea.score > 3){
        let bullet1 = new Component(PLAYER_WIDTH, PLAYER_HEIGHT,bulletType(), player.x + player.width, player.y, 'image')
        bullet.push(bullet1);
        GameArea.score -= 1;
        order = false;
    }
    else {
        order = false
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
        if(GameArea.score >10){
            obstacles[i].speedX = -1-(GameArea.score-(GameArea.score%10))/10*0.2;
        } else {
            obstacles[i].speedX = -1;
        }
        obstacles[i].newPosition();
        obstacles[i].update()
    }
    let highesScore = localStorage.getItem('hightScore1');
    for(let i=0; i<obstaclesInvisible.length; i++){
        let distance = obstaclesInvisible[i].x + obstaclesInvisible[i].width - player.x - player.width;
        if(distance <= 2*obstaclesInvisible[i].width/3){
            GameArea.score += 1;
            obstaclesInvisible.splice(i,1);
            break;
        }
            if(GameArea.score <= 0){
                GameArea.score = 0;
            }
            if(GameArea.score > highesScore){
                highesScore = parseInt(GameArea.score);
                localStorage.setItem('hightScore1', parseInt(GameArea.score))
            }
    }
    myScore.text = 'SCORE: ' + GameArea.score.toFixed(1);
    highestSocre.text = 'HIGHEST SCORE : ' + Number(highesScore).toFixed(1);
    highestSocre.update();
    myScore.update();
    player.newPosition();
    player.update();
}
function obsAppearCondition() {
    let distanceObs = GameArea.canvas.width - obstacles[obstacles.length-1].x;
    if(distanceObs >= 200){
        return true;
    } else {
        return false;
    }
}

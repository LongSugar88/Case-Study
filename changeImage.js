function bulletType() {
    let image = "";
    switch (randomNumber(10,1)) {
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
        case 7:
            image = './image/bullet_flappy_7.png' //Bullet 4
            break;
        case 8:
            image = './image/bullet_flappy_8.png' //Bullet 4
            break;
        case 9:
            image = './image/bullet_flappy_9.png' //Bullet 4
            break;
        case 10:
            image = './image/bullet_flappy_10.png' //Bullet 4
            break;
    }
    return image;
}
function flappyType() {
    let image ='';
    switch (randomNumber(9,1)) {
        case 1:
            image = './image/flappy_6.gif';
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
        case 7:
            image = './image/flappy_7.png';
            break;
        case 8:
            image = './image/flappy_8.png';
            break;
        case 9:
            image = './image/flappy_9.png';
            break;
    }
    return image;
}
function randomNumber(max, min) {
    let random = Math.floor(Math.random()*(max-min+1)+min);
    return random
}
// function Sound(src) {
//     this.sound = document.getElementById("sound");
//     this.sound.src = src;
//     this.sound.setAttribute("preload", "auto");
//     this.sound.setAttribute("controls", "none");
//     this.sound.style.display = "none";
//     this.play = function(){
//         this.sound.play();
//     }
//     this.stop = function(){
//         this.sound.pause();
//     }
// }
let GameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        this.canvas.width = GAME_AREA_WIDTH;
        this.canvas.height = GAME_AREA_HEIGHT;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.score = 0;
        // this.interval = setInterval(updateGameArea, 20)
    },
    // intervalTime: function(){
    //     this.interval = setInterval(updateGameArea, 20)
    // },
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    // stop: function() {
    //     clearInterval(this.interval);
    // },
    stop: function () {
        clearTimeout(timeUpdate);
    },
};
function changeKey(){
    if(key){
        key = false;
        console.log('change true to false ' +key);
        return key;
    } else {
        key = true;
        console.log('change false to true ' +key);
        return key;
    }
};
function changeKeyAudio(){
    if(keyAudio){
        keyAudio = false;
        console.log('change true to false ' +key);
        return keyAudio;
    } else {
        keyAudio = true;
        console.log('change false to true ' +key);
        return keyAudio;
    }
};
function pauseGame() {
    if(key){
        console.log('true stop game ' +key);
        // clearInterval(GameArea.interval);
        clearTimeout(timeUpdate)
        return;
    } else {
        console.log('false resume game ' + key);
        // setTimeout(GameArea.intervalTime, 1);
        updateGameArea()
        return;
    }
};
function pauseMusic() {
    if(keyAudio){
        console.log('true play music ' +key);
        // clearInterval(GameArea.interval);
        musicTheme.mute()
        return;
    } else {
        console.log('false stop music ' + key);
        // setTimeout(GameArea.intervalTime, 1);

        musicTheme.play()
        return;
    }
};
let GameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        this.canvas.width = GAME_AREA_WIDTH;
        this.canvas.height = GAME_AREA_HEIGHT;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.score = 0;
        this.interval = setInterval(updateGameArea, 20)
    },
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
};
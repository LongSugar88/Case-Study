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
    this.setSpeedX = function (m) {
        this.speedX = m*this.speedX;
        return this.speedX;
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
    this.newPosition = function(){ // không hoạt động
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
};


var speed;
var y;
var yVelocity;
var onGround;

var score;

var horaizon;
var obstacles = [];

function setup(){
    createCanvas(600, 200);
    textAlign(CENTER);

    horaizon = height - 40;
    y = 20;
    score = 0;
    yVelocity = 0;
    speed = 4;
    onGround = false;
}




function draw() {
    background(51);

    /*draw horaizon*/
    stroke(255);
    line(0, horaizon, width, horaizon);

    
    fill ('#999999'); 
    ellipse(40, y, 40);


    if(frameCount % 120 === 0) {
        speed *= 1.1;
        
        
    }

    if (frameCount % 45 === 0)
        if(random(0, 1) > 0.3) {
            newObstacles();
        }

    score++;
    textSize(20);
    text("Score: " + score, width / 2, 30);
    
    updateObstacles();
    handleTRex();
}



/* Obstacles update-------------------------------------- */

function updateObstacles() {
    for (var i = obstacles.length - 1; i >= 0; i--) {
        
        obstacles[i].x -= speed;

        var x = obstacles[i].x;
        var size = obstacles[i].size;
        var s2 = size / 2;
        
        if(x > -30) {
            /*if its onscreen*/
            rect(x, horaizon -  size, size, size);
            var x1 = x + s2;
            var y1 = horaizon - s2;

            if(dist(x1, y1, 40, y) < s2 + 20) {
                
                /* collision detect */
                textSize(40);
                text("GAME OVER", width / 2, height / 2);
                textSize(20);
                text("Press f5 to restart", width / 2, height / 2 + 40);
                noLoop();
            }

        }else{
            /* delete form array */
            obstacles.splice(i, 1);
        }
    }
}




function newObstacles() {

    
    var obs = new Obstacle(random(20, 40), null);

    obstacles.push(obs);
}



/*function to handel TRex -------------------------------------- */

function handleTRex() {

    if (y + 20 +yVelocity <  horaizon) {

        console.log("flag");

        yVelocity += 0.6;
        onGround = false;
    }else {
        onGround = true;
        yVelocity = 0;
    }



    if (mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) {

            if(onGround) {

                yVelocity -= 10;

                onGround = false;
            }

    }

    
    /* Movement*/
    y+= yVelocity;

}
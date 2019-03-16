const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
/* "<canvas>" tag is used to draw graphics, 
but this element has no drawing abilities of its own.
getContext("2d") object, which can be used to draw text, lines, boxes, circles, and more - on the canvas.*/

const box = 32;
//unit created.

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";
//image has loded.

let snake = [];
snake[0] = {x : 9*box, 
		y : 10*box}; //it points the snake head.
//snake has created

food = {x : Math.floor(Math.random()*17+1)*box,
	 	y : Math.floor(Math.random()*15+3)*box}
/*food has created
math.floor  returns the largest integer
less than or equal to a given number.*/

let score = 0;
//score has created

document.addEventListener("keydown",direction);
//take the given input directon.

let d;
//for direction input.

function direction(event){
	if(event.keyCode == 37 && d != "RIGHT"){
		d="LEFT";
	}
	else if(event.keyCode == 38 && d != "DOWN"){
		d="UP";
	}
	else if(event.keyCode == 39 && d != "LEFT"){
		d="RIGHT";
	}
	else if(event.keyCode == 40 && d != "UP"){
		d="DOWN";
	}
}
/* event objects (like MouseEvent and KeyboardEvent) 
has access to the Event Object's properties and methods.*/

function collision(head,array){
	for(let i = 0; i < array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}
/*this functon will return true if snake's head hit himself*/

function draw(){
	ctx.drawImage(ground,0,0);

	for(let i=0; i<snake.length; i++){
		ctx.fillStyle = (i == 0)? "green" : "white"; 
		/*The fillStyle property sets or returns
		the color, gradient, or pattern used to fill the drawing.*/

		ctx.fillRect(snake[i].x,snake[i].y,box,box);
		/*The fillRect() method draws a "filled" rectangle.*/

		ctx.strokeStyle = "red";
		//The strokeStyle property sets or returns the color, gradient, or pattern used for strokes.
		ctx.strokeRect(snake[i].x,snake[i].y,box,box);
		//The strokeRect() method draws a rectangle (no fill).	
	}
	ctx.drawImage(foodImg, food.x, food.y);
	//the food position has been drown.

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	/*old head position*/

	if(d ==	"LEFT") snakeX -= box;
	if(d ==	"UP") snakeY -= box;
	if(d ==	"RIGHT") snakeX += box;
	if(d ==	"DOWN") snakeY += box;
	/*points the snake head*/

	if(snakeX == food.x && snakeY == food.y){
		score++;
		food = {x : Math.floor(Math.random()*17+1)*box,
	 		y : Math.floor(Math.random()*15+3)*box}
	 	/*score will gonna increase after consuming food,
	 	 and new food position is going to generate new position.*/
	}
	else{
		snake.pop();
		/*snake tale has removed*/
	}

	let newHead = {
		x : snakeX,
		y : snakeY
	}
	/*add new head*/

	if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
		clearInterval(game);
	}
	/*it will stop the game if the condition is true.*/

	snake.unshift(newHead);
	/*"unshift" will add the elements beginning of the snake array*/


	ctx.fillStyle = "yellow";
	ctx.font = "40px Celtic";
	ctx.fillText(score, 2*box, 1.6*box);
	/*for score update.*/
}
let game = setInterval(draw,100);
//it will call draw function every 100ms.

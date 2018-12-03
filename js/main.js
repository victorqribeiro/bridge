let background, canvas, c, w, h, w2, h2, elements, boat, farmer, wolf, goat, cabbage, moves = 0, textures;

function init(){
	canvas = document.createElement('canvas');
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	w4 = w/4;
	h4 = h/4;
	canvas.addEventListener('click', getElement );
	
	c = canvas.getContext('2d');
	
	document.body.appendChild(canvas);

	c.shadowColor = 'rgba(0,0,0,0.5)';
	c.shadowBlur = 50;

	background = c.createLinearGradient(0,0,w,0);
	background.addColorStop(0,'green');
	background.addColorStop(0.2,'green');
	background.addColorStop(0.27,'#654321');
	background.addColorStop(0.3,'blue');
	background.addColorStop(0.5,'#00BFFF');
	background.addColorStop(0.7,'blue');
	background.addColorStop(0.73,'#654321');
	background.addColorStop(0.8,'green');
	background.addColorStop(1,'green');
	c.fillStyle = background;
	
	elements = [];

	farmer = new Passenger(textures['img/farmer.png'],w2,h2,'farmer',0,true);
	
	wolf = new Passenger(textures['img/wolf.png'],w2,h2,'wolf',1);
	
	goat = new Passenger(textures['img/goat.png'],w2,h2,'goat',2);
	
	cabbage = new Passenger(textures['img/cabbage.png'],w2,h2,'cabbage',3);

	boat = new Boat(textures['img/boat.png']); 

	elements.push( boat );
	elements.push( farmer );
	elements.push( wolf );
	elements.push( goat );
	elements.push( cabbage );

	draw();
}

function draw(){
	c.fillRect(0,0,w,h);
	for(let i = 0; i < elements.length; i++){
		elements[i].show();
	}
	check();
}

function check(){
	if( farmer.side == 2 && (wolf.side == 0 && goat.side == 0) ||
			farmer.side == 1 && (wolf.side == 3 && goat.side == 3) ||
			farmer.side == 2 && (goat.side == 0 && cabbage.side == 0) ||
			farmer.side == 1 && (goat.side == 3 && cabbage.side == 3 )
	){
		gameOver('You Lose');
	}
	if( farmer.side == 3 && wolf.side == 3 && goat.side == 3 && cabbage.side == 3){
		gameOver('You Win');
	}
}

let getElement = function(e){
	let x = e.clientX, y = e.clientY;
	let found = null;
	for(let i = 0; i < elements.length; i++){
		let e = elements[i];
		if( x > e.pos.x && x < e.pos.x + e.w &&
				y > e.pos.y && y < e.pos.y + e.h ){
			found = e;
		}
	}
	if(found){
		found.action();
	}
	draw();
	moves+=1;
}

function gameOver(result){
	canvas.removeEventListener('click', getElement);
	setTimeout( function(){
		canvas.addEventListener('click', function(){
			history.go(0);
		});
	}, 1500);
	c.fillStyle = "black";
	c.font = "3rem Arial";
	c.fillText(result, (w-c.measureText(result).width)/2, 100);
}

function loadImages(){
	let total = 0;
	imgSrc = ['img/farmer.png','img/wolf.png','img/goat.png','img/cabbage.png','img/boat.png'];
	textures = {};
	for(name of imgSrc){
		textures[name] = new Image();
		textures[name].src = name;
		textures[name].onload = function(){
			total++;
			if( total == imgSrc.length )
				init();
		}
	}
}

loadImages();

window.onresize = function(){
	history.go(0);
};

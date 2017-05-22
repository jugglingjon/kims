var items = [
	{
		name: "Sunglasses",
		x: 4,
		y: 2
	},
	{
		name: "Card",
		x: 2,
		y: 3
	},
	{
		name: "Pencil",
		x: 1,
		y: 4
	},
	{
		name: "Rock",
		x: 2,
		y: 2
	},
	{
		name: "Battery",
		x: 1,
		y: 2
	},
	{
		name: "Clippers",
		x: 1,
		y: 2
	},
	{
		name: "Nail",
		x: 1,
		y: 2
	},
	{
		name: "Army",
		x: 1,
		y: 2
	},
	{
		name: "Screw",
		x: 1,
		y: 2
	},
	{
		name: "Coin",
		x: 1,
		y: 1
	},
	{
		name: "Grape",
		x: 1,
		y: 1
	},
	{
		name: "Mint",
		x: 1,
		y: 1
	}
];

function randomColor() {
	var colors = [
		"red",
		"blue",
		"green",
		"orange",
		"purple",
		"grey",
		"brown",
		"yellow"
	];
	return colors[Math.floor(Math.random() * colors.length)];
}



var $scale = 100;
var $areaX = 10;
var $areaY = 7;
var $exclusion=[];

//returns pixels from grid coord
function gridToPixels(grid) {
	return grid * $scale;
}

function randomGrid(size, max) {
	var tempMax = max - size;
	return Math.floor(Math.random() * tempMax);
}

var newItem = function(name, x, y) {
	var randomRotate=Math.random()*50-25;
	return $(`<div class="block block-${x}x block-${y}y" style="background-image: url('objects/${name}.png');transform:rotate(${randomRotate}deg);"></div>`);
};

function exclusionTest(candidateX,candidateY,width,height){
	for(x=0;x<width;x++){
		var currentX=candidateX+x;
		for(y=0;y<height;y++){
			var currentY=candidateY+y;
			console.log('******TESTING: '+currentX+'-'+currentY);
			if($exclusion.includes(currentX+'-'+currentY)){
				return false;
			}
			else{

			}
		};
		
	}
	return true;
}

function addExclusion(candidateX,candidateY,width,height){
	for(x=0;x<width;x++){
		var currentX=candidateX+x;
		for(y=0;y<height;y++){
			var currentY=candidateY+y;
			$exclusion.push(currentX+'-'+currentY);
			console.log('***EXCLUDING: '+currentX+'-'+currentY);
		};
	}
}

var attempt=0;
$(document).ready(function() {
	$('.grid').css({'width':$areaX*$scale+'px','height':$areaY*$scale+'px'})
	$.each(items, function() {
		console.log('\n\nPLACING '+this.name+'\n===================');
		var add,candidateX,candidateY;
		add = newItem(this.name, this.x, this.y);
		console.log($exclusion);
		do{		
			candidateX=randomGrid(this.x, $areaX);
			candidateY=randomGrid(this.y, $areaY);
			console.log('ATTEMPT: '+candidateX+'-'+candidateY);
			attempt++;
		}
		while(!exclusionTest(candidateX,candidateY,this.x,this.y)&&attempt<=50);
		console.log('***SUCCESS: '+candidateX+'-'+candidateY);
		addExclusion(candidateX,candidateY,this.x,this.y);
			  
		add.css({left: gridToPixels(candidateX) + "px",top: gridToPixels(candidateY) + "px"});
		$(".grid").append(add);
		
			
	});
	$('.grid').animate({'opacity':'1'},3000);
		

});

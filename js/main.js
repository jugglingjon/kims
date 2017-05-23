var items = [
	{
		name: "Sunglasses",
		x: 4,
		y: 2,
		questions:[
			{
				question:'What color were the %?',
				distractors:[
					'Green',
					'Blue',
					'Red'
				],
				answer:'Black'
			},
			{
				question:'What brand were the %?',
				distractors:[
					'Michael Kohrs',
					'Oakley',
					'Under Armour'
				],
				answer:'Ray Ban'
			}
		]
	},
	{
		name: "Card",
		x: 2,
		y: 3,
		questions:[
			{
				question:'What suit was the %?',
				distractors:[
					'Clubs',
					'Spades',
					'Diamonds'
				],
				answer:'Hearts'
			},
			{
				question:'What card was the %?',
				distractors:[
					'Ace',
					'King',
					'Jack'
				],
				answer:'Queen'
			}
		]
	},
	{
		name: "Pencil",
		x: 1,
		y: 4,
		questions:[
			{
				question:'Did the % have an eraser?',
				distractors:[
					'No'
				],
				answer:'Yes'
			}
		]
	},
	{
		name: "Rock",
		x: 2,
		y: 2,
		questions:[
			{
				question:'What color was the %?',
				distractors:[
					'Black',
					'Red',
					'Brown'
				],
				answer:'Gray'
			}
		]
	},
	{
		name: "Battery",
		x: 1,
		y: 2,
		questions:[
			{
				question:'What brand was the %?',
				distractors:[
					'Rayovac',
					'Energizer',
					'Panasonic'
				],
				answer:'Duracell'
			},
			{
				question:'What type was the %?',
				distractors:[
					'9 Volt',
					'C',
					'AAA'
				],
				answer:'AA'
			}
		]
	},
	{
		name: "Clippers",
		x: 1,
		y: 2,
		questions:[
			{
				question:'What material was the %?',
				distractors:[
					'Wood',
					'Plastic'
				],
				answer:'Chrome'
			}
		]
	},
	{
		name: "Nail",
		x: 1,
		y: 2,
		questions:[
			{
				question:'The head of the % was:',
				distractors:[
					'Square'
				],
				answer:'Round'
			}
		]
	},
	{
		name: "Army Man",
		x: 1,
		y: 2,
		questions:[
			{
				question:'What color was the %?',
				distractors:[
					'Brown',
					'Blue',
					'Red'
				],
				answer:'Green'
			},
			{
				question:'Which arm did the % have raised?',
				distractors:[
					'Left'
				],
				answer:'Right'
			},
			{
				question:'The % was:',
				distractors:[
					'Kneeling'
				],
				answer:'Standing'
			}
		]
	},
	{
		name: "Screw",
		x: 1,
		y: 2,
		questions:[
			{
				question:'What type was the %?',
				distractors:[
					'Flathead',
					'Hexagonal'
				],
				answer:'Phillips'
			},
			{
				question:'What type was the %?',
				distractors:[
					'Metal Screw (blunt tip)'
				],
				answer:'Wood Screw (pointed tip)'
			}
		]
	},
	{
		name: "Coin",
		x: 1,
		y: 1,
		questions:[
			{
				question:'What denomination was the %?',
				distractors:[
					'Quarter',
					'Dime',
					'Nickel'
				],
				answer:'Penny'
			},
			{
				question:'What president was on the %?',
				distractors:[
					'Washington',
					'FDR',
					'Jefferson'
				],
				answer:'Lincoln'
			},
			{
				question:'What year was the %?',
				distractors:[
					'2004',
					'2014',
					'2015'
				],
				answer:'2005'
			},
			{
				question:'What is engraved on the left side of the %?',
				distractors:[
					'In God We Trust',
					'Commerce',
					'Freedom'
				],
				answer:'Liberty'
			},
			{
				question:'What is engraved on the top of the %?',
				distractors:[
					'Sic Semper Tyrannis',
					'Land of the Free',
					'United States'
				],
				answer:'In God We Trust'
			}
		]
	},
	{
		name: "Grape",
		x: 1,
		y: 1,
		questions:[
			{
				question:'What color was the %?',
				distractors:[
					'Green',
					'Yellow'
				],
				answer:'Red'
			}
		]
	},
	{
		name: "Mint",
		x: 1,
		y: 1,
		questions:[
			{
				question:'What color was the %?',
				distractors:[
					'Green/White',
					'Blue/White',
					'Yellow/White'
				],
				answer:'Red/White'
			}
		]
	}
];

// ====================================
// 				^UTILITIES
// ====================================

//returns random color from list
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

//array shuffle function
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

//randomize jquery object children
$.fn.randomize = function(selector){
    (selector ? this.find(selector) : this).parent().each(function(){
        $(this).children(selector).sort(function(){
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};

//convert number to number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//converts spaces to dashes
function toDashes(text){
	return text.replace(' ','-');
}

//converts spaces to spaces
function toSpaces(text){
	return text.replace('-','');
}

// ====================================
// 				^GLOBALS
// ====================================

//global variables
var $scale = 100,
	$areaX = 10,
	$areaY = 7,
	$exclusion=[],
	$gameSet=[],
	$gameQuestions=[],
	$gameData=[],
	$viewTime=10000,
	$questionCount=0,
	$gameLength=10,
	$globalFadeTime=800,
	$gameCorrectCount=0,
	$gameScore=0,
	$correctScore=1,
	$currentScreen='screen-grid',
	$lastScreen='screen-grid';

// ====================================
// 				^SCREEN CONTROL
// ====================================



//changes to targeted screen
//callback object: {before:<callback before fadein begins>, after: <callback after faded in>}
function changeScreen(screenClass, callbackObj){
	
	//manage current and last screen variables
	$lastScreen=$currentScreen;
	$currentScreen=screenClass;

	var elementsToFade=$('.screen:not(.'+screenClass+')');
	var fadeCount=elementsToFade.length;

	elementsToFade.fadeOut($globalFadeTime, function(){
		if(--fadeCount>0) return;

		if(callbackObj&&callbackObj.before){
			callbackObj.before();
		}
		
		$('.'+screenClass).fadeIn($globalFadeTime,function(){
			if(callbackObj&&callbackObj.after){
				callbackObj.after();
			}
		});
	});
}


// ====================================
// 				^GRID
// ====================================

//returns pixels from grid coord
function gridToPixels(grid) {
	return grid * $scale;
}

//returns a random valid grid point based on size of object and maximum possible
function randomGrid(size, max) {
	var tempMax = max - size;
	return Math.floor(Math.random() * tempMax);
}

//generates a new item's markup with correct size, markup, and image
var newItem = function(name, x, y) {
	var randomRotate=Math.random()*50-25;
	return $(`<div class="block block-${x}x block-${y}y" style="background-image: url('objects/${toDashes(name.toLowerCase())}.png');transform:rotate(${randomRotate}deg);"></div>`);
};

// ====================================
// 				^EXCLUSION
// ====================================

//tests whether object and all grid coords it covers are currently occupied (false if collision)
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

//adds all object grid coords to exclusion array, if successfully placed
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

// ====================================
// 				^QUESTIONS
// ====================================

//clone game data for display at end
function cloneGameData(){
	$gameData.push($('.game-data').clone());
}

//game end
function endGame(){

	//render end screen
	$('.correct-score-count').text($gameCorrectCount);
	$('.correct-score-total').text($gameLength);
	
	//append game data to history div
	$('.end-history').empty();
	$.each($gameData,function(){
		this.appendTo('.end-history');
	});

	//nav to end screen and start flickity when shown
	changeScreen('screen-end',{
		after:function(){
			$('.end-history').flickity({
				prevNextButtons: false,
				pageDots: false
			});

			$('.end-history').animate({opacity:'1'});
		}
	});
}

//advance game to next question or end
function advanceGame(){
	//after delay, save answer data for later display, reset and proceed
	cloneGameData();
	$('.screen-game').fadeOut($globalFadeTime,function(){
		
		//after faded out, clean up game screen for next question
		$('.game-answers').removeClass('clicked');
		$('.game-question-wrapper').show();

		if($questionCount<($gameLength-1)){
			$questionCount++;
			askQuestion($questionCount);
		}
		else{
			endGame();
		}
		
	});
}


function askQuestion(index){
	var currentQuestion=$gameQuestions[index];

	//populate question text
	$('.game-question').text(currentQuestion.question);

	//clear answer space and populate with answers
	$('.game-answers').empty();
	
	//append distractors
	$.each(currentQuestion.distractors,function(){
		var newAnswer=$('<a href="#" class="answer"><span class="answer-text">'+this+'</span></a>');
		if(this.correct){
			newAnswer.addClass('correct');
		}
		newAnswer.appendTo('.game-answers');
	});
	
	//append correct answer
	var newAnswer=$('<a href="#" class="answer correct"><span class="answer-text">'+currentQuestion.answer+'</span></a>');
	newAnswer.appendTo('.game-answers');
	$('.game-answers').randomize('.answer');

	//set dot colors
	// $('.game-progress-dot').removeClass('current past').eq(question).addClass('current');
	// $('.game-progress-dot:lt('+question+')').addClass('past');

	//fade in game screen, and begin timer
	$('.screen-game').fadeIn($globalFadeTime,function(){
		
		//startQuestionTimer();

		//when answer clicked
		$('.answer').click(function(){
			
			//add clicked classes for colors
			$(this).addClass('clicked');
			$('.game-answers').addClass('clicked');

			//freeze answer screen: stop timers, disable click handler, stop animations
			//clearInterval($textTimer);
			$('.answer').off('click');
			//var answerTime=reportQuestionTimer();
			//window.clearTimeout($questionTimer);
			//$('.game-timer-bar-inner').stop();
			
			//if correct, calculate score bonus
			if($(this).hasClass('correct')){			

				//iterate correct count
				$gameCorrectCount++;

				//add correct score bonus
				$gameScore+=$correctScore;

				//add time bonus
				// var answerBonus=0;
				// if(answerTime<=$bonusBuffer){
				// 	answerBonus=$bonusScore;
				// }
				// else if(answerTime>$bonusBuffer&&answerTime<=$questionTime){
				// 	answerBonus=Math.floor(((($questionTime-$bonusBuffer)-(answerTime-$bonusBuffer))/($questionTime-$bonusBuffer))*$bonusScore);	
				// }
				// $gameBonusScore+=answerBonus;

				//if answered fast, add to count
				// if(answerTime<$fastAnswerTime){
				// 	$gameFastAnswers++;
				// }

				//mark correct in data, and update local
				//currentQuestion.complete=true;
				//updateLocalData();
			}
			else{
				//incorrect response
			}

			advanceGame();
		});
	});
}

function initQuestions(){
	$.each($gameSet,function(){
		var current=this;
		$.each(this.questions,function(){
			this.question=this.question.replace('%',current.name);
			$gameQuestions.push(this);
		});
		
	});

	shuffle($gameQuestions);
	console.log($gameQuestions);
	// for(i=0;i<5;i++){
	// 	$('body').append($(`<p>${i+1}. ${$gameQuestions[i].question}</p>`));
	// }

	askQuestion($questionCount);
}


// ====================================
// 				^GRID PACKING
// ====================================

function fillGrid(){

	//reset game data
	$gameCorrectCount=0;
	$gameScore=0;
	$exclusion=[];
	$gameSet=[];
	$gameQuestions=[];
	$gameData=[],
	$('.grid').empty();

	//initialize grid to global size and scale
	$('.grid').css({'width':$areaX*$scale+'px','height':$areaY*$scale+'px'})

	//for each item:
	$.each(items, function() {


		console.log('\n\nPLACING '+this.name+'\n===================');
		var add,candidateX,candidateY;
		add = newItem(this.name, this.x, this.y);
		console.log($exclusion);
		
		//attempt to plot item on random grid points, repeat until exclusion tests passes (or 50 attempts)
		do{		
			candidateX=randomGrid(this.x, $areaX);
			candidateY=randomGrid(this.y, $areaY);
			console.log('ATTEMPT: '+candidateX+'-'+candidateY);
			attempt++;
		}
		while(!exclusionTest(candidateX,candidateY,this.x,this.y)&&attempt<50);

		//if attempt limit reached, fail and skip, else place
		if(attempt===50){
			console.log('FAILURE PLACING '+this.name+'\n===================');
		}
		else{
			console.log('***SUCCESS: '+candidateX+'-'+candidateY);
			addExclusion(candidateX,candidateY,this.x,this.y);		  
			add.css({left: gridToPixels(candidateX) + "px",top: gridToPixels(candidateY) + "px"});
			$(".grid").append(add);
			$gameSet.push(this);
		}
		attempt=0;		
			
	});



	//animate filled grid in
	$('.grid').animate({'opacity':'1'},3000,function(){
		changeScreen('screen-game',{before:initQuestions,after:function(){
			$('.grid').css('opacity','0');
		}});
	});
}

// ====================================
// 				^EVENTS
// ====================================

//try again button, restart game
$('body').on('click','.btn-restart',function(){
	changeScreen('screen-grid',{before:function(){
		$('.end-history').flickity('destroy').empty().css('opacity','0');
		fillGrid();
	}});
});

var attempt=0;
$(document).ready(function() {

	fillGrid();
		

});

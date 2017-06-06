var items;

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

//scale element to size
$.fn.scaleTo = function(target){
    var widthPercent=1-(this.width()/$(target).width())+1;
    this.css('transform','scale('+widthPercent+')');
};

// ====================================
// 				^GLOBALS
// ====================================

//global variables
var $scale = 100,
	$areaX = 10,
	$areaY = 7,
	$startTime,
	$viewTimer,
	$exclusion=[],
	$gameSet=[],
	$gameQuestions=[],
	$gameData=[],
	$viewTime=30000,
	$count=3,
	$countdown,
	$itemCount=10,
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
// 				^TIMER
// ====================================

//Timer functions
function startViewTimer(){
	//save current time
	$startTime=Date.now();

	//reset timer bar position and begin animation
	$('.game-timer-bar-inner').animate({
		width:'0%'
	},$viewTime,'linear');

	//after question time expires
	$viewTimer=setTimeout(function(){
		changeScreen('screen-game',{before:initQuestions,after:function(){
			$('.grid').css('opacity','0');
		}});
	},$viewTime);

}

//returns current timer number in ms
function reportViewTimer(){
	var elapsedTime=Date.now()-$startTime;
	return elapsedTime;
}

function countdown(callback){
	var currentCount=$count;
	$('.count').show();

	$countdown=setInterval(function(){
	  if(currentCount>=1){
	    $('.count .number').text(currentCount).show().fadeOut(900);
	    currentCount--;
	  }
	  else{
	  	$('.count').hide();
	    clearInterval($countdown);
	    callback();
	  }
	},1000);
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
	var tempMax = max - size + 1;
	return Math.floor(Math.random() * tempMax);
}

//generates a new item's markup with correct size, markup, and image
var newItem = function(name, filename, x, y) {
	var randomRotate=Math.random()*20-10;
	return $(`<div class="block block-${x}x block-${y}y" style="background-image: url('objects/${filename}.png');transform:rotate(${randomRotate}deg);"></div>`);
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
			console.log('******EXCLUDING: '+currentX+'-'+currentY);
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
		before:function(){
			$('.btn-quit').fadeOut($globalFadeTime);
		},
		after:function(){
			$('.end-history').flickity({
				prevNextButtons: false,
				pageDots: false
			});

			$('.end-history').animate({opacity:'1'});

			$('.grid').css('opacity','1');
			$('.screen-grid').fadeIn($globalFadeTime);
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

	//update quesiton count
	$('.game-count .count-current').text(index+1);
	$('.game-count .count-total').text($gameLength);

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
	$('.game-progress-dot').removeClass('current past').eq(index).addClass('current');
	$('.game-progress-dot:lt('+index+')').addClass('past');

	//fade in game screen, and begin timer
	$('.screen-game').fadeIn($globalFadeTime,function(){
		
		//$('.answer').cascadeIn('fadeInUp',500,100);

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
	
	//setup game dots
	$('.game-progress-dots').empty();
	for(var i=0;i<$gameLength;i++){
		$('.game-progress-dots').append($('<div class="game-progress-dot"></div>'));
	}

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
	$gameData=[];
	$questionCount=0;
	$('.grid').empty();
	$('.game-timer-bar-inner').css('width','100%');

	//initialize grid to global size and scale
	$('.grid').css({'width':$areaX*$scale+'px','height':$areaY*$scale+'px'});
	$('.grid').scaleTo('body');

	var shuffledSet=items;
	shuffle(shuffledSet);

	//list of conflicts, and current item count as added
	var conflictList=[],
		currentCount=0;

	//for each item:
	$.each(shuffledSet,function(){

		//if under current item limit, and item not in conflict list
		if(currentCount<$itemCount && conflictList.indexOf(this.conflict)===-1){

			console.log('\n\nPLACING '+this.name+'\n===================');
			var add,candidateX,candidateY;
			add = newItem(this.name,this.filename, this.x, this.y);
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
				
				//if conflicty, add to list. iterate count
				if(this.conflict)conflictList.push(this.conflict);
				currentCount++;
			}
			attempt=0;	
		}	
			
	});

	$('.btn-quit').fadeIn($globalFadeTime);
	//animate filled grid in
	countdown(function(){
		$('.grid').animate({'opacity':'1'},$globalFadeTime,function(){
			
			startViewTimer();
		});
	});
	
}

// ====================================
// 				^EVENTS
// ====================================

//try again button, restart game
$('body').on('click','.btn-restart',function(){
	$('.screen-grid').fadeOut(function(){
		$('.grid').css('opacity','0');

		changeScreen('screen-grid',{
			before:function(){
				$('.end-history').flickity('destroy').empty().css('opacity','0');
				fillGrid();
			},
			after:function(){
				$('.btn-summaryToggle').removeClass('peeking');
				$('.end-history-wrapper').css({'opacity':'1'});
			}
		});
	})
	
});

//change difficulty button
$('body').on('click','.btn-change',function(){
	$('.screen-grid').fadeOut(function(){
		$('.grid').css('opacity','0');

		changeScreen('screen-difficulty',{
			before:function(){
				$('.end-history').flickity('destroy').empty().css('opacity','0');
			},
			after:function(){
				$('.btn-summaryToggle').removeClass('peeking');
				$('.end-history-wrapper').css({'opacity':'1'});
			}
		});
	})
	
});

//summary toggle button
$('body').on('click','.btn-summaryToggle',function(){
	$(this).toggleClass('peeking');

	if($(this).hasClass('peeking')){
		$('.end-history-wrapper').animate({'opacity':'0'},$globalFadeTime);
	}
	else{
		$('.end-history-wrapper').animate({'opacity':'1'},$globalFadeTime);
	}

	return false;
	
});

//splash screen dismissal
$('body').on('click','.splash',function(){
	
	$('.splash').fadeOut(function(){
		$('.difficulty-settings').fadeIn();
	});

	return false;
	
});

//quit game button
$('body').on('click','.btn-quit',function(){
	clearTimeout($viewTimer);
	
	clearInterval($countdown);
	changeScreen('screen-difficulty',{before:function(){
		$('.btn-quit').fadeOut($globalFadeTime);
	},after:function(){
		$('.game-timer-bar-inner').stop().css('width','100%');
		$('.grid').css('opacity','0');
	}});

	return false;
	
});



var attempt=0;
$(document).ready(function() {

	//implement fastclick
	FastClick.attach(document.body);
	
	$.getJSON('items.json',function(data){
		items=data;

		//begin game button
		$('body').on('click','.btn-begin',function(){
			$viewTime=$('[name=difficulty_set]:checked').attr('value')*1000;

			changeScreen('screen-grid',{after:fillGrid});
			return false;
		});
		
	});
});

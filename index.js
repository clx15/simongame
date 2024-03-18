let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameLevel = 0;
let gameStarted = false;


function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $('#' + randomChosenColor).addClass('flash')
    setTimeout(() => $('#' + randomChosenColor).removeClass("flash"), 100);
    const colorSound = new Audio("./sounds/"+randomChosenColor+".mp3");
    colorSound.play();
    gameLevel++;
    console.log(gameLevel);
    $('h1').text("Level "+gameLevel)
    
}


$('.btn').click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    const clickedSound = new Audio("./sounds/" + userChosenColor + ".mp3");
    clickedSound.play();
    $('#' + userChosenColor).addClass('pressed');
    setTimeout(() => $('#' + userChosenColor).removeClass("pressed"), 100);
    checkAnswer(userClickedPattern.length - 1); 
});

$(document).keypress(function(_event) {
    if ((_event.key === "a" || _event.key === "A") && (!gameStarted)) {
        gameStarted = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        $('body').addClass('game-over');
        setTimeout(() => $('body').removeClass("game-over"), 200)
        const wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
       
        startOver();
       
    }
}

function startOver(){
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false; 
    $('h1').text("Joewarida! Press A to restart.");
    
}


var buttonColours=["red", "blue", "green", "yellow"];    

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started = false;





function nextSequence()
{
    userClickedPattern=[];
    level++;  
    $("h1").html("Level "+level);
    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];   
    gamePattern.push(randomChosenColour);                                 
    $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var location="sounds/"+randomChosenColour+".mp3";
    var au=new Audio(location);
    au.play();
}




$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});




function playSound(name)
{
    var location="sounds/"+name+".mp3";
    var au=new Audio(location);
    au.play();   
}



function animatePress(currentColour)
{
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");  
},100);
}




$(document).keypress(function(){

    if(!started){
    $("h1").html("Level "+level);
    nextSequence();
    // alert("fazz");
    started=true;
    }
   
});

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}

function checkAnswer(currentLevel)
{
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
    console.log("Success");
    if(userClickedPattern.length===gamePattern.length)
    {
        setTimeout(function()  {
            nextSequence();
        }, 1000);    

    }
}
else
{
    console.log("Wrong");
    playSound("wrong");

    $("body").attr("class","game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").html("Game Over, Press Any Key to Restart");
   
    startOver()
}
}

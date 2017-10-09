//The front-facing api of the application; to avoid internal engine issues it is best to only use the listed functions to affect the gameState

//Setting the visible attribute like visable="gameState.planetHealth > 100" will cause the item to show if planetHealth is greater than 100
//Basically it follows the syntax viable="valid javascript expression"
engine = {};

//A few constants usable for affecting states
engine.constants = {
  MINOR: 1,
  MEDIUM: 10,
  LARGE: 20
}

document.addEventListener("DOMContentLoaded", function(event) {
    init(); //Define init() in your loader script outside of the engine
    core.dom.injectPage("app", './pages/0.html');
    core.dom.processVisible();
});


//Set the title; takes a string
engine.setTitle = function(title){
  core.dom.setElementTextById("title", title);
}

//Go next page; technically this injects the file into the page
engine.nextPage = function(){
  var page = gameState.currentPage;
  var nextPageId = page + 1;
  gameState.currentPage = nextPageId;
  var url = "./pages/" + nextPageId + ".html";
  core.dom.injectPage("app", url, function(){
    core.dom.processVisible();
  });
}

//Game states such as planet health; calling this will erase states that match the key. Takes an object such as {planetHealth: 100}
engine.setStates = function(states){
  for(var key in states){
    if (states.hasOwnProperty(key)) {
      gameState[key] = states[key];
    }
  }
}

//Play a sound effect; takes a filename
engine.playSound = function(filename){
  core.music.playSound(filename);
}

//Play music from music folder
engine.playMusic = function(){
  var filename = "0.mp3";
  core.music.playMusic(filename);
}

//Set a single state
engine.setState = function(state, value){
  gameState[state] = value;
}

//Reduce value of state
engine.reduceState = function(state, value){
  gameState[state] = gameState[state] - value;
}

//Increase value of state
engine.increaseState = function(state, value){
  gameState[state] = gameState[state] + value;
}

//Reset game to start
engine.reset = function(){
  gameState.currentPage = -1;
  engine.nextPage();
  if(gameState.sound){
    gameState.sound.pause();
  }
  if(gameState.music){
    gameState.music.pause();
  }
  init();
}

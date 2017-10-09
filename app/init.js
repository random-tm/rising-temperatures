function init(){
  var gameStates = {planetHealth: 100, musicCount: 1};
  engine.setStates(gameStates);
  engine.setTitle("Rising Temperatures");
  engine.playMusic();
}

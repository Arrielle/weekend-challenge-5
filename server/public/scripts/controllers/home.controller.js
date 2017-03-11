myApp.controller('HomeController',function() {
  console.log('home controller running');
 var self = this;
 self.message = 'Welcom to the Home View! From here there will be a brief introduction as to what this app will do!';


self.playerJoin = function(){
  console.log('Player Has Joined the Game!');
}//Adds a player to the playersArray

 self.gameStart = function(){
   console.log('Game is starting!');
 } //Initialized the game with the current playersArray.
});

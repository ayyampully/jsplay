var jsPlay = (function(){
	//Private stuffs
	var activePlayers = 0;
	var colorArray = ['red', 'green', 'blue', 'yellow'];
	var PlayerObj = {
		init: function(name, id, color){
			this.name = name;
			this.id = 'player-'+id;
			this.position = 0;
			this.forwardFlag = true;
			this.color = color;
		},
		setCurrentPosition: function(newPos){
			this.position = newPos
		},
		getCurrentPosition: function(){
			return this.position
		}
	};

	//Public stuffs
	var publicApi = {}

	
	publicApi.setStage = function(game){
		//TODO - setup the ui and call init
		popup(game)
	}

	publicApi.setPlayer = function(name){
		var player = Object.create(PlayerObj);
		activePlayers++;
		player.init(name,activePlayers,colorArray[activePlayers-1]);

		return player;
	}
	return publicApi;
})();

function popup(game){
	document.querySelector('.popup-wrap').style.display = 'block'
}

module.exports = jsPlay;
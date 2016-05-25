var jsPlay = require("../public/js/src/jsplay");
var assert = require("assert");
 
describe("setPlayer", function(){
	it("should create a player object", function(){
		var player = jsPlay.setPlayer("Player 1");
		assert.equal(typeof(player), 'object', "jsplay not creating object");
	})
	it("should create another player with green color", function(){
		var player = jsPlay.setPlayer("Player 2");
		assert.equal(player.color, 'green', "second player color has to be green");
	})
})
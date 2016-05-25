import Snake from './game';
import jsPlay from './jsplay';
(function(){

function addRipple(e){
	var target = e.currentTarget,
		elmWidth = target.offsetWidth,
		elmHeight = target.offsetHeight,
		rippleSide = elmWidth>elmHeight ? elmWidth : elmHeight,
		ripple = document.createElement('span');
	ripple.classList.add('ripple');
	ripple.style.width = (rippleSide)+'px';
	ripple.style.height = (rippleSide)+'px';
	ripple.style.left = (e.offsetX-(rippleSide/2))+'px';
	ripple.style.top = (e.offsetY-(rippleSide/2))+'px';
	e.currentTarget.appendChild(ripple);
	ripple.classList.add('play');
	setTimeout(()=>{
		target.removeChild(ripple)
	},300)
}
function AddEvent(el, evt, handler){
	var _el = document.querySelectorAll(el);
	[].forEach.call(_el, function(elm){
		elm.addEventListener(evt, handler);
	});
}

var flag = true;
AddEvent('.main-nav li', 'click', navHandler)
function navHandler(e){
		this.classList.add('active')
		addRipple(e);
}

AddEvent('.game-start', 'click', startGame)
AddEvent('.game-settings', 'click', saveSettings)
function startGame(e){
	var game = e.target.getAttribute('data-id');
	jsPlay.setStage(game);

}

function saveSettings(game){
	var players = [];
		players[0] = document.getElementById('player1').value;
		players[1] = document.getElementById('player2').value;

	var playerArry = players.map(function(name){
		var p = jsPlay.setPlayer(name);
		console.log(typeof(p))
		return jsPlay.setPlayer(name);
	})
	//var player = jsPlay.setPlayer(name);
	document.querySelector('.popup-wrap').style.display = 'none';
	document.querySelector('.body-wrap').classList.add('active-game');
	Snake.init(playerArry);
}
})();
var Snake = (function publicFunc(){
	
	//Private stuffs
	var boxSize = 70;
	var specials = [];
	var specialsCheck = []

	var UtilsFunc = {
		init: function(ctx){
			ctx.beginPath();
			ctx.font = "22px sans-serif";
			for (var i = 9; i >= 0; i--) {
				var newPos = (boxSize*(i));
				var isReverse = (i+1)%2;
				ctx.moveTo(newPos,0);
				ctx.lineTo(newPos,700);
				ctx.moveTo(0,newPos);
				ctx.lineTo(700,newPos);
				for(var j=9; j>=0; j--){
					var no = parseInt(i+''+j)+1,
						startPoint = isReverse?j+1:10-j,
						x = (boxSize*(startPoint)-50),
						y = (boxSize*(10-i)-25);
					ctx.fillText(no, x, y);
				}
			}
			ctx.stroke();
			this.draw(ctx, 98, 6, false)
			this.draw(ctx, 49,11, false)
			this.draw(ctx, 86,67, false)
			this.draw(ctx, 4, 38, true)
			//this.draw(ctx, 11, 30, true)
			this.draw(ctx, 26, 92, true)
			this.draw(ctx, 41, 62, true)
			this.draw(ctx, 77, 84, true)
		},
		createPlayer: function(playersArray){
			playersArray.forEach(function(player){
				var playerEl = document.createElement('span');//<span class="players" id="player-1"></span>
				playerEl.setAttribute('id',player.id);
				playerEl.setAttribute('class','players '+player.id);
				playerEl.style.background = player.color;
				document.getElementById('snakeLadder').appendChild(playerEl);
			})
		},
		draw: function(ctx, from, to, isLadder){
			
			var fromRow = (parseInt(from/10))+1,
				isFromReverse = fromRow%2 ? false:true,
				fromRowPos = isFromReverse ? (11-from%10) : from%10,
				fromX = (boxSize*fromRowPos) - (boxSize/2),
				fromY = 700 - ((fromRow)*boxSize);

			var toRow = (parseInt(to/10))+1,
				isToReverse = toRow%2 ? false : true,
				toRowPos = isToReverse ? (11-to%10) : to%10,
				toX = (boxSize*toRowPos) - (boxSize/2),
				toY = 700 - (toRow*boxSize);

			if(isLadder){
				ctx.beginPath();
				ctx.moveTo(Math.abs(fromX),Math.abs(fromY)+15);
			    ctx.lineTo(Math.abs(toX),Math.abs(toY)+55);
			    //var img = document.getElementById("lamp")
   				// var pat = ctx.createPattern(img, 'repeat');
   				 ctx.lineWidth = 20
				ctx.strokeStyle = '#CC7E1B'

			    ctx.stroke();
			    specialsCheck.push(from)
			    specials.push({
			    	type:'ladder',
			    	to
			    });
			}else{
				var grdSize = ((fromRow-toRow)/2)*boxSize,
					snakeCurve = grdSize;
				//snake body
				
				if((fromRow-toRow)<4){
					snakeCurve = 20
				}
				ctx.beginPath();
				fromX = fromX-10
				fromY = fromY+75
				ctx.moveTo(fromX+2,fromY-20);
				ctx.bezierCurveTo(fromX+5, fromY-25, fromX+10, fromY-25, fromX+17, fromY-25);
				ctx.bezierCurveTo(fromX+22, fromY-38, fromX+35, fromY-30, fromX+33, fromY-25);
				ctx.lineTo(fromX+33, fromY-22);
				//ctx.quadraticCurveTo(fromX, (toY-fromY), toX, toY+20)
				//ctx.bezierCurveTo(fromX+10, (toY)-25, fromX, (toY-fromY)*.4, fromX+18, fromY-10);
				ctx.quadraticCurveTo(fromX+5, (toY)*.95, toX, toY+20)
				ctx.bezierCurveTo(fromX+30, (toY), fromX, (toY) - snakeCurve, fromX+18, fromY-10);

				ctx.bezierCurveTo(fromX+3, fromY-10,  fromX-2, fromY-15, fromX+2, fromY-20);
				ctx.moveTo(fromX+1, fromY-15)
				ctx.quadraticCurveTo(fromX+1, fromY-13, fromX+15, fromY-18)
				var grd = ctx.createLinearGradient(0, 0, grdSize, grdSize)
				grd.addColorStop(0, "#85C226");
				grd.addColorStop(1, "#4B7706");
				ctx.fillStyle = grd
				ctx.fill();ctx.stroke();
				//snake eye
				ctx.beginPath();
				ctx.moveTo(fromX+20, fromY-22);
				ctx.bezierCurveTo(fromX+18, fromY-30, fromX+32, fromY-34, fromX+30, fromY-22);
				ctx.bezierCurveTo(fromX+32, fromY-18, fromX+18, fromY-18, fromX+20, fromY-22);
				ctx.fillStyle = "#ffffff"
				ctx.stroke();ctx.fill();
				ctx.beginPath();
				fromX = fromX+22
				fromY = fromY-24
				ctx.moveTo(fromX, fromY);
				ctx.fillStyle = "#000"
				ctx.bezierCurveTo(fromX-2, fromY-5, fromX+7, fromY-5, fromX+7, fromY);
				ctx.bezierCurveTo(fromX+7, fromY+5, fromX-2, fromY+5, fromX, fromY);
				ctx.fill();

				specialsCheck.push(from)
			    specials.push({
			    	type:'snake',
			    	to
			    })
			}
		},
		moveToStart: function(id){
			var player = document.getElementById(id)
			player.classList.add('active');
		},
		moveToPosition: function(player, moveCount){
			var playerId = document.getElementById(player.id)
			var sizeLocal = boxSize;
			for(let i = 1; i<=moveCount; i++){
				setTimeout(function(){
						
					var left = playerId.offsetLeft;
					var bottom = 662-(playerId.offsetTop);

					if(player.position%10==0 && left>boxSize*10){
						playerId.style.bottom = (boxSize+bottom) + 'px';
						player.forwardFlag = false
					} else if(player.position%10==0 && left<boxSize*2){
						playerId.style.bottom = (boxSize+bottom) + 'px';
						player.forwardFlag = true
					}else{
						if(!player.forwardFlag){sizeLocal = boxSize*-1}else{sizeLocal = boxSize}
						playerId.style.left = (sizeLocal+left) + 'px';
					}
					player.position++
					if(moveCount==i){
						var index = specialsCheck.indexOf(player.position);
						if(index != -1){
							var data = specials[index];
							this.specialMove(player, data);
						}
					}
				}.bind(this),i*300)
				
			}
		},
		specialMove: function(player, data){
			var playerId = document.getElementById(player.id),
				to = data.to,
				row = (parseInt(to/10))+1,
				isToReverse = row%2 ? false : true,
				toRowPos = isToReverse ? (11-to%10) : to%10;

			var left = (toRowPos*boxSize) + 15;
			var bottom = row*boxSize - (boxSize/2) - 20;
			setTimeout(function(){
				playerId.style.bottom = bottom + 'px';
				playerId.style.left = left + 'px';
				player.position = to;
				player.forwardFlag = !isToReverse
			},400)
		}
	}

	//Public
	var publicApi = {};
	publicApi.init = function(playersArray){
		var canvas = document.getElementById('snake'),
		    flag = true,
		    currentPlayer = 0,
			ctx = canvas.getContext('2d'),
			dice = document.querySelector('.dice');

		UtilsFunc.init(ctx);
		UtilsFunc.createPlayer(playersArray);
		dice.setAttribute('class','dice '+playersArray[0].color);
		dice.addEventListener('click', function (e) {
			if (flag) {
				//addRipple(e);
				flag = false;
				var move = this.rollDice(),
					player = playersArray[currentPlayer];
				
				dice.querySelector('label').innerHTML = move;

				this.moveDot(player, move);
				if((playersArray.length-1)===currentPlayer){
					currentPlayer = 0;
				}else{
					currentPlayer++;
				}
				dice.setAttribute('class','dice '+playersArray[currentPlayer].color);
				setTimeout(function () {
					flag = true;
				}, 500);
			}
		}.bind(this));
	}
	publicApi.rollDice = function(){
		return Math.floor((Math.random() * 6) +1);
	}
	publicApi.moveDot = function(player, moveCount){
		if(player.position===0 && moveCount!=1) {
			console.log(player.name+': Roll again!')
			return false;
		}
		if((player.position+moveCount)>100){
			console.log(player.name+': Reach exact finish!')
			return false;
		}
		if(player.position === 0){
			player.position = 1
			UtilsFunc.moveToStart(player.id);
		}else{
			UtilsFunc.moveToPosition(player, moveCount);
		}
		
		console.log(player)
	}
	
	return publicApi;
})();
module.exports = Snake;
UIPlayer = {

	building : document.getElementById('countBuilding'),
	army : document.getElementById('countArmy'),
	players : document.getElementById('players'),
	endTurn : document.getElementById('endTurn'),
	playerTurn : document.getElementById('playerTurn'),
	playerGold : document.getElementById('playerGold'),
	armyStats : document.getElementById('armyStats'),
	nickName : document.getElementById('nickName'),
	armyStatsImg : document.getElementById('armyStatsImg'),
	endTurnAudio : document.getElementById('endTurnAudio'),
	yourTurn : document.getElementById('yourTurn'),

	selectedObject : null,

	init : function()
	{
		this.endTurn.addEventListener('click', function(evt) {	     	
			GameEngine.sendNextTurn();	     	
    	}, false);

	},

	_getRow : function(key, value)
	{
		return "<div> " + key +" : " + value + "</div>"
	},

	setSelectedObject: function(object)
	{
		UIDynamic.setSelectedObject(object);
	},

	refreshUi: function(player)
	{
		this.nickName.innerHTML = player.name;
		this.players.innerHTML = "";
		for(var i = 0; i < GameEngine.Players.length; i++)
		{
			var obj = GameEngine.Players[i];

			this.players.innerHTML = this.players.innerHTML + " <div style='color: "+ obj.color +";' > " + i +" : " + obj.name + "</div>";	
		}
		
		this.building.innerHTML = player.building.length;
		this.army.innerHTML = player.army.length;
		this.yourTurn.style = "display: none";

		if(GameEngine.turnPlayer)
		{
			this.playerTurn.innerHTML =  "<span>" + GameEngine.turnPlayer.name + "</span>";				
		}
		if(GameEngine.turnPlayer == GameEngine.getControllPlayer())
		{
			this.yourTurn.style = "display: block";
		}

		this.playerGold.innerHTML =  GameEngine.getControllPlayer().gold;	
	},

	/*nextTurn: function(player)
	{
		if(player == GameEngine.getControllPlayer())
		{
			endTurnAudio.play();
		}
	}*/
};
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

	refreshPlayers: function()
	{
		var players = GameEngine.gameManager.getPlayers();

		this.players.innerHTML = "";

		for(var i = 0; i < players.length; i++)
		{
			var obj = players[i];

			this.players.innerHTML = this.players.innerHTML + " <div style='color: "+ obj.color +";' > " + i +" : " + obj.name + "</div>";	
		}
	},

	refreshTurn: function()
	{

	},

	refreshUi: function(player)
	{
		//this.nickName.innerHTML = player.name;

		//this.building.innerHTML = player.building.length;
		//this.army.innerHTML = player.army.length;
		//this.yourTurn.style = "display: none";

		if(GameEngine.gameManager.turnPlayer)
		{
		//	this.playerTurn.innerHTML =  "<span>" + GameEngine.gameManager.turnPlayer.name + "</span>";				
		}
		if(GameEngine.gameManager.turnPlayer == GameEngine.gameManager.getControllPlayer())
		{
		//	this.yourTurn.style = "display: block";
		}

		//this.playerGold.innerHTML =  GameEngine.gameManager.getControllPlayer().gold;	
	}
};
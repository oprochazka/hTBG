UIPlayer = {

	building : document.getElementById('countBuilding'),
	army : document.getElementById('countArmy'),
	players : document.getElementById('players'),
	endTurn : document.getElementById('endTurn'),

	init : function()
	{
		this.endTurn.addEventListener('click', function(evt) {	     	

	     	Client.sendActionMessage({type : "nextTurn", player : GameEngine.getControllPlayer().id}, GameEngine.getControllPlayer());

    	}, false);

	},

	refreshUi: function(player)
	{

		this.players.innerHTML = "";
		for(var i = 0; i < GameEngine.Players.length; i++)
		{
			var obj = GameEngine.Players[i];

			this.players.innerHTML = this.players.innerHTML + " , <span style='color: "+ obj.color +";' > " + i +" : " + obj.name + "</span>";	
		}
		
		this.building.innerHTML = player.building.length;
		this.army.innerHTML = player.army.length;
		
	}
};
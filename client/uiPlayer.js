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

	selectedObject : null,

	init : function()
	{
		this.endTurn.addEventListener('click', function(evt) {	     	

	     	Client.sendActionMessage({type : "nextTurn", player : GameEngine.getControllPlayer().id}, GameEngine.getControllPlayer());

    	}, false);

	},

	_getRow : function(key, value)
	{
		return "<div> " + key +" : " + value + "</div>"
	},

	setSelectedObject: function(object)
	{
		this.armyStats.innerHTML = "";
		
		if(object.name == "army")
		{
			this.armyStats.innerHTML = this._getRow("Attack", object.powerAttack);
			this.armyStats.innerHTML += this._getRow("Movement", object.speed);
			this.armyStats.innerHTML += this._getRow("Range", object.range); 
			this.armyStats.innerHTML += this._getRow("Health", object.health); 
			this.armyStats.innerHTML += this._getRow("Fights", object.fights); 

			armyStatsImg.src= "http://"+ GameEngine.server +"/asets/"+object.img;
		}

		if(object.name == "building")
		{			
			this.armyStats.innerHTML = this._getRow("Product", object.productArmy || "---");
			this.armyStats.innerHTML += this._getRow("Earn money", object.earnGold || "0");

			armyStatsImg.src= "http://"+ GameEngine.server +"/asets/"+object.img;	
		}
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

		if(GameEngine.turnPlayer)
		{
			this.playerTurn.innerHTML =  "<span style='color: "+ GameEngine.turnPlayer.color +";' >" + GameEngine.turnPlayer.name + "</span>";			
		}
		this.playerGold.innerHTML =  GameEngine.getControllPlayer().gold;	
	}
};
Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);

		var red = Math.floor((Math.random() * 1000) + 1)%255;
		var green = Math.floor((Math.random() * 1000) + 1)%255;
		var blue = Math.floor((Math.random() * 1000) + 1)%255;

		var color = "rgba("+red +", "+ green +"," +blue +", 1)";
		var tile = null;

		var sharedBuildArmy = playerShared.buildArmy;
		var sharedBuildFreeArmy = playerShared.buildFreeArmy;	
		var sharedaddBuilding = playerShared.addBuilding;

		var player = {			
			id : GameEngine.generateId(),						
			color: color,			

			buildArmy : function(name, x, y)
			{
				var army = sharedBuildArmy.call(this, name, x, y);
	
				if(army)
				{
					Server.sendBroadcast(JSON.stringify(
						{type : "buildArmy", player : {playerId : this.id, gold : this.gold}, data : army.dump()}));
				}
			},

			buildFreeArmy : function(name, x, y)
			{
				var army = sharedBuildFreeArmy.call(this,name, x, y);

				if(army)
				{
					Server.sendBroadcast(JSON.stringify(
						{type : "buildArmy", player : {playerId : this.id, gold : this.gold}, data : army.dump()}));
				}
			},

			addBuilding: function(building)
			{
				sharedaddBuilding.call(this, building);
				
				Server.sendBroadcast(JSON.stringify({type : "clameBuilding", buildingId : building.id, playerId : this.id}));	
			}			
		}

		return Object.assign(playerShared, player);
	}
};

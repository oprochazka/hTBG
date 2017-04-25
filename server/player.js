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
		var sharedBuildArcher = playerShared.buildArcher;
		var sharedaddBuilding = playerShared.addBuilding;

		var player = {			
			id : GameEngine.generateId(),						
			color: color,			

			buildArmy : function(x, y)
			{
				var soldier = sharedBuildArmy.call(this, x, y);

				Server.sendBroadcast(JSON.stringify({type : "addArmy", data : soldier.dump()}));
			},

			buildArcher : function(x, y)
			{
				var archer = sharedBuildArcher.call(this, x, y);

				Server.sendBroadcast(JSON.stringify({type : "addArmy", data : archer.dump()}));
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

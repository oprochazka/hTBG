BuildingShared = {
	makeBuildingShared : function(image, player)
	{
		var buildingTile = Tile.makeTile("building", null);	

		var oldDumped = buildingTile.dump;

		var building = {
			production : 0,			
			player : player,						

	        setPlayer : function(player)
	        {
	        	this.player = player;	        		        		        	
	        },

			newTurn : function(player)
			{

			},

			load: function(json)
			{
				this.id = json.id;

				if(json.player)
				{					
					this.player = GameEngine.findPlayer(json.player);
					this.player.addBuilding(this);
				}
			},

			dump: function(json)
			{
				var dumpedOld = oldDumped.call(this,json);

				var dumped = {
					id : this.id,
					production : this.production,					
					player : this.player && this.player.id,
					type : this.type					
				};

				dumped = Object.assign(dumpedOld, dumped);

				return dumped;
			}	

		};

		return Object.assign(buildingTile, building);			
	}
};
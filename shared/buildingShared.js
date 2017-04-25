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

			refreshStats : function()
			{			
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
	},


	makeBarracksShared : function()
	{
		var out = BuildingShared.makeBuildingShared("http://"+ GameEngine.server +"/asets/barracks.png");		

		out.type = "barracks";

		return out;	
	},

	makeCastleShared : function()
	{
		var out = BuildingShared.makeBuildingShared("http://"+ GameEngine.server +"/asets/castle.png");		

		out.type = "castle";

		return out;	
	},

	loadBuilding : function(json)
	{
		if(json.type == "barracks")
		{
			var building = this.makeBarracksTile();
			building.load(json);				

			return building;
		}
		if(json.type == "castle")
		{
			var building = this.makeCastleTile();
			building.load(json);				

			return building;
		}
	}
};

BuildingShared = {
	_setConfiguration : function(building, config)
	{
		building.type = config.type;
		building.productArmy = config.productArmy;
		building.earnGold = config.earnGold;
		building.img = config.img;
	},

	makeBuildingShared : function(buildingDescName)
	{
		var buildingTile = Tile.makeTile();	

		var oldDumped = buildingTile.dump;
		var oldLoad = buildingTile.load;

		var building = {
			name : "building",
			production : 0,			
			player : null,						

			setType : function(buildingDescName)
			{
				var config = BuildingDesc[buildingDescName];

				BuildingShared._setConfiguration(this, config);

				return config;
			},

	        setPlayer : function(player)
	        {
	        	this.player = player;	        		        		        	
	        },

			newTurn : function(player)
			{

			},

			buildArmy : function()
			{
				var productArmy = this.productArmy;

				if(productArmy)
				{
					this.player.buildArmy(productArmy, this.position.x, this.position.y);
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
					type : this.type,
					earnGold : this.earnGold,
					productArmy : this.productArmy
				};

				dumped = Object.assign(dumpedOld, dumped);

				return dumped;
			},

			load : function(json)
			{
				this.id = json.id;																

				this.position.x = json.position.x;
				this.position.y = json.position.y;

				this.img = json.img;

				this.type = json.type;
	        	this.name = json.name;

				this.setType(json.type);

				if(json.player)
				{					
					this.player = GameEngine.findPlayer(json.player);
					this.player.addBuilding(this);
				}
			}

		};

		var output = Object.assign(buildingTile, building);			

		if(buildingDescName)
		{
			output.setType(buildingDescName);
		}

		return output;
	},

	loadBuilding : function(json)
	{
		var building = this.makeBuilding();
		building.load(json);				

		return building;
	}
};

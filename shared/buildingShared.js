BuildingShared = {

	makeBuildingShared : function(buildingDescName)
	{
		var buildingTile = Tile.makeTile();	

		var oldDumped = buildingTile.dump;
		var oldLoad = buildingTile.load;
		var oldInsert = buildingTile.insert;

		var building = {
			name : "building",
			production : 0,			
			player : null,	
			modifyMove : null,
			modifyRange : null,							

			_setConfiguration : function(building, config)
			{
				building.type = config.type;
				building.productObject = config.productObject;
				building.earnGold = config.earnGold;
				building.img = config.img;
				this.modifyMove = config.modifyMove;
				this.modifyRange = config.modifyRange;
				this.forbidenTiles = config.forbidenTiles;
			},

			insert: function(x, y)
			{			
				var buildingObj = Field.getBuildingObject(x, y);						
				var armyObj = Field.getArmyObject(x, y);						

				if(!buildingObj && !armyObj)
				{
					oldInsert.call(this, x, y);
				}
			},

			setType : function(buildingDescName)
			{
				var config = ObjectDesc.getConfiguration(buildingDescName);

				this._setConfiguration(this, config);

				return config;
			},

	        setPlayer : function(player)
	        {
	        	this.player = player;	        		        		        	
	        },

	        incomeGold : function()
	        {
	        	if(this.player)
	        	{
	        		this.player.gold += this.earnGold;
	        	}
	        },

			newTurn : function(player)
			{								
				if(this.player)
				{
					this.incomeGold();
				}
			},

			buildObject : function(productArmy)
			{				
				if(Field.getArmyObject(this.position.x, this.position.y))
				{
					return;
				}
					
				if(productArmy && this.player && this.player.inTurn)
				{
					this.player.buildObject(productArmy, this.position.x, this.position.y);
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
					productObject : this.productObject
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
	}
};

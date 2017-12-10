BuildingShared = {

	makeBuildingShared : function(buildingDescName)
	{
		var buildingTile = PlayerEntity.makePlayerEntity();

		var oldDumped = buildingTile.dump;
		var oldLoad = buildingTile.load;
		var oldInsert = buildingTile.insert;
		var oldSetKilled = buildingTile.setKilled;

		var building = {
			name : "building",
			production : 0,			
			player : null,	
			modifyMove : null,
			modifyRange : null,
			productUnits : 1,					

			setKilled : function()
			{
				oldSetKilled.call(this);

				if(this.player)
				{
					this.player.removeBuilding(this);
				}
			},

			_setConfiguration : function(building, config)
			{
				building.type = config.type;
				building.productObject = config.productObject;
				building.earnGold = config.earnGold;
				building.img = config.img;
				this.modifyMove = config.modifyMove;
				this.modifyRange = config.modifyRange;
				this.forbidenTiles = config.forbidenTiles;
				this.productUnits = 0;
				this.initProductUnits = config.initProductUnits;
				this.initHealth = config.initHealth;
				this.boost = config.boost;
				
				if(!config.initHealth)
				{
					this.initHealth = 1000;
				}

				this.health = this.initHealth;
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

				this.refreshStats();
			},

			buildObject : function(productArmy)
			{				
				if(Field.getArmyObject(this.position.x, this.position.y))
				{
					return;
				}
				
				if(this.productUnits <= 0)	
				{
					return;
				}

				if(productArmy && this.player && this.player.inTurn)
				{
					this.productUnits--;
					this.player.buildObject(productArmy, this.position.x, this.position.y);
				}
				
			},

			refreshStats : function()
			{			
				this.productUnits = this.initProductUnits;
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
					productObject : this.productObject,					
					productUnits : this.productUnits,
					health : this.health
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
					this.player = GameEngine.gameManager.findPlayer(json.player);
					this.player.addBuilding(this);
				}

				this.productUnits = json.productUnits;
				this.health = json.health;
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

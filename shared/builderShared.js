BuilderShared = {
	makeBuilderShared : function(armyDescType)
	{
		var army = Army.makeArmy(armyDescType);
		var armyConfigOld = army._setArmyConfig;
		var refreshStatsOld = army.refreshStats;
		var loadOld = army.load;
		var dumpOld = army.dump;

		var out = {
			buildingMap : [],
			map : null,

			_setArmyConfig : function(config)
			{
				armyConfigOld.call(this, config);

				this.builds = 0;
				this.initBuilds = config.initBuilds;				

				return config;				
			},

			refreshStats : function()
			{
				refreshStatsOld.call(this);

				this.builds = this.initBuilds;
			},

			buildingPosition : function(building)
			{
				var config = ObjectDesc.getConfiguration(building);
				this.map = [];
				var map = [];
								
				if(this.builds == 0)
				{
					return map;
				}

				this.setSurrounding(this.position.x, this.position.y, map);

				this.map = map;

				for(var x = 0; x < map.length; x++)
				{
					var tiles = Field.getObject(map[x].x, map[x].y);

					var tile = tiles && tiles[0];

					if(tile)
					{
						if(!config.forbidenTiles)
						{
							break;
						}
						for(var i = 0; i < config.forbidenTiles.length; i++)
						{
							if(tile && tile.type == config.forbidenTiles[i])
							{								
								map.splice(x, 1);
								x--;
								break;
							}					
						}
					}
				}

				return map;
			},

			buildObject : function(building, x, y)
			{	
				var map = this.buildingPosition(building);
				if(this.map && this.checkMapObject(map, {x : x, y : y}))
				{					
					if(Field.getArmyObject(x, y) || Field.getBuildingObject(x, y))
					{
						return;
					}					

					if(this.player && this.player.inTurn)
					{	
						this.builds--;

						this.player.buildObject(building, x, y);				
					}
				}
				this.map = null;
			},

			load : function(json)
			{
				loadOld.call(this, json);

				this.builds = json.builds;
			},

			dump : function()
			{
				var dump = dumpOld.call(this);

				console.log("builds ! ", this.builds);

				dump.builds = this.builds;

				return dump;
			}

		};

		return Object.assign(army, out);
	}
};
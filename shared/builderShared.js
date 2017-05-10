BuilderShared = {
	makeBuilderShared : function(armyDescType)
	{
		var army = Army.makeArmy(armyDescType);

		var out = {
			buildingMap : [],
			map : null,

			buildingPosition : function(building)
			{
				var config = ObjectDesc.getConfiguration(building);
				this.map = [];
				var map = [];
				this.setSurrounding(this.position.x, this.position.y, map);

				this.map = map;

				for(var x = 0; x < map.length; x++)
				{
					var tiles = Field.getObject(map[x].x, map[x].y);
					var tile = tiles[0];

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
						this.player.buildObject(building, x, y);				
					}
				}
				this.map = null;
			}

		};

		return Object.assign(army, out);
	}
};
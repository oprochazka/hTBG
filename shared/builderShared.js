BuilderShared = {
	makeBuilderShared : function(armyDescType)
	{
		var army = Army.makeArmy(armyDescType);

		var out = {
			buildingMap : [],
			map : null,

			buildingPosition : function(building)
			{
				this.map = [];
				var map = [];
				this.setSurrounding(this.position.x, this.position.y, map);

				this.map = map;

				return map;
			},

			buildObject : function(building, x, y)
			{	
				var map = this.buildingPosition();
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
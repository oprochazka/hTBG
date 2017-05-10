BuilderShared = {
	makeBuilderShared : function(armyDescType)
	{
		var armyShared = ArmyShared.makeArmyShared(armyDescType);

		var out = {
			buildingMap : [],

			buildingPosition : function(building)
			{
				var map = [];
				this.setSurounding(map);
				return map;
			},

			buildBuilding : function(building, x, y)
			{
				
			}

		};

		return Object.assign(armyShared, out);
	}
};
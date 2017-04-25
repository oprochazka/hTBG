Building = {

	makeBuilding : function(image, player)
	{
		var buildingShared = BuildingShared.makeBuildingShared(image, player);

		return buildingShared;	
	},

	makeBarracksTile : function()
	{
		var out = this.makeBuilding();		

		out.type = "barracks";		

		out.productArmy = function()
		{			
			var army = Field.getArmyObject(out.position.x, out.position.y);		 
		
			if(!army)
			{
				out.player.buildArmy(out.position.x, out.position.y);			
			}
		}

		out.setPlayer = function(player)
		{
			this.player = player;
			setInterval(out.productArmy, 20000);
		}

		return out;	
	},

	makeCastleTile : function()
	{
		var out = this.makeBuilding();		

		out.type = "castle";		

		out.productArmy = function()
		{			
			var army = Field.getArmyObject(out.position.x, out.position.y);		 
		
			if(!army)
			{
				out.player.buildArcher(out.position.x, out.position.y);			
			}
		}

		out.setPlayer = function(player)
		{
			this.player = player;
			setInterval(out.productArmy, 20000);
		}

		return out;	
	}
}
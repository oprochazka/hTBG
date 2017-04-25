Building = {

	makeBuilding : function(image, player)
	{
		var buildingTileShared = BuildingShared.makeBuildingShared(image, player);

		var oldRender = buildingTileShared.render;
		var square = Draw.makeFillSquare(20, 20);

		buildingTileShared.square.setImage(image);	

		var building =  {			
			render : function()
			{
				oldRender.call(this);				

				square.setPosition(buildingTileShared.square.x, buildingTileShared.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
					square.render();
				}				
			}				            
		};

		return Object.assign(buildingTileShared, building);		
	},

	makeBarracksTile : function()
	{
		var out = BuildingShared.makeBarracksShared();				

		return out;	
	},

	makeCastleTile : function()
	{
		var out = BuildingShared.makeCastleShared();					

		return out;	
	}
};

Building = Object.assign(BuildingShared, Building);
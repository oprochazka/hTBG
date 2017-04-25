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
		var out = this.makeBuilding("http://"+ GameEngine.server +"/asets/barracks.png");		

		out.type = "barracks";

		return out;	
	},

	makeCastleTile : function()
	{
		var out = this.makeBuilding("http://"+ GameEngine.server +"/asets/castle.png");		

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
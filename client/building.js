Building = {

	makeBuilding : function(buildingDescType)
	{
		var buildingTileShared = BuildingShared.makeBuildingShared(buildingDescType);

		var oldRender = buildingTileShared.render;
		var square = Draw.makeFillSquare(20, 20);
		
		var oldSetType = buildingTileShared.setType;	

		var building =  {		
			setType : function(buildingDescType)
			{
				var config = oldSetType.call(this, buildingDescType);
				
				this.img = config.img;

				var img = "http://"+ GameEngine.server +"/asets/"+ config.img;

				this.square.setImage(img);
			},

			render : function()
			{
				oldRender.call(this);				

				square.setPosition(buildingTileShared.square.x, buildingTileShared.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
					square.render();
				}				
			},
			onClick : function(mousePos, key)
			{
				if(key == "right")
				{
					if(Field.getArmyObject(this.position.x, this.position.y))
					{
						return;
					}
														
					Client.sendActionMessage({type : "buildArmy", buildingId : this.id}, GameEngine.getControllPlayer());					
				}
				UIPlayer.setSelectedObject(this);
			}
		};

		return Object.assign(buildingTileShared, building);		
	}
};

Building = Object.assign(BuildingShared, Building);
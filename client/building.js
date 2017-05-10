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
			
			onProductArmy : function(army)
			{
				if(Field.getArmyObject(this.position.x, this.position.y))
				{
					return;
				}
													
				Client.sendActionMessage({type : "buildObject", id : this.id, productObject : army}, GameEngine.getControllPlayer());	
			},

			onClick : function(mousePos, key)
			{
				Field.canvasUi.setType(this);
				UIPlayer.setSelectedObject(this);
			}
		};

		return Object.assign(buildingTileShared, building);		
	}
};

Building = Object.assign(BuildingShared, Building);
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
				
				this.img = "http://"+ GameEngine.server +"/asets/"+ config.img;

				this.square.setImage(this.img);
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
					var soldier = Army.makeSoldier(this);
					
					if(this.player && this.player.payMoney(soldier.cost))
					{
						Client.sendActionMessage({type : "productBuilding", buildingId : this.id}, GameEngine.getControllPlayer());
					}
				}
			}
		};

		return Object.assign(buildingTileShared, building);		
	}
};

Building = Object.assign(BuildingShared, Building);